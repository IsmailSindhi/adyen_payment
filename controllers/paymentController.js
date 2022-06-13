const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.pay = catchAsyncErrors(async (req, res, next) => {
  const {Client, Config, CheckoutAPI} = require('@adyen/api-library');
    const config = new Config();
    config.apiKey = process.env.API_KEY;
    config.merchantAccount = process.env.MARCHANT_ACCOUNT;
    const client = new Client({ config });
    client.setEnvironment("TEST");
    const checkout = new CheckoutAPI(client);
    const payment = await  checkout.payments({
        amount: { currency: "USD", value: req.body.price },
        paymentMethod: {
            "type": "scheme",
            "encryptedCardNumber": req.body.encryptedCardNumber,
            "encryptedExpiryMonth": req.body.encryptedExpiryMonth,
            "encryptedExpiryYear": req.body.encryptedExpiryYear,
            "encryptedSecurityCode": req.body.encryptedSecurityCode
          },
        reference: req.ref,
        merchantAccount: config.merchantAccount,
        storePaymentMethod: "true",
        shopperInteraction: "Ecommerce",
        recurringProcessingModel: "CardOnFile",
        returnUrl: "https://your-company.com/..."
    })
  res.status(200).json({
    success: true,
    payment
  });
});
