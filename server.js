const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
require("colors");

//dotenv config
dotenv.config();

//config db
connectDB();

//rest objects
const app = express();

//middlewares

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});
