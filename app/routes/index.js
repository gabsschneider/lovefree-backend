var express = require('express');
var braintree = require('braintree');
var router = express.Router(); // eslint-disable-line new-cap
var gateway = require('../lib/gateway');

router.get('/', (req, res) => {
	// do something
	//console.log('hey there')
	res.send('sup')
})

router.get('/client_token', (req, res) => {
	gateway.clientToken.generate({}, (err, response) => {
		if(err) {
			res.status(500).send(err)
		}

	    res.status(200).send(response.clientToken);
	 });
})

router.post('/create_user_payment_subscribe', (req, res) => {
	var transactionErrors

	gateway.customer.create({
		firstName: req.firstName,
		lastName: req.lastName,
		paymentMethodNonce: req.paymentNonce

	}, (err, result) => {
		if(result.success) {
			const customerId = result.customer.id;
	    	const paymentToken = result.customer.paymentMethods[0].token;

			gateway.subscription.create({
				paymentMethodToken: paymentToken,
				planId: req.planId

			}, (subErr, subResult) => {
				if(subResult.success) {
					res.status(200).send({
						customerId: customerId,
						subscriptionResult: subResult
					})
				}

				transactionErrors = subResult.errors.deepErrors()
				res.status(500).send(transactionErrors)

			})
		}

	    transactionErrors = result.errors.deepErrors()
		res.status(500).send(transactionErrors)

	});
})

module.exports = router;

