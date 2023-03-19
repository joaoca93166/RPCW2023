var axios = require('axios')

module.exports.list = () => {
    return axios.get('http://localhost:3000/lista?_sort=id')
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateTask = (task) => {
    var temp = {
        id: task.id,
        dateDued: task.dateDued,
        description: task.description,
        author: task.author,
        done: task.done
    }
    if(temp.done == "false") {
        temp.done = true;
        axios.delete(
          "http://localhost:3000/lista/" + temp.id
        )
        
        return axios.post("http://localhost:3000/lista", temp)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
        
    }
    else if(temp.done == null) {
        temp.done = false;
        return axios.post("http://localhost:3000/lista", temp)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
    }
}



