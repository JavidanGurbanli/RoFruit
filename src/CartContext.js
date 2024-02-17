import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [pricingType, setPricingType] = useState("retail");

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const [profile, setProfile] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const login = (fullname) => {
    setIsLogged(true);
    setProfile(fullname);
  };
  const logout = () => {
    setIsLogged(false);
  };

  const [isBasketDrawerOpen, setIsBasketDrawerOpen] = useState(false);
  const openBasketDrawer = () => {
    setIsBasketDrawerOpen(true);
  };
  const closeBasketDrawer = () => {
    setIsBasketDrawerOpen(false);
  };

  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const openSearchDrawer = () => {
    setIsSearchDrawerOpen(true);
  };
  const closeSearchDrawer = () => {
    setIsSearchDrawerOpen(false);
  };

  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  const openNavDrawer = () => {
    setIsNavDrawerOpen(true);
  };
  const closeNavDrawer = () => {
    setIsNavDrawerOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        login,
        logout,
        isLogged,
        cart,
        setCart,
        profile,
        setProfile,
        favourites,
        setFavourites,
        pricingType,
        setPricingType,
        isBasketDrawerOpen,
        openBasketDrawer,
        closeBasketDrawer,
        isSearchDrawerOpen,
        openSearchDrawer,
        closeSearchDrawer,
        isNavDrawerOpen,
        openNavDrawer,
        closeNavDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
