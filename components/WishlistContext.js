import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext({});

export function WishlistContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (ls && ls.getItem("wishlist")) {
      setWishlistProducts(JSON.parse(ls.getItem("wishlist")));
    }
  }, []);

  useEffect(() => {
    if (wishlistProducts?.length > 0) {
      ls?.setItem("wishlist", JSON.stringify(wishlistProducts));
    }
  }, [wishlistProducts]);

  function addProductToWishlist(productId) {
    // Sprawdź, czy produkt jest już na liście życzeń
    const isProductInWishlist = wishlistProducts.includes(productId);

    if (isProductInWishlist) {
      // Jeśli produkt jest już na liście życzeń, usuń go
      removeProductFromWishlist(productId);
    } else {
      // Jeśli produkt nie jest na liście życzeń, dodaj go
      setWishlistProducts((prev) => [...prev, productId]);
    }
  }

  function removeProductFromWishlist(productId) {
    setWishlistProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearWishlist() {
    setWishlistProducts([]);
    ls?.removeItem("wishlist");
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistProducts,
        addProductToWishlist,
        removeProductFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
