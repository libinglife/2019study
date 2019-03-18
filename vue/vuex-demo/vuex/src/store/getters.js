
export default {
  product :function (state) {
    return state.product
  },

  halfPrice :(state)=>{

    let priceHalf =state.product.map((item)=>{
      return item.price/2
    });
    console.log(priceHalf);
    return priceHalf
  }
}
