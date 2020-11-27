module.exports = (sequelize, Sequelize) => {
  const Consultation = sequelize.define("consultations", {
    doctorName: {
      type: Sequelize.STRING,
    },
    patientName: {
      type: Sequelize.STRING,
    },
    diagnosis: {
      type: Sequelize.TEXT,
    },
    medication: {
      type: Sequelize.TEXT,
    },
    consultationFee: {
      type: Sequelize.FLOAT,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    time: {
      type: Sequelize.TIME,
    },
    followUp: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Consultation;
};
