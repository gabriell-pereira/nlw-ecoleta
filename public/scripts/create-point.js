function populateUFs() {
    
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) { 

            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
        }
   
    } )

}

populateUFs()

function getCities(event) {

    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true 

    
    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {

                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        } ) 

}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)

    

// ITENS DE COLETA 

// PEGAR TODOS LI`S
const itemsToCollect = document.querySelectorAll(".items-grid li")

// PERCORRENDO CADA LI
for(const item of itemsToCollect) { 
    //ADICIONANDO EVENTOS DE CLICK NA LISTA DE LI`S
    item.addEventListener("click", handleSelectedItem)
}

// ARMAZENA ITEMS SELECIONADOS DENTRO DE UMA VARIÁVEL ESCONDIDA
const collectedItems = document.querySelector("input[name=items]")

// COLEÇÃO COM OS DADOS AS LI`S SELECIONADAS
let selectedItems= []

// FUNCAO DE MANIPULAÇÃO DOS ITEMS SELECIONADOS
function handleSelectedItem(event) {

    // PEGANDO A LI QUE RECEBE O EVENTO CLICK 
    const itemLi = event.target
    
    // ADICIONAR OU REMOVER UMA CLASSE COM JAVASCRIPT NO MOMENTO EM QUE CLICKAR EM UM ELEMENTO
    itemLi.classList.toggle("selected") // SELECTED É UM CLASSE CSS COM ALGUNS ESPECIFICIDADES DE ESTILO
    
    // PEGANDO A LI QUE RECEBE O EVENTO CLICK E ARMAZENANDO O VALOR DO DATASET-ID
    const itemId = itemLi.dataset.id
    
    /* 
        VERIFICAR SE EXISTEM ITEMS SELECIONADOS

        SE SIM, PEGAR OS ITEMS SELECIONADOS 

            SE JÁ TIVER SELECIONADO, TIRAR DA SELEÇÃO

        SE NÃO, 
            
            ADICIONAR A SELEÇÃO

        ATUALIZAR O CAMPO ESCONDIDO COM OS ITEMS SELECIONADOS
        
    */

    const alreadySelected = selectedItems.findIndex( function(item){
    
        // ARMAZENANDO O VALOR BOOLEANO RETORNADO PELA COMPARAÇÃO DE VALORES ENTRE ITEM E ITEM ID
        const itemFound = item == itemId
        return itemFound
    })
    
    // VERIFICANDO SE HÁ ALGUM ITEM SELECIONADO

    /*
        A CONSTANTE ALREADYSELECTED É IGUAL A -1 QUANDO O ITEM CLICADO NÃO ESTÁ SELECIONADO
        A CONSTANTE ALREADY SELECTED É MAIOR OU IGUAL A 0 QUANDO ALGUM DOS ITEMS CLICADOS ESTÁ SELECIONADO
    */

    // SE JÁ TIVER ALGUM ITEM SELECIONADO
    if(alreadySelected >= 0){
        
        // TIRAR ITEM DOS ITEMS SELECIONADOS
        const filteredItems = selectedItems.filter( function(item){

            // ARMAZENA OS ITEMS FILTRADOS EM UMA NOVA ARRAY
            const itemIsDifferent = item != itemId // VERIFICA SE HÁ ITENS REPETIDOS E RETORNA UM VALOR FALSE CASO HAJA
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    }
    
    // SE NÃO TIVER NENHUM ITEM SELECIONADO
    else {

        // ADICIONAR O ID NA ARRAY
        selectedItems.push(itemId)
    }

    // ATUALIZANDO O VALOR DO CAMPO ESCONDIDO DE ACORDO COM OS ITENS SELECIONADOS
    collectedItems.value = selectedItems
}   