import { mongooseConnect } from "@/lib/mongoose";
import { AppSettings } from "@/models/AppSettings";


export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();


  if (method === "GET") {
    if (req.query?.id) {
      res.json(await AppSettings.findOne({ _id: req.query.id }));
    } else {
      res.json(await AppSettings.find());
    }
  }
}
