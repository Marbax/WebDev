const MovieDetails = (props) => {
    const { release_date, title, director, episode_id, opening_crawl, producer } = props.data

    return (
        <div className='details-block'>
            <h1 className='details-header'>{title}</h1>
            <div className='details-pair-container'>
                <span className='details-pair-item'>
                    <b>Release Date : </b>
                    {release_date}
                </span>
                <span className='details-pair-item'>
                    <b>Episode : </b>
                    {episode_id}
                </span>
            </div>
            <p className='details-single-item'>
                <b>Director : </b>
                {director}
            </p>
            <p className='details-single-item'>
                <b>Producer : </b>
                {producer}
            </p>

            <p className='details-single-item'>
                <b>Opening : </b>
            </p>
            <p className='details-single-item'>{opening_crawl}</p>
        </div>
    )
}

export default MovieDetails
