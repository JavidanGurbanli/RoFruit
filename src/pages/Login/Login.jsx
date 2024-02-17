import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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
  });
};

const Login = () => {
  const { t } = useTranslation(["login-register", "header"]);
  const validationSchema = getValidationSchema(t);
  const [rememberMe, setRememberMe] = useState(false);
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

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const displayName = user.user.displayName;
      setError(false);
      login(displayName);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
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
    <section className="login">
      <Helmet>
        <title>RoFruit - {t("header:breadcrumbs.login")}</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{t("login-register:login")}</h2>
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
        <div className="submit_box">
          <Button type="submit" isLoading={loading}>
            {t("login-register:login")}
          </Button>
          <Button onClick={() => navigate("/register")}>{t("title")}</Button>
        </div>
        {error && <h1> {t("login-register:errorMessageLogin")}</h1>}
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

export default Login;
