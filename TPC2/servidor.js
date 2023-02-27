var http = require('http');
var fs = require('fs');


http.createServer(function (req, res) {
    var numPag = req.url.substring(1,2);
    let output;
    fs.readFile("output/arq" + numPag + ".xml", function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/xml; charset=utf-8'});
        console.log(numPag);
        if(err) {
            res.write('Erro: ' + err);
            output = "Error";
        }
        else
            res.write(data);
        
        res.end();
    
    });

    
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');