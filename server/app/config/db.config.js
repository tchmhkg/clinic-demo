module.exports = {
    HOST: "localhost",
    USER: "truman",
    PASSWORD: "truman",
    DB: "truman_clinic",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };