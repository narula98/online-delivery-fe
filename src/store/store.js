import { reactive, readonly } from 'vue';
const state = reactive({
  customerEmail: '',
  cart:[]
});
const setEmail = (val)=>{
  state.customerEmail = val;
};
const setCart = (val)=>{
  state.cart = [...state.cart,val];
};

export default {
  state: readonly(state),
  setEmail,
  setCart
};
