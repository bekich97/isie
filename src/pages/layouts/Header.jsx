import React from 'react'

export default function Header() {
  return (
    <div className='container header-container'>
      <div className='header-row'>
        <div className='left'>
          <img src={require('../../assets/imgs/logo-orange.png')} className="logo_img" alt="App name" />
          <p>Ykdysadyýetde <br />Innowasion tilsimler H.J</p>
        </div>
        <div className='right'>
          <div className='menu'>
            <ul>
              <li className='menu-item active'>
                <a href="#!">Home</a>
              </li>
              <li className='menu-item'>
                <a href="#!">Services</a>
              </li>
              <li className='menu-item'>
                <a href="#!">Projects</a>
              </li>
              <li className='menu-item'>
                <a href="#!">About Us</a>
              </li>
              <li className='menu-item'>
                <a href="#!">Contcts</a>
              </li>
            </ul>
          </div>
          <div className='langs'>
            <a href="#!">RU</a>
            <a href="#!">TM</a>
          </div>
        </div>
      </div> 
    </div>
  )
}
