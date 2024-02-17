import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products/Products";
import { CartProvider } from "./CartContext";
import Favourites from "./pages/Favourites/Favourites";
import Search from "./pages/Search/Search";
import NotFound from "./pages/NotFound/NotFound";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/Footer/Footer";
import Basket from "./pages/Basket/Basket";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Checkout from "./pages/Checkout/Checkout";
import Terms from "./pages/Terms/Terms";
import './i18n';
import { Suspense, useEffect, useState } from "react";
import Loading from "./components/Loading/Loading";
import Faq from "./pages/FAQ/Faq";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import { Helmet } from 'react-helmet';

function App() {
const [isLoading, setIsLoading] = useState(true);
const handleLoading = () => {
setIsLoading(false);
}
useEffect(()=>{
window.addEventListener("load",handleLoading);
return () => window.removeEventListener("load",handleLoading);
},[])

  return (
  <Suspense fallback={<Loading/>}>
    <ChakraProvider>
      <CartProvider> 
      <Helmet>
          <title>RoFruit</title>
        </Helmet>
        {isLoading ? (
          <div className="loading">
            <Loading/>
          </div>
        ):(
          <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/products/:category/:id" element={<ProductDetails />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/terms" element={<Terms/>}/>
            <Route path="/questions" element={<Faq/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
        )}
      </CartProvider>
    </ChakraProvider>
  </Suspense>
  );
}

export default App;
