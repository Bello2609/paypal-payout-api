require("dotenv").config();
const paypal = require('@paypal/payouts-sdk'); 
// Creating an environment
let clientId = "<<PAYPAL-CLIENT-ID>>";
let clientSecret = "<<PAYPAL-CLIENT-SECRET>>";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);
module.exports.payout = (req, res, next)=>{


let requestBody = {
    "sender_batch_header": {
      "recipient_type": "EMAIL",
      "email_message": "SDK payouts test txn",
      "note": "Enjoy your Payout!!",
      "sender_batch_id": "Test_sdk_fail",
      "email_subject": "This is a test transaction from SDK"
    },
    "items": [{
      "note": "Your 1$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-1@paypal.com",
      "sender_item_id": "Test_txn_1"
    }]
  }


let request = new paypal.payouts.PayoutsPostRequest();
request.requestBody(requestBody);

// Call API with your client and get a response for your call
    try {
        let response = await client.execute(request);
        re
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
        console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
        return res.status(500).json({
            data: {
                message: response
            }
        })
    }
    catch (e) {
      if (e.statusCode) {
        //Handle server side/API failure response
        console.log("Status code: ", e.statusCode);
        // Parse failure response to get the reason for failure
        const error = JSON.parse(e.message)
        console.log("Failure response: ", error);
        console.log("Headers: ", e.headers)

        return res.status(401).json({
            data: {
                message: error
            }
        });
      } else {
        //Hanlde client side failure
        console.log(e)
      }
    }

}