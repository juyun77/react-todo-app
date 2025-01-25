const express = require("express");
const app = express();
const PORT = 8080;
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const serverPerfix = "/api-server";
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//서버라는것이 인식이 되도록 접두사 잘 써주기.
// /api-server
app.use(serverPerfix, indexRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("database sync 오류!");
  });
