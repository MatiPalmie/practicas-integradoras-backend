
import cartDao from "../daos/dbManager/cartsManagerDb.js";
import { Router } from "express";

const router = Router();


router.post("/carts", async (req, res) => {
    cartDao.createCart();
    res.status(200).json('Carrito Creado')
  });
  router.get("/carts/:cid", async (req, res) => {
    let cid = parseInt(req.params.cid);
    let cart = await cartDao.getCart(cid);
    res.status(200).json(cart);
  });
  router.post("/:cid/product/:pid", async (req, res) => {
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    await cartDao.addProduct(cid, pid);
  });
  

  export default router