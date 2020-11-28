const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const config = require("./app/config/db.config.js");

const app = express();
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

var corsOptions = {
  origin: "*", //"http://localhost:3001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const User = db.user;

// Production
// db.sequelize.sync();
// Development
createDb().then(() => {
  db.sequelize.sync({ force: !isProduction }).then(() => {
    if (!isProduction) {
      console.log("Drop and Resync Db");
      initial();
    }
  });
})
.catch(err => {
  console.log(err);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/consultation.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function createDb() {
  const { HOST, USER, PASSWORD, DB } = config;
  const connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);
}

function initial() {
  User.create({
    id: 1,
    email: "hqclinic@truman.com",
    password: bcrypt.hashSync("hq@1234", 8),
    clinicName: "HQ",
    phoneNumber: "98767890",
    address: "12/F, HQ Building, Clinic Road, Kowloon",
  }).catch(function (err) {
    console.log(err);
  });

  User.create({
    id: 2,
    email: "hkclinic@truman.com",
    password: bcrypt.hashSync("hk@1234", 8),
    clinicName: "HK Health Clinic",
    phoneNumber: "29987890",
    address: "1/F, Health Tower, Clinic Road, New Territories",
  }).catch(function (err) {
    console.log(err);
  });
}
