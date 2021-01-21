import React from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineHeart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FiInstagram } from 'react-icons/fi';
import { VscThreeBars } from 'react-icons/vsc';
import { FaShoppingCart, FaFacebook, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return(
  <>
    <div className="HeaderContainer">
      <div className="firstLine">
        <div className="placeLogo">
          <Link href="/">
            <a>
              <img src="/icon.png" alt="logo" />
            </a>
          </Link>
        </div>
        <div className="inputContent">
          <form className="searchBox">
            <input type="text" name="ask" placeholder="Pesquise aqui seu produto" required />
            <button type="submit">
              <AiOutlineSearch  />
            </button>
          </form>
          <div className="loginBox">
            <span className="profileFile">
              <BiUser />
            </span>
            <div className="ButtonToLogin">
              <p>Olá, faça seu login<br /> ou cadastre-se <MdKeyboardArrowDown style={{marginTop: '-5px'}}/></p>
            </div>
          </div>
        </div>
        <div className="Assets">
          <Link href="/favoritos">
            <a><AiOutlineHeart /></a>
          </Link>
          <Link href="/carrinho">
            <a>
              <FaShoppingCart />
              <span className="Amount">0</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
    <div className="secondLine">
      <ul>
        <li>
          <Link href="#">
            <a>aniversário</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>ofertas do dia</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>dinheiro de volta</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>produtos importados</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <FaFacebook />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <FaTwitter />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <FiInstagram />
            </a>
          </Link>
        </li>
      </ul>
    </div>
    <div className="thirdLine">
      <ul>
        <li>
          <Link href="#">
            <a>
              <VscThreeBars />
              <p>compre por departamento</p>
              <MdKeyboardArrowDown />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>MENINAS</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>MENINOS</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>BEBÊS</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>CARRINHOS</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>PERSONAGENS</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>LANÇAMENTO</a>
          </Link>
        </li>
      </ul>
    </div>
  </>
  );
}

export default Header;