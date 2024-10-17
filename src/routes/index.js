const utility = require("../helper/utility");
const { restrictedCors } = require("../middleware/corsMiddleware");
const authRoute = require("./authRoute");
const patientRoute = require("./patientRoute");
const authorizationRequestsRoute = require("./authorizationRequestsRoute");

module.exports = (app) => {
  app.use("/api/v1/auth", restrictedCors, authRoute);
  app.use("/api/v1/patient", restrictedCors, patientRoute);
  app.use(
    "/api/v1/authorizationRequests",
    restrictedCors,
    authorizationRequestsRoute
  );

  // Default route. Should be after all defined routes.
  app.all("/*", function (req, res) {
    utility.serverResponse(res, 404, {
      message: `Requested URL: ${req.url} does not exist`,
    });
  });
};
