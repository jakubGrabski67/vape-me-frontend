import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        if (req.query?.id) {
          try {
            const customer = await Customer.findOne({ _id: req.query.id });
            res.json(customer);
          } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
          }
        } else {
          try {
            const customers = await Customer.find().sort({ createdAt: -1 });
            res.json(customers);
          } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
          }
        }
    }
    
    if (method === "POST") {
        try {
          const { name, lastName, city, email, postalCode, streetAddress, country } = req.body;
          const customer = new Customer({
              name, lastName, city, email, postalCode, streetAddress, country
          });
          await customer.save();
          res.status(201).json(customer);
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    if (method === "PUT") {
        try {
          const { _id, name, lastName, city, email, postalCode, streetAddress, country } = req.body;
          await Customer.updateOne({ _id }, { name, lastName, city, email, postalCode, streetAddress, country });
          res.json(true);
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
