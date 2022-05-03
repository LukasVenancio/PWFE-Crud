'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

const readClients = async() =>{

    const response = await fetch(url)
    return await response.json()

}

export const readClientById = async(id) =>{

    const response = await fetch(`${url}/${id}`)
    return await response.json()
}

export const fillFormClients = (client) =>{

    const inputName = document.getElementById('nome')
    const inputCellPhone = document.getElementById('celular')
    const inputEmail = document.getElementById('email')
    const inputCity = document.getElementById('cidade')

    inputName.value = client.nome
    inputCellPhone.value = client.celular
    inputEmail.value = client.email
    inputCity.value = client.cidade

}

const creatClients = async(client) =>{

    const options = {
        method: 'POST',
        body:   JSON.stringify(client),
        headers:{
                'content-type': 'application/json'
        }
    }

    const response = await fetch(url, options)
    console.log(response.ok)
}

export const updateClients = async(client) =>{

    const options = {
        method: 'PUT',
        body:   JSON.stringify(client),
        headers:{
                'content-type': 'application/json'
        }
    }

    const response = await fetch(`${url}/${client.id}`, options)
    console.log(response.ok)
}

const deleteClients = async(id) =>{

    const options = {
        method: 'DELETE',
    }

    const response = await fetch(`${url}/${id}`, options)
    console.log(response.ok)
}

export{
    readClients, creatClients, deleteClients
}