const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'sns_profile'});
const sns = new AWS.SNS({credentials: credentials, region: 'us-east-1'});

const port = 8080

app.use(bodyParser.json())

app.get('/health', (req, res) => {
    res.header({ "System-Health": true })
    res.sendStatus(204)
})

const fibonacci = n => {
    if (n <= 1) {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

app.post('/fibonacci', (req, res) => {
    const fibIndex = req.body.index
    res.status(202).json({ index: fibIndex, result: "calculating..." })

    console.log("Fibonacci number:", fibonacci(fibIndex))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post('/email-notifications', function (req, res) {
	console.log(req.headers);

    // Now we can view the body contents
	console.log(req.body);
    var json = JSON.parse(req.body);
    var msg = JSON.parse(json.Message); /* Should have been done by the previous line but SNS escaped this property */
    console.log(msg);

    res.status(200).json();
}); 