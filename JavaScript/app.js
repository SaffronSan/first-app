const mysql = require("mysql");
const express = require("express");
const app = express();

const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : "password",
    database : "umk"
})

app.set("view-engine","ejs");

app.get("/",(req,res) =>{
    res.render("index.ejs");
    console.log("rendered");
});
app.use('/css',express.static("css"))
app.use('/JavaScript',express.static("JavaScript"))
app.use(express.urlencoded({extended : false}))
app.listen('3000',()=>{
    console.log("server starts.")
});

app.post("/index.ejs",(req,res) =>{
    var quick = req.body;
    console.log(`FULL DATA => UserName :${quick.userName}, Email: ${quick.email},Title : ${quick.title}, Container : ${quick.container}`);
    db.connect((err)=>{
        if(err){throw err;}
        console.log("connected");
        var post = {title:quick.title,username:quick.userName,email:quick.email,container: quick.container};
        var sql = `INSERT INTO umkTable  SET ?`;
        db.query(sql, post,
            (err, result) => {
                if(err){throw err;}
                console.log("1 record inserted");
            });
    });
})

