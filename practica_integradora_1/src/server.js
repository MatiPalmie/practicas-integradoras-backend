import express from 'express'
import handlebars from "express-handlebars";
import Handlebars from 'handlebars';
import __dirname from "./dirname.js";
import mongoose from "mongoose";
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
const PORT = 8080;
import productsRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'

const databaseConection = 'mongodb+srv://adminCoder:123456Coder@ecommerce.nprla1w.mongodb.net/?retryWrites=true&w=majority'
const app = express();

mongoose.set("strictQuery", true);

mongoose.connect(databaseConection, (error) => {
  if (error) {
    console.log("Error al conectar a MongoDB", error);
  } else {
    console.log("Conectado a MongoDB");
  }
});

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',productsRoutes)


app.listen(PORT, () => console.log(`Server Runing on Port ${PORT}`));
