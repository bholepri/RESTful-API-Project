const express=require("express");
const app=express();
const port=8080;
const path=require("path");

const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override'); 
app.use(methodOverride('_method'));


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let Tasks=[
    {
        id:uuidv4() ,
        Task:"Clone",
        Period:"30 min",
        Description:"Make clone of Netflix , Flipkart , Amazon , Swiggy Anyone one of these using HTML , CSS",
    },
    {
        id:uuidv4(),
        Task:"Portfolio",
        Period:"1 hr",
        Description:"Make your Portfolio including Your Education background, Experince , Skills.",
    },
    {
        id:uuidv4(),
        Task:"Calculator",
        Period:"40 min",
        Description:"Build a Calculator using HTML , CSS , Javascript which performs arithmetic operations like addition , Substraction , Multiplication , Divivion etc.",
    },
    {
        id:uuidv4() ,
        Task:"To-Do app",
        Period:"2 hr",
        Description:"Make To-Do app Using RESTful API's",
    },
    {
        id:uuidv4() ,
        Task:"Weather app",
        Period:"2 hr",
        Description:"Build a weather app using RESTful API's",
    },
];

app.get("/Tasks",(req,res)=>{
    res.render("index.ejs",{Tasks});
});

app.get("/tasks/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/Tasks",( req ,res )=>{
  let {Task,Period,Description}= req.body;
  let id=uuidv4();
   Tasks.push({id,Task,Period,Description});
   res.redirect("/Tasks");
});

app.get("/Tasks/:id",( req ,res )=>{
    let {id}=req.params;
    let Task=Tasks.find((p)=>id === p.id);
    res.render("shows.ejs",{Task});
  });

  app.patch("/Tasks/:id",( req ,res )=>{
    let {id}=req.params;
    let newTask=req.body.Task;
    let Task=Tasks.find((p)=>id === p.id);
    Task.Task=newTask;
    res.redirect("/Tasks");
  });

  app.get("/Tasks/:id/edit",( req ,res )=>{
    let {id}=req.params;
    let Task=Tasks.find((p)=>id === p.id);
    res.render("edit.ejs",{Task});
      });

 app.delete("/Tasks/:id",( req ,res )=>{
        let {id}=req.params;
         Tasks=Tasks.filter((p)=>id !== p.id);
        res.redirect("/Tasks");
    });
    
app.listen(port,()=>{
    console.log(`Listening the port ${port}`);
});