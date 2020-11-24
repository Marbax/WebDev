import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import './Currency.css'

const Currency = (props) => {
    const {id} = props.match.params
   // console.log(id)
    const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

    let [currencies, setCurrencies] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(url)
            .then(resp => resp.json())
            .then(result => {
                setCurrencies(result)
                setIsLoading(false)
            })
    }, [])

    return (
        <div>
            {
                isLoading ? <div class="lds-hourglass"></div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>CCY</th>
                                <th>BASE CCY</th>
                                <th>BUY</th>
                                <th>SALE</th>
                                <th>INFO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currencies.map(x =>
                                    <tr>
                                            <td>{x.ccy}</td>
                                            <td>{x.base_ccy}</td>
                                            <td>{x.buy}</td>
                                            <td>{x.sale}</td>
                            
                                            <td>
                                                <NavLink to={`/currency/${x.ccy}`}  className="btn btn-warning">Info</NavLink>
                                            </td>
                                    </tr>
                            
                                )
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default Currency