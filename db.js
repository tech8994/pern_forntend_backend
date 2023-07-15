const Pool=require("pg").Pool;


const poolSchema=new Pool({
     user: "postgres",
     password: "khanzada123",
     host: "localhost",
     port: "5432",
     database: "perntodo" 
});

 module.exports=poolSchema;