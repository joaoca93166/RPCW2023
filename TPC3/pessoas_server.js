var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function (req, res) {

    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    var dicURL = url.parse(req.url, true)
    const idpessoa = /^\/p\d+$/;
    const expgenero = /^\/g(f|m|o)$/;


    if (dicURL.pathname == "/"){
        axios.get('http://localhost:3000/pessoas').then(function (resp) {
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("Erro axios: " + error);
        });
    }
    else if (dicURL.pathname == "/ordenada" ) {
        axios.get("http://localhost:3000/pessoas?_sort=nome&order=asc")
            .then( function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( erro => {
                console.log("Erro axios: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("ERRO axios: " + erro)
            })
    }
    else if(dicURL.pathname == "/ordenadav2"){
        axios.get('http://localhost:3000/pessoas').then(function (resp) {
            var pessoas = resp.data;
            let pessoasOrdenadas = pessoas.sort(
                (p1,p2) => (p1.nome < p2.nome) ? -1 : 1
            )
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoasPage(pessoasOrdenadas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("Erro: " + error);
        });
    }
    else if(dicURL.pathname.match(idpessoa)){
        axios.get(`http://localhost:3000/pessoas/${dicURL.pathname.split("/")[1]}`).then(function (resp) {
            var pessoa = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoaPage(pessoa));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("Erro: " + error);
        });
    }
    else if(dicURL.pathname == "/genero") {
        axios.get('http://localhost:3000/pessoas').then(function (resp){
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.generoPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("Erro: " + error);
        });
    }
    else if(dicURL.pathname.match(expgenero)){
        axios.get(`http://localhost:3000/pessoas`).then(function (resp) {
            var lista = resp.data;
            var genero = dicURL.pathname.split("/")[1];
            if(genero == "gf") genero = "feminino";
            else if(genero == "gm") genero = "masculino";
            else genero = "outro";
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.generoListPage(genero, lista));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("Erro: " + error);
        });
    }
    else if(dicURL.pathname == "/Desportos") {
        axios.get('http://localhost:3000/pessoas').then(function (resp){
            var pessoas = resp.data;
            var lista = {};
            for (let i = 0; i < pessoas.length; i++) {
                pessoas[i].desportos.forEach(element => {
                    if (lista.hasOwnProperty(element)) {
                        lista[element] += 1;
                    } else {
                        lista[element] = 1;
                    }
                });
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.desportosPage(lista));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("Erro: " + error);
        });
    }
    else if(dicURL.pathname.startsWith("/desporto=")){
        axios.get(`http://localhost:3000/pessoas`).then(function (resp) {
            var desporto = dicURL.pathname.split("=")[1];
            desporto = desporto.replaceAll('%20', ' ');
            var lista = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.desportoListPage(desporto, lista));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("Erro: " + error);
        });
    }
    else if(dicURL.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                console.log("Erro na leitura da stylesheet.")
                res.write("Erro: " + err)
            }
            else
                res.write(data)
            res.end()
        })
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("Erro: Operação não suportada!");
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");
