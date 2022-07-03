import { reactive, readonly } from 'vue';
const state = reactive({
  customerEmail: '',
  cart:[],
  storeId: ''
});
const setEmail = (val)=>{
  state.customerEmail = val;
};
const setCart = (val)=>{
  state.cart = [...state.cart,val];
};
const setStoreId = (val)=>{
  state.storeId = val;
};
export default {
  state: readonly(state),
  setEmail,
  setCart,
  setStoreId
};
