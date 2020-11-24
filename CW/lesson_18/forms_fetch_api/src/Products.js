import React from 'react'

const URL = `https://localhost:5001/api/products`

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }

    }

    componentDidMount() {
        fetch(URL)
            .then(js => js.json())
                .then(result => this.setState({products: result}))
    }

    removeProduct(id) {
        fetch(`${URL}/${id}`, {method: 'DELETE'}).then()
        this.setState({
            products: this.state.products.filter(x => x.productId !== id)
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>productId</th>
                            <th>productName</th>
                            <th>productCount</th>
                            <th>categoryId</th>
                            <th>categoryName</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(x => {
                            return(
                                <tr>
                                    <td>{x.productId}</td>
                                    <td>{x.productName}</td>
                                    <td>{x.productCount}</td>
                                    <td>{x.category.categoryId}</td>
                                    <td>{x.category.categoryName}</td>
                                    <td>
                                        <button className="btn btn-danger"
                                                onClick={() => this.removeProduct(x.productId)}>Remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Products