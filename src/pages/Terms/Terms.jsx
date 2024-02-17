import { useTranslation } from "react-i18next";
import "./Terms.scss";
import { Helmet } from "react-helmet";

const Terms = () => {
  const { t } = useTranslation(["terms", "header"]);

  return (
    <section className="terms">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.terms")}</title>
        </Helmet>
        <h1>{t("terms:title")}</h1>
        <div className="blog-inner__desc">
          <div className="blog-inner__text">
            <p>
              <strong>{t("terms:agreement")}</strong>
            </p>
            <p>
              <strong>{t("terms:principles")}</strong>
            </p>
            <p>{t("terms:buyerAgreement")}</p>
            <p>{t("terms:buyer")}</p>
            <p>{t("terms:seller")}</p>
            <p>{t("terms:portal")}</p>
            <p>{t("terms:goodsServices")}</p>
            <p>{t("terms:order")}</p>
            <p>{t("terms:return")}</p>
            <p>{t("terms:exchange")}</p>
            <p>
              <strong>{t("terms:specialTerms")}</strong>
            </p>
            <p>{t("terms:specialTerm1")}</p>
            <p>{t("terms:specialTerm2")}</p>
            <p>{t("terms:specialTerm3")}</p>
            <p>{t("terms:specialTerm4")}</p>
            <p>{t("terms:specialTerm5")}</p>
            <p>{t("terms:specialTerm6")}</p>
            <p>{t("terms:specialTerm7")}</p>
            <p>{t("terms:specialTerm8")}</p>
            <p>{t("terms:specialTerm9")}</p>
            <p>{t("terms:specialTerm10")}</p>
            <p>{t("terms:specialTerm11")}</p>
            <p>{t("terms:specialTerm12")}</p>
            <p>{t("terms:specialTerm13")}</p>
            <p>{t("terms:specialTerm14")}</p>
            <p>
              <strong>{t("terms:deliveryRules")}</strong>
            </p>
            <p>{t("terms:deliveryRule1")}</p>
            <p>{t("terms:deliveryRule2")}</p>
            <p>{t("terms:deliveryRule3")}</p>
            <p>{t("terms:deliveryRule4")}</p>
            <p>{t("terms:deliveryRule5")}</p>
            <p>
              <em>{t("terms:deliveryRule6")}</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
