let express = require("express");
require("dotenv").config();
let app = express();

//Encadenar middleware
const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
});

//Montar función middleware
app.use("/", function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

//Servir un archivo
let absolutePath1 = __dirname + "/views/index.html";
app.get("/", (req, res) => {
  res.sendFile(absolutePath1);
});

//Servir activos estaticos (hojas de estilo, scripts, imágenes)
let absolutePath2 = __dirname + "/public";
app.use("/public", express.static(absolutePath2));

//Crear API para servir JSON
app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  });
});

module.exports = app;
