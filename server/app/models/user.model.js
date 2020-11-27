module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    clinicName: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.TEXT
    }
  });

  return User;
};
