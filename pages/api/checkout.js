import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const {
    name,
    lastName,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
    deliveryPrice
  } = req.body;
  
  await mongooseConnect();
  
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  const line_items = uniqueIds.map(productId => {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId).length || 0;
    
    if (quantity > 0 && productInfo) {
      return {
        price_data: {
          currency: 'PLN',
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100,
        },
        quantity: quantity,
      };
    }
  });
  
  // Dodaj produkt dla dostawy
  line_items.push({
    price_data: {
      currency: 'PLN',
      product_data: { name: 'Przesyłka' }, // Nazwij produkt jako "Dostawa"
      unit_amount: deliveryPrice * 100, // Przekształć cenę dostawy do wartości w groszach
    },
    quantity: 1, // Ilość produktów dostawy jest zawsze 1
  });

  const orderDoc = await Order.create({
    line_items,
    name,
    lastName,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    archived: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
  });
}
