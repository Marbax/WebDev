const VehicleDetails = (props) => {
    const { cargo_capacity, consumables, cost_in_credits, crew, length, manufacturer, model, name, passengers, vehicle_class, max_atmosphering_speed } = props.data

    return (
        <div className='details-block'>
            <h1 className='details-header'>{name}</h1>
            <p className='details-single-item'>
                <b>Model : </b>
                {model}
            </p>
            <p className='details-single-item'>
                <b>Manufacturer : </b>
                {manufacturer}
            </p>
            <p className='details-single-item'>
                <b>Length : </b>
                {length} m
            </p>
            <p className='details-single-item'>
                <b>Class : </b>
                {vehicle_class}
            </p>
            <p className='details-single-item'>
                <b>Cost : </b>
                {cost_in_credits} credits
            </p>
            <div className='details-pair-container'>
                <span className='details-pair-item'>
                    <b>Cargo Capacity : </b>
                    {cargo_capacity}
                </span>
                <span className='details-pair-item'>
                    <b>Consumables for : </b>
                    {consumables}
                </span>
            </div>
            <p className='details-single-item'>
                <b>Max atmosphere speed : </b>
                {max_atmosphering_speed}
            </p>
            <div className='details-pair-container'>
                <span className='details-pair-item'>
                    <b>Crew : </b>
                    {crew}
                </span>
                <span className='details-pair-item'>
                    <b>Passengers : </b>
                    {passengers}
                </span>
            </div>
        </div>
    )
}

export default VehicleDetails
