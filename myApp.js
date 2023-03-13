let express = require('express');
let app = express();
require('dotenv').config()


//Servir un archivo
let absolutePath1 = __dirname + '/views/index.html'
app.get('/', (req,res) => {
  res.sendFile(absolutePath1);
})


//Servir activos estaticos (hojas de estilo, scripts, imágenes)
let absolutePath2 = __dirname + '/public'
app.use('/public',express.static(absolutePath2))

//Crear API para servir JSON
app.get('/json', (req,res) => {
if(process.env.MESSAGE_STYLE === uppercase){
   res.json({"message": "HELLO JSON"})
}else{
  res.json({"message": "Hello json"})
}
  })
  






























 module.exports = app;
