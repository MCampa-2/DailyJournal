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
  await mongoose.connect('mongodb+srv://Mike6453:FcrurqixLwctsM5a@cluster0.di7wtce.mongodb.net/journal');
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
  res.render("entries")
})


app.get("/posts/:entry", async (req, res) => {
  const paramName = req.params.entry;
  const doc = await Entry.findOne({_id: paramName});
  if(doc){
    res.render("entries.ejs",{title: doc.title, content: doc.content});
  }else{
    console.log(error)
  }
  
  });


  let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

  

app.listen(port, function(req,res){
    console.log("Server listening successfully");
});



//FcrurqixLwctsM5a
//Mike6453