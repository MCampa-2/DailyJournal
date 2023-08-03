const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.set("view engine", "ejs");


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/journal');
  console.log("Databse connected");
}

const entryShema = new mongoose.Schema({
  title: String,
  content: String
});

const Entry = new mongoose.model("Entry", entryShema);



app.get("/", function(req, res) {
  Entry.find({})
  .then((posts) =>{
    res.render("index", {journal: posts});
  })
  .catch((error) =>{
    console.log(error)
  })
 
});


app.get("/compose", (req,res) =>{
  res.render("compose");
});


app.post("/compose", (req,res) =>{
const title = req.body.title;
const post = req.body.post;
const entry = new Entry({
  title: title,
  content: post
});
entry.save();
  res.redirect("/");
});

app.get("/entries", (req,res) =>{
  res.render("/entries");
})

app.get("/posts/:entry", (req, res) => {


});



app.listen("3000", function(req,res){
    console.log("Server listening on port 3000");
});

