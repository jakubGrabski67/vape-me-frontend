import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Footer from "@/components/Footer";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 5rem;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 50px;
  @media screen and (min-width: 768px) {
    margin-top: 0px;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 120px;
  height: 120px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 120px;
    max-height: 120px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 120px;
      max-height: 120px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 10px 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 10px 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const TdBottom = styled.td`
  padding-top: 20px;
  padding-bottom: 0.9rem;
  text-align: end;
  font-weight: bold;
  font-size: 1rem;
`;

const TdBottomProducts = styled.td`
  padding-top: 20px;
  padding-bottom: 0.9rem;
  text-align: start;
  font-weight: bold;
  font-size: 1rem;
`;

const ProductTitleCart = styled.p`
  padding-top: 1rem;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  let [deliveryPrice, setDeliveryPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        console.log(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    axios.get("/api/appSettings").then((response) => {
      if (response.data && response.data.length > 0) {
        const firstSettingsObject = response.data[0];
        const { deliveryPrice } = firstSettingsObject;
        setDeliveryPrice(deliveryPrice);
      } else {
        return;
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success=1")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    if (
      !name ||
      !lastName ||
      !email ||
      !city ||
      !postalCode ||
      !streetAddress ||
      !country
    ) {
      alert("Proszę wypełnić wszystkie pola formularza.");
      return;
    }

    const response = await axios.post("/api/checkout", {
      name,
      lastName,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
      deliveryPrice,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  let delivery = total + deliveryPrice;

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Dziękujemy za Twoje zamówienie!</h1>
              <p>
                Wyślemy Ci wiadomość email, kiedy Twoje zamówienie zostanie
                wysłane.
              </p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Koszyk</h2>
            {!cartProducts?.length && <div>Twój koszyk jest pusty.</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th style={{ textAlign: "center" }}>Ilość</th>
                    <th style={{ textAlign: "end" }}>Cena</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        <ProductTitleCart> {product.title}</ProductTitleCart>
                      </ProductInfoCell>
                      <td style={{ textAlign: "center" }}>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td
                        style={{
                          textAlign: "end",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {(
                          cartProducts.filter((id) => id === product._id)
                            .length * product.price
                        ).toFixed(2)}{" "}
                        PLN
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <TdBottomProducts>Produkty</TdBottomProducts>
                    <TdBottom></TdBottom>
                    <TdBottom>{total.toFixed(2)} PLN</TdBottom>
                  </tr>
                  <tr>
                    <TdBottomProducts>Przesyłka</TdBottomProducts>
                    <TdBottom></TdBottom>
                    <TdBottom>{deliveryPrice} PLN</TdBottom>
                  </tr>
                  <tr>
                    <TdBottomProducts style={{ fontWeight: "900" }}>
                      Łącznie (brutto)
                    </TdBottomProducts>
                    <TdBottom></TdBottom>
                    <TdBottom style={{ fontWeight: "900" }}>
                      {delivery.toFixed(2)} PLN
                    </TdBottom>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Dane do wysyłki</h2>
              <CityHolder>
                <Input
                  type="text"
                  placeholder="Imię"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Nazwisko"
                  value={lastName}
                  name="lastName"
                  onChange={(ev) => setLastName(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="Miasto"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Kod pocztowy"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Adres"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Kraj"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <Button payment block onClick={goToPayment}>
                Przejdź do płatności
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
