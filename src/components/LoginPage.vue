<template>
<div class=" d-flex justify-content-center mt-4">
  <div class="card">
   <Message v-if="showSignInSuccessful" :severity="'success'">SignIn Successful</Message>
   <Message v-if="invalidCredentials" :severity="'error'">Invalid Details Plz try again</Message>
   <Message v-if="invalidSignUp" :severity="'error'">Please use other email id</Message>
    <tab-view class="p-5">
        
      <tab-panel header="login" style="line-height: 2 !important">
        <div class="d-flex flex-column p-2 mt-2">
          <input
            type="email"
            placeholder="Enter Email"
            class="form-control mt-1"
            v-model="loginEmail"
            @blur="checkEmailValidation(loginEmail, 'login')"
          />
          <span class="text-danger" v-if="invalidLoginEmail"
            >Invalid Email format</span
          >
          <input
            type="password"
            placeholder="Enter password"
            class="form-control mt-2"
            v-model="loginPassword"
          />
          <button v-if="!showLoginSpinner" class="btn btn-primary mt-1" @click="login()">Login</button>
          <progress-spinner v-else style="width: 50px; height: 50px" strokeWidth="8" />
        </div>
      </tab-panel>
      <tab-panel header="signup">
        <div class="d-flex flex-column p-2 mt-2">
          <input
            type="text"
            placeholder="Enter Email"
            class="form-control mt-1"
            v-model="signInEmail"
            @blur="checkEmailValidation(signInEmail,'signin')"
          />
          <span class="text-danger" v-if="invalidSignInEmail"
            >Invalid Email format</span
          >
          <input
            type="password"
            placeholder="Enter password"
            class="form-control mt-2"
            v-model="signinPassword"
            @blur="checkPasswordValidation(signinPassword)"
          />
          <span class="text-danger" v-if="invalidSigninPassword"
            >Password should have more than 5 characters</span
          >
          <input
            type="address"
            placeholder="Enter password"
            class="form-control mt-2"
            v-model="signinAddress"
            @blur="checkAddressVerification(signinAddress)"
          />
          <span class="text-danger" v-if="invalidSigninAdd"
            >Invalid Address</span
          >
          <button v-if="!showSigninSpinner" class="btn btn-primary mt-1" @click="signin">Sign Up</button>
           <progress-spinner v-else style="width: 50px; height: 50px" strokeWidth="8" />
        </div>
      </tab-panel>
    </tab-view>
  </div>
</div>
</template>

<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Services from '../services/services';
import Store from '../store/store';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';

export default {
  components: {
    'tab-view': TabView,
    'tab-panel': TabPanel,
    'progress-spinner': ProgressSpinner,
    Message
  },
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      signInEmail:'',
      signinPassword:'',
      signinAddress:'',
      invalidLoginEmail: false,
      invalidSignInEmail: false,
      invalidSigninPassword: false,
      invalidSigninAdd: false,
      invalidCredentials: false,
      invalidSignUp: false,
      showLoginSpinner: false,
      showSigninSpinner: false,
      showSignInSuccessful: false
    };
  },
  methods: {
    async login() {
      console.log(this.loginEmail, this.loginPassword);
      this.checkEmailValidation(this.loginEmail, 'login');
      if(!this.invalidLoginEmail){
        try{
          this.showLoginSpinner = true;
          const resp = await Services.login(this.loginEmail,this.loginPassword);
          Store.setEmail(resp.email);
          this.$router.push('/home');
        } catch{
          this.invalidCredentials = true;
          console.log(this.invalidCredentials);
        } finally {
          this.showLoginSpinner = false;
        }
      }
    },

    async signin() {
      this.checkEmailValidation(this.signInEmail, 'signin');
      this.checkPasswordValidation(this.signinPassword);
      this.checkAddressVerification(this.signinAddress);
      if(!this.invalidLoginEmail && !this.invalidSigninPassword && !this.invalidSigninAdd){
        try{
          this.showSigninSpinner = true;
          console.log('email:',this.signInEmail,'pwd',this.signinPassword,'add', this.signinAddress);
          const resp = await Services.signin(this.signInEmail,this.signinPassword, this.signinAddress);
          this.showSignInSuccessful = true;
          this.signInEmail = '';
          this.signinPassword = '';
          this.signinAddress = '';
          console.log(resp);
        } catch{
          this.invalidSignUp = true;
          this.showSignInSuccessful = false;
          console.log(this.invalidCredentials);
        } finally {
          this.showSigninSpinner = false;
        }
      }
    },

    checkEmailValidation(email, btn) {
      console.log(email);
      // eslint-disable-next-line
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      this.invalidLoginEmail = email===undefined? true : !email.match(mailformat) && btn === 'login';
      this.invalidSignInEmail = email===undefined?true : !email.match(mailformat) && btn === 'signin';
    },

    checkPasswordValidation(password) {
      console.log(password);
      this.invalidSigninPassword = password ===undefined || password === ''? true : password.length < 5;
    },

    checkAddressVerification(address) {
      this.invalidSigninAdd = address === '' || address === undefined;
    },
  },
};
</script>

<style>
@import "../app.css";
</style>
