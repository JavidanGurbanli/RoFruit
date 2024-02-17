import SwiperSlides from "../../components/SwiperSlides/SwiperSlides";
import VegetableBanner from "../../assets/images/terevezler-2_banner.jpg";
import CookieBanner from "../../assets/images/nuts_banner.jpg";
import "./Home.scss";
import Product from "../../assets/images/productStep.svg";
import ShoppingCart from "../../assets/images/shopping-cartsStep.svg";
import Clipboard from "../../assets/images/clipboardStep.svg";
import Truck from "../../assets/images/delivery-truckStep.svg";
import NewProducts from "../../components/NewProducts/NewProducts";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Home = () => {
  const { t } = useTranslation(["home"]);
  const navigate = useNavigate();
  return (
    <>
        <Helmet>
          <title>RoFruit</title>
        </Helmet>
      <div className="swiper_content">
        <SwiperSlides />
      </div>
      <section className="banners">
        <div className="container">
          <div className="banner">
            <p>{t("home:banners.firstBanner.text")}</p>
            <h2>{t("home:banners.firstBanner.title")}</h2>
            <div className="banner_img">
              <img src={CookieBanner} alt="vegetable" />
            </div>
            <button onClick={() => navigate("/products/nuts")}>
              {t("home:banners.firstBanner.buttonText")}
            </button>
          </div>
          <div className="banner">
            <p>{t("home:banners.secondBanner.text")}</p>
            <h2>{t("home:banners.secondBanner.title")}</h2>
            <div className="banner_img">
              <img src={VegetableBanner} alt="cookies" />
            </div>
            <button onClick={() => navigate("/products/vegetables")}>
              {t("home:banners.secondBanner.buttonText")}
            </button>
          </div>
        </div>
      </section>
      <section className="home_products">
        <div className="container">
          <p>{t("home:homeProducts.sectionTitle")}</p>
          <h2>{t("home:homeProducts.sectionSubtitle")}</h2>
          <NewProducts />
          <Link to="/products/all">
            {t("home:homeProducts.allProductsLinkText")}
          </Link>
        </div>
      </section>
      <section className="step_area">
        <div className="container">
          <p>{t("home:stepArea.sectionTitle")}</p>
          <h2>{t("home:stepArea.sectionSubtitle")}</h2>
          <div className="steps">
            <div className="step">
              <div className="step_box">
                <p>1</p>
                <div className="step_img">
                  <img src={Product} alt="product" />
                </div>
              </div>
              <h2>{t("home:stepArea.stepTitles.0")}</h2>
            </div>
            <div className="step">
              <div className="step_box">
                <p>2</p>
                <div className="step_img">
                  <img src={ShoppingCart} alt="shopping cart" />
                </div>
              </div>
              <h2>{t("home:stepArea.stepTitles.1")}</h2>
            </div>
            <div className="step">
              <div className="step_box">
                <p>3</p>
                <div className="step_img">
                  <img src={Clipboard} alt="clipboard" />
                </div>
              </div>
              <h2>{t("home:stepArea.stepTitles.2")}</h2>
            </div>
            <div className="step">
              <div className="step_box">
                <p>4</p>
                <div className="step_img">
                  <img src={Truck} alt="truck" />
                </div>
              </div>
              <h2>{t("home:stepArea.stepTitles.3")}</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="campaign">
        <div className="container">
          <p>{t("home:campaign.sectionTitle")}</p>
          <h2>{t("home:campaign.sectionSubtitle")}</h2>
        </div>
      </section>
    </>
  );
};

export default Home;
