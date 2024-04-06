import Featued from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featued product={featuredProduct} />
      <NewProducts products={newProducts} />
      <Footer/>
    </div>
  );
}

export async function getServerSideProps() {
  mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 20,
  });
  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
