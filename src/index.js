const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const productsRouter = require("./products/products.controller");
app.use("/products", productsRouter);

app.listen(PORT, () => console.log("Server Listening on port: " + PORT));
