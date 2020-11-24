const PlanetDetails = (props) => {
    const { climate, diameter, gravity, name, orbital_period, population, rotation_period, surface_water, terrain } = props.data

    return (
        <div className='details-block'>
            <h1 className='details-header'>{name}</h1>
            <p className='details-single-item'>
                <b>Population : </b>
                {population} people
            </p>
            <div className='details-pair-container'>
                <span className='details-pair-item'>
                    <b>Orbital Period : </b>
                    {orbital_period} days
                </span>
                <span className='details-pair-item'>
                    <b>Rotation Period : </b>
                    {rotation_period} hours
                </span>
            </div>
            <div className='details-pair-container'>
                <span className='details-pair-item'>
                    <b>Diameter : </b>
                    {diameter} km
                </span>
                <span className='details-pair-item'>
                    <b>Gravity : </b>
                    {gravity} Gs
                </span>
            </div>
            <p className='details-single-item'>
                <b>Climate : </b>
                {climate}
            </p>
            <div className='details-pair-container'>
                <span className='details-pair-item'>
                    <b>Terrain : </b>
                    {terrain}
                </span>
                <span className='details-pair-item'>
                    <b>Surface Water : </b>
                    {parseInt(surface_water) * 100}%
                </span>
            </div>
        </div>
    )
}

export default PlanetDetails
