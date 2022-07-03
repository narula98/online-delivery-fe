export default class Services {

  static login(email, password){
    const loginDetails = {'email':email,'password':password};
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails)
    };
    return fetch('http://localhost:8080/users/login', fetchOptions).then((response) => {
      if(!response.ok){
        console.log('resp is:',response.status);
        throw new Error(response.status);
      }  
      return response.json();
    });
  }

  static signin(email, password, address){
    console.log(email);
    const signinDetails = {'email':email,'password':password, 'address': address, 'lattitude':10.2, 'longitude':23.2};
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signinDetails)
    };
    return fetch('http://localhost:8080/users/signup', fetchOptions).then((response) => {
      if(!response.ok){
        console.log('resp is:',response.status);
        throw new Error(response.status);
      }  
      return response.json();
    });
  }

  static getAllStores(){
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch('http://localhost:8080/store/getAll', fetchOptions).then((response) => {
      if(!response.ok){
        console.log('resp is:',response.status);
        throw new Error(response.status);
      }  
      return response.json();
    });
  }

  static getStoreItems(storeId){
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(`http://localhost:8080/items/getStoreItems?storeId=${storeId}`, fetchOptions).then((response) => {
      if(!response.ok){
        console.log('resp is:',response.status);
        throw new Error(response.status);
      }  
      return response.json();
    });
  }

}