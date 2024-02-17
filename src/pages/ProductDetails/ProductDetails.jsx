import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../CartContext";
import { Button, Radio, RadioGroup } from "@chakra-ui/react";
import {
  BiCart,
  BiChevronDown,
  BiChevronUp,
  BiHeart,
  BiLogoFacebook,
  BiLogoGmail,
  BiLogoTelegram,
  BiLogoTwitter,
  BiLogoWhatsapp,
} from "react-icons/bi";
import { useLocation, useParams } from "react-router-dom";
import "./ProductDetails.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import Loading from "../../components/Loading/Loading";
import { useTranslation } from "react-i18next";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Helmet } from "react-helmet";
import productData from "../../data";

const ProductDetails = () => {
  const location = useLocation();
  const { t } = useTranslation(["productDetails"]);
  const { id, category } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const {
    cart,
    setCart,
    favourites,
    setFavourites,
    pricingType,
    setPricingType,
    openBasketDrawer,
  } = useContext(CartContext);
  const priceField =
    pricingType === "retail" ? "retail_price" : "wholesale_price";
  useEffect(() => {
    if (id && category) {
      const foundProduct = productData.find(
        (product) => product.id === parseInt(id)
      );
      if (foundProduct) {
        setProduct(foundProduct);
        const filteredProducts = productData.filter(
          (product) => product.category === foundProduct.category
        );
        setProducts(filteredProducts);
      }
    }
  }, [category, id]);

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentlyFavourite, setIsCurrentlyFavourite] = useState(false);
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (product) {
      const isFavorite = favourites.some((item) => item.id === product.id);
      setIsCurrentlyFavourite(isFavorite);
    }
  }, [favourites, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleFavourite = () => {
    const updatedFavourites = isCurrentlyFavourite
      ? favourites.filter((item) => item.id !== product.id)
      : [...favourites, product];

    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);

    setIsCurrentlyFavourite(!isCurrentlyFavourite);
  };

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      const itemIndex = cart.findIndex((item) => item.id === product.id);
      const discountedPrice = product.discount
        ? (
            product[priceField] -
            (product[priceField] * product.discount) / 100
          ).toFixed(2)
        : product[priceField].toFixed(2);

      if (itemIndex !== -1) {
        setCart((prevCart) => {
          const updatedCart = prevCart.map((item, index) =>
            index === itemIndex
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  priceField: discountedPrice,
                }
              : item
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      } else {
        setCart((prevCart) => {
          const updatedCart = [
            ...prevCart,
            { ...product, quantity, priceField: discountedPrice },
          ];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      }

      setIsLoading(false);
      openBasketDrawer();
    }, 500);
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <section className="item_details">
      <div className="container">
        <Helmet>
          <title>RoFruit - {product.name}</title>
        </Helmet>
        <div className="single_product">
          <div className="product_img">
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className="product_content">
            <h1>{product.name}</h1>
            <p>
              {product.hasOwnProperty("discount")
                ? (
                    product[priceField] -
                    (product[priceField] * product.discount) / 100
                  ).toFixed(2)
                : product[priceField]}{" "}
              ₼ <span> / kq</span>
            </p>
            <RadioGroup
              value={pricingType}
              onChange={setPricingType}
              className="radio_group"
            >
              <Radio
                value="wholesale"
                size="md"
                name="radioInputs"
                colorScheme="green"
              >
                <h3>
                  {t("productDetails:pricingTypeOptions.wholesale.title")}
                </h3>
                <p>
                  {t("productDetails:pricingTypeOptions.wholesale.description")}
                </p>
              </Radio>
              <Radio
                value="retail"
                size="md"
                name="radioInputs"
                colorScheme="green"
              >
                <h3>{t("productDetails:pricingTypeOptions.retail.title")}</h3>
                <p>
                  {t("productDetails:pricingTypeOptions.retail.description")}
                </p>
              </Radio>
            </RadioGroup>
            <div className="add_basket">
              <div className="item_counter">
                <p>{quantity}</p>
                <div className="icons">
                  <BiChevronUp
                    className="chevron_icon"
                    onClick={handleIncreaseQuantity}
                  />
                  <BiChevronDown
                    className="chevron_icon"
                    onClick={handleDecreaseQuantity}
                  />
                </div>
              </div>
              <Button onClick={handleAddToCart} isLoading={isLoading}>
                {t("productDetails:productDetails.addToBasket")}{" "}
                <BiCart className="add_basket-icon" />
              </Button>
            </div>
            <div className="add_favourites" onClick={toggleFavourite}>
              <BiHeart
                className={`favourite_icon ${
                  isCurrentlyFavourite ? "hide_icon" : ""
                }`}
              />
              <p className={isCurrentlyFavourite ? "active" : ""}>
                {isCurrentlyFavourite
                  ? t("productDetails:productDetails.addedToFavourites")
                  : t("productDetails:productDetails.addToFavourites")}
              </p>
            </div>
            <div className="share">
              <p>{t("productDetails:productDetails.share")}</p>
              <FacebookShareButton url={product.name}>
                <BiLogoFacebook className="facebook_icon icon" />
              </FacebookShareButton>
              <WhatsappShareButton url={product.name}>
                <BiLogoWhatsapp className="whatsapp_icon icon" />
              </WhatsappShareButton>
              <TwitterShareButton url={product.name}>
                <BiLogoTwitter className="twitter_icon icon" />
              </TwitterShareButton>
              <TelegramShareButton url={product.name}>
                <BiLogoTelegram className="telegram_icon icon" />
              </TelegramShareButton>
              <EmailShareButton url={product.name}>
                <BiLogoGmail className="gmail_icon icon" />
              </EmailShareButton>
            </div>
          </div>
        </div>
        {products.length > 0 && (
          <div className="swiper_container">
            <h2>{t("productDetails:productDetails.similarProducts")}</h2>
            <Swiper
              speed={1100}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                992: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
              }}
              className="swiper2"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <SingleProduct
                    key={product.id}
                    product={product}
                    icon="heart"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
