import Phone from "../../assets/images/phone.svg";
import { useForm } from "react-hook-form";
import Truck from "../../assets/images/001-delivery-truck.svg";
import Percentage from "../../assets/images/003-percentage.svg";
import Shield from "../../assets/images/002-secure-shield.svg";
import DeliveryBox from "../../assets/images/004-delivery-box.svg";
import Logo from "../../assets/images/rofruit-logo.svg";
import Visa from "../../assets/images/003-visa.svg";
import MasterCard from "../../assets/images/001-mastercard.svg";
import MasterCard1 from "../../assets/images/002-mastercard-1.svg";
import {
  BiLogoWhatsapp,
  BiLogoInstagram,
  BiLogoFacebook,
  BiRightArrowAlt,
  BiCheckCircle,
} from "react-icons/bi";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(["footer"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = () => {
    setIsSubmitted(true);
  };
  const footerMidData = t("footer:footerMid", { returnObjects: true });
  const imgSources = [Truck, Percentage, Shield, DeliveryBox];
  return (
    <footer>
      <div className="footer_top">
        <div className="container">
          <div className="call_back">
            <div className="img">
              <img src={Phone} alt="phone" />
            </div>
            <p>{t("footer:footerTop.callBackText")}</p>
          </div>
          {isSubmitted ? (
            <div className="success_form">
              <BiCheckCircle className="check_icon" />
              <p>{t("footer:footerTop.successMessage")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("number", {
                  required: t("footer:footerTop.inputWarningText"),
                  pattern: {
                    value: /^\+994\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
                    message: t("footer:footerTop.inputErrorText"),
                  },
                })}
                type="text"
                name="number"
                placeholder={t("footer:footerTop.formPlaceholder")}
              />
              {errors.number && <p>{errors.number?.message}</p>}
              <button type="submit">
                {t("footer:footerTop.submitButton")}
                <BiRightArrowAlt className="right_icon" />
              </button>
            </form>
          )}
          <div className="call_us">
            <div className="whatsapp_icon">
              <BiLogoWhatsapp className="icon" />
            </div>
            <div className="content">
              <p>{t("footer:footerTop.writeUsText")}</p>
              <h2>(077) 620 50 00</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_mid">
        <ul className="container">
          {footerMidData.map((item, index) => (
            <li key={index}>
              <div className="img_icon">
                <img src={imgSources[index]} alt={`Image ${index}`} />
              </div>
              <div className="content">
                <h3>{t(item.title)}</h3>
                <p>{t(item.description)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer_bottom">
        <div className="container">
          <ul>
            <li className="logo_img">
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
            </li>
            <li className="logo_content">
              {t("footer:footerBottom.logoContent")}
            </li>
            <li>
              <ul>
                <li className="facebook_icon">
                  <Link
                    to="https://www.facebook.com/RoFruit"
                    className="social_icon"
                  >
                    <BiLogoFacebook />
                  </Link>
                </li>
                <li className="instagram_icon">
                  <Link
                    to="https://www.instagram.com/rofruit/"
                    className="social_icon"
                  >
                    <BiLogoInstagram />
                  </Link>
                </li>
                <li className="whatsapp_icon">
                  <Link
                    to="https://api.whatsapp.com/send/?phone=994776205000"
                    className="social_icon"
                  >
                    <BiLogoWhatsapp />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li className="heading">{t("footer:footerBottom.siteMap")}</li>
            <li>
              <Link to="/about">{t("footer:footerBottom.aboutUs")}</Link>
            </li>
            <li>
              <Link to="/products/all">
                {t("footer:footerBottom.products")}
              </Link>
            </li>
            <li>
              <Link to="/questions">{t("footer:footerBottom.faq")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("footer:footerBottom.contactUs")}</Link>
            </li>
          </ul>
          <ul>
            <li className="heading">{t("footer:footerBottom.store")}</li>
            <li>
              <Link to="/login">{t("footer:footerBottom.login")}</Link>
            </li>
            <li>
              <Link to="/basket">{t("footer:footerBottom.basket")}</Link>
            </li>
            <li>
              <Link to="/favourites">{t("footer:footerBottom.wishlist")}</Link>
            </li>
          </ul>
          <ul>
            <li className="heading">{t("footer:footerBottom.contact")}</li>
            <li>
              <Link to="tel:0776205000">(077) 620 50 00</Link>
            </li>
            <li>
              <Link to="mailto:info@rofruit.az">info@rofruit.az</Link>
            </li>
            <li>
              <Link to="https://www.google.com/maps/dir//40.4186151,49.76747/@40.4186151,49.76747,14z?hl=az">
                {t("footer:footerBottom.address")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer_copyright">
        <div className="copyright_left">
          <p>{t("footer:footerBottom.rightsReserved")}</p>
        </div>
        <div className="copyright_right">
          <div className="copyright_img">
            <img src={Visa} alt="visa" />
          </div>
          <div className="copyright_img">
            <img src={MasterCard} alt="mastercard" />
          </div>
          <div className="copyright_img">
            <img src={MasterCard1} alt="mastercard1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
