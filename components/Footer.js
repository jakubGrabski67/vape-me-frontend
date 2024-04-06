import styled from "styled-components";
import Center from "./Center";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  gap: 20px;
  margin-bottom: 5rem;
  @media screen and (min-width: 768px) {
    grid-template-columns:  1fr 1fr auto;
  }
`;


const Logo = styled.h1`
  color: #fff;
  text-decoration: none;
  position: relative;
 // z-index: 3;
  text-align: start;
`;

const FooterH3 = styled.h3`
  text-transform: uppercase;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterHR = styled.hr`
margin-bottom: 1.5rem;
`

const DeveloperContact = styled.a`
text-decoration: none;
color: #fff;
&:hover {
    text-decoration: underline;
  }
`;

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <Bg>
      <Center>
      <Logo href={"/"}>Vape.me 💨</Logo>
        <StyledFooter>
            
          
          <FooterColumn>
            <FooterH3>produkty</FooterH3>
            <FooterLink href="/products">Promocje</FooterLink>
            <FooterLink href="/new-products">Nowe produkty</FooterLink>
            <FooterLink href="/best-sellers">Najczęściej kupowane</FooterLink>
            <FooterLink href="/categories">Kategorie</FooterLink>
            <FooterLink href="/products">Wszystkie produkty</FooterLink>
            <FooterLink href="/vouchers">Prezenty i vouchery</FooterLink>
            <FooterLink href="/outlet-products">Produkty outlet</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterH3>nasza firma</FooterH3>
            <FooterLink href="/orders-and-returns">Zamówienia i zwroty</FooterLink>
            <FooterLink href="/terms-and-conditions">Regulamin</FooterLink>
            <FooterLink href="/privacy-policy">Polityka prywatności</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/payment-methods">Formy płatności</FooterLink>
            <FooterLink href="/order-processing-time">Czas realizacji zamówienia</FooterLink>
            <FooterLink href="/contact-us">Kontakt z nami</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterH3>twoje konto</FooterH3>
            <FooterLink href="/personal-data">Dane osobowe</FooterLink>
            <FooterLink href="/orders">Zamówienia</FooterLink>
            <FooterLink href="/receipts">Moje pokwitowania</FooterLink>
            <FooterLink href="/addresses">Adresy</FooterLink>
            <FooterLink href="/coupons">Kupony</FooterLink>
            <FooterLink href="/my-reviews">Moje opinie</FooterLink>
            <FooterLink href="/my-notifications">Moje powiadomienia</FooterLink>
          </FooterColumn>
        </StyledFooter>
        <FooterHR/>
        <span> <DeveloperContact href="https://dev-jakub-grabski.netlify.app/">Developed by Jakub Grabski.</DeveloperContact> Copyright © {currentYear}. All rights reserved.</span>
      </Center>
    </Bg>
  );
}
