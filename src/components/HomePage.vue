<template>
  <div v-if="!showSpinner" class="mt-5">
    <nav class="navbar">
      <span
        class="nav-item pi pi-arrow-right float-right"
        @click="navigateToCart()"
        style="cursor: pointer; font-weight: bold"
      >
        Go to cart
      </span>
    </nav>
    <h2 class="text-center">Available Stores:</h2>
    <div class="d-flex flex-row card" v-for="(store, i) in stores" :key="i">
      <div class="card-body">
        <h5 class="card-title">{{ store.name }}</h5>
        <p class="card-text">Located in {{ store.area }}</p>
        <button class="btn btn-primary" @click="navigateToItems(store.storeId)">Check Store</button>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center mt-5">
    <progress-spinner style="width: 50px; height: 50px" strokeWidth="8" />
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
    if (Store.state.customerEmail !== '') {
      await this.getAllStores();
    } else {
      this.$router.push('/');
    }
  },
  data() {
    return {
      stores: [],
      storeServiceError: false,
      showSpinner: false,
    };
  },
  methods: {
    async getAllStores() {
      try {
        this.showSpinner = true;
        const resp = await Services.getAllStores();
        this.stores = resp;
        console.log(this.stores);
      } catch {
        this.storeServiceError = true;
      } finally {
        this.showSpinner = false;
      }
    },
    navigateToItems(storeId){
      console.log(storeId);
      Store.setStoreId(storeId);
      this.$router.push('/items');
    },
    navigateToCart(){
      this.$router.push('/cart');
    }
  },
};
</script>

<style></style>
