import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { Button, Checkbox } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import { CartContext } from "../../CartContext";
import { useTranslation } from "react-i18next";
import {
  BiLogoFacebookCircle,
  BiLogoGoogle,
  BiLogoTwitter,
} from "react-icons/bi";
import { Helmet } from "react-helmet";

const getValidationSchema = (t) => {
  return yup.object().shape({
    name: yup
      .string()
      .required(t("login-register:inputErrors.name.required"))
      .min(2, t("login-register:inputErrors.name.min")),
    surname: yup
      .string()
      .required(t("login-register:inputErrors.surname.required"))
      .min(2, t("login-register:inputErrors.surname.min")),
    email: yup
      .string()
      .required(t("login-register:inputErrors.email.required"))
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t("login-register:inputErrors.email.matches")
      ),
    password: yup
      .string()
      .required(t("login-register:inputErrors.password.required"))
      .min(6, t("login-register:inputErrors.password.min"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        t("login-register:inputErrors.password.matches")
      ),
    repeat_password: yup
      .string()
      .required(t("login-register:inputErrors.repeatPassword.required"))
      .oneOf(
        [yup.ref("password"), null],
        t("login-register:inputErrors.repeatPassword.oneOf")
      ),
    accept_terms: yup
      .boolean()
      .oneOf([true], t("login-register:inputErrors.acceptTerms.oneOf")),
  });
};

const Register = () => {
  const { t } = useTranslation(["login-register", "header"]);
  const validationSchema = getValidationSchema(t);
  const { login } = useContext(CartContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: `${data.name} ${data.surname}`,
      });
      setError(false);
      login(`${data.name} ${data.surname}`);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setError(true);
      } else {
        setError(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      login(user.displayName);
      setError(false);
      navigate("/");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(`${provider.providerId} Registration Error:`, error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register">
      <Helmet>
        <title>RoFruit - {t("header:breadcrumbs.register")}</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t("login-register:title")}</h2>
        <div className="input_box">
          <label htmlFor="name">
            {t("login-register:nameLabel")}
            <span>*</span>
          </label>
          <input
            type="text"
            name="name"
            {...register("name")}
            placeholder={t("login-register:nameLabel")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="input_box">
          <label htmlFor="surname">
            {t("login-register:surnameLabel")}
            <span>*</span>
          </label>
          <input
            type="text"
            name="surname"
            {...register("surname")}
            placeholder={t("login-register:surnameLabel")}
          />
          {errors.surname && <p>{errors.surname.message}</p>}
        </div>
        <div className="input_box">
          <label htmlFor="email">
            {t("login-register:emailLabel")}
            <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            {...register("email")}
            placeholder={t("login-register:emailLabel")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="input_box">
          <label htmlFor="password">
            {t("login-register:passwordLabel")}
            <span>*</span>
          </label>
          <input
            type="password"
            name="password"
            {...register("password")}
            placeholder="******"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="input_box">
          <label htmlFor="repeat_password">
            {t("login-register:repeatPasswordLabel")}
            <span>*</span>
          </label>
          <input
            type="password"
            name="repeat_password"
            {...register("repeat_password")}
            placeholder="******"
          />
          {errors.repeat_password && <p>{errors.repeat_password.message}</p>}
        </div>
        <div className="accept_box">
          <label>
            <Checkbox
              name="accept_terms"
              {...register("accept_terms")}
              colorScheme="green"
            />
            {t("login-register:acceptTermsLabel")}
          </label>
          {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
        </div>
        <div className="submit_box">
          <Button type="submit" isLoading={loading}>
            {t("login-register:title")}
          </Button>
          <Button onClick={() => navigate("/login")}>
            {t("login-register:login")}
          </Button>
        </div>
        {error && <h1>{t("login-register:errorMessage")}</h1>}
        <div className="social_auth">
          <p>{t("login-register:signInWithText")}</p>
          <div className="social_icons">
            <BiLogoFacebookCircle
              className="icon fb_icon"
              onClick={() => handleSocialSignIn(new FacebookAuthProvider())}
            />
            <BiLogoTwitter
              className="icon twitter_icon"
              onClick={() => handleSocialSignIn(new TwitterAuthProvider())}
            />
            <BiLogoGoogle
              className="icon google_icon"
              onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
