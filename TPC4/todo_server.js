var http = require('http')
var axios = require('axios')
var templates = require('./page.js')
var static = require('./static.js')
const { parse } = require('querystring');
const { url } = require('inspector');

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var todoServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /lista --------------------------------------------------------------------
                axios.get("http://localhost:3000/lista")
                    .then(response => {
                        let lista = response.data
                        // Render page with the student's list
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(templates.myPage(lista))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possivel obter a lista de alunos... Erro: " + erro)
                        res.end()
                    })
                break;
            case "POST":
                collectRequestBodyData(req, result => {
                    if(result){
                        console.log(result);
                        var temp = {
                            id: result.id,
                            dateDued: result.dateDued,
                            desciption: result.desciption,
                            author: result.author,
                            done: result.done
                        }
                        if(temp.done == "false") {
                            temp.done = true;
                            axios.delete(
                              "http://localhost:3000/lista/" + temp.id
                            )
                            
                            axios.post("http://localhost:3000/lista", temp)
                            
                        }
                        else if(temp.done == null) {
                            temp.done = false;
                            axios.post("http://localhost:3000/lista", temp)
                        }
                        console.log("Done");
                        res.writeHead(302, { Location: "/" });
                        res.end();
                        
                    }
                    else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                    break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
                break;
        }
    }
    
})

todoServer.listen(7777, ()=>{
    console.log("Servidor Ã  escuta na porta 7777...")
})
