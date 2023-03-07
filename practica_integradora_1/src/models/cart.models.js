import { Schema, model } from "mongoose";

const cartCollection = "cart";

const cartSchema = new Schema({
    products:[]
});

export const cartModel = model(cartCollection, cartSchema);