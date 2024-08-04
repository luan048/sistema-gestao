export class SearchValidation{

    async searchRequest(req, res, next) {
        const {client} = req.body
        const errors = []

        if(!client) {
            errors.push('Campo Client está em branco')
        }

        if(errors.length) {
            return res.status(404).json({errors})
        }

        next()
    }
}