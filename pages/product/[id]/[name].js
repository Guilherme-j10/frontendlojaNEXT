import React from 'react';
import Head from '../../../components/Head/index';
import Header from '../../../components/Header/index';
//import { useRouter } from 'next/router';
import api from '../../../service/api';
import { AiFillHeart } from 'react-icons/ai';
import { FaShareAlt, FaLongArrowAltRight, FaTruck } from 'react-icons/fa';
import { RiShoppingBasket2Fill } from 'react-icons/ri';
import { url } from '../../../utils/constant';

const ProductPage = ({ productInfo }) => {

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
                <img src={url+'/'+productInfo.imagem_produto} alt="img" />
              </div>
            <div className="location_info_product">
              <div className="header_info_product">
                <small className="brand">{productInfo.marca_produto}</small>
                <h1>{productInfo.nome_produto}</h1>
                <div className="row_line">
                  <small>(Cód. {productInfo.id_produto})</small>
                </div>
              </div>
                <p>{productInfo.descricao_produto}</p>
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
      </>
    );
  }else{
    return <h1>carregando</h1>
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