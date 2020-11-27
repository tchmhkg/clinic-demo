const { authJwt } = require("../middleware");
const controller = require("../controllers/consultation.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/consultations", [authJwt.verifyToken], controller.addConsultations);

  app.get("/api/consultations", [authJwt.verifyToken], controller.getConsultations);
};
