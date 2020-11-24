

const CurrencyInfo = (props) => {
    const {id} = props.match.params
    console.log(props)
    return (
        <>
        <button className="btn btn-primary"
                onClick={() => props.history.goBack()}>Back</button>
            <h2>CurrencyInfo</h2>
            <h2>{id}</h2>
        </>
    )
}


export default CurrencyInfo