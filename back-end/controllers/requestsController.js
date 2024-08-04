import cliente from "../config/db.js";

export async function insRequests(client, product, price, date) {
    try {
        const productId = Math.floor(1000 + Math.random() * 9000)

        await cliente.query('INSERT INTO requestsmonth ("id", "client", "product", "price", "date") VALUES ($1, $2, $3, $4, $5)', [productId, client,product, price, date])

        console.log('Inserido')
    }

    catch(ex) {
        console.log('error controller: '+ex)
    }
}

export async function delRequests(id) {
    try {
        await cliente.query('DELETE FROM requestsmonth WHERE id = $1', [id])
        
        console.log('Removido')
    }

    catch(ex) {
        console.log('error controller: '+ex)
    }
}

export async function upRequests(id, price) {

    try {
        await cliente.query('UPDATE requestsmonth SET price = $1 WHERE id = $2', [price, id])
        console.log('Preço Atualizado')
    }

    catch(ex) {
        console.log('error controller: '+ex)
    }
}