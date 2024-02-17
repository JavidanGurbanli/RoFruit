import {
  BiArrowBack,
  BiLogoWhatsapp,
  BiSolidError,
  BiX,
  BiCheckCircle,
  BiCart,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Basket.scss";
import { useContext, useState } from "react";
import { CartContext } from "../../CartContext";
import { Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Basket = () => {
  const { t } = useTranslation(["basket", "header"]);
  const { pricingType, cart, setCart } = useContext(CartContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItemIndex, setDeletingItemIndex] = useState(null);
  const priceField =
    pricingType === "retail" ? "retail_price" : "wholesale_price";
  const total = cart
    .reduce((acc, item) => {
      const discount = item.discount || 0;
      const discountedPrice = item[priceField] * (1 - discount / 100);
      return acc + discountedPrice * item.quantity;
    }, 0)
    .toFixed(2);
  const warningText = t(`basket:warningText.${pricingType}.message`);
  const warningPrice = t(`basket:warningText.${pricingType}.price`);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = (data) => {
    console.log("Phone number submitted:", data.number);
    setIsSubmitted(true);
  };

  const handleIncreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

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

  return (
    <section className="basket">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.basket")}</title>
        </Helmet>
        <div className="basket_left">
          {cart.length !== 0 && total <= Number(warningPrice) && (
            <div className="warning">
              <BiSolidError className="warning_icon" />
              <p>{warningText}</p>
            </div>
          )}
          <div className="basket_items">
            {cart.length === 0 ? (
              <div className="empty_basket">
                <BiCart className="cart_icon" />
                <h2>{t("basket:emptyBasket.message")}</h2>
                <Link to="/products/all">
                  {t("basket:emptyBasket.allProductsLinkText")}
                </Link>
              </div>
            ) : (
              cart.map((product, index) => (
                <div className="basket_item" key={index}>
                  {isDeleting && deletingItemIndex === index ? (
                    <div className="loading">
                      <Spinner size="xl" />
                    </div>
                  ) : (
                    <>
                      <div className="item_img">
                        <img src={product.image_url} alt={product.name} />
                      </div>
                      <div className="item_content">
                        <div className="item_content-left">
                          <h2>{product.name}</h2>
                          <div className="item_content_counter">
                            <button
                              onClick={() => handleDecreaseQuantity(product.id)}
                            >
                              -
                            </button>
                            <p>{product.quantity}</p>
                            <button
                              onClick={() => handleIncreaseQuantity(product.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="item_content-right">
                          <p>
                            {product.hasOwnProperty("discount")
                              ? (
                                  product[priceField] -
                                  (product[priceField] * product.discount) / 100
                                ).toFixed(2)
                              : product[priceField]}{" "}
                            ₼
                          </p>
                          <BiX
                            className="close_icon"
                            onClick={() => deleteProductFromCart(product)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="basket_right">
          <div className="basket_right-top">
            <div className="report">
              <h2>{t("basket:report.title")}</h2>
              <hr />
              <div className="sum">
                <p>{t("basket:report.totalPrice")}</p>
                <span>{total} ₼</span>
              </div>
            </div>
            <p>{t("basket:report.deliveryNote")}</p>
            <Link to="/checkout" className="complete_basket">
              {t("basket:completeBasket")}
            </Link>
            <Link
              to="https://api.whatsapp.com/send/?phone=994776205000"
              className="complete_whatsapp"
            >
              <BiLogoWhatsapp className="whatsapp_icon" />
              {t("basket:completeWhatsapp")}
            </Link>
            <Link to="/products/all" className="continue">
              <BiArrowBack className="go_back" />
              {t("basket:continueShopping")}
            </Link>
          </div>
          <div className="basket_right-bottom">
            <h3>{t("basket:contactUs.title")}</h3>
            <p>{t("basket:contactUs.description")}</p>
            {isSubmitted ? (
              <div className="success_form">
                <BiCheckCircle className="check_icon" />
                <p>{t("contactSuccess")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("number", {
                    required: t("basket:phoneNumber.required"),
                    pattern: {
                      value: /^\+994\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
                      message: t("basket:phoneNumber.message"),
                    },
                  })}
                  type="text"
                  name="number"
                  placeholder={t("basket:phoneNumber.placeholder")}
                />
                {errors.number && <p>{errors.number?.message}</p>}
                <button type="submit">
                  {t("basket:phoneNumber.buttonText")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Basket;
