import { useState, useEffect, useContext } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { BiX, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import "./DrawerNav.scss";
import AllFruits from "../../../assets/images/butun_mehsullar.jpg";
import Fruits from "../../../assets/images/meyveler.png";
import Vegetables from "../../../assets/images/terevezler.png";
import Berries from "../../../assets/images/gilemeyve.webp";
import DryFruits from "../../../assets/images/qurumeyveler.png";
import Exotic from "../../../assets/images/ekzotik_meyveler.jpg";
import Nuts from "../../../assets/images/cerezler.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../../CartContext";

const DrawerNav = ({ isLogged }) => {
  const navigate = useNavigate();
  const { profile, closeNavDrawer, isNavDrawerOpen, logout } =
    useContext(CartContext);
  const { t } = useTranslation("header");
  const [showNestedContent, setShowNestedContent] = useState(false);
  const toggleNestedContent = () => {
    setShowNestedContent(!showNestedContent);
  };
  useEffect(() => {
    setShowNestedContent(false);
  }, [isNavDrawerOpen]);

  const handleCloseNavDrawer = (path) => {
    closeNavDrawer();
    setTimeout(() => {
      navigate(path);
    }, 10);
  };

  const profileHandle = (path) => {
    closeNavDrawer();
    if (isLogged) {
      logout();
    } else {
      setTimeout(() => {
        navigate(path);
      }, 10);
    }
  };
  return (
    <Drawer isOpen={isNavDrawerOpen} placement="right" onClose={closeNavDrawer}>
      <DrawerOverlay
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={closeNavDrawer}
      />
      <DrawerContent
        style={{ width: "300px", background: "#f5f5f5" }}
        className="drawer_nav"
      >
        <DrawerHeader>
          {showNestedContent && (
            <BiChevronLeft
              className="left_icon"
              onClick={toggleNestedContent}
            />
          )}
          <BiX className="close_icon" onClick={closeNavDrawer} />
        </DrawerHeader>
        <DrawerBody>
          {showNestedContent ? (
            <ul>
              <li>
                <Link to="/products/all" onClick={closeNavDrawer}>
                  <div className="img">
                    <img src={AllFruits} alt={t("allProducts")} />
                  </div>
                  <span>{t("header:allProducts")}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/fruits" onClick={closeNavDrawer}>
                  <div className="img">
                    <img src={Fruits} alt={t("header:fruits")} />
                  </div>
                  <span>{t("header:fruits")}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/vegetables" onClick={closeNavDrawer}>
                  <div className="img">
                    <img src={Vegetables} alt={t("header:vegetables")} />
                  </div>
                  <span>{t("header:vegetables")}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/berries" onClick={closeNavDrawer}>
                  <div className="img">
                    <img src={Berries} alt={t("header:berries")} />
                  </div>
                  <span>{t("header:berries")}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/dry-fruits" onClick={closeNavDrawer}>
                  <div className="img">
                    <img src={DryFruits} alt={t("header:dryFruits")} />
                  </div>
                  <span>{t("header:dryFruits")}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/exotic" onClick={closeNavDrawer}>
                  <div className="img">
                    <img src={Exotic} alt={t("header:exotic")} />
                  </div>
                  <span>{t("header:exotic")}</span>
                </Link>
              </li>
              <li>
                <Link to="/products/nuts" onClick={closeNavDrawer}>
                  <div className="img">
                    <img src={Nuts} alt={t("header:nuts")} />
                  </div>
                  <span>{t("header:nuts")}</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li onClick={toggleNestedContent}>
                {t("header:menuCategories")}{" "}
                <BiChevronRight className="right_icon" />{" "}
              </li>
              <li onClick={() => handleCloseNavDrawer("/about")}>
                {t("header:aboutUs")}
              </li>
              <li onClick={() => handleCloseNavDrawer("/products/all")}>
                {t("header:products")}
              </li>
              <li onClick={() => handleCloseNavDrawer("/questions")}>
                {t("header:questions")}
              </li>
              <li onClick={() => handleCloseNavDrawer("/contact")}>
                {t("header:contact")}
              </li>
              <li onClick={() => handleCloseNavDrawer("/basket")}>
                {t("header:basket")}
              </li>
              <li onClick={() => handleCloseNavDrawer("/favourites")}>
                {t("header:wishlist")}
              </li>
              <li onClick={() => profileHandle("/login")}>
                {isLogged ? profile : <>{t("header:login")}</>}
              </li>
            </ul>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerNav;
