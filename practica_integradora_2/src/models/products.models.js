import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"; 

const productCollection = "products";

const productSchema = new Schema({
  title: { type: String, required: true, index:true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

productSchema.plugin(mongoosePaginate)

export const productModel = model(productCollection, productSchema);
