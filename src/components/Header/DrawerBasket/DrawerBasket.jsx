import { useState, useEffect, useContext } from "react";
import { BiCart } from "react-icons/bi";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  Spinner,
} from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import "./DrawerBasket.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../../CartContext";
import { useTranslation } from "react-i18next";

const DrawerBasket = () => {
  const location = useLocation();
  const { t } = useTranslation(["header"]);
  const navigate = useNavigate();
  const { cart, setCart, pricingType, closeBasketDrawer, isBasketDrawerOpen } =
    useContext(CartContext);
  const priceField =
    pricingType === "retail" ? "retail_price" : "wholesale_price";
  const total = cart
    .reduce((acc, item) => {
      const discount = item.discount || 0;
      const discountedPrice = item[priceField] * (1 - discount / 100);
      return acc + discountedPrice * item.quantity;
    }, 0)
    .toFixed(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItemIndex, setDeletingItemIndex] = useState(null);

  const deleteProductFromCart = (product) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      setIsDeleting(true);
      setDeletingItemIndex(itemIndex);
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setTimeout(() => {
        setIsDeleting(false);
        setCart(updatedCart);
        setDeletingItemIndex(null);
      }, 1000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!isDeleting) {
      setIsLoading(false);
    }
  }, [isDeleting]);

  const handleCloseBasketDrawer = () => {
    closeBasketDrawer();
    setTimeout(() => {
      navigate("/basket");
    }, 10);
  };
  return (
    <Drawer
      isOpen={isBasketDrawerOpen}
      placement="right"
      onClose={closeBasketDrawer}
    >
      <DrawerOverlay
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
        onClick={closeBasketDrawer}
      />
      <DrawerContent
        style={{ width: "300px", background: "#fff" }}
        className="drawer_basket"
      >
        <DrawerHeader>
          <p>{t("header:basket")}</p>
          <BiX className="close_icon" onClick={closeBasketDrawer} />
        </DrawerHeader>
        <DrawerBody>
          {cart.length === 0 ? (
            <div className="empty_basket">
              <BiCart className="cart_icon" />
              <h2>{t("header:emptyBasket")}</h2>
              <Link to="/products/all" onClick={closeBasketDrawer}>
                {t("header:allProducts")}
              </Link>
            </div>
          ) : (
            cart.map((product, index) => (
              <div className="product_basket" key={index}>
                {isDeleting && deletingItemIndex === index ? (
                  <div className="loading">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <>
                    <div className="product_img">
                      <img src={product.image_url} alt="image" />
                    </div>
                    <div className="product_content">
                      <div className="product_info">
                        <h2>{product.name}</h2>
                        <p>
                          {product.quantity} kq x{" "}
                          {product.hasOwnProperty("discount")
                            ? (
                                product[priceField] -
                                (product[priceField] * product.discount) / 100
                              ).toFixed(2)
                            : product[priceField]}{" "}
                          ₼
                        </p>
                      </div>
                      <BiX
                        className="close_icon"
                        onClick={() => deleteProductFromCart(product)}
                      />
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </DrawerBody>
        {cart.length === 0 ? null : (
          <DrawerFooter>
            <div className="total_basket">
              <p>{t("header:total")}</p>
              <span>{total} ₼</span>
            </div>
            <div className="complete_basket">
              <button onClick={handleCloseBasketDrawer}>
                {t("header:completeBasket")}
              </button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerBasket;
