<template>
  <div>
    <nav class="navbar p-2">
      <span
        class="nav-item pi pi-arrow-left float-right"
        @click="navigateToHome()"
        style="cursor: pointer; font-weight: bold"
      >
      </span>
    </nav>

       <h2 class="text-center">Cart Items:</h2>
    
        <div class="row">
          <div
            class="col-3 offset-1 p-2 mt-5 shadow-class "
            v-for="(item, i) in cart"
            :key="i"
          >
            <div class="p-1">
              <h6 class="label">Item Name:</h6>
              {{ item.itemName }}
            </div>

            <div class="p-1">
              <h6 class="label">Item Name:</h6>
              {{ item.storeName }}
            </div>

            <div class="p-1">
              <h6 class="label">Item Name:</h6>
              {{ item.quantity }}
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import Store from '../store/store';
import Services from '../services/services';
export default {
  async created() {
    console.log('yooo');
    if (Store.state.customerEmail !== '') {
      await this.getCustomerCart();
    } else {
      this.$router.push('/home');
    }
  },
  data() {
    return {
      cart: [],
      cartError: false,
    };
  },
  methods: {
    navigateToHome() {
      this.$router.push('/home');
    },
    async getCustomerCart() {
      try {
        const resp = await Services.getUserCart(Store.state.customerEmail);
        this.cart = resp;
      } catch {
        this.cartError = true;
      }
    },
  },
};
</script>

<style></style>
