const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");

//EXPRESS LENDO JSON
app.use(
  express.urlencoded({
    extend: true,
  })
);
app.use(express.json());
//EXPRESS LENDO JSON

//ROTA INICIAL
app.get("/", (req, res) => {});
//ROTA INICIAL

//DEMAIS ROTAS
const productRoutes = require("./routes/productsRoutes");
app.use("/product", productRoutes);

//CONECTANDO MONGOOSE E INICIANDO SERVIDOR
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.fvo7p.mongodb.net/estoque?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connect mongodb");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
