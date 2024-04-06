import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CategorySelectWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0px;
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 65px;
  }
`;

const CategorySelect = styled.select`
  width: 10rem;
  height: 25px;
  border-radius: 5px;
  background-color: lightgray;
  margin-right: 5px;
  font-size: 15px;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    width: 8.9rem;
    margin-bottom: 1rem;
    font-size: 13px;
  }
`;

const LeftAlignedTitle = styled(Title)`
  margin-right: auto;

  @media (max-width: 768px) {
    text-align: center;
    margin: 1rem 0 0.5rem 0;
    width: 100%;
  }
`;

export default function CategoryDetails({ products, categories }) {
  const router = useRouter();
  const { categoryId } = router.query;
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [sortOption, setSortOption] = useState("");

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

  const categoryName =
    categories.find((cat) => cat._id === categoryId)?.name || categoryId;

  const category = categories.find(({ _id }) => _id === categoryId);

  useEffect(() => {
    const newFilterOptions = {};
    categories.forEach((category) => {
      category.properties.forEach((property) => {
        if (!newFilterOptions[property.name]) {
          newFilterOptions[property.name] = property.values.slice();
        }
      });
    });

    Object.entries(selectedFilters).forEach(([propertyName, selectedValue]) => {
      const index = newFilterOptions[propertyName].indexOf(selectedValue);
      if (index !== -1) {
        newFilterOptions[propertyName].splice(index, 1);
      }
    });

    setFilterOptions(newFilterOptions);
  }, [selectedFilters]);

  const filteredProducts = filterProducts(
    groupedProducts[categoryId],
    selectedFilters
  );

  if (sortOption === "date-asc") {
    filteredProducts.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  } else if (sortOption === "date-desc") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  function handleFilterChange(propertyName, selectedValue) {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [propertyName]: selectedValue,
    }));
  }

  function filterProducts(products, filters) {
    return products.filter((product) => {
      for (const [filterName, filterValue] of Object.entries(filters)) {
        if (
          filterValue !== "" &&
          product.properties &&
          product.properties[filterName] !== filterValue
        ) {
          return false;
        }
      }
      return true;
    });
  }

  function handleSortChange(option) {
    setSortOption(option);
  }

  return (
    <>
      <Header />
      <Center>
        <CategorySelectWrap>
          <LeftAlignedTitle>{categoryName}</LeftAlignedTitle>
          {category &&
            Array.isArray(category.properties) &&
            category.properties.length > 0 &&
            category.properties.map((property, index) => {
              const { name, values } = property;

              const filteredValues = values.filter((value) => {
                const updatedFilters = { ...selectedFilters, [name]: value };
                const filteredProducts = filterProducts(
                  groupedProducts[categoryId],
                  updatedFilters
                );
                return filteredProducts.length > 0;
              });

              return (
                <CategorySelectWrap key={index}>
                  <CategorySelect
                    value={selectedFilters[name] || ""}
                    onChange={(e) => handleFilterChange(name, e.target.value)}
                    disabled={filteredValues.length === 0}
                  >
                    <option value="">Wybierz {name.toLowerCase()}</option>
                    {filteredValues.map((value, valueIndex) => (
                      <option key={valueIndex} value={value}>
                        {name}: {value}
                      </option>
                    ))}
                  </CategorySelect>
                </CategorySelectWrap>
              );
            })}
          <CategorySelect
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sortowanie: Brak</option>
            <option value="date-asc">Data (od najstarszej)</option>
            <option value="date-desc">Data (od najnowszej)</option>
            <option value="price-asc">Cena (rosnąco)</option>
            <option value="price-desc">Cena (malejąco)</option>
          </CategorySelect>
        </CategorySelectWrap>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <ProductsGrid products={filteredProducts} />
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
