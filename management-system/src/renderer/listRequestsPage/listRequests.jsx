import React, { useEffect, useState } from "react"
import axios from "axios"
import Siderbar from "../sidebar/sidebar.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import './listRequests.css'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

function Listrequests() {
    const [products, setProducts] = useState([])
    const [expandedMonth, setExpandedMonth] = useState(null)

    useEffect(() => {
        api.get('/')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, [])

    //Expandir tela ao clicar
    const toggleExpand = (month) => {
        setExpandedMonth(expandedMonth === month ? null : month)
    }
    //Fim da expansão

    //Filtragem por mês
    const getMonthRange = (month) => {
        const year = 2024
        const dateStart = new Date(year, month - 1, 1)
        const dateEnd = new Date(year, month, 0)
        return { dateStart, dateEnd }
    }

    const filterByMonth = (products, month) => {
        const { dateStart, dateEnd } = getMonthRange(month)
        return products.filter(product => {
            const [day, month, year] = product.date.split('/') //Split está dividindo cada elemento antes da / no date, cada um desses elementos fica indivivual 
            const productDate = new Date(year, month - 1, day)
            return productDate >= dateStart && productDate <= dateEnd
        })
    }
    //Fim da Filtragem por mês

    const renderAccordion = (month, label) => {
        const filteredProducts = filterByMonth(products, month) //Products faz referência aos produtos totais, filtered, faz referência aos filtrados de acordo com o mês

        const totalPriceMonth = filteredProducts.reduce((total, product) => {
            const priceString = product.price ? product.price.replace('R$', '').replace('.', '').replace(',', '.').trim() : '0'
            const price = parseFloat(priceString) || 0

            return total + price
        }, 0).toFixed(2)

        return (
            <div className="accordion-section" key={month}>
                <div className='div-accordion-title' onClick={() => toggleExpand(month)}>
                    <i className="accordion-title">{label}</i>
                    {expandedMonth === month ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                    )}
                </div>
                <div className={`accordion-content ${expandedMonth === month ? 'expanded' : ''}`}>

                    <table style={{ display: filteredProducts.length === 0 ? 'none' : 'block' }}>
                        <thead className="theadProducts">
                            <tr className="trTitle">
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Preço</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody className="tbodyProducts">
                            {filteredProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.client}</td>
                                    <td>{product.product}</td>
                                    <td>{product.price}</td>
                                    <td>{product.date}</td>
                                </tr>
                            ))}
                        </tbody>

                        <i className="totalPriceMonth">Vendas totais no mês: R${totalPriceMonth}</i>
                    </table>

                    {filteredProducts.length === 0 && (
                        <p className="mensgFault">Sem Produtos Cadastrados esse mês!</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="elementsListRequests">
            <Siderbar fixed={true} />

            <div className="accordions">
                <article className="ghost"></article>
                {renderAccordion(1, 'Vendas Janeiro')}
                {renderAccordion(2, 'Vendas Fevereiro')}
                {renderAccordion(3, 'Vendas Março')}
                {renderAccordion(4, 'Vendas Abril')}
                {renderAccordion(5, 'Vendas Maio')}
                {renderAccordion(6, 'Vendas Junho')}
                {renderAccordion(7, 'Vendas Julho')}
                {renderAccordion(8, 'Vendas Agosto')}
                {renderAccordion(9, 'Vendas Setembro')}
                {renderAccordion(10, 'Vendas Outubro')}
                {renderAccordion(11, 'Vendas Novembro')}
                {renderAccordion(12, 'Vendas Dezembro')}
            </div>
        </div>
    )
}

export default Listrequests
