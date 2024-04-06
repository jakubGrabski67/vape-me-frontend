import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import { motion } from "framer-motion";

const Bg = styled.div`
  background-color: #eee;
  color: #222;
  padding: 115px 0;
  @media screen and (min-width: 768px) {
    padding: 50px 0;
  }
`;
const AnimatedTitle = styled(motion.h1)`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;
const AnimatedDesc = styled(motion.p)`
  color: #333;
  font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const AnimatedButtonsWrapper = styled(motion.div)`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured() {
  const { addProduct } = useContext(CartContext);
  const [featuredProduct, setFeaturedProduct] = useState(null);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      const featuredProduct = response.data.find(
        (product) => product.isFeatured === true
      );
      setFeaturedProduct(featuredProduct);
    });
  }, []);

  function addFeaturedToCart() {
    addProduct(featuredProduct._id);
  }

  if (!featuredProduct) {
    return null;
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <AnimatedTitle
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {featuredProduct.title}
              </AnimatedTitle>
              <AnimatedDesc
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {featuredProduct.description}
              </AnimatedDesc>
              <AnimatedButtonsWrapper
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <ButtonLink
                  href={"/product/" + featuredProduct._id}
                  outline={1}
                  white={1}
                >
                  Zobacz
                </ButtonLink>
                <Button
                  outline={1}
                  white={1}
                  onClick={addFeaturedToCart}
                >
                  <CartIcon />
                  Dodaj do koszyka
                </Button>
              </AnimatedButtonsWrapper>
            </div>
          </Column>
          <Column>
            <motion.img
              src={featuredProduct.images[1]}
              alt={featuredProduct.images[0]}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
