import React from 'react';
import { FiInstagram, FiPlus } from 'react-icons/fi';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return(
    <section className="footer">
       <div className="box_top">
          <div className="left">
            <img src="/icon.png" alt="imgLOGO" />
            <ul>
              <li>
                <a href="#"><FaFacebook /></a>
              </li>
              <li>
                <a href="#"><FaTwitter /></a>
              </li>
              <li>
                <a href="#"><FiInstagram /></a>
              </li>
            </ul>
          </div>
          <div className="center">
            <div className="content_options_clients">
              <span className="header_client"><h1>CATEGORIA</h1></span>
              <ul>
                <li><a href="#">Malas e bolsas</a></li>
                <li><a href="#">Bonecos e personagens</a></li>
                <li><a href="#">Lançamento</a></li>
                <li><a href="#">Quebra-cabeça</a></li>
                <li><a href="#">Fantasia</a></li>
                <li><a href="#">Rádio controle</a></li>
              </ul>
            </div>
            <div className="content_options_clients">
              <span className="header_client"><h1>INSTITUCIONAL</h1></span>
              <ul>
                <li><a href="#">Quem somos</a></li>
                <li><a href="#">Trocas e devoluções</a></li>
                <li><a href="#">Como comprar em nosso site</a></li>
              </ul>
            </div>
            <div className="content_options_clients">
              <span className="header_client"><h1>CONTATO</h1></span>
              <ul>
                <li><a href="#">(11) 258-1948 ou 1598-1950</a></li>
                <li><a href="#">Loja Carrão: (11) 2671-0926</a></li>
                <li><a href="#">sac@hellotoys.com</a></li>
              </ul>
            </div>
          </div>
        <div className="right">
          <div className="header_newslatter">
            <h1>NEWSLATTER</h1>
            <small>Assine para receber promoções e novidades</small>
          </div>
          <form action="" method="POST">
            <input type="email" name="email_newslatter" placeholder="Digite seu e-mail" required="" />
            <button type="submit" name="send_newslatter"><FiPlus /></button>
          </form>
        </div>
      </div>
      <div className="box_bottom">
        <div className="left_side">
          <h2>Formas de pagamento</h2>
          <ul>
            <li><img src="/visa.png" alt="img" /></li>
            <li><img src="/cartao-02.png" alt="img" /></li>
            <li><img src="/cartao-03.png" alt="img" /></li>
            <li><img src="/cartao-04.png" alt="img" /></li>
            <li><img src="/cartao-06.png" alt="img" /></li>
            <li><img src="/cartao-08.png" alt="img" /></li>
            <li><img src="/cartao-09.png" alt="img" /></li>
            <li><img src="/cartao-10.png" alt="img" /></li>
            <li><img src="/boleto-12.png" alt="img" /></li>
          </ul>
        </div>
        <div className="right_side">
          <h2>Segurança</h2>
          <ul>
            <li><img src="/ssl.png" alt="img" /></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;