var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
var port = 3000;

var mysql = require('mysql');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// SMTP SET UP
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "@gmail.com",
    pass: ""
  }
});
var rand, mailOptions, host, link;
// end

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "testdatabase"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Mysql Database Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS customer (customer_id INT, email VARCHAR(255), isverified BOOLEAN NOT NULL DEFAULT FALSE, password VARCHAR(255), firstName VARCHAR(255), lastName VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log("Table created");
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});

function veryficationMailSender(req, num) {
  rand = num;
  host = req.get('host');
  link = "http://" + req.get('host') + "/verify?id=" + rand;
  mailOptions = {
    to: req.query.email,
    subject: "Please confirm your Email account",
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      response.end("error");
    } else {
      console.log("Message sent: " + response.message);
      response.end("sent");
    }
  });
}

app.post('/signup', (req, res) => {
  // You'll create your note here.
  var email = req.query.email;
  var pass = req.query.password;
  var firstname = req.query.firstName;
  var lastname = req.query.lastName;
  var id = Math.floor((Math.random() * 100) + 51);
  var sql = "INSERT into customer (customer_id,email,password,firstName,lastName) VALUES (" + id + ",'" + email + "','" + pass + "','" + firstname + "','" + lastname + "')";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) {
      console.log("error ocurred", err);
      res.send({
        "status": false,
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      veryficationMailSender(req, id);
      res.send({
        "status": true,
        "code": 200,
        "success": "user registered sucessfully"
      });
    }
  });
});

app.post('/login', (req, res) => {
  // You'll create your note here.
  var email = req.query.email;
  var pass = req.query.password;
  var sql = "SELECT * from customer where email='" + email + "' and password='" + pass + "'";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
    if (result) {
       res.send({msg:"Login details found", data:result});
    } else {
      res.send({ msg: "Login details not found", data: null });
    }
  });
});


app.post('/forgot', (req, res) => {
  // You'll create your note here.
  var email = req.query.email;
  var pass = req.query.password;
  var sql = "UPDATE customer set password='" + pass + "' where email='" + email + "'";
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
    res.send("reset done");
  });
});

app.get('/verify', function (req, res) {
  console.log(req.protocol + ":/" + req.get('host'));
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      var sql = "UPDATE customer set isVerified='" + 1 + "' where customer_id='" + rand + "'";
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("email is verified");
        return res.redirect('http://localhost:8100');
      });
    }
    else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  }
  else {
    res.end("<h1>Request is from unknown source");
  }
});
