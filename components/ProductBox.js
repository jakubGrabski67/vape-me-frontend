import styled from "styled-components";
import Button from "@/components/Button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import Loader from "./Loader";
import { WishlistContext } from "@/components/WishlistContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;

  color: inherit;
  text-decoration: none;
  margin: 0 0 5px 0;
  line-height: 1.2em;
  height: 2.4em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  position: relative;

  /* Dodanie pustego pseudo-elementu dla wypełnienia drugiej linii */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 1.2em;
    background-color: transparent;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  margin: 0 0 5px 0;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const FavouriteIcon = styled.svg`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px;
  width: 25px;
  height: 25px;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const { addProductToWishlist, wishlistProducts } = useContext(WishlistContext);
  const url = "/product/" + _id;

  const [hovered, setHovered] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Sprawdź, czy produkt jest na liście życzeń
    const isProductInWishlist = wishlistProducts.includes(_id);
    setIsFavourite(isProductInWishlist);
  }, [wishlistProducts, _id]);

  const handleFavouriteClick = () => {
    addProductToWishlist(_id);
    setIsFavourite(!isFavourite);
  };

  return (
    <ProductWrapper>
      {isLoading ? (
        <Loader width={260} height={160} />
      ) : (
        <WhiteBox>
          <Link
            href={url}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img src={hovered ? images[1] : images[0] || images[0]} alt="" />
          </Link>
          <FavouriteIcon
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavourite ? "#FF0000" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={isFavourite ? "#FF0000" : "currentColor"}
            onClick={handleFavouriteClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </FavouriteIcon>
        </WhiteBox>
      )}
      {!isLoading && (
        <ProductInfoBox>
          <Title href={url}>{title}</Title>
          <PriceRow>
            <Price>{price.toFixed(2)} PLN</Price>
            <Button block onClick={() => addProduct(_id)} outline={1} white={1}>
              Dodaj do koszyka
            </Button>
          </PriceRow>
        </ProductInfoBox>
      )}
    </ProductWrapper>
  );
}
