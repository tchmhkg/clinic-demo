const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const config = require("./app/config/db.config.js");

const app = express();

var corsOptions = {
  origin: "*",//"http://localhost:3001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Op = db.Sequelize.Op;
const Role = db.role;
const User = db.user;

// Production
db.sequelize.sync();
// Development
// createDb().then(() => {
//     db.sequelize.sync({ force: true }).then(() => {
//         console.log("Drop and Resync Db");
//         initial();
//       });
// });


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
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });

  User.create({
    id: 1,
    email: "hqclinic@truman.com",
    password: bcrypt.hashSync("hq@1234", 8),
    clinicName: "HQ",
    phoneNumber: "98209852",
    address: "12/F, HQ Building, Clinic Road, Kowloon",
    roles: ["admin"],
  }).then((user) => {
    Role.findAll({
      where: {
        name: {
          [Op.or]: ["admin"],
        },
      },
    }).then((roles) => {
      user.setRoles(roles);
    });
  });

  User.create({
    id: 2,
    email: "hkclinic@truman.com",
    password: bcrypt.hashSync("hk@1234", 8),
    clinicName: "HK Health Clinic",
    phoneNumber: "29987890",
    address: "1/F, Health Tower, Clinic Road, New Territories",
    roles: ["user"],
  }).then((user) => {
    Role.findAll({
      where: {
        name: {
          [Op.or]: ["user"],
        },
      },
    }).then((roles) => {
      user.setRoles(roles);
    });
  });
}
