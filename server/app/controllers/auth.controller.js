const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.verify = (req, res) => {
  let token = req.body.token;

  if (!token) {
    return res.status(200).send({
      success: false,
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({
        success: false,
        message: "Unauthorized or token expired! Please login again.",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "valid",
      });
    }
  });
};

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    clinicName: req.body.clinicName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              success: true,
              message: "User was registered successfully!",
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({
            success: true,
            message: "User was registered successfully!",
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(200)
          .send({ success: false, message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).send({
          success: false,
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            clinicName: user.clinicName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            roles: authorities,
            accessToken: token,
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
};
