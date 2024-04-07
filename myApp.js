require("dotenv").config();

let express = require("express");
let app = express();
let path = require("path");
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/public", (req, res) => {
  //   res.send("Hello Express");
  res.sendFile(
    "/Users/apple/Documents/JS/fcc/boilerplate-express/views/index.html"
  );
});

app.get("/json", (req, res) => {
  let responseMessage = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    responseMessage = responseMessage.toUpperCase();
  }

  res.json({ message: responseMessage });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  word = req.params.word;
  res.json({ echo: word });
});

app
  .route("/name")
  .get((req, res) => {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
  })
  .post((req, res) => {
    const { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });

app.use("/public", express.static(path.join(__dirname, "public")));

console.log("Hello World");

module.exports = app;
