import express from "express";
import session from "express-session";
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import passport from "passport";
import initializePassport from "./config/passportLocal.config.js";
const PORT = 8080;
import productsRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import viewRoutes from "./routes/view.routes.js";
import sessionRoutes from "./routes/session.routes.js";

const databaseConection =
  "mongodb+srv://adminCoder:123456Coder@ecommerce.nprla1w.mongodb.net/?retryWrites=true&w=majority";
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

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://adminCoder:123456Coder@ecommerce.nprla1w.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
  })
  );
  
  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/", productsRoutes);
  app.use("/", cartRoutes);
app.use("/", viewRoutes);
app.use("/session/", sessionRoutes);
// app.get("*", (req, res) => {
//   res.status(404).send("404 not found");
// });

app.listen(PORT, () => console.log(`Server Runing on Port ${PORT}`));
