import React, { useEffect, useState } from 'react';
import Head from '../../../components/Head/index';
import Header from '../../../components/Header/index';
import Link from 'next/link';
import LoadScreen from '../../../components/loadScreen/index';
import api from '../../../service/api';
import { AiFillHeart, AiOutlineLike, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FaShareAlt, FaLongArrowAltRight, FaShoppingCart, FaTruck } from 'react-icons/fa';
import { RiShoppingBasket2Fill } from 'react-icons/ri';
import { url } from '../../../utils/constant';

const ProductPage = ({ productInfo }) => {

  const [ products, setProducts ] = useState([]);
  const [ nameCategory, setNameCategory ] = useState('');

  const log = (value) => console.log(value);

  const getSimilarProduct = async () => {
    try {
      const response = await api.get(`/ListProduct/${productInfo.id_categoria}`);
      let arrProducts = [];
      response.data.map(dados => {
        if(dados.id_produto !== productInfo.id_produto){
          arrProducts.push(dados);
        }
      })
      setProducts(arrProducts);
    } catch (error) {
      log(error);
    } 
  }

  const getCategoryName = async () => {
    try {
      const response = await api.get('/listCategorias');
      response.data.map(dados => {
        if(dados.id_categoria == productInfo.id_categoria){
          setNameCategory(dados.nome_categoria)
        }
      })
    } catch (error) {
      log(error);
    }
  }

  useEffect(() => {
    getSimilarProduct();
    getCategoryName();
  }, [productInfo]);

  if(productInfo){
    return(
      <>
        <Head titlePage={productInfo.nome_produto} />
        <Header />
        <section className="standard_styled product_container">
          <div className="big_side_left">
            <div className="saty_image_and_info">
              <div className="header_options">
                <a href="#"><AiFillHeart /> Favoritar</a>
                <a href="#"><FaShareAlt /> Compartilhar</a>
              </div>
              <span className="productPathFile" style={{backgroundImage: `url(${url+'/'+productInfo.imagem_produto})`}}></span>
            </div>
            <div className="location_info_product">
              <div className="header_info_product">
                <small className="brand">{productInfo.marca_produto}</small>
                <h1>{productInfo.nome_produto}</h1>
                <div className="row_line">
                  <small>Categoria: {nameCategory}</small>
                </div>
              </div>
                <p>{productInfo.descricao_produto.split('').length > 100 ? `${productInfo.descricao_produto.substr(0, 100)}...` : productInfo.descricao_produto}</p>
                <a href="#">Mais informações do produto</a>
                <a href="#">Política e troca e devolução</a>
            </div>
          </div>
          <div className="small_side_right">
            <div className="price_information">
              <h1>R$ {productInfo.valor_produto}</h1> 
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
          <p>{productInfo.descricao_produto}</p>
        </div>
        <div className="CommentsAboutProducts">
          <div className="HeaderDescription">
            <h1>COMENTÁRIOS DOS CLIENTES</h1>
            <button>Avaliar produto</button>
          </div>
          {productInfo.comentarios.map((dados, i) => (
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
                  <small>Guilherme</small>
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
          ))}
        </div>
      </>
    );
  }else{
    return <LoadScreen />
  }
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

export default ProductPage;