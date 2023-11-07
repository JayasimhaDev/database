const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 1890;
const app = express();
app.use(express.json());
app.use(cors());
//hello
mongoose
  .connect(
    "mongodb+srv://jayawebx01:13n3c24018@cluster0.kxhgjnf.mongodb.net/Movieapp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(" Mongodb connection successfully");
  });
const userschema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});
const User = mongoose.model("User", userschema);

app.post("/register", async (req, res) => {
  console.log(await req.body);
  let user = await new User(req.body);
  user.save((err, response) => {
    if (err) {
      res.send({ message: "error while adding item" });
    } else {
      res.send({ message: "User added successfully" });
    }
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  User.find({ email: email }, (err, response) => {
    if (err) {
      res.send({ message: "error while adding item" });
    } else {
      if (response.length > 0) {
        if (response[0].password === password) {
          res.send(response);
        } else {
          res.send({ message: "password did't match" });
        }
      } else {
        res.send({ message: "user not registered" });
      }
    }
  });
});
app.listen(port, () => console.log("Server is running"));
