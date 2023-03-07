import fs from 'express';

class CartManager {
  constructor(filename, productsPath) {
    this.path = filename;
    this.productsPath = productsPath;
    if (fs.existsSync(this.path)) {
      this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.carts = [];
    }
  }
  async createCart() {
    let newCart = {
      products: [],
    };
    let cartLength = this.carts.length;
    console.log(cartLength);
    if (cartLength === 0) {
      newCart["id"] = 1;
    } else {
      newCart["id"] = this.carts[cartLength - 1]["id"] + 1;
    }
    this.carts.push(newCart);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.carts, null, "\t")
    );
  }
  async getCart(id) {
    let cartFind = this.carts.find((e) => e["id"] === id);
    if (!cartFind) {
      return "error";
    } else {
      return cartFind;
    }
  }
  async addProduct(cid, pid) {
    let cartFind = this.carts.find((e) => e["id"] === cid);
    if (!cartFind) {
      return "El id no corresponde a un carrito válido";
    } else {
      let productList = JSON.parse(fs.readFileSync(this.productsPath, "utf-8"));
      let productExists = productList.find((e) => e.id === pid);
      if (!productExists) {
        throw new Error('El producto no existe');;
      } else {
        let productFind = cartFind["products"].find((e) => e.product === pid);
        let cartIndex = this.carts.findIndex((e) => e["id"] === cid);
        if (!productFind) {
          let addProduct = {
            product: pid,
            quantity: 1,
          };
          this.carts[cartIndex]["products"].push(addProduct);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.carts, null, "\t")
          );
        } else {
          let productIndex = cartFind["products"].findIndex(
            (e) => e["product"] === pid
          );
          let newProduct = {
            product: pid,
            quantity: productFind["quantity"] + 1,
          };
          this.carts[cartIndex]["products"].splice(productIndex, 1, newProduct);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.carts, null, "\t")
          );
        }
      }
    }
  }
}

const cartDao = new CartManager("carts.json","products.json");

export default cartDao;