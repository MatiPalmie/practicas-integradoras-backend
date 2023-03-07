import { cartModel } from "../../models/cart.models.js";



class CartDao {
    async createCart(){
        const newCart ={
            products:[]
        }
        return await cartModel.create(newCart)
    }
    async getCart(cid){
        return await cartModel.findById(cid)
    }
    async addProduct(cid,pid){
        const cartUpdate = await this.getCart(cid);
        cartUpdate.products.push({product:pid})
        return await cartModel.findByIdAndUpdate(cid,cartUpdate)
    }
    async updateQuantity(cid,pid,quantity){
        const cartUpdate = await this.getCart(cid);
        const productIndex = cartUpdate.products.findIndex((e)=>e['_id']===pid);
        cartUpdate.products[productIndex+1].quantity = cartUpdate.products[productIndex+1].quantity + parseInt(quantity);
        return await cartModel.findByIdAndUpdate(cid,cartUpdate)

    }
    async deleteProduct(cid,pid){
        const cartUpdate = await this.getCart(cid);
        const productIndex = cartUpdate.products.findIndex((e)=> e["_id"] === pid);
        console.log(productIndex)
            let modCart =cartUpdate.products.splice(productIndex,1);
            return await cartModel.findByIdAndUpdate(cid,cartUpdate)
    }
    async deleteAll (cid){
        const cartUpdate = await this.getCart(cid);
        cartUpdate.products=[]
        return await cartModel.findByIdAndUpdate(cid,cartUpdate)
    }
}

const cartDao = new CartDao();
export default cartDao;







