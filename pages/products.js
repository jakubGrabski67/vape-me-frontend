import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledTitle = styled(Title)`
  padding-top: 65px;
  @media screen and (min-width: 768px) {
    padding-top: 0px;
  }
`;

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <StyledTitle>Nasze produkty</StyledTitle>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <ProductsGrid products={products} />
        </motion.div>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
