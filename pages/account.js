import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "@/components/WishlistContext";
import axios from "axios";
import Input from "@/components/Input";
import Footer from "@/components/Footer";
import ProductBox from "@/components/ProductBox";
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";
import React from "react";
import { motion } from "framer-motion";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  //margin-bottom: 5rem;
  @media screen and (min-width: 1020px) {
    grid-template-columns: 1fr 1fr;
    width: 510px;
  }
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 5rem;

  @media screen and (min-width: 1020px) {
    grid-template-columns: 1.2fr 0.8fr;
    min-height: 554px;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 50px;
 

  @media screen and (min-width: 1020px) {
    margin-top: 0px;
  }
`;

const ProductInfoCellLeft = styled.td`
  text-align: left;
  vertical-align: top;
  padding-right: 10px;
  width: 50%;
`;

const ProductInfoCellRight = styled.td`
  text-align: left;
  vertical-align: middle;
  padding: 10px 0;
  font-size: 0.9rem;
  width: 50%;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Tab = styled.h2`
  color: ${(props) => (props.active ? "black" : "#aaa")};
  cursor: pointer;
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  text-decoration-color: ${(props) => (props.active ? "black" : "#aaa")};
  text-underline-offset: ${(props) => (props.active ? "10px" : "initial")};
  text-decoration-thickness: 3px;
`;

const OrdersDate = styled.div`
  margin-bottom: 5px;
  color: black;
  font-weight: bold;
`;

const StyledBr = styled.br`
  margin-bottom: 5px;
`;

const OrderProductName = styled.span`
  color: black;
`;

const StyledTdLine = styled.td`
  border-top: 1px solid black;
`;

const OrderProductQuantity = styled.div`
  margin-bottom: 5px;
  color: #888;
`;

const OrdersField = styled.div`
  margin-bottom: 5px;
  color: #888;
`;

const SpanNoOrders = styled.span`
  font-weight: bold;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const { wishlistProducts } = useContext(WishlistContext);
  const [activeTab, setActiveTab] = useState("wishlist");
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(session?.user.email || "");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [orders, setOrders] = useState([]);
  const [formIsFilled, setFormIsFilled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/orders?email=${email}`);
      const filteredOrders = response.data.filter(
        (order) => order.email === session?.user?.email
      );
      setOrders(filteredOrders);
    };
    fetchData();
  }, [email, session?.user?.email]);

  useEffect(() => {
    if (session && session.user.email) {
      axios
        .get(`/api/customers?email=${session.user.email}`)
        .then((response) => {
          const customerData = response.data;
          const currentUserData = customerData.find(
            (customer) => customer.email === session.user.email
          );
          if (currentUserData) {
            setName(currentUserData.name);
            setLastName(currentUserData.lastName);
            setEmail(currentUserData.email);
            setCity(currentUserData.city);
            setPostalCode(currentUserData.postalCode);
            setStreetAddress(currentUserData.streetAddress);
            setCountry(currentUserData.country);
          } else {
            setName("");
            setLastName("");
            setEmail(session.user.email);
            setCity("");
            setPostalCode("");
            setStreetAddress("");
            setCountry("");
          }
        });
    }
  }, [session]);

  const handleSaveData = async () => {
    const existingCustomerResponse = await axios.get(
      `/api/customers?email=${session.user.email}`
    );
    const existingCustomer = existingCustomerResponse.data.find(
      (customer) => customer.email === session.user.email
    );

    if (existingCustomer) {
      await axios.put(`/api/customers`, {
        _id: existingCustomer._id,
        name,
        lastName,
        city,
        postalCode,
        streetAddress,
        country,
        email: session.user.email,
      });
      alert("Dane zostały pomyślnie zaktualizowane!");
    } else {
      await axios.post("/api/customers", {
        name,
        lastName,
        email: session.user.email,
        city,
        postalCode,
        streetAddress,
        country,
      });
      alert("Dane zostały pomyślnie zapisane!");
    }
  };

  useEffect(() => {
    if (wishlistProducts.length > 0) {
      axios
        .post("/api/wishlist", { ids: wishlistProducts })
        .then((response) => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [wishlistProducts]);

  useEffect(() => {
    if (name && lastName && city && postalCode && streetAddress && country) {
      setFormIsFilled(true);
    } else {
      setFormIsFilled(false);
    }
  }, [name, lastName, city, postalCode, streetAddress, country]);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <Center>
              <TabContainer>
                <Tab
                  onClick={() => setActiveTab("wishlist")}
                  active={activeTab === "wishlist"}
                >
                  Obserwowane
                </Tab>
                <Tab
                  onClick={() => setActiveTab("orders")}
                  active={activeTab === "orders"}
                >
                  Zamówienia
                </Tab>
              </TabContainer>
            </Center>
            {activeTab === "orders" && (
              <>
                {!session && (
                  <Center>
                    <span>
                      Zaloguj się aby zobaczyć historię swoich zamówień.
                    </span>
                  </Center>
                )}
                {session && (
                  <SessionProvider session={session}>
                    <Center>
                      {orders.length > 0 ? (
                        <table>
                          <tbody>
                            {orders.map((order, index) => (
                              <React.Fragment key={order._id}>
                                <tr>
                                  <ProductInfoCellLeft>
                                    <OrdersDate>
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleString()}
                                    </OrdersDate>
                                    <OrdersField>
                                      {order.name} {order.lastName}
                                    </OrdersField>
                                    <OrdersField>{order.email}</OrdersField>
                                    <OrdersField>
                                      {order.streetAddress}
                                    </OrdersField>
                                    <OrdersField>
                                      {order.postalCode} {order.city},{" "}
                                      {order.country}
                                    </OrdersField>
                                  </ProductInfoCellLeft>
                                  <ProductInfoCellRight>
                                    <StyledBr />
                                    {order.line_items.map((item, itemIndex) => (
                                      <OrderProductQuantity key={itemIndex}>
                                        {item.quantity} x
                                        <OrderProductName>
                                          {" "}
                                          {item.price_data.product_data.name}
                                        </OrderProductName>
                                      </OrderProductQuantity>
                                    ))}
                                  </ProductInfoCellRight>
                                </tr>
                                {index !== orders.length - 1 && (
                                  <StyledTdLine colSpan="2" />
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <span>
                          Nie znaleziono zamówień przypisanych do adresu email{" "}
                          <SpanNoOrders>{session?.user.email}</SpanNoOrders> lub
                          niczego jeszcze nie zamówiłeś.
                        </span>
                      )}
                    </Center>
                  </SessionProvider>
                )}
              </>
            )}

            {activeTab === "wishlist" && (
              <Box>
                {!wishlistProducts?.length && (
                  <div>Twoja lista obserwowanych produktów jest pusta.</div>
                )}
                {products?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  >
                    <StyledProductsGrid>
                      {products?.length > 0 &&
                        products.map((product) => (
                          <ProductBox key={product._id} {...product} />
                        ))}
                    </StyledProductsGrid>
                  </motion.div>
                )}
              </Box>
            )}
          </Box>
          <Box>
            <h2>Twoje dane</h2>
            <CityHolder>
              <Input
                type="text"
                placeholder="Imię"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Nazwisko"
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
              />
            </CityHolder>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              title="Twój przypisany adres e-mail od Google."
              disabled
            />
            <CityHolder>
              <Input
                type="text"
                placeholder="Miasto"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Kod pocztowy"
                value={postalCode}
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
            </CityHolder>
            <Input
              type="text"
              placeholder="Adres"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Kraj"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <>
              <div style={{ display: "flex", gap: "10px" }}>
                {session?.user && (
                  <Button
                    payment
                    block
                    onClick={() => {
                      if (formIsFilled) {
                        handleSaveData();
                      } else {
                        alert(
                          "Proszę wypełnić wszystkie pola formularza przed zapisaniem danych."
                        );
                      }
                    }}
                  >
                    Zapisz dane
                  </Button>
                )}
                {session ? (
                  <Button red block onClick={() => signOut()}>
                    Wyloguj się
                  </Button>
                ) : (
                  <Button payment block onClick={() => signIn("google")}>
                    Zaloguj się przez Google
                  </Button>
                )}
              </div>
            </>
          </Box>
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
