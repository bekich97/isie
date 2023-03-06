import React from "react";
import ServiceCard from "../components/ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper.scss";
import * as Icon from "react-bootstrap-icons";

SwiperCore.use([Autoplay]);

const bannerSlides = [
  { id: 1, text: "Инвестиций" },
  { id: 2, text: "Ценных бумаг" },
  { id: 3, text: "Туризма" },
  { id: 4, text: "Недвижимости" },
];

const rows = () => {
  const bigDots = [];
  for (let i = 0; i < 16; i++) {
    bigDots.push(
      <img
        key={i}
        className="angle6-img"
        src={require("../assets/imgs/6angle.png")}
        alt="Big dot"
      />
    );
  }
  return bigDots;
};

const Home = () => {
  return (
    <div>
      <div className="banner container swiper-slidere">
        <div className="one-text">
          <div>Мы лучший выбор в помощь для ваших</div>
          <div className="hidden-text">Hidden text</div>
        </div>
        <div style={{ width: "20px" }}></div>
        <div className="car-wrapper carousel">
          <Swiper
            direction="vertical"
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            speed={1000}
            mousewheel={true}
            autoHeight={true}
            slidesPerView={4}
          >
            {bannerSlides.map((element) => (
              <SwiperSlide key={element.id}>{element.text}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="angles6">
        <div className="top-row">{rows()}</div>
        <div className="bottom-row">{rows()}</div>
      </div>
      <div className="container our-services">
        <h1>
          Выберите нас в качестве помощника- <br />
          Наши услуги
        </h1>
        <div className="service-cards row">
          <ServiceCard />
          <ServiceCard
            image={require("../assets/imgs/service1.png")}
            text="Инновации и инвестиции"
            url="#!"
          />
          <ServiceCard
            image={require("../assets/imgs/service2.png")}
            text="Оценка"
            url="#!"
          />
          <ServiceCard
            image={require("../assets/imgs/service3.png")}
            text="Туризм и недвижимость"
            url="#!"
          />
          <ServiceCard
            image={require("../assets/imgs/service4.png")}
            text="Ценные бумаги"
            url="#!"
          />
          <ServiceCard
            image={require("../assets/imgs/service5.png")}
            text="Разработка ПО"
            url="#!"
          />
          <ServiceCard
            image={require("../assets/imgs/service6.png")}
            text="Обработка данных, хранение и управление сет. оборудованием"
            url="#!"
          />
        </div>
      </div>
      <div className="why-us">
        <div className="container">
          <h1>Почему Мы?</h1>
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <img src={require("../assets/imgs/row1.png")} alt="Row Item" />
              <p>
                Успешно выполнено несколько <br />
                сотен государственных <br />
                контрактов
              </p>
            </div>
            <div className="col-lg-4 col-md-4">
              <img src={require("../assets/imgs/row2.png")} alt="Row Item" />
              <p>
                Многие учереждения выбрали <br />и внедрили наши решения
              </p>
            </div>
            <div className="col-lg-4 col-md-4">
              <img src={require("../assets/imgs/row3.png")} alt="Row Item" />
              <p>
                Вместе с нами работают <br />
                професионалы своих дел
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>
                Готовы расти вместе с агенством которой можете довериться?
                Получите ваше предложение прямо сейчас!
              </p>
            </div>
            <div className="col-md-6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore.
              </p>
              <a href="#!" className="send-invit">
                Отправь мне предложение &nbsp;&nbsp;
                <Icon.FileEarmarkTextFill />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
