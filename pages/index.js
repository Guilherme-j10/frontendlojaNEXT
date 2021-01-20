import React, { useState } from 'react';
import Head from '../components/Head/index';
import HeaderContainer from '../components/Header/index';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { BsFillStarFill, BsShieldShaded } from 'react-icons/bs'; 
import { ImTruck } from 'react-icons/im';
import api from '../service/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { url } from '../utils/constant';

const Home = ({ products }) => {
  return (
    <>
      <Head titlePage="Home" />
      <HeaderContainer />
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost/lojaonline/public/assets/bannerimgdois.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost/lojaonline/public/assets/bannerimgdois.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost/lojaonline/public/assets/bannerimgdois.png"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="confiable">
        <ul>
          <li>
            <span className="icon">
              <BsFillStarFill />
            </span>
            <div className="content">
                <h3>PRODUTO DE QUALIDADE</h3>
                <p>Produtos com qualidade garantida</p>
            </div>
          </li>
          <li>
            <span className="icon">
              <BsShieldShaded />
            </span>
            <div className="content">
                <h3>COMPRA 100% SEGURA</h3>
                <p>Segurança e confiabilidade na sua ccompra</p>
            </div>
          </li>
          <li>
            <span className="icon">
              <ImTruck />
            </span>
            <div className="content">
                <h3>ENTREGA SEGURA</h3>
                <p>Envio para todo o Brasil</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="sectionProduct">
        <div className="HeaderContainerProduct">
          <h1>NOVIDADES</h1>
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
    </>
  )
}

export const getStaticProps = async () => {
  const response = await api.get('/ListProduct/recentadd');
  return {
    props: {
      products: response.data
    },
    revalidate: 1
  }
}

export default Home; 