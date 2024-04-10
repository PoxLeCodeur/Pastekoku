const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bombRouter = require("./routes/bomb.js");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.send("Hello Wolrd");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.use(express.static("public"));

app.use("/bomb", bombRouter);

app.listen(port, () => {
  console.log(`Application launched on http://localhost:${port}`);
});

var server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`Server runing at http://${host}${port}`);
});
