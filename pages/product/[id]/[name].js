import React, { useEffect, useState, useContext } from 'react';
import Head from '../../../components/Head/index';
import Header from '../../../components/Header/index';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import Footer from '../../../components/footer/index';
import LoadScreen from '../../../components/loadScreen/index';
import api from '../../../service/api';
import { AiFillHeart, AiOutlineLike, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FaShareAlt, FaLongArrowAltRight, FaShoppingCart, FaTruck } from 'react-icons/fa';
import { RiShoppingBasket2Fill } from 'react-icons/ri';
import { FiCheck } from 'react-icons/fi';
import { url } from '../../../utils/constant';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { AuthContext, AuthProvider } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const ProductPage = ({ productInfoContent }) => {

  const [ idUser, setIdUser ] = useState(0);
  const [ dadosProduto, setDadosProduto ] = useState(false);
  const [ EnableButton, setEnableButton ] = useState(false);
  const [ callModal, setCallModal ] = useState('none');
  const [ products, setProducts ] = useState([]);
  const [ nameCategory, setNameCategory ] = useState('');
  const [ logged, anything, checkLoged ] = useContext(AuthContext);

  const getSimilarProduct = async () => {
    try {
      const response = await api.get(`/ListProduct/${productInfoContent.id_categoria}`);
      let arrProducts = [];
      response.data.map(dados => {
        if(dados.id_produto !== productInfoContent.id_produto){
          arrProducts.push(dados);
        }
      })
      setProducts(arrProducts);
    } catch (error) {
      console.log(error);
    } 
  }

  const CallModal = () => {
    if(logged) {
      setCallModal('flex');
    } else {
      toast.info('Login necessário', {position: 'bottom-right'});
    }
  }

  const getCategoryName = async () => {
    try {
      const response = await api.get('/listCategorias');
      response.data.map(dados => {
        if(dados.id_categoria == productInfoContent.id_categoria){
          setNameCategory(dados.nome_categoria)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const verificationCommentUser = async() =>{
    const { userId } = jwt.decode(localStorage.getItem('TokenHirokiToys'));
    try {
      let arr = [];
      const response = await api.get(`/listCommnetByProduct/${productInfoContent.id_produto}`);
      response.data.map(dados => {
        if(dados.id_user == userId){
          arr.push(dados.id_user);
        }
      })

      if(arr.length > 0){
        setEnableButton(true);
      }else{
        setEnableButton(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [ MediaReviews, setMediaReviews ] = useState({});
  const getAllReview = async () => {
    try {
      const response = await api.get(`/listCommnetByProduct/${productInfoContent.id_produto}`);
      let media = 0;
      response.data.map(dados => {
        media += parseInt(dados.nota)
      })

      setMediaReviews({
        media: media/response.data.length,
        total: response.data.length
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(productInfoContent){
      getSimilarProduct();
      getAllReview();
      getCategoryName();
      setDadosProduto(productInfoContent);

      if(localStorage.getItem('TokenHirokiToys')){
        verificationCommentUser();
      }
    }
    
    if(localStorage.getItem('TokenHirokiToys')){
      const { userId } = jwt.decode(localStorage.getItem('TokenHirokiToys'));
      setIdUser(userId);
    }
  }, [productInfoContent]);

  if(dadosProduto){
    return(
      <>
        <Head titlePage={dadosProduto.nome_produto} />
        <Header ready={logged} />
        <section className="standard_styled product_container">
          <div className="big_side_left">
            <div className="saty_image_and_info">
              <div className="header_options"> 
                <a href="#"><AiFillHeart /> Favoritar</a>
                <a href="#"><FaShareAlt /> Compartilhar</a>
              </div>
              <span className="productPathFile" style={{backgroundImage: `url(${url+'/'+dadosProduto.imagem_produto})`}}></span>
            </div>
            <div className="location_info_product">
              <div className="header_info_product">
                <small className="brand">{dadosProduto.marca_produto}</small>
                <h1>{dadosProduto.nome_produto}</h1>
                <div className="globalAvaliation">
                  {(() => {
                    const noStar = 5 - MediaReviews.media
                    let stars = [];
                    for(let i = 0; i < MediaReviews.media; i++){
                      stars.push(<AiFillStar style={{fontSize: '20px', color: 'rgb(242, 200, 50)'}}/>);
                    }
                    for(let k = 0; k < noStar; k++){
                      stars.push(<AiOutlineStar style={{fontSize: '20px', color: 'rgb(242, 200, 50)'}}/>);
                    }

                    return stars;
                  })()}
                  <small>({MediaReviews.total})</small>
                </div>
                <div className="row_line">
                  <small>Categoria: {nameCategory}</small>
                </div>
              </div>
                <p>{dadosProduto.descricao_produto.split('').length > 100 ? `${dadosProduto.descricao_produto.substr(0, 100)}...` : dadosProduto.descricao_produto}</p>
                <a href="#">Mais informações do produto</a>
                <a href="#">Política e troca e devolução</a>
            </div>
          </div>
          <div className="small_side_right">
            <div className="price_information">
              <h1>R$ {dadosProduto.valor_produto}</h1> 
              <p>Em até <strong>10x</strong> de <strong>R$ 7.99</strong> sem juros </p>
              <a href="#"><FaLongArrowAltRight />Consultar mais formas de pagamento</a>
            </div>
            <form action="" method="post">
              <label>Calcule o prazo de entrega</label>
              <div className="box_ex">
                <FaTruck />
                <input type="text" name="cep" required="" placeholder="Digite o seu CEP" />
                <button type="submit" name="see">Ver</button>
              </div>
              <label>Quantidade</label>
              <div className="qtd">   
                  <button>-</button>
                  <input type="text" name="qtd" readonly="" value="1" required="" />
                  <button>+</button>
              </div>
              <small>Items disponiveis: 27</small>
              <div className="payment_option">
                <button type="submit" name="pay"><RiShoppingBasket2Fill /> Comprar</button>
              </div>
            </form>
          </div>
        </section>
        {products.length == 0 ? false : (
          <div className="sectionProduct">
            <div className="HeaderContainerProduct">
              <h1>PRODUTOS RELACIONADOS</h1>
            </div>
            <div className="products">
              {products.map((dados, i) => (
                <Link key={i} href={`/product/${dados.id_produto}/${dados.nome_produto.toLowerCase().replace(/ /g, '-')}`}>
                  <a className="cards">
                    <span className="productImg" style={{backgroundImage: `url(${url+'/'+dados.imagem_produto})`}}></span>
                    <div className="description">
                      <p>{dados.nome_produto}</p>
                      <span className="price">
                        <p>Por : </p><h1>R$ {dados.valor_produto.replace('.', ',')}</h1>
                      </span>
                      <small>Total a vista sem juros</small>
                      <form action="" method="">
                        <button name="add_card" type="submit">
                          <span className="cart"><FaShoppingCart /></span>
                          <p>Adcionar ao carrinho</p>
                        </button>
                      </form>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="descriptionProducts">
          <div className="HeaderDescription">
            <h1>Descrição</h1>
          </div>
          <p>{dadosProduto.descricao_produto}</p>
        </div>
        <div className="CommentsAboutProducts">
          <div className="HeaderDescription">
            <h1>COMENTÁRIOS DOS CLIENTES</h1>
            {EnableButton == false ? (
              <button onClick={CallModal} >Avaliar produto</button>
            ) : false}
          </div>
          {dadosProduto.comentarios.length == 0 ? (<div className="WithOutComments">
            <h1><HiOutlineEmojiSad /> Ainda não temos nenhuma avaliação para este produto</h1>
            <small>seja a primeira pessoa a avaliar este produto</small>
          </div>) : 
            dadosProduto.comentarios.map((dados, i) => (
              <div key={i} className="ContainerContentComment">
                <div className="leftSide">
                  <div className="informationComment">
                    <h1>{dados.titulo_comentario}</h1>
                    <div className="sectionNote">
                      {(() => {
                        const noStar = 5 - dados.nota;
                        let stars = [];
                        for(let i = 0; i < dados.nota; i++){
                          stars.push(<AiFillStar style={{fontSize: '20px', color: 'rgb(242, 200, 50)'}}/>);
                        }
                        for(let k = 0; k < noStar; k++){
                          stars.push(<AiOutlineStar style={{fontSize: '20px', color: 'rgb(242, 200, 50)'}}/>);
                        }
  
                        return stars;
                      })()}
                    </div>
                    <p>{dados.texto_comentario}</p>
                    <small>
                      {dados.nameuser}
                      {dados.comprou == 'yes' ? (
                        <div className="buyok">
                          <p><FiCheck /> Comprei e valiei</p>
                        </div>
                      ) : false}
                    </small>
                  </div>
                  <p>{dados.data.replace(/-/g, '/').split('/').reverse().join('/')}</p>
                </div>
                <div className="rightSide">
                  <h1>Esta avaliação foi útil ?</h1>
                  <button>
                    <AiOutlineLike />
                    ({dados.like_comentario})
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        <Footer />
        <ModalCreateComment 
          onShowModal={callModal}
          setOnShowModal={setCallModal}
          idProduct={dadosProduto.id_produto}
          notification={toast}
          dadosProdutoPagina={dadosProduto}
          setDadosProdutoPagina={setDadosProduto}
          UpdateStatusButtonComment={verificationCommentUser}
        />
      </>
    );
  }else{
    return <LoadScreen />
  }
}

const ModalCreateComment = ({ onShowModal, setOnShowModal, idProduct, notification, dadosProdutoPagina, setDadosProdutoPagina, UpdateStatusButtonComment }) => {

  const UpdateDtata = async() => {
    try {
      const response = await api.get(`/getProduct/${dadosProdutoPagina.id_produto}`);
      setDadosProdutoPagina(response.data[0]);
      UpdateStatusButtonComment();
    } catch (error) {
      console.log(error);
    }
  }

  const CreateComment = async(e) => {
    e.preventDefault();

    const { userId } = jwt.decode(localStorage.getItem('TokenHirokiToys'));
    
    try {

      const getNameUser = await api.post('/getUserDate', {id: userId}, {
        headers:{
          token: localStorage.getItem('TokenHirokiToys')
        }
      });

      if(getNameUser.data.length !== 0){
        const response = await api.post('/createComment', {
          idProduto: idProduct,
          idUser: userId,
          nameUser: getNameUser.data[0].nome_user,
          nota: e.target.nota.value,
          tituloComentario: e.target.titulo.value,
          textoComentario:  e.target.texto.value,
          comprou: e.target.comprou.value
        }, {
          headers: {
            token: localStorage.getItem('TokenHirokiToys')
          }
        });
  
        if(response.data == 'Comentario enviado com sucesso'){
          setOnShowModal('none');
          notification.info(response.data, {position: 'bottom-right'});
          UpdateDtata();
  
          e.target.nota.value = 5,
          e.target.titulo.value = '',
          e.target.texto.value = '',
          e.target.comprou.value = 'yes'
        }else{
          notification.error('Error: tente novamente mais tarde', {position: 'bottom-right'});
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="createComent" style={{display: onShowModal}}>
      <form onSubmit={CreateComment} className="ContainerModal">
        <div className="HeaderContent">
          <h1>Avaliar Produto</h1>
          <MdClose onClick={() => setOnShowModal(false)} />
        </div>
        <div className="loginForm" >
          <div className="line">
            <label>
              Nota de avaliação
            </label>
            <select name="nota">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="line">
            <label>
              Titulo do comentário
            </label>
            <input type="text" name="titulo" required placeholder="Escreva seu titulo aqui" />
          </div>
          <div className="line">
            <label>
              Descrição
            </label>
            <input type="text" name="texto" required placeholder="Descreva aqui a sua avaliação" />
          </div>
          <div className="line">
            <label>
              Você já comprou este produto ?
            </label>
            <select name="comprou">
              <option value="yes">Sim, comprei</option>
              <option value="no">Ainda não comprei</option>
            </select>
          </div>
        </div>
        <div className="forgotPassword">
          <button type="button" onClick={() => setOnShowModal(false)}>
            cancelar
          </button>
          <button type="submit">
            adicionar
          </button>
        </div>
      </form>
    </section>
  );
}

const Main = ({ productInfo }) => {
  return(
    <AuthProvider>
      <ProductPage productInfoContent={productInfo} />
    </AuthProvider>
  );
}

export const getStaticPaths = async() => {

  const response = await api.get('http://localhost:3333/ListProduct/recentadd'); 

  const paths = response.data.map(ids => {
    return { params: { id: ids.id_produto.toString(), name: ids.nome_produto } }
  })

  return{
    paths, 
    fallback: true
  }

}

export const getStaticProps = async (context) => {

  const { id } = context.params;

  const response = await api.get(`/getProduct/${id}`);

  return{
    props: {
      productInfo: response.data[0]
    },
    revalidate: 10
  }
}

export default Main;