import React, { useContext, useState } from "react";
import {
  BiLogoWhatsapp,
  BiLogoInstagram,
  BiLogoFacebook,
  BiSearch,
  BiChevronDown,
  BiUser,
  BiHeart,
  BiCart,
  BiMenu,
  BiHomeAlt2,
} from "react-icons/bi";
import "./Header.scss";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import Logo from "../../assets/images/rofruit-logo.svg";
import Support from "../../assets/images/support-icon.svg";
import AllProducts from "../../assets/images/butun_mehsullar.jpg";
import Fruits from "../../assets/images/meyveler.png";
import Vegetables from "../../assets/images/terevezler.png";
import DrawerSearch from "./DrawerSearch/DrawerSearch";
import DrawerNav from "./DrawerNav/DrawerNav";
import { Link, useNavigate } from "react-router-dom";
import DrawerBasket from "./DrawerBasket/DrawerBasket";
import { CartContext } from "../../CartContext";
import BackToTop from "./BackToTop/BackToTop";
import Breadcrumb from "../Breadcrump/Breadcrumb";
import Berries from "../../assets/images/gilemeyve.webp";
import DryFruits from "../../assets/images/qurumeyveler.png";
import Exotic from "../../assets/images/ekzotik_meyveler.jpg";
import Nuts from "../../assets/images/cerezler.jpg";
import { useTranslation } from "react-i18next";
import AzFlag from "../../assets/images/az_flag.png";
import EnFlag from "../../assets/images/en_flag.png";

const Header = () => {
  const { i18n, t } = useTranslation(["header"]);

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === "en" ? "az" : "en";
    i18n.changeLanguage(nextLanguage);
  };
  const navigate = useNavigate();
  const {
    isLogged,
    logout,
    cart,
    favourites,
    pricingType,
    setPricingType,
    openBasketDrawer,
    profile,
    openSearchDrawer,
    openNavDrawer,
  } = useContext(CartContext);

  const handleIconClick = () => {
    if (isLogged) {
      logout();
    } else {
      navigate("/login");
    }
  };

  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText) {
      setSearchText("");
      navigate(`/search?query=${trimmedSearchText}`);
    }
  };
  return (
    <header>
      <div className="topbar">
        <div className="container">
          <ul>
            <li>
              <RadioGroup value={pricingType} onChange={setPricingType}>
                <Radio
                  value="wholesale"
                  size="md"
                  name="radioInputs"
                  colorScheme="green"
                >
                  {t("header:wholesale")}
                </Radio>
                <Radio
                  value="retail"
                  size="md"
                  name="radioInputs"
                  colorScheme="green"
                >
                  {t("header:retail")}
                </Radio>
              </RadioGroup>
            </li>
          </ul>
          <div className="language_menu">
            <Menu>
              <MenuButton minW={0}>
                <img
                  src={i18n.language === "en" ? EnFlag : AzFlag}
                  alt="flag"
                  className="flag_img"
                />
                {i18n.language === "en" ? "EN" : "AZ"}
                <BiChevronDown className="down_icon" />
              </MenuButton>
              <MenuList minW={0}>
                <MenuItem onClick={toggleLanguage}>
                  <img
                    src={i18n.language === "en" ? AzFlag : EnFlag}
                    alt="flag"
                    className="flag_img"
                  />
                  {i18n.language === "en" ? "AZ" : "EN"}
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <ul>
            {isLogged ? (
              <li>{profile}</li>
            ) : (
              <li>
                <Link to="/login">{t("header:login")}</Link>
              </li>
            )}
            <li>
              <Link
                to="https://www.facebook.com/RoFruit"
                className="social_icon facebook_icon"
              >
                <BiLogoFacebook />
              </Link>
            </li>
            <li>
              <Link
                to="https://instagram.com/rofruit/"
                className="social_icon instagram_icon"
              >
                <BiLogoInstagram />
              </Link>
            </li>
            <li>
              <Link
                to="https://api.whatsapp.com/send/?phone=994776205000"
                className="social_icon whatsapp_icon"
              >
                <BiLogoWhatsapp />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottombar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="search">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={t("header:searchPlaceholder")}
                value={searchText}
                onChange={handleSearchInputChange}
              />
              <button type="submit">
                <BiSearch />
              </button>
            </form>
            <div className="header_contact">
              <div className="contact_support">
                <div className="support_img">
                  <img src={Support} alt="support" />
                </div>
              </div>
              <div className="contact_details">
                <p>{t("header:supportPhone")}</p>
                <Link to='tel:0776205000"'>(077) 620 50 00</Link>
              </div>
            </div>
          </div>
          <div className="header_aside">
            <ul>
              <li className="mobile_icon" onClick={openSearchDrawer}>
                <BiSearch className="icon" />
              </li>
              <li
                className={isLogged ? "active" : ""}
                onClick={handleIconClick}
              >
                <BiUser className="icon" />
              </li>
              <li>
                <Link to="/favourites">
                  <BiHeart className="icon" />
                </Link>
                <span>{favourites.length}</span>
              </li>
              <li onClick={openBasketDrawer}>
                <BiCart className="icon" />
                <span>{cart.length}</span>
              </li>
              <li className="mobile_icon" onClick={openNavDrawer}>
                <BiMenu className="icon" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <div className="container">
          <ul>
            <li className="menu_list">
              <Menu>
                <MenuButton>
                  <span>
                    <BiMenu className="icon_menu" />
                    {t("header:menuCategories")}
                  </span>
                  <BiChevronDown className="icon" />
                </MenuButton>
                <MenuList>
                  <Link to="/products/all">
                    <MenuItem minH="48px">
                      <div className="img">
                        <img src={AllProducts} alt={t("header:allProducts")} />
                      </div>
                      <span>{t("header:allProducts")}</span>
                    </MenuItem>
                  </Link>
                  <Link to="/products/fruits">
                    <MenuItem minH="40px">
                      <div className="img">
                        <img src={Fruits} alt={t("header:fruits")} />
                      </div>
                      <span>{t("header:fruits")}</span>
                    </MenuItem>
                  </Link>
                  <Link to="/products/vegetables">
                    <MenuItem minH="40px">
                      <div className="img">
                        <img src={Vegetables} alt={t("header:vegetables")} />
                      </div>
                      <span>{t("header:vegetables")}</span>
                    </MenuItem>
                  </Link>
                  <Link to="/products/berries">
                    <MenuItem minH="40px">
                      <div className="img">
                        <img src={Berries} alt={t("header:berries")} />
                      </div>
                      <span>{t("header:berries")}</span>
                    </MenuItem>
                  </Link>
                  <Link to="/products/dry-fruits">
                    <MenuItem minH="40px">
                      <div className="img">
                        <img src={DryFruits} alt={t("header:dryFruits")} />
                      </div>
                      <span>{t("header:dryFruits")}</span>
                    </MenuItem>
                  </Link>
                  <Link to="/products/exotic">
                    <MenuItem minH="40px">
                      <div className="img">
                        <img src={Exotic} alt={t("header:exotic")} />
                      </div>
                      <span>{t("header:exotic")}</span>
                    </MenuItem>
                  </Link>
                  <Link to="/products/nuts">
                    <MenuItem minH="40px">
                      <div className="img">
                        <img src={Nuts} alt={t("header:nuts")} />
                      </div>
                      <span>{t("header:nuts")}</span>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </li>
            <li>
              <Link to="/about">{t("header:aboutUs")}</Link>
            </li>
            <li>
              <Link to="/products/all">{t("header:products")}</Link>
            </li>
            <li>
              <Link to="/questions">{t("header:questions")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("header:contact")}</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Breadcrumb />
      <div className="mobile_nav">
        <ul>
          <li onClick={openNavDrawer}>
            <BiMenu className="icon" />
          </li>
          <li>
            <Link to="/">
              <BiHomeAlt2 className="icon" />
            </Link>
          </li>
          <li>
            <Link to="/login">
              <BiUser className="icon" />
            </Link>
          </li>
          <li>
            <Link to="/favourites">
              <BiHeart className="icon" />
            </Link>
            <span>{favourites.length}</span>
          </li>
          <li onClick={openBasketDrawer}>
            <BiCart className="icon" />
            <span>{cart.length}</span>
          </li>
        </ul>
      </div>
      <DrawerBasket />
      <DrawerSearch />
      <DrawerNav isLogged={isLogged} />
      <BackToTop />
    </header>
  );
};

export default Header;
