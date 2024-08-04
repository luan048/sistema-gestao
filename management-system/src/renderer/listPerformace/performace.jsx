import { useEffect, useState } from "react";
import axios from "axios";

import Siderbar from "../sidebar/sidebar.jsx";

import './performace.css'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

function Performacemonth() {

    const [sales, setSales] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        api.get('/purchases')
            .then(response => setSales(response.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        api.get('/')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, [])

    const getMonthRange = (month) => {
        const year = 2024
        const dateStart = new Date(year, month -1, 1)
        const dateEnd = new Date(year, month, 0)
        return {dateStart, dateEnd}
    }

    const filterByMonth = (products, month) => {
        const {dateStart, dateEnd} = getMonthRange(month)
        return products.filter(product => {
            const [day, month, year] = product.date.split('/')
            const productDate = new Date(year, month -1, day)
            return productDate >= dateStart && productDate <= dateEnd
        })
    }

    const bodyPerformace = (month, label) => {
        const filteredProducts = filterByMonth(sales, month)

        const calculatePurchases = filteredProducts.reduce((total, product) => {
            const saleString = product.price ? product.price.replace('R$', '').replace('.', '').replace(',', '.').trim() : '0'
            const sale = parseFloat(saleString) || 0
            const quantity = parseFloat(product.quantity) || 0
            
            return total + (sale * quantity)
        }, 0).toFixed(2)

        const filteredPurchases = filterByMonth(products, month)

        const totalSalesMonth = filteredPurchases.reduce((total, product) => {
            const priceString = product.price ? product.price.replace('R$', '').replace('.', '').replace(',', '.').trim() : '0'
            const price = parseFloat(priceString) || 0

            return total + price
        }, 0).toFixed(2)

        const profitOfMonth = ((parseFloat(totalSalesMonth) || 0) - (parseFloat(calculatePurchases) || 0)).toFixed(2)

        return (
            <div className="section" key={month}>
                <div className="div-title">
                    <i className="titles">{label}</i>
                </div>
                <div className="bodyGeneral">
                    <div className="elementsTable" style={{display : filteredProducts.length === 0 ? 'none' : 'block'}}>
                        <p>Vendas no Mês: R$ {totalSalesMonth}</p>
                        <p>Valor Total Gastos com Materiais: R$ {calculatePurchases}</p>
                        <p>Lucro do Mês: R$ {profitOfMonth}</p>
                    </div>

                    {filteredProducts.length === 0 && (
                        <p className="mensg">Sem Métricas para esse Mês!</p>
                    )}
                </div>
            </div>
        )

    }

    return (
        <header className="containerPerformace">
            <Siderbar fixed={true}/>
            <div className="bodyPerformace">
                <article className="ghost"></article>
                {bodyPerformace(1, 'Performace de Janeiro')}
                {bodyPerformace(2, 'Performace de Fevereiro')}
                {bodyPerformace(3, 'Performace de Março')}
                {bodyPerformace(4, 'Performace de Abril')}
                {bodyPerformace(5, 'Performace de Maio')}
                {bodyPerformace(6, 'Performace de Junho')}
                {bodyPerformace(7, 'Performace de Julho')}
                {bodyPerformace(8, 'Performace de Agosto')}
                {bodyPerformace(9, 'Performace de Setembro')}
                {bodyPerformace(10, 'Performace de Outubro')}
                {bodyPerformace(11, 'Performace de Novembro')}
                {bodyPerformace(12, 'Performace de Dezembro')}
            </div>
        </header>
    )
}

export default Performacemonth