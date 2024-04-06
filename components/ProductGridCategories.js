import styled from "styled-components";
import ProductBoxCategories from "@/components/ProductBoxCategories";
import { Link } from "react-router-dom";
import Pointer from "./icons/Pointer";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 5rem;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ProductWrapper = styled.div``;

const WhiteBox = styled.a`
  position: relative;
  background-color: #dfdfdf;
  border-color: #dfdfdf;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  text-decoration: none;
  color: #000;
`;


export default function ProductsGridCategories({ products, categoryId }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product, index) =>
          index === 3 ? (
            <ProductWrapper>
              <WhiteBox href={`/categories/${categoryId}`}>
                Zobacz więcej
                <Pointer/>
                 
                
              </WhiteBox>
            </ProductWrapper>
          ) : (
            <ProductBoxCategories
              key={product._id}
              index={index}
              {...product}
            />
          )
        )}
    </StyledProductsGrid>
  );
}
