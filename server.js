// imports
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
// declarations
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

const listId = "51585e19ad";

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/login.html`);
});

app.post("/", (req, res) => {
  const { fName, lName, address, email } = req.body;
  console.log({ fName, lName, email });
  client.setConfig({
    apiKey: "161298004fa35f73e73bfd26f379a5c6-us21",
    server: "us21",
  });
  const run = async () => {
    const request = await client.lists
      .addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
          ADDRESS: address,
        },
      })
      .catch((err) => {
        console.log(err), res.sendFile(`${__dirname}/failed.html`);
      });
    // console.log(request);
    res.sendFile(`${__dirname}/success.html`);
  };

  run();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`App listening on port  ${PORT}`);
});

//key => 161298004fa35f73e73bfd26f379a5c6-us21
//listId => 51585e19ad
