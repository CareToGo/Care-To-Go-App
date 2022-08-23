const stripe = require('stripe')('sk_test_51LPvpUDNDwI2KDMrMudPwHsdxOwUtaLCu4nFl3Uaw7YVnOAh6MhEBkqETh8K1cjnXGD42x8fFpIVm6cy2K6E93ss00APeRSJTM')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
   const {typeName, arguments} = events;

   if (typeName != 'Mutation') {
        throw new Error('Request is not a mutation');
   }

   if (!arguments?.amount) {
    throw new Error('Amount arguments is required')
   }
   const  paymentIntent = await stripe.paymentIntent.create({
    amount: arguments.amount,
    currency: 'usd'
   });

   return {
    clientSecret: paymentIntent.client_secret
   }
};