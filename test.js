var axios = require("axios")
axios.post('/https://adyenpay.herokuapp.com/payment', {
    "cardNumber": "test_5555555555554444",
    "expiryMonth": "test_03",
    "expiryYear": "test_2030",
    "securityCode": "test_737",
    "price" : 1000,
    "ref" : "e26f10ajfa"
})
  .then( response => { console.log(response) })
  .catch( error => { console.log(error)  })