const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Courses API");
});

app.use("/api/cursos", require("./routes/cursos"));

module.exports = app;
