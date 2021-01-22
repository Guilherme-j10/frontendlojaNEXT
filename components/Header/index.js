import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineHeart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FiInstagram } from 'react-icons/fi';
import { VscThreeBars } from 'react-icons/vsc';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaShoppingCart, FaFacebook, FaTwitter } from 'react-icons/fa';
import api from '../../service/api';
import { ToastContainer, toast } from 'react-toastify';

const Header = ({ ready }) => {
  const log = (value) => console.log(value);

  const createLogin = async(e) => {
    e.preventDefault();

    try {
      const response = await api.post('/loginUser', {
        email: e.target.email.value,
        senha: e.target.senha.value
      });

      if(response.data.token){
        localStorage.setItem('TokenHirokiToys', response.data.token);
        Modais.CloseModal();
      }

      toast.error(response.data, {position: 'bottom-right'});
    } catch (error) {
      log(error);
    }
  }

  const Modais = {
    CallModal: () => {
      const ModalLogin = document.getElementById('modalLogin').style.display = 'flex';
    },
    CloseModal: () => {
      const ModalLogin = document.getElementById('modalLogin').style.display = 'none';
    },
    CloseModalOtherForm: () => {
      setInterval(() => {
        window.addEventListener('click', (e) => {
          if(e.target.className == 'modal'){
            document.getElementById('modalLogin').style.display = 'none';
          }
        })
      }, 100);
    }
  };

  useEffect(() => {
    Modais.CloseModalOtherForm();
  }, []);

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
              {ready == true ? (
                <p>Bem vindo<br /> <strong style={{cursor: 'pointer'}} >Minha conta</strong></p>
              ) : (
                <p>Olá, faça seu <strong style={{cursor: 'pointer'}} onClick={(e) => {Modais.CallModal()}} >login</strong><br /> ou <strong style={{cursor: 'pointer'}} onClick={(e) => {alert('cadastro')}} >cadastre-se</strong> <MdKeyboardArrowDown style={{marginTop: '-5px'}}/></p>
              )}
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
    <section className="modal" id="modalLogin">
      <div className="ContainerModal">
        <div className="HeaderContent">
          <h1>Log in</h1>
        </div>
        <form onSubmit={createLogin} className="loginForm">
          <div className="linePut">
            <input type="email" name="email" required placeholder="E-mail" />
            <MdEmail />
          </div>
          <div className="linePut">
            <input type="password" name="senha" required placeholder="Senha" />
            <RiLockPasswordFill />
          </div>
          <button type="submit">
            Entrar
          </button>
        </form>
        <div className="forgotPassword">
          <Link href="#">
            <a>Esqueci a senha</a>
          </Link>
        </div>
      </div>
    </section>
    <ToastContainer />
  </>
  );
}

export default Header;

