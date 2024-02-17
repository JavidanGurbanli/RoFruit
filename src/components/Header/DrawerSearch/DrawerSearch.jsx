import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { BiX, BiSearch } from "react-icons/bi";
import "./DrawerSearch.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import productData from "../../../data";

const DrawerSearch = () => {
  const { t } = useTranslation(["header"]);
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { pricingType, closeSearchDrawer, isSearchDrawerOpen } =
    useContext(CartContext);
  const priceField =
    pricingType === "retail" ? "retail_price" : "wholesale_price";
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    setAllProducts(productData);
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, allProducts]);

  const handleCloseSearchDrawer = () => {
    closeSearchDrawer();
    setTimeout(() => {
      navigate(`/search?query=${searchText}`);
    }, 10);
  };
  return (
    <Drawer
      isOpen={isSearchDrawerOpen}
      placement="right"
      onClose={closeSearchDrawer}
      className="main_drawer"
    >
      <DrawerOverlay
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={closeSearchDrawer}
      />
      <DrawerContent
        style={{ width: "300px", background: "#f5f5f5" }}
        className="drawer_search"
      >
        <DrawerHeader>
          <p>{t("header:search")}</p>
          <BiX className="close_icon" onClick={closeSearchDrawer} />
        </DrawerHeader>
        <DrawerBody>
          <div className="search_input">
            <input
              type="text"
              name="search"
              placeholder={t("header:drawerSearchPlaceholder")}
              value={searchText}
              onChange={handleSearchInputChange}
            />
          </div>
          <BiSearch className="icon" />
          {filteredProducts.length === 0 && searchText.trim() !== "" ? (
            <p className="no-results_message">{t("header:noResult")}</p>
          ) : (
            <ul className="product_list">
              {filteredProducts.slice(0, 3).map((product) => (
                <li key={product.id}>
                  <div className="product_img">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <div className="product_details">
                    <h2>{product.name}</h2>
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
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="look_all">
            {filteredProducts.length > 3 && (
              <button onClick={handleCloseSearchDrawer}>
                {t("header:seeAll")}
              </button>
            )}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerSearch;
