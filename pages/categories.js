import React from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductGridCategories from "@/components/ProductGridCategories";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import Link from "next/link";
import styled from "styled-components";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const StyledTitle = styled(Title)`
  padding-top: 65px;
  @media screen and (min-width: 768px) {
    padding-top: 0px;
  }
`;

export default function CategoriesPage({ products, categories }) {
  const groupedProducts = {};
  products.forEach((product) => {
    const category = categories.find((cat) => cat._id === product.category);
    const parentCategory =
      category && category.parent ? category.parent : product.category;
    if (!groupedProducts[parentCategory]) {
      groupedProducts[parentCategory] = [];
    }
    groupedProducts[parentCategory].push(product);
  });

  return (
    <>
      <Header />
      <Center>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {Object.keys(groupedProducts).map((categoryId) => {
            const category = categories.find((cat) => cat._id === categoryId);
            return (
              <div key={categoryId}>
                <StyledTitle>
                  {category ? category.name : categoryId}
                </StyledTitle>
                <ProductGridCategories
                  products={groupedProducts[categoryId].slice(0, 4)}
                  categoryId={categoryId}
                />
              </div>
            );
          })}
        </motion.div>
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
