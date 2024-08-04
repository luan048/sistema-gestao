export class RequestsValidation{

    async createRequestValidation(req, res, next) {
        const { client, product, price, date } = req.body || {}
        const fields = ["client", "product", "price", "date"]
        const errors =[]

        for (const field of fields) {

            if(!req.body[field]) {
                errors.push(`O campo ${field} está em branco`)
            }

            if(errors.length) {
                return res.status(404).json({errors})
            }

            next()
        }
    }

    async deleteRequestValidation(req, res, next) {
        const {id} = req.body
        const erros = []

        if(!id) {
            erros.push('Id está em branco.')
        }

        if(erros.length) {
            return res.status(404).json({erros})
        }

        next()
    }

    async updateRequestsValidation(req, res, next) {
        const {id, price} = req.body
        const fields = ["id", "price"]
        const erros = []

        for(const field of fields) {
            if(!req.body[field]) {
                erros.push(`O campo ${field} está em branco`)
            }

            if(erros.length) {
                return res.status(404).json({erros})
            }

            next()
        }
    }
}