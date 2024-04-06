import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import { motion } from "framer-motion";

const StyledHeader = styled.header`
  background-color: #222;
  height: 65px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  @media screen and (min-width: 768px) {
    position: static;
  }
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: fixed;
  z-index: 3;
  @media screen and (min-width: 768px) {
    position: relative;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;



const StyledNav = styled(motion.nav)`
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
    ${(props) =>
      !props.mobileNavActive &&
      css`
        display: flex;
        flex-direction: row;
        align-items: center;
        transform: translateX(0%) !important;
      `}
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s ease;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
    color: #fff;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;


const SearchNavLink = styled(NavLink)`
  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
    position: relative;
  }
`;

const StyledSpan = styled.span`
  margin-right: 5px;
  display: none;
  
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"} mobileNavActive={mobileNavActive}>
            Vape.me 💨
          </Logo>
          <StyledNav
            initial={{ x: "-100%" }}
            animate={{ x: mobileNavActive ? 0 : "-100%" }}
            transition={{ duration: 0.5 }}
            mobileNavActive={mobileNavActive}
          >
            <NavLink href={"/"}>Strona główna</NavLink>
            <NavLink href={"/products"}>Nasze produkty</NavLink>
            <NavLink href={"/categories"}>Kategorie</NavLink>
            <NavLink href={"/account"}>Moje konto</NavLink>
            <NavLink href={"/cart"}>Koszyk ({cartProducts.length})</NavLink>
            <SearchNavLink href={"/search"}> <StyledSpan>Szukaj</StyledSpan>
              <SearchIcon />
            </SearchNavLink>
          </StyledNav>
          <NavButton
            onClick={() => setMobileNavActive((prev) => !prev)}
            mobileNavActive={mobileNavActive}
          >
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
