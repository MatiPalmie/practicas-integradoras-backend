import cartDao from "../daos/dbManager/cartsManagerDb.js";
import { Router } from "express";

const router = Router();

router.post("/carts", async (req, res) => {
  try {
    await cartDao.createCart();
    res.status(200).json({ msg: "Carrito creado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/carts/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let cart = await cartDao.getCart(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/carts/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.body._id;
    await cartDao.addProduct(cid, pid);
    res.status(200).json({ msg: "Producto Agregado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.query;
    const { pid, cid } = req.params;
    await cartDao.updateQuantity(cid, pid, quantity);
    res.json({ msg: "Se modifico la cantidad" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const { pid, cid } = req.params;
    await cartDao.deleteProduct(cid, pid);
    res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/carts/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    await cartDao.deleteAll(cid);
    res.status(200).json({ msg: "Productos eliminados" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
