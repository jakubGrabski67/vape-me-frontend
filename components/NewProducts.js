import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import { motion } from "framer-motion"; // Importujemy motion z framer-motion

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>Nowe produkty</Title>
      <motion.div // Dodajemy motion do kontenera z ProductsGrid
      initial={{ opacity: 0, y: 50 }} // Ustawiamy początkowe właściwości animacji
      animate={{ opacity: 1, y: 0 }} // Animujemy do pełnej widoczności i pozycji
      transition={{ duration: 1.5, delay: 0.5 }} // Czas trwania animacji
    >
      <ProductsGrid products={products} />
    </motion.div>
      
    </Center>
  );
}
