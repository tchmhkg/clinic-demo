const db = require("../models");
const Consultation = db.consultation;
const User = db.user;

exports.addConsultations = (req, res) => {
  // Save to Database
  Consultation.create({
    doctorName: req.body.doctorName,
    patientName: req.body.patientName,
    diagnosis: req.body.diagnosis,
    medication: req.body.medication,
    consultationFee: req.body.consultationFee,
    date: req.body.date,
    time: req.body.time,
    followUp: req.body.followUp,
  })
    .then((consultation) => {
      User.findOne({
        where: {
          id: req.body.userId,
        },
      }).then((user) => {
          if(!user) {
            res.send({
                success: false,
                message: "User not found",
            });
          }
        consultation.setUser(user.id).then(() => {
          res.send({
            success: true,
            message: "Consultation was created successfully!",
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
};

exports.getConsultations = (req, res) => {
    let functionCall = Consultation.findAll({
        where: {
            userId: req.query.userId
        },
    })
    if(req.query.id) {
        functionCall = Consultation.findOne({
            where: {
                userId: req.query.userId,
                id: req.query.id
            },
        })
    }
    functionCall.then((consultation) => {
      if (!consultation) {
        return res
          .status(200)
          .send({ success: false, data: [], message: "Consultation Not found." });
      }

      res.status(200).send({
        success: true,
        data: consultation,
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
};
