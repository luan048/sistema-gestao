import cliente from "../config/db.js";

export async function insPurchases(nameproduct, price, quantity, date) {
    try {
        const id = Math.floor(1000 + Math.random() * 9000)

        await cliente.query('INSERT INTO purchasesmonth ("id", "nameproduct", "price", "quantity", "date") VALUES ($1, $2, $3, $4, $5)', [id, nameproduct, price, quantity, date])

        console.log('Compra inserida')
    }

    catch(ex) {
        console.log('Erro ao inserir purchase: '+ex)
    }
}

export async function delPurchases(id) {
    try {
        await cliente.query('DELETE FROM purchasesmonth WHERE id = $1',[id])

        console.log('Deletado')
    }

    catch(ex) {
        console.log('Erro ao deletar puchase: '+ex)
    }
}