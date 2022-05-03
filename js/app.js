// CRUD: CREATE-READ-UPDATE-DELETE

'use strict'

import {openModal, closeModal} from './modal.js'

import {creatClients, readClients, deleteClients, 
readClientById, fillFormClients, updateClients} from './client.js' 

const creatRow = (clients) =>{

    const row = document.createElement('tr')
    row.innerHTML = `
                    <td>${clients.nome}</td>
                    <td>${clients.email}</td>
                    <td>${clients.celular}</td>
                    <td>${clients.cidade}</td>
                    <td>
                        <button type="button" class="button green" id="editar-${clients.id}">editar</button>
                        <button type="button" class="button red" id="excluir-${clients.id}">excluir </button>
                    </td>
    `
    return row

}

const updateTable = async() =>{

    const clientsContainer = document.getElementById('customers-container')

    const clients = await readClients()
    const rows = clients.map(creatRow)

    clientsContainer.replaceChildren(...rows)
}

const saveClient = async () =>{

    const client = {
        "id":       "",
        "nome":     document.getElementById('nome').value,
        "email":    document.getElementById('email').value,
        "celular":  document.getElementById('celular').value,
        "cidade":   document.getElementById('cidade').value
    }

    await createClients(client)

    closeModal()
    updateTable()
}

const editClient = async() =>{

    const client = {
        "id":       document.getElementById('enviar').value,
        "nome":     document.getElementById('nome').value,
        "email":    document.getElementById('email').value,
        "celular":  document.getElementById('celular').value,
        "cidade":   document.getElementById('cidade').value
    }

    await updateClients(client)

    closeModal()
    updateTable()

}

const sendClient = async(event) =>{

    const method = event.target.textContent.toUpperCase()

    if(method == 'SALVAR'){
        await saveClient()

    }else if(method == 'EDITAR'){
        await editClient()
    }

    clearForm()
}

const actionClient = async(event) =>{

    if(event.target.type == 'button'){

        const[action, id] = event.target.id.split('-')

        if(action == 'editar'){

            const button = document.getElementById('enviar')

            button.textContent = 'Editar'
            button.value = id

            openModal()
        
        }else if(action == 'excluir'){

            await deleteClients(id)

            updateTable()
        }
    }
}

const clearForm = () =>{

    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('celular').value = ''
    document.getElementById('cidade').value = ''

    const button = document.getElementById('enviar')
    button.textContent = 'Salvar'
    button.value = ''
}

updateTable()

document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('enviar').addEventListener('click', sendClient)
document.getElementById('customers-container').addEventListener('click', actionClient)
