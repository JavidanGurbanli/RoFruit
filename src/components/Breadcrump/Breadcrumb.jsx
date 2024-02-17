import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.scss";
import { BiHome } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import productData from "../../data";

const Breadcrumb = () => {
  const { t } = useTranslation(["header"]);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    if (id) {
      const foundProduct = productData.find(
        (product) => product.id === parseInt(id)
      );
      if (foundProduct) {
        setProductName(foundProduct.name);
      } else {
        setProductName(null);
      }
    }
  }, [id]);
  return (
    <div className="breadcrumb">
      <div className="container">
        <BiHome className="home_icon" />
        <p>
          <Link to="/">{t("header:breadcrumbs.home")}</Link>
        </p>
        <ul>
          {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;
            let pathToLink;
            if (name === "products") {
              pathToLink = "products/all";
            } else {
              pathToLink = `/${pathnames.slice(0, index + 1).join("/")}`;
            }
            return (
              <li key={name}>
                <span> / </span>
                {isLast ? (
                  pathSegments.length === 4 ? (
                    <span className="lastName">{productName}</span>
                  ) : (
                    <span className="lastName">
                      {t(`header:breadcrumbs.${name}`)}
                    </span>
                  )
                ) : (
                  <Link to={pathToLink}>{t(`header:breadcrumbs.${name}`)}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
