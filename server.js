const app = require("./src/app");
const mongoose = require("mongoose");
const config = require("./src/config");

const DB = config.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = config.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server Started on Port", PORT);
});
