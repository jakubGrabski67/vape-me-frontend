import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Order.findOne({ _id: req.query.id }));
    } else {
      res.json(await Order.find().sort({ createdAt: -1 }));
    }
  }
}
