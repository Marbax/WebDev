const PersonDetails = (props) => {
    const { birth_year, eye_color, gender, hair_color, height, mass, name, skin_color } = props.data

    return (
        <div className='details-block'>
            <h1 className='details-header'>{name}</h1>
            <div className='details-pair-container'>
                <span className='details-pair-item'>
                    <b>Birthday Year : </b>
                    {birth_year}
                </span>
                <span className='details-pair-item'>
                    <b>Gender : </b>
                    {gender}
                </span>
            </div>
            <p className='details-single-item'>
                <b>Eye color : </b>
                {eye_color}
            </p>
            <p className='details-single-item'>
                <b>Hair Color: </b>
                {hair_color}
            </p>
            <p className='details-single-item'>
                <b>Skin Color : </b>
                {skin_color}
            </p>
            <div className='details-pair-container'>
                <span className='details-pair-item'>
                    <b>Mass : </b>
                    {mass}
                </span>
                <span className='details-pair-item'>
                    <b>Height : </b>
                    {height}
                </span>
            </div>
        </div>
    )
}

export default PersonDetails
