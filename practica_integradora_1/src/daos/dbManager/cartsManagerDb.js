import { cartModel } from "../../models/cart.models.js";

class CartDao {
    async createCart(){
        return await cartModel.find()
    }
    async getCart(data){
        return await cartModel.findById(data)
    }
    async addProduct(cid,product){
        const cartFind = this.getCart(cid);
        return await cartModel.findByIdAndUpdate(cid,product)
    }
}

const cartDao = new CartDao();
export default cartDao;







