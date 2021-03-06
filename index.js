const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/Database")
const Game = require("./database/Game")
const app = express();
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

connection.authenticate().then(() => {
      console.log("Conectado com sucesso")
}).catch((erro)  => {
    console.log(erro)
});


app.get("/", function (req,res){
    Game.findAll({raw:true, order: [
        ['id', 'DESC']
    ]}).then((games) => {
      res.render("index", {
          games: games
      });
  })
  });
  app.get("/game", function(req,res) {
    res.render("game");
});
app.post("/salvargame", function(req,res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
   Game.create({
       titulo: titulo,
       descricao: descricao,
       preco: preco
   }).then(()=> {
      res.redirect("/");
   });
});

app.post("/deletar", function(req,res) {
    let id = req.body.id;
 if( id != undefined) {
     if(!isNaN(id)) {
      Game.destroy({
          where: {
              id: id
          }
      }).then(() => {
          res.redirect("/")
      });
    }else {
        res.redirect("/games")
    }
}
});


app.get("/atualizar/:id", async function(req,res) {
    const game = await Game.findByPk(req.params.id);

    res.render("edit", {
        game: game
    })
});

app.post("/atualizar/:id", function(req,res) {
    let id = req.params.id;
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const preco = req.body.preco;
    
    Game.update({ titulo, descricao, preco }, { where: {id} }).then((game) => {
        res.redirect("/");
    }).catch((erro) => {
        console.log(erro)
    })
})


app.listen(8080,() => {
   console.log("Servidor rodando")
});