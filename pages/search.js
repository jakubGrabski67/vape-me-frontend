import { motion } from "framer-motion";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import { useState } from "react";
import { Category } from "@/models/Category";

const StyledInput = styled(Input)`
  margin-bottom: 2.5rem;
  height: 2rem;
`;

const StyledBg = styled.div`
  min-height: 53.5rem;
  margin-top: 81px;
  @media screen and (min-width: 768px) {
    margin-top: 0px;
  }
`;

const StyledProductsGrid = styled(ProductsGrid)`
  opacity: 0;
`;

export default function SearchPage({ products, categories }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Funkcja do przetwarzania frazy wyszukiwania przed filtrowaniem
  const processedQuery = searchQuery.trim().toLowerCase();

  // Podział frazy wyszukiwania na poszczególne słowa
  const searchWords = processedQuery.split(" ");

  // Filtrowanie produktów na podstawie frazy wyszukiwania
  const filteredProducts = products.filter((product) => {
    const productName = product.title ? product.title.toLowerCase() : "";

    // Debugowanie
    console.log("Nazwa produktu:", productName);
    console.log("Przetworzona fraza wyszukiwania:", processedQuery);

    // Sprawdzenie, czy każde słowo z frazy wyszukiwania występuje w nazwie produktu
    return searchWords.every((word) => productName.includes(word));
  });

  // Debugowanie
  console.log("Znalezione produkty:", filteredProducts);


  return (
    <>
      <Header />
      <Center>
        <StyledBg>
          <Title>Wpisz jaki produkt Ci chodzi po głowie... 😊</Title>
          <StyledInput
            type="text"
            placeholder="Wyszukaj produkt, który cię interesuje..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              {filteredProducts.length > 0 ? (
                <StyledProductsGrid products={filteredProducts} />
              ) : (
                <p>
                  Nie znaleziono żadnych produktów dla frazy &quot;
                  {searchQuery}&quot;. Spróbuj wpisać typ lub markę produktu, którego szukasz.
                </p>
              )}
            </motion.div>
          )}
        </StyledBg>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
