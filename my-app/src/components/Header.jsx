import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        {/* можно будет лого задать картинкой, картинку можно в png скачать на flaticon.com хороший сток */}
        {/* <img src="path/to/logo.png" alt="Логотип" className="logo-image" /> */}
        <span className="logo-text">Мой первый реакт проект</span>
      </div>
      {/* стили прописала в App.css, можешь поменять, как нравится */}
      <nav className="nav">
        <ul className="nav-list">
        {/* #home шутки с хэштегами -якоря, мы их в App.js объявляем в дивах, которые содержат, нужный нам контент */}
          <li className="nav-item"><a href="#home" className="nav-link">Домой</a></li>
          <li className="nav-item"><a href="#about" className="nav-link">О нас</a></li>
          <li className="nav-item"><a href="#contact" className="nav-link">Контакты</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
