<template>
  <div v-if="showSpinner">
    <progress-spinner style="width: 50px; height: 50px" strokeWidth="8" />
  </div>
  <div v-else class="row">
    <nav class="navbar">
      <span
        class="nav-item pi pi-arrow-left"
        @click="navigateBack()"
        style="cursor: pointer; font-weight: bold"
      >
        Back To Store
      </span>
    </nav>
    <div class="d-flex justify-content-center"></div>
    <div
      class="col-3 offset-1 p-2 mt-5 shadow-class"
      v-for="(item, i) in items"
      :key="i"
    >
      <div>
        <div class="p-1">
          <h6 class="label">Item Name:</h6>
          {{ item.name }}
        </div>
        <div class="p-1">
          <h6 class="label">Available Quantity</h6>
          {{ item.availableQuantity }}
        </div>
        <div class="p-1">
          <h6 class="label">MRP</h6>
          {{ item.mrp }}
        </div>
        <div class="p-1">
          <h6 class="label">Discounted Selling Price</h6>
          {{ item.discountedSellingPrice }}
        </div>
        <div class="p-2">
          <input type="number" class="form-control" min="0" placeholder="quantity" v-model="item.quantity" />
        </div>
        <div class="p-2">
          <button class="btn btn-success ml-2" @click="addToCart(item.quantity,item.itemid)">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../store/store';
import Services from '../services/services';
import ProgressSpinner from 'primevue/progressspinner';
export default {
  components: {
    'progress-spinner': ProgressSpinner,
  },
  async created() {
    if (Store.state.customerEmail !== '' && Store.state.storeId !== '') {
      await this.getStoreItems();
    } else {
      this.$router.push('/');
    }
  },
  data() {
    return {
      items: [],
      serviceError: false,
      showSpinner: false,
      itemQuantity:0
    };
  },
  methods: {
    async getStoreItems() {
      try {
        this.showSpinner = true;
        const resp = await Services.getStoreItems(Store.state.storeId);
        this.items = resp;
      } catch {
        this.serviceError = true;
      } finally {
        this.showSpinner = false;
      }
    },
    navigateBack() {
      this.$router.push('/home');
      Store.setStoreId('');
    },
    addToCart(quantity,storeId){
      console.log(quantity,' ',storeId);
    }
  },
};
</script>

<style></style>
