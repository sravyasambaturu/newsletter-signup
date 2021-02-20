const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }
  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/9099e622a4"

  const options = {
    method: "POST",
    auth: "sravya1:44c0c892b55e1dc424421921db8aea2e-us1"

  }
  const request = https.request(url, options, function(response) {


    if (response.statusCode === 200) {
      res.sendFile( __dirname +  "/sucess.html");

    } else {
    res.sendFile( __dirname +  "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

 request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000. ");
})
// api key
// 44c0c892b55e1dc424421921db8aea2e-us1
// list id
//9099e622a4
