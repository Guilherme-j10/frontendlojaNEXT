import Head from '../components/Head/index';
import HeaderContainer from '../components/Header/index';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

const Home = ({ products }) => {
  return (
    <>
      <Head titlePage="Home" />
      <HeaderContainer />
      <div className="sectionProduct">
        <div className="HeaderContainerProduct">
          <h1>NOVIDADES</h1>
        </div>
        <div className="products">
          {products.map((dados, i) => (
            <Link href="#">
              <a class="cards">
                <img src={`http://localhost:3333/${dados.imagem_produto}`} alt="p" />
                <div className="description">
                  <p>{dados.nome_produto}</p>
                  <span className="price">
                    <p>Por : </p><h1>R$ {dados.valor_produto}</h1>
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
  const response = await axios.get('http://localhost:3333/ListProduct/recentadd');
  return {
    props: {
      products: response.data
    },
    revalidate: 1
  }
}

export default Home; 