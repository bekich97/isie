import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="my-row">
          <div className="left my-col">
            <div className="top">
              <img
                src={require("../../assets/imgs/logo-orange.png")}
                className="logo_img"
                alt="App name"
              />
              <p>
                Ykdysadyýetde <br />
                Innowasion tilsimler H.J
              </p>
            </div>
            <div className="bottom">
              <div className="my-col">
                <a href="#!">Главная</a>
                <a href="#!">Услуги</a>
              </div>
              <div className="my-col">
                <a href="#!">Проекты</a>
                <a href="#!">О нас</a>
              </div>
              <div className="my-col">
                <a href="#!">Условия и положения</a>
                <a href="#!">Политика конфединциальности</a>
                <a href="#!">Контакты</a>
              </div>
            </div>
          </div>
          <div className="right my-col">
            <div className="top">
              <div className="copy-right">&copy;</div>
              <div>
                2022 Ykdysadyýetde Innowasıon tilsimler H.J. Все <br />
                права защищены
              </div>
            </div>
            <div className="bottom">
              <ul>
                <li>
                  <img
                    src={require("../../assets/imgs/small-dot.png")}
                    className="logo_img"
                    alt="App name"
                  />{" "}
                  <span>+99363250880 +99312921136</span>
                </li>
                <li>
                  <img
                    src={require("../../assets/imgs/small-dot.png")}
                    className="logo_img"
                    alt="App name"
                  />{" "}
                  <span>director@isie.pro</span>
                </li>
                <li>
                  <img
                    src={require("../../assets/imgs/small-dot.png")}
                    className="logo_img"
                    alt="App name"
                  />{" "}
                  <span>
                    744000, Türkmenistan, Aşgabat ş. <br />
                    Seýitnazar Seýdi köçesiniň 3 jaýy
                  </span>
                </li>
                <li>
                  <img
                    src={require("../../assets/imgs/small-dot.png")}
                    className="logo_img"
                    alt="App name"
                  />{" "}
                  <span>isie.pro</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
