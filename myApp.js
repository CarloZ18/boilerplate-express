let express = require("express");
require("dotenv").config();
let app = express();

//Montar función middleware
app.use("/", function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

//Encadenar middleware
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

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

app.get("/:word/echo", (req, res) => {
  res.json({echo:req.params.word});
});

app.route(`/name?first=firstname&last=lastname`).get((req,res)=>{
res.json({
  name:`${req.query.first} ${req.query.last}`
})
})

module.exports = app;
