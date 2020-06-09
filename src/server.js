const express = require("express") // FAZ UMA REQUISIÇÃO NAS DEPENDÊNCIAS DA FUNÇÃO EXPRESS E ARMAZENA NA CONSTANTE 
const server = express() // ARMAZENA A FUNÇÃO EXPRESS DENTRO DA CONSTANTE SERVER, TORNANDO-A UM OBJETO

// IMPORTANTO O BANCO DE DADOS
const db = require("./database/db")

// CONFIGURAR PASTA PÚBLICA
server.use(express.static("public"))

// HABILITAR O USO DO REQ.BODY NA APLICAÇÃO
server.use(express.urlencoded({ extended: true }))

// UTILIZANDO TAMPLATE ENGINE NUNJUCKS NO HTML

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// CONFIGURAR CAMINHOS DA APLICAÇÃO
    /*  

    REQ: É UMA REQUISIÇÃO DO SERVIDOR
    RES: É A RESPOSTA DO SERVIDOR

    */
// ACESSANDO A HOME
server.get("/", (req,res) => {
    // A FUNÇÃO SEND ENVIA DADOS PARA O SERVIDOR
    // A FUNÇÃO SENDFILE ENVIA ARQUIVOS PARA O SERVIDOR
    // A FUNÇÃO RENDER VAI RENDERIZAR OS ARQUIVOS PARA O SERVIDOR
    return res.render("index.html", {title: ""})  
})

// ACESSANDO O CREATE-POINT
server.get("/cadastro", (req, res) => {
    // REQ.QUERY É AS QUERY STRINGS DA URL (EX.: &state=Maranhão) FAZ A REQUISIÇÃO E ENVIA PARA O BACKEND
    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // REQ.BODY É O CORPO DO FORMULÁRIO
    //console.log(req.body)
    
    // INSERINDO DADOS NO BANCO DE DADOS
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    
    // ARMAZENANDO VALORES EM UMA CONSTANTE
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    // FUNÇÃO PARA VERIFICAR ERRO DEPOIS DA INSERÇÃO DE DADOS
    function afterInsertData(err) {
        if (err) {
            // RETORNA PARA O ADMINISTRADOR DE SISTEMA O ERROR 
            console.log(err)
            return res.send("Error no cadastro.")
        }
        // SE NÃO FOR ENCONTRADO NENHUM ERRO
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved:true })
    }
    // INICIALIZANDO A TABELA COM OS VALORES ATUALIZADOS
    db.run(query, values, afterInsertData)
})

// ACESSANDO O SEARCH-RESULTS
server.get("/search", (req, res) => {
    
    const search = req.query.search

    if(search == ""){
        // PESQUISA VAZIA
        return res.render("search-results.html", { total: 0 })
    }
    
    // CONSULTAR DADOS DO BANCO DE DADOS
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err)
        }
    
        
        // CONTANDO QUANTOS RESULTADOS FORAM EXIBIDOS NA ARRAY
        const total = rows.length
        // EXIBIR A PÁGINA HTML COM OS DADOS DO BANCO DE DADOS
        return res.render("search-results.html", {places: rows, total: total})
    
    })
})

// LIGAR O SERVIDOR
server.listen(8080)


