const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
let PORT = process.env.PORT || 5001;
// middleware
app.use(cors());
// whenever we get the data from client side we get in req.body whenever we get the data in req.body we get in json format
app.use(express.json());

// create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todos (description) VALUES($1) RETURNING *",  [
      description,
    ]);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});


// get all todo
app.get("/all-todos", async(req, res) =>{  
   try{
     const alltodos=await pool.query("SELECT * FROM todos");
     res.json(alltodos.rows);
   }catch(err){
    console.error(err.message);
   }    
});

// get specific todo
app.get("/todos/:id",async (req, res) =>{

    try {
        //  console.log(req.params);
         const {id}=req.params;
         let getTodo=await pool.query("SELECT * FROM todos WHERE todoid = $1",[id]);
         res.json(getTodo.rows)
    } catch (error) {
        console.error(error.message);
    }
})
// update the specific todo

app.put("/todos/:id", async (req, res)=>{
   try {
    const {id}=req.params;
    const {description}=req.body;
    const updateTodo=await pool.query("UPDATE todos SET description = $1 WHERE todoid = $2",[description, id]);
    res.json({message: "Succesfully update"});
   } catch (error) {
    console.error(error.message)
   }
});

// delete the specific todo
app.delete("/todo/:id",async(req, res) =>{
    try {
     const {id}=req.params;
     const deleteTodo=await pool.query("DELETE FROM todos WHERE todoid = $1",[id]);
     res.json({message: "Successfully Deleted!"})    

    } catch (error) {
        console.error(error.message);
    }
})

app.listen(PORT, () => {
  console.log(`The Port is Runing on ${PORT}`);
});
