const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"social_eventrid"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const img = req.body.img;
    const descripcion = req.body.descripcion;

    db.query('INSERT INTO meme(nombre,descripcion,imagen,id_usuario) VALUES(?,?,?,?)',[nombre,descripcion,img,1],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Meme registrado con exito!!");
        }
    }
    );
});

app.post("/very",(req,res)=>{
    const usu = req.body.usuario;
    const contra = req.body.contra;
  

    db.query('SELECT * FROM usuario a WHERE a.usuario = ? AND a.`contraseña`= ? AND a.estado=1',[usu,contra],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.post("/memedata",(req,res)=>{
    const page = req.body.page;
    const limit = req.body.limit;
  

    db.query('SELECT * FROM(SELECT ROW_NUMBER() OVER(ORDER BY (select null)) AS fila,id, nombre,descripcion,imagen,id_usuario,estado FROM meme a WHERE a.estado = 1 ) b WHERE b.fila >=(5*?-4) AND b.fila <=(5*?)',[page,page],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.post("/meme",(req,res)=>{
    const id = req.body.id;
    db.query('SELECT * FROM(SELECT a.id,a.nombre,a.descripcion AS descrimeme,a.imagen,b.desdripcion AS likess FROM meme a LEFT JOIN likes b ON a.id = b.id_meme) c LEFT JOIN comentario d ON c.id = d.id_meme WHERE c.id = ?',[id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.listen(3001,()=>{
    console.log("prueba correcta");
})