import {
  Checkbox,
  Select,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  useDisclosure,
} from "@chakra-ui/react";
import "./Checkout.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const getValidationSchema = (t) => {
  return yup.object().shape({
    email: yup
      .string()
      .required(t("checkout:inputErrors.email.required"))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t("chekout:inputErrors.email.matches")
      ),
    fullname: yup
      .string()
      .matches(
        /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/,
        t("checkout:inputErrors.fullname.matches")
      )
      .required(t("checkout:inputErrors.fullname.required")),
    phone: yup
      .string()
      .matches(
        /^\+994\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
        t("checkout:inputErrors.phone.matches")
      )
      .required(t("checkout:inputErrors.phone.required")),
    select: yup.string().required(t("checkout:inputErrors.select.required")),
    place: yup.string().required(t("checkout:inputErrors.place.required")),
    checkbox: yup.boolean().oneOf([true]),
  });
};

const Checkout = () => {
  const { t } = useTranslation(["checkout", "header"]);
  const validationSchema = getValidationSchema(t);
  const navigate = useNavigate();
  const { cart, pricingType, setCart } = useContext(CartContext);
  const priceField =
    pricingType === "retail" ? "retail_price" : "wholesale_price";
  const total = cart
    .reduce((acc, item) => {
      const discount = item.discount || 0;
      const discountedPrice = item[priceField] * (1 - discount / 100);
      return acc + discountedPrice * item.quantity;
    }, 0)
    .toFixed(2);
  const totalWithoutDiscount = cart
    .reduce((total, product) => {
      return total + product[priceField] * product.quantity;
    }, 0)
    .toFixed(2);
  const discount = (totalWithoutDiscount - total).toFixed(2);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSubmit = () => {
    onOpen();
    setTimeout(() => {
      onClose();
      navigate("/");
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
    }, 2000);
  };
  return (
    <section className="checkout">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.checkout")}</title>
        </Helmet>
        <div className="checkout_left">
          <h2>{t("checkout:title")}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input input_fullname">
              <label htmlFor="fullname">
                {t("checkout:inputLabels.fullname")}
                <span>*</span>
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                {...register("fullname")}
              />
              {errors.fullname && <p>{errors.fullname.message}</p>}
            </div>
            <div className="input input_phone">
              <label htmlFor="phone">
                {t("checkout:inputLabels.phone")}
                <span>*</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="+994 50 362 60 04"
                {...register("phone")}
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <div className="input input_email">
              <label htmlFor="email">
                {t("checkout:inputLabels.email")}
                <span>*</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="input input_city">
              <label htmlFor="city">
                {t("inputLabels.city")}
                <span>*</span>
              </label>
              <Select {...register("select")}>
                <option value={t("checkout:selectOptions.baku")}>
                  {t("checkout:selectOptions.baku")}
                </option>
                <option value={t("checkout:selectOptions.sumgait")}>
                  {t("checkout:selectOptions.sumgait")}
                </option>
                <option value={t("checkout:selectOptions.gence")}>
                  {t("checkout:selectOptions.gence")}
                </option>
                <option value={t("checkout:selectOptions.goychay")}>
                  {t("checkout:selectOptions.goychay")}
                </option>
                <option value={t("checkout:selectOptions.quba")}>
                  {t("checkout:selectOptions.quba")}
                </option>
                <option value={t("checkout:selectOptions.gabala")}>
                  {t("checkout:selectOptions.gabala")}
                </option>
                <option value={t("checkout:selectOptions.lenkaran")}>
                  {t("checkout:selectOptions.lenkaran")}
                </option>
                <option value={t("checkout:selectOptions.masalli")}>
                  {t("checkout:selectOptions.masalli")}
                </option>
                <option value={t("checkout:selectOptions.shamkir")}>
                  {t("checkout:selectOptions.shamkir")}
                </option>
                <option value={t("checkout:selectOptions.xachmaz")}>
                  {t("checkout:selectOptions.xachmaz")}
                </option>
                <option value={t("checkout:selectOptions.sabirabad")}>
                  {t("checkout:selectOptions.sabirabad")}
                </option>
                <option value={t("checkout:selectOptions.imishli")}>
                  {t("checkout:selectOptions.imishli")}
                </option>
                <option value={t("checkout:selectOptions.agcabadi")}>
                  {t("checkout:selectOptions.agcabadi")}
                </option>
                <option value={t("checkout:selectOptions.calilabad")}>
                  {t("checkout:selectOptions.calilabad")}
                </option>
                <option value={t("checkout:selectOptions.yevlakh")}>
                  {t("checkout:selectOptions.yevlakh")}
                </option>
                <option value={t("checkout:selectOptions.agdash")}>
                  {t("checkout:selectOptions.agdash")}
                </option>
                <option value={t("checkout:selectOptions.kurdemir")}>
                  {t("checkout:selectOptions.kurdemir")}
                </option>
                <option value={t("checkout:selectOptions.sheki")}>
                  {t("checkout:selectOptions.sheki")}
                </option>
              </Select>
              {errors.select && <p>{errors.select.message}</p>}
            </div>
            <div className="input input_place">
              <label htmlFor="place">
                {t("checkout:inputLabels.place")}
                <span>*</span>
              </label>
              <input
                type="text"
                name="place"
                id="place"
                {...register("place")}
              />
              {errors.place && <p>{errors.place.message}</p>}
            </div>
            <div className="input input_info">
              <label htmlFor="info">
                {t("checkout:inputLabels.info.text")}
              </label>
              <textarea
                rows="8"
                cols="30"
                id="info"
                name="info"
                placeholder={t("checkout:inputLabels.info.placeholder")}
                {...register("info")}
              ></textarea>
            </div>
            <hr />
            <div className="complete_checkout">
              <Checkbox
                colorScheme="green"
                {...register("checkbox")}
                id="checkbox"
                name="checkbox"
              >
                <span onClick={() => navigate("/terms")}>
                  {t("checkout:termsAndConditions")}
                </span>
                {t("checkout:termsAndConditionsText")}
              </Checkbox>
              <div className="buttons">
                <button onClick={() => navigate("/")}>
                  {t("checkout:buttons.cancel")}
                </button>
                <button type="submit">{t("checkout:buttons.submit")}</button>
              </div>
            </div>
          </form>
        </div>
        <div className="checkout_right">
          <div className="product_details-header">
            <h2>{t("checkout:productDetailsHeader.title")}</h2>
            <p>
              {cart.length} {t("checkout:productDetailsHeader.quantity")}
            </p>
          </div>
          <hr />
          <ul>
            {cart.length > 0 &&
              cart.map((product, index) => (
                <li key={index}>
                  <div className="product_img">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <div className="product_info">
                    <p>{product.name}</p>
                    <span>
                      {product.quantity}{" "}
                      {t("checkout:productDetailsHeader.quantity")}
                    </span>
                  </div>
                  <div className="product_price">
                    <p className={product.discount && "discount"}>
                      {product[priceField]} ₼
                    </p>
                    {product.discount && (
                      <span className="discounted-price">
                        {(
                          product[priceField] -
                          (product[priceField] * product.discount) / 100
                        ).toFixed(2)}{" "}
                        ₼
                      </span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
          <div className="products_total">
            <p>
              {" "}
              {t("checkout:totalAmount")}:<span>{totalWithoutDiscount} ₼</span>
            </p>
            <p>
              {" "}
              {t("checkout:discount")}:<span>{discount} ₼</span>
            </p>
          </div>
          <hr />
          <h3>
            {" "}
            {t("checkout:finalAmount")}:<span>{total} ₼</span>
          </h3>
        </div>
      </div>
      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent
          bg="#62a403"
          color="#fff"
          style={{
            height: "150px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("checkout:successMessage")}
          </AlertDialogHeader>
          <AlertDialogBody>{t("checkout:thankYouMessage")}</AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Checkout;
