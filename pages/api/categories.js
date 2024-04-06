import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    //await isAdminRequest(req,res);

    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }

}