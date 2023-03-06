exports.pessoasPage = function (lista) {
    var paghtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>About People...</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Pessoas</h1>
                </header>
                <button class="w3-button w3-round-large w3-teal"><a href="genero">Distribuição por Género</a></button>
                <button class="w3-button w3-round-large w3-teal"><a href="Desportos">Distribuição por Desporto</a></button>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th><th>Mais inforomações</th>
                        </tr>
    `

    for (let i = 0; i < lista.length; i++) {
        paghtml += `
                <tr>
                    <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td><td class="w3-center"><button class="w3-button w3-round-large w3-teal"><a href="${lista[i].id}">Mais Info</a></button></td>
                </tr>
        `
    }

    paghtml += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return paghtml;
}

exports.generoPage = function (lista) {

    var fem = 0;
    var masc = 0;
    var nb = 0;
    for(let i=0; i<lista.length; i++) {
        if(lista[i].sexo == "masculino") masc++;
        else if(lista[i].sexo == "feminino") fem++;
        else nb++;
    }

    var paghtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Genero</title>
        </head>
        <body>
            <div class="w3-card-4">
    
                <header class="w3-container w3-teal">
                    <h1>Distribuição por Género</h1>
                </header>
    
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Género</th><th>Quantidade</th>
                        </tr>
                        <tr>
                            <td button class="w3-button w3-round-large w3-teal"><a href="gf">Feminino</a></button></td><td>${fem}</td>
                        </tr>
                        <tr>
                            <td button class="w3-button w3-round-large w3-teal"><a href="gm">Masulino</a></button></td><td>${masc}</td>
                        </tr>
                        <tr>
                            <td button class="w3-button w3-round-large w3-teal"><a href="go">Outro</a></button></td><td>${nb}</td>
                        </tr>
                    </table>
                </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return paghtml;
}

exports.pessoaPage = function (pessoa) {
    var paghtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>People...</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>${pessoa.nome}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><td>${pessoa.id}</td>
                        </tr>
                        <tr>
                            <th>Nome</th><td>${pessoa.nome}</td>
                        </tr>
                        <tr>
                            <th>Idade</th><td>${pessoa.idade}</td>
                        </tr>
                        <tr>
                            <th>Sexo</th><td>${pessoa.sexo}</td>
                        </tr>
                        <tr>
                            <th>Morada</th><td>${pessoa.morada.cidade}, ${pessoa.morada.distrito}</td>
                        </tr>
    
    `

    if (pessoa.CC == null || pessoa.CC == "") {
        paghtml += `
                        <tr>
                            <th>BI</th><td>${pessoa.BI}</td>
                        </tr>
        `
    }
    else {
        paghtml += `
                        <tr>
                            <th>CC</th><td>${pessoa.CC}</td>
                        </tr>
        `
    }
    if(pessoa.descrição != null) {
        paghtml += `
                        <tr>
                            <th>Descrição</th><td>${pessoa.descrição}</td>
                        </tr>
        `
    }
    paghtml += `
                        <tr>
                            <th>Profissão</th><td>${pessoa.profissao}</td>
                        </tr>
                        <tr>
                            <th>Partido Politico</th><td>${pessoa.partido_politico.party_name}</td>
                        </tr>
                        <tr>
                            <th>Religião</th><td>${pessoa.religiao}</td>
                        </tr>
                        <tr>
                            <th>Desportos</th><td>`


    for (let i = 0; i<pessoa.desportos.length; i++) {
        paghtml+= `${pessoa.desportos[i]}, `
    }

    paghtml += `            </td>
                        </tr>
                        <tr>
                            <th>Animais</th><td>
    `
    
    for (let i = 0; i<pessoa.animais.length; i++) {
        paghtml+= `${pessoa.animais[i]}, `
    }

    paghtml += `            </td>
                        </tr>
                        <tr>
                            <th>Figuras publicas</th><td>
    `
    
    for (let i = 0; i<pessoa.figura_publica_pt.length; i++) {
        paghtml+= `${pessoa.figura_publica_pt[i]}, `
    }
    
    paghtml += `            </td>
                        </tr>
                        <tr>
                            <th>Destinos Favoritos</th><td>
    `
    
    for (let i = 0; i<pessoa.destinos_favoritos.length; i++) {
        paghtml+= `${pessoa.destinos_favoritos[i]}, `
    }

    paghtml += `
                            </td>
                        </tr>
                        <tr>
                            <th>Marca do Carro</th><td>${pessoa.marca_carro}</td>
                        </tr>
                        <tr>
                            <th>Fuma</th><td>${pessoa.atributos.fumador}</td>
                        </tr>
                        <tr>
                            <th>Gosta de Cinema</th><td>${pessoa.atributos.gosta_cinema}</td>
                        </tr>
                        <tr>
                            <th>Gosta de Viajar</th><td>${pessoa.atributos.gosta_viajar}</td>
                        </tr>
                        <tr>
                            <th>Acorda Cedo</th><td>${pessoa.atributos.acorda_cedo}</td>
                        </tr>
                        <tr>
                            <th>Gosta de Ler</th><td>${pessoa.atributos.gosta_ler}</td>
                        </tr>
                        <tr>
                            <th>Gosta de Musica</th><td>${pessoa.atributos.gosta_musica}</td>
                        </tr>
                        <tr>
                            <th>Gosta de Comer</th><td>${pessoa.atributos.gosta_comer}</td>
                        </tr>
                        <tr>
                            <th>Gosta de Animais de Estimação</th><td>${pessoa.atributos.gosta_animais_estimacao}</td>
                        </tr>
                        <tr>
                            <th>Gosta de Dançar</th><td>${pessoa.atributos.gosta_dancar}</td>
                        </tr>
                        <tr>
                            <th>Comida Favorita</th><td>${pessoa.atributos.comida_favorita}</td>
                        </tr>
                    </table>
                </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    
    `
    return paghtml
}

exports.generoListPage = function(genero, lista) {

    var paghtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Distribuição por Genero.</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Pessoas do Género ${genero}</h1>
                </header>
                <button class="w3-button w3-round-large w3-teal"><a href="genero">Distribuição por Género</a></button>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th><th>Mais inforomações</th>
                        </tr>
    `

    for (let i = 0; i < lista.length; i++) {

        if(lista[i].sexo == genero) {

            paghtml += `
                <tr>
                    <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td><td class="w3-center"><button class="w3-button w3-round-large w3-teal"><a href="${lista[i].id}">Mais Info</a></button></td>
                </tr>
        `
        }
        
    }

    paghtml += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return paghtml;
}

exports.desportosPage = function(lista) {
    var paghtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Desportos</title>
        </head>
        <body>
            <div class="w3-card-4">
    
                <header class="w3-container w3-teal">
                    <h1>Distribuição por Desporto</h1>
                </header>
    
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th><th>Quantidade</th>
                        </tr>
    `

    var items = Object.keys(lista).map(function(key) {
        return [key, lista[key]];
      });
      
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
    
    for (const [key, value] of Object.entries(items)) {
        paghtml += `
        <tr>
            <td button class="w3-button w3-round-large w3-teal"><a href="/desporto=${value[0]}">${value[0]}</a></button></td>
            <td>${value[1]}</td>
        </tr>
        `
    }

    paghtml += `
                    </table>
                </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return paghtml;
}

exports.desportoListPage = function(desporto, lista) {

    var paghtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Distribuição por Genero.</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de Pessoas que praticam ${desporto}</h1>
                </header>
                <button class="w3-button w3-round-large w3-teal"><a href="genero">Distribuição por Género</a></button>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th><th>Mais inforomações</th>
                        </tr>
    `
    for (let i = 0; i < lista.length; i++) {
        lista[i].desportos.forEach(element => {
            if(element == desporto) {
                paghtml += `
                <tr>
                    <td>${lista[i].id}</td><td>${lista[i].nome}</td><td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td><td class="w3-center"><button class="w3-button w3-round-large w3-teal"><a href="${lista[i].id}">Mais Info</a></button></td>
                </tr>
        `
            }
        });
    }

    paghtml += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in RPCW2023</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return paghtml;
}