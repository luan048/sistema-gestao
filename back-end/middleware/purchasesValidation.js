export class PurchasesValidation {

    async createPurchaseValidation(req, res, next) {
        const { nameproduct, price, quantity, date } = req.body
        const fields = ["nameproduct", "price", "quantity", "date"]
        const erros = []

        for (const field of fields) {
            if(!req.body[field]) {
                erros.push(`O campo ${field} está vazio`)
            }

            if(erros.length) {
                return res.status(404).json({erros})
            }

            next()
        }
    }

    async deletePurchaseValidation(req, res, next) {
        const {id} = req.body
        const erros = []

        if(!id) {
            erros.push(`Id está em branco`)
        }

        if(erros.length) {
            return res.status(404).json({erros})
        }

        next()
    }
}