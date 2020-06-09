/*
    A FUNÇÃO REQUIRE FAZ UMA REQUISIÇÃO NA DEPENDÊNCIA INSTALADA

    O MÉTODO VERBOSE CONFIGURA O SQLITE3 PARA EMITIR INFORMAÇÕES NO TERMINAL
*/
// IMPORTANDO DEPENDÊNCIA DO SQLITE3
const sqlite3 = require("sqlite3").verbose()
/*
    A EXPRESSÃO NEW SERVE PARA INICIAR UM NOVO OBJETO, DESDE QUE ELE SEJA UMA CLASSE OU CONSTRUCTION
*/
// CRIAR O OBJETO QUE IRÁ FAZER OPERAÇÕES NO BANCO DE DADOS
const db = new sqlite3.Database("./src/database/database.db")

// UTILIZAR O OBJETO DE BANCO DE DADOS 
/*
db.serialize(() => {
    // CRIANDO TABELA NO BANCO COM COMANDOS SQL
    /*db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items
        );
    `)
    // INSERINDO DADOS NA TABELA
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]
    // FUNÇÃO PARA VERIFICAR ERRO DEPOIS DA INSERÇÃO DE DADOS
    function afterInsertData(err){
        if (err) {
            // RETORNA PARA O ADMINISTRADOR DE SISTEMA O ERROR 
            return console.log(err)
        }
        // SE NÃO FOR ENCONTRADO NENHUM ERRO
        console.log("Cadastrado com sucesso")
        console.log(this) 
    }
    // INICIALIZANDO A TABELA COM OS VALORES ATUALIZADOS
    db.run(query, values, afterInsertData) 

    // CONSULTAR DADOS DA TABELA
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err){
            console.log(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)
    })
*/
    // DELETAR DADOS DA TABELA
 /*
    db.run(`DELETE FROM places WHERE id = ?`, [7], function (err) {
        if (err) {
            console.log(err)
        }
        console.log("Registro deletado com sucesso")
    }) 
})
*/
module.exports = db 
