import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./NotFound.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const { t } = useTranslation(["notFound", "header"]);
  return (
    <section className="not_found">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.404")}</title>
        </Helmet>
        <BiErrorCircle className="error_icon" />
        <h2>{t("notFound:title")}</h2>
        <p>{t("notFound:description")}</p>
        <Link to="/">{t("notFound:returnHome")}</Link>
      </div>
    </section>
  );
};

export default NotFound;
