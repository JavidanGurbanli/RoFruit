import React, { useContext, useEffect, useState } from "react";
import "./Products.scss";
import { useParams } from "react-router";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import { CartContext } from "../../CartContext";
import {
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import productData from "../../data";

const Products = () => {
  const { t } = useTranslation(["products", "header"]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const { pricingType } = useContext(CartContext);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (category === "all") {
      setProducts(productData);
    } else {
      const filteredProducts = productData.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
      console.log(products);
    }
    setIsLoading(false);
  }, [category]);

  useEffect(() => {
    sortProducts(sortCriteria);
  }, [pricingType, sortCriteria]);

  useEffect(() => {
    setTotalPages(calculateTotalPages());
    setCurrentPage(1);
  }, [products, showDiscounted]);

  const sortProducts = (criteria) => {
    let sortedProducts = [...products];
    switch (criteria) {
      case "newest":
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "highestValue":
        sortedProducts.sort((a, b) => {
          const priceField =
            pricingType === "retail" ? "retail_price" : "wholesale_price";
          const aPrice =
            a.discount > 0
              ? a[priceField] - (a[priceField] * a.discount) / 100
              : a[priceField];
          const bPrice =
            b.discount > 0
              ? b[priceField] - (b[priceField] * b.discount) / 100
              : b[priceField];
          return bPrice - aPrice;
        });
        break;
      case "lowestValue":
        sortedProducts.sort((a, b) => {
          const priceField =
            pricingType === "retail" ? "retail_price" : "wholesale_price";
          const aPrice =
            a.discount > 0
              ? a[priceField] - (a[priceField] * a.discount) / 100
              : a[priceField];
          const bPrice =
            b.discount > 0
              ? b[priceField] - (b[priceField] * b.discount) / 100
              : b[priceField];
          return aPrice - bPrice;
        });
        break;
      default:
        break;
    }
    setSortCriteria(criteria);
    setProducts(sortedProducts);
  };

  const handleShowDiscountedChange = () => {
    setShowDiscounted(!showDiscounted);
  };

  const calculateTotalPages = () => {
    const filteredProducts =
      products.length > 0 &&
      products.filter(
        (product) => !showDiscounted || (showDiscounted && product.discount > 0)
      );
    return Math.ceil(filteredProducts.length / productsPerPage);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    products.length > 0 &&
    products
      .filter(
        (product) => !showDiscounted || (showDiscounted && product.discount > 0)
      )
      .slice(indexOfFirstProduct, indexOfLastProduct);

  const paginationNumbers = [];
  for (let index = 1; index <= totalPages; index++) {
    paginationNumbers.push(index);
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="products">
      <div className="container">
        <Helmet>
          <title>
            RoFruit - {t("header:breadcrumbs.products")} -{" "}
            {t(`header:breadcrumbs:${category}`)}
          </title>
        </Helmet>
        <div className="products_top">
          <div className="products_top-left">
            <Checkbox
              colorScheme="green"
              size="md"
              isChecked={showDiscounted}
              onChange={handleShowDiscountedChange}
            >
              {t("products:showDiscounted")}
            </Checkbox>
          </div>
          <div className="products_top-right">
            <Menu>
              <MenuButton>
                <p>{t("products:sorting")}</p>
                <BiChevronDown className="icon" />
              </MenuButton>
              <MenuList minWidth="200px">
                <MenuItem minH="48px" onClick={() => sortProducts("newest")}>
                  <p className={sortCriteria === "newest" ? "active" : ""}>
                    {t("products:sortingOptions.newest")}
                  </p>
                </MenuItem>
                <MenuItem
                  minH="40px"
                  onClick={() => sortProducts("highestValue")}
                >
                  <p
                    className={sortCriteria === "highestValue" ? "active" : ""}
                  >
                    {t("products:sortingOptions.highestValue")}
                  </p>
                </MenuItem>
                <MenuItem
                  minH="40px"
                  onClick={() => sortProducts("lowestValue")}
                >
                  <p className={sortCriteria === "lowestValue" ? "active" : ""}>
                    {t("products:sortingOptions.lowestValue")}
                  </p>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="productList">
            {currentProducts.map((product) => (
              <SingleProduct
                key={product.id}
                product={product}
                icon="heart"
                category={category}
              />
            ))}
          </ul>
        )}
      </div>
      {products.length > productsPerPage && totalPages > 1 ? (
        <ul className="pagination">
          <BiChevronLeft className="arrow_icon" onClick={goToPreviousPage} />
          {paginationNumbers.map((number) => (
            <li
              key={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </li>
          ))}
          <BiChevronRight className="arrow_icon" onClick={goToNextPage} />
        </ul>
      ) : null}
    </section>
  );
};

export default Products;
