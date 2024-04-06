import { WishlistContextProvider } from "@/components/WishlistContext";
import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    scrollbar-width: thin; /* Dodajemy stylowanie paska przewijania */
  }

  /* Dodajemy niestandardowy styl dla paska przewijania */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <GlobalStyles /> {/* Dodajemy stylowanie globalne tutaj */}
        <WishlistContextProvider>
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </WishlistContextProvider>
      </SessionProvider>
    </>
  );
}
