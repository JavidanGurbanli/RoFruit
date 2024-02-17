import { useContext } from "react";
import { CartContext } from "../../CartContext";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import "./Favourites.scss";
import { BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Favourites = () => {
  const { t } = useTranslation(["favourites", "header"]);
  const { favourites } = useContext(CartContext);

  return (
    <section className="favourites">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.favourites")}</title>
        </Helmet>
        {favourites.length === 0 ? (
          <div className="empty_favourites">
            <BiHeart className="icon" />
            <h2>{t("favourites:title")}</h2>
            <p>{t("favourites:description1")}</p>
            <p>{t("favourites:description2")}</p>
            <Link to="/products/all">{t("favourites:viewProducts")}</Link>
          </div>
        ) : (
          <ul className="productList">
            {favourites.map((product) => (
              <SingleProduct
                key={product.id}
                product={product}
                inFavoritesPage={true}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Favourites;
