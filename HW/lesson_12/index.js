
//#region Classes

class MovieApi {
    static _apiUrl = 'https://api.themoviedb.org/3/'
    static _searchUrl = 'https://api.themoviedb.org/3/search/'
    static _imgBaseUrl = 'https://image.tmdb.org/t/p/'
    static _apiKey = 'db1ff3baf003eb28c227e02bda6b00b2'
    static lastQuery = ''
    static lastSearchedType = ''
    static lastPageId = 1

    static imgSize = 'original'
    static sortOpt = [{ key: 'Popular', value: 'popularity.desc' }, { key: 'Unpopular', value: 'popularity.asc' }, { key: 'Older', value: 'release_date.asc' }, { key: 'Newer', value: 'release_date.desc' }, { key: 'Worser marks', value: 'vote_average.asc' }, { key: 'Better marks', value: 'vote_average.desc' }]
    static searchOpt = [{ key: 'Movie', value: 'movie' }, { key: 'Series', value: 'tv' }]
    static langOpt = [{ key: 'Ru', value: 'ru-RU' }, { key: 'En', value: 'en-EN' }]
    static noImgPH = 'img/noImg.png'

    static getDiscoverUrl(page) {
        this.lastQuery = `${this._apiUrl}discover/${searchSelect.value}?api_key=${this._apiKey}&language=${langSelect.value}&sort_by=${sortSelect.value}&page=${page}&year=${discYear.value}`
        this.lastPageId = page
        this.lastSearchedType = searchSelect.value
        return this.lastQuery
    }
    static async makeDiscoveryQuery(page) {
        const resp = await fetch(this.getDiscoverUrl(page))
        const json = await resp.json()
        return json
    }

    static getSearchUrl(page) {
        this.lastQuery = `${this._apiUrl}search/${searchSelect.value}?api_key=${this._apiKey}&language=${langSelect.value}&query=${sField.value}&page=${page}`
        this.lastPageId = page
        this.lastSearchedType = searchSelect.value
        return this.lastQuery
    }
    static async makeSearcQuery(page) {
        const resp = await fetch(this.getSearchUrl(page))
        const json = await resp.json()
        return json
    }

    static getDetailsUrl(id) {
        this.lastSearchedType = searchSelect.value
        return `${this._apiUrl}${searchSelect.value}/${id}?api_key=${this._apiKey}&language=${langSelect.value}`
    }
    static async makeDetailsQuery(id) {
        const resp = await fetch(this.getDetailsUrl(id))
        const json = await resp.json()
        return json
    }

    static getImgUrl(imgName) {
        return `${this._imgBaseUrl}${this.imgSize}${imgName}`
    }

}

class Season {
    constructor(args) {
        this.air_date = args['air_date']
        this.name = args['name']
        this.overview = args['overview']
    }

    async makeSeasonBlock() {
        const div = document.createElement('div')

        const pName = document.createElement('p')
        pName.innerHTML = `<b>Title: </b> ${this.name}`
        div.appendChild(pName)

        const pAirDate = document.createElement('p')
        pAirDate.innerHTML = `<b>Air Date: </b> ${this.air_date}`
        div.appendChild(pAirDate)

        if (this.overview) {
            const overview = document.createElement('p')
            overview.textContent = `${this.overview}`
            div.appendChild(overview)
        }
        return div
    }
}

class Episode {
    constructor(args) {
        this.air_date = args['air_date']
        this.name = args['name']
        this.overview = args['overview']
    }
}

class BaseMovieObj {

    constructor(args) {
        this.id = args['id']
        this.backdrop_path = args['backdrop_path']
        this.genre_ids = args['genre_ids']
        this.original_language = args['original_language']
        this.overview = args['overview']
        this.popularity = args['popularity']
        this.poster_path = args['poster_path']
        this.vote_average = args['vote_average']
        this.vote_count = args['vote_count']
        this.release_date = args['release_date'] || args['first_air_date']
        this.title = args['title'] || args['name']
        this.original_title = args['original_title'] || args['original_name']
        this.adult = args['adult']
        this.production_companies = args['production_companies']?.map(i => i['name'])
        this.genres = args['genres']?.map(i => i['name'])
    }

    async getMovieBlockAsync() {
        let div = document.createElement('div')
        div.classList.add('col-md-3')
        div.classList.add('mx-3')

        let cardDiv = document.createElement('div')
        cardDiv.classList.add('movie-short-cont')
        cardDiv.classList.add('card')
        cardDiv.classList.add('mb-4')
        cardDiv.classList.add('box-shadow')
        cardDiv.classList.add('bg-dark')
        cardDiv.classList.add('text-center')
        cardDiv.classList.add('text-light')

        let title = document.createElement('h4');
        title.textContent = `${this.title}`
        cardDiv.appendChild(title)

        let releaseDate = document.createElement('p')
        releaseDate.textContent = `${this.release_date}`
        cardDiv.appendChild(releaseDate)

        cardDiv.appendChild(await GetPosterAsync(this.poster_path))

        let cardBodyDiv = document.createElement('div')
        cardBodyDiv.classList.add('card-body')

        let voteBlock = await this.MakeVotesBlockAsync()
        voteBlock.classList.add('text-light')
        cardBodyDiv.appendChild(voteBlock)

        let btnDiv = document.createElement('div')
        btnDiv.classList.add('d-flex')
        btnDiv.classList.add('justify-content-center')
        btnDiv.classList.add('align-items-center')

        let btnDetails = await this.MakeDetailBtnAsync()
        btnDetails.addEventListener('click', async () => await this.ShowMovieDetailsAsync())
        btnDiv.appendChild(btnDetails)

        cardBodyDiv.appendChild(btnDiv)
        cardDiv.appendChild(cardBodyDiv)
        div.appendChild(cardDiv)

        return div
    }

    async MakeVotesBlockAsync() {

        let divVotes = document.createElement('div')
        divVotes.classList.add('d-flex')
        divVotes.classList.add('justify-content-between')
        divVotes.classList.add('px-5')
        divVotes.classList.add('votes-block')

        let pVotesCount = document.createElement('p')
        pVotesCount.innerHTML = `<b>Votes:</b> ${this.vote_count}`
        pVotesCount.classList.add('mb-0')
        divVotes.appendChild(pVotesCount)

        let pVoteScore = document.createElement('p')
        pVoteScore.innerHTML = `<b>Score:</b> ${this.vote_average}`
        pVotesCount.classList.add('mb-0')
        divVotes.appendChild(pVoteScore)

        return divVotes
    }

    async MakeDetailBtnAsync() {
        let btnDetails = document.createElement('button')
        btnDetails.textContent = 'Details'
        btnDetails.classList.add('btn')
        btnDetails.classList.add('btn-large')
        btnDetails.classList.add('btn-info')
        btnDetails.classList.add('py-1')
        btnDetails.classList.add('px-5')
        btnDetails.classList.add('details-btn')

        return btnDetails

    }

    async ShowMovieDetailsAsync() {
        await this.FillModalWithDetailsAsync()
        ToggleModal()
    }

    async FillModalWithDetailsAsync() {
        modalTitle.textContent = modalBody.innerHTML = ''
        const details = await MovieApi.makeDetailsQuery(this.id)

        if (MovieApi.lastSearchedType === 'movie') {
            const movie = new DetailedMovie(details)
            modalTitle.textContent = `${movie.title}`
            modalBody.appendChild(await movie.makeMovieDetailsBlock())
        }
        else if (MovieApi.lastSearchedType === 'tv') {
            const series = new DetailedSeries(details)
            modalTitle.textContent = `${series.title}`
            modalBody.appendChild(await series.makeSeriesDetailsBlock())
        }
    }
}

class DetailedMovie extends BaseMovieObj {

    constructor(args) {
        super(args)

        this.production_countries = null
        if (args['production_countries']) {
            this.production_countries = args['production_countries']?.map(i => i['name'])
        }
        this.runtime = args['runtime']
        this.spoken_languages = args['spoken_languages']?.map(i => i['name'])
        this.tagline = args['tagline']
    }

    async makeMovieDetailsBlock() {

        let div = document.createElement('div')
        div.classList.add('d-flex')

        let poster = await GetPosterAsync(this.poster_path)
        poster.classList.add('details-poster')
        let aside = document.createElement('aside')
        aside.classList.add('px-2')
        aside.appendChild(poster)
        div.appendChild(aside)

        let divExp = document.createElement('div')
        divExp.classList.add('detailsExp')
        div.appendChild(divExp)

        if (this.tagline) {
            let pTagline = document.createElement('p')
            pTagline.classList.add('text-center')
            pTagline.textContent = this.tagline
            divExp.appendChild(pTagline)
        }

        if (this.vote_count > 0) {
            let divVotes = await this.MakeVotesBlockAsync()
            divVotes.classList.add('text-dark')
            divExp.appendChild(divVotes)
        }

        let pPopularity = document.createElement('p')
        pPopularity.innerHTML = `<b>Popularity:</b> ${this.popularity}`
        divExp.appendChild(pPopularity)

        if (this.production_countries.length > 0) {
            const pCountries = document.createElement('p')
            const countries = '<b>Production Countries:</b> ' + this.production_countries.join(', ')
            pCountries.innerHTML = countries
            divExp.appendChild(pCountries)
        }

        if (this.production_companies.length > 0) {
            const pCompanies = document.createElement('p')
            const companies = '<b>Production Companies:</b> ' + this.production_companies.join(', ')
            pCompanies.innerHTML = companies
            divExp.appendChild(pCompanies)
        }

        if (this.genres.length > 0) {
            const pGenres = document.createElement('p')
            const genres = '<b>Genres:</b> ' + this.genres.join(', ')
            pGenres.innerHTML = genres
            divExp.appendChild(pGenres)
        }

        let pRelease = document.createElement('p')
        pRelease.innerHTML = `<b>Release Date:</b> ${this.release_date}`
        divExp.appendChild(pRelease)

        if (this.runtime > 0) {
            let pDuration = document.createElement('p')
            pDuration.innerHTML = `<b>Duration:</b> ${this.runtime}m`
            divExp.appendChild(pDuration)
        }

        if (this.overview) {
            let overview = document.createElement('p')
            overview.textContent = `${this.overview}`
            divExp.appendChild(overview)
        }

        return div

    }

}

class DetailedSeries extends BaseMovieObj {

    constructor(args) {
        super(args)

        this.created_by = args['created_by']?.map(i => i['name']) //array
        this.episode_run_time = args['episode_run_time'] // array
        this.homepage = args['homepage'] // full url
        this.spoken_languages += args['languages']
        this.last_episode_to_air = null
        if (args['last_episode_to_air']) {
            this.last_episode_to_air = new Episode(args['last_episode_to_air'])
        }
        this.number_of_seasons = args['number_of_seasons']
        this.number_of_episodes = args['number_of_episodes']
        this.production_countries = null
        if (args['origin_country']) {
            this.production_countries = args['origin_country']
        }
        this.seasons = args['seasons']?.map(i => new Season(i))
    }

    async makeSeriesDetailsBlock() {

        console.log(this);

        let div = document.createElement('div')
        div.classList.add('d-flex')

        let poster = await GetPosterAsync(this.poster_path)
        poster.classList.add('details-poster')
        let aside = document.createElement('aside')
        aside.classList.add('px-2')
        aside.appendChild(poster)
        div.appendChild(aside)

        let divExp = document.createElement('div')
        divExp.classList.add('detailsExp')
        div.appendChild(divExp)

        if (this.vote_count > 0) {
            let divVotes = await this.MakeVotesBlockAsync()
            divVotes.classList.add('text-dark')
            divExp.appendChild(divVotes)
        }

        let pPopularity = document.createElement('p')
        pPopularity.innerHTML = `<b>Popularity:</b> ${this.popularity}`
        divExp.appendChild(pPopularity)

        let pHomepage = document.createElement('p')
        pHomepage.innerHTML = `<b>Homepage: </b>`
        let aHomepage = document.createElement('a')
        aHomepage.textContent = `${this.homepage.substring(this.homepage.indexOf('.') + 1).substring(0, this.homepage.indexOf('.'))}`
        aHomepage.href = `${this.homepage}`
        aHomepage.setAttribute('target', '_blank')
        pHomepage.appendChild(aHomepage)
        divExp.appendChild(pHomepage)

        if (this.created_by.length > 0) {
            const pCreatedBy = document.createElement('p')
            const createdBy = '<b>Created By:</b> ' + this.created_by.join(', ')
            pCreatedBy.innerHTML = createdBy
            divExp.appendChild(pCreatedBy)
        }

        if (this.production_countries.length > 0) {
            const pCountries = document.createElement('p')
            const countries = '<b>Production Countries:</b> ' + this.production_countries.join(', ')
            pCountries.innerHTML = countries
            divExp.appendChild(pCountries)
        }

        if (this.production_companies.length > 0) {
            const pCompanies = document.createElement('p')
            const companies = '<b>Production Companies:</b> ' + this.production_companies.join(', ')
            pCompanies.innerHTML = companies
            divExp.appendChild(pCompanies)
        }

        if (this.genres.length > 0) {
            const pGenres = document.createElement('p')
            const genres = '<b>Genres:</b> ' + this.genres.join(', ')
            pGenres.innerHTML = genres
            divExp.appendChild(pGenres)
        }

        if (this.episode_run_time?.length > 0) {
            const pEpisodeRunTime = document.createElement('p')
            const episodeRunTime = '<b>Episode Run Time:</b> ' + this.episode_run_time.join(', ') + ' m'
            pEpisodeRunTime.innerHTML = episodeRunTime
            divExp.appendChild(pEpisodeRunTime)
        }

        if (this.seasons && this.seasons.length > 0) {
            const dSeasons = document.createElement('details')
            const summary = document.createElement('summary')
            summary.textContent = 'Seasons'
            dSeasons.appendChild(summary)
            this.seasons.forEach(async element => {
                const dSes = document.createElement('details')
                dSes.classList.add('ml-3')
                const sSes = document.createElement('summary')
                sSes.textContent = `${element.name}`
                dSes.appendChild(sSes)
                dSes.appendChild(await element.makeSeasonBlock())
                dSeasons.appendChild(dSes)
            });
            divExp.appendChild(dSeasons)
        }

        if (this.overview) {
            let overview = document.createElement('p')
            overview.textContent = `${this.overview}`
            divExp.appendChild(overview)
        }

        return div
    }
}

class MovieLib {

    page = 0
    results = []
    total_pages = 0
    total_results = 0
    itemsPerPage = 20
    pagingContainer = null
    sidePaggingBtnsCount = 3
    lastSelectedPage = null
    moviesArrContainer = null

    constructor(moviesArrContainer, pagingContainer) {
        this.moviesArrContainer = moviesArrContainer
        this.pagingContainer = pagingContainer
    }

    async parseJson(jsonIn) {
        this.page = jsonIn['page']
        this.results = []
        jsonIn['results'].forEach(item => this.results.push(new BaseMovieObj(item)));
        this.total_pages = jsonIn['total_pages']
        this.total_results = jsonIn['total_results']
    }

    //#region Pagging
    async MakePaggingAsync() {
        this.pagingContainer.innerHTML = ''

        if (this.itemsPerPage != null && this.total_results != null && this.itemsPerPage < this.total_results) {
            const pagesCount = Math.ceil(this.total_results / this.itemsPerPage)
            let start = 1
            let end = pagesCount
            if (this.page - this.sidePaggingBtnsCount > 1) {
                start = this.page - this.sidePaggingBtnsCount
            }
            if (this.page + this.sidePaggingBtnsCount < pagesCount) {
                end = this.page + this.sidePaggingBtnsCount
            }

            const fBtn = await this.MakePaggingBtnAsync(1)
            fBtn.classList.add('border-left-round')
            fBtn.textContent = '<<'
            this.pagingContainer.appendChild(fBtn)

            for (let i = start; i < this.page; i++) {
                this.pagingContainer.appendChild(await this.MakePaggingBtnAsync(i))
            }
            const curBtn = await this.MakePaggingBtnAsync(this.page)
            curBtn.classList.remove('btn-dark')
            curBtn.classList.add('btn-light')
            this.pagingContainer.appendChild(curBtn)
            for (let i = this.page + 1; i <= end; i++) {
                this.pagingContainer.appendChild(await this.MakePaggingBtnAsync(i))
            }

            let lBtn = await this.MakePaggingBtnAsync(pagesCount)
            lBtn.classList.add('border-right-round')
            lBtn.textContent = '>>'
            this.pagingContainer.appendChild(lBtn)

            this.lastSelectedPage = curBtn
        }
    }

    async MakePaggingBtnAsync(page) {

        const btn = document.createElement('button')
        btn.classList.add('btn')
        btn.classList.add('btn-sm')
        btn.classList.add('btn-dark')
        btn.classList.add('font-weight-bold')
        btn.classList.add('px-2')
        btn.classList.add('mx-1')
        btn.textContent = page

        btn.addEventListener('click', async (e) => await this.MoveTopageAsync(page, e.target))

        return btn
    }

    async MoveTopageAsync(page, target) {
        try {
            let pPath = MovieApi.lastQuery.replace(`page=${MovieApi.lastPageId}`, `page=${page}`)

            let resp = await fetch(pPath)
            let jsonResp = await resp.json()
            this.parseJson(jsonResp)

            await this.FillPage()

            if (this.lastSelectedPage != null) {
                this.lastSelectedPage.classList.remove('btn-light')
                this.lastSelectedPage.classList.add('btn-dark')
            }
            target.classList.remove('btn-dark')
            target.classList.add('btn-light')
            this.lastSelectedPage = target
            await this.MakePaggingAsync()

        } catch (error) {
            console.log(error);
        }
    }
    //#endregion

    //#region HTML Generator
    async FillPage() {
        this.moviesArrContainer.innerHTML = ''
        this.results.forEach(async (element) => {
            this.moviesArrContainer.appendChild(await element.getMovieBlockAsync())
        });
    }
    //#endregion

}

//#endregion



//#region Params
const LLIB = new MovieLib(document.getElementById('sContainer'), document.getElementById('paggingContainer'))
//#endregion



//#region Init Selections
const searchSelect = document.getElementById('searchType')
const langSelect = document.getElementById('pageLanguage')
const sortSelect = document.getElementById('sortType')
const discYear = document.getElementById('discYear')
searchSelect.innerHTML = ''
langSelect.innerHTML = ''
sortSelect.innerHTML = ''
discYear.innerHTML = ''

MovieApi.searchOpt.forEach(element => {
    let opt = document.createElement('option')
    opt.textContent = element['key']
    opt.value = element['value']
    searchSelect.appendChild(opt)
});


MovieApi.langOpt.forEach(element => {
    let opt = document.createElement('option')
    opt.textContent = element['key']
    opt.value = element['value']
    langSelect.appendChild(opt)
});

MovieApi.sortOpt.forEach(element => {
    let opt = document.createElement('option')
    opt.textContent = element['key']
    opt.value = element['value']
    sortSelect.appendChild(opt)
});

for (let i = new Date().getFullYear(); i >= new Date().getFullYear() - 20; i--) {
    const opt = document.createElement('option')
    opt.textContent = i
    opt.value = i
    discYear.appendChild(opt)
}
//#endregion



//#region DOM Objects
const btnSearch = document.getElementById('btnSearch')
const sCont = document.getElementById('sContainer')
const sField = document.getElementById('searchField')
const paggingCont = document.getElementById('paggingContainer')
const modal = document.getElementById('modalW')
const modalTitle = document.querySelector('.modal-title')
const modalBody = document.querySelector('.modal-body')
const btnDiscover = document.getElementById('btnDiscover')
//#endregion



//#region Events
btnSearch.addEventListener('click', async () => await SearchQueryAsync());

btnDiscover.addEventListener('click', async () => await DiscoverQuery())

sField.addEventListener('keyup', (e) => { if (e.key == 'Enter') { btnSearch.click() } })
//#endregion



//#region Functions

async function GetPosterAsync(pPath) {

    let poster = document.createElement('img')
    poster.classList.add('img-fluid')
    poster.classList.add('card-img-bottom')
    poster.classList.add('movie-poster')

    try {
        if (pPath == null || pPath.length < 1) {
            throw new Error('No image.')
        }
        let fPath = MovieApi.getImgUrl(pPath)

        let downlImg = new Image();
        downlImg.onload = function () {
            let imgUrl = this.src
            poster.src = imgUrl
            poster.alt = imgUrl.substring(imgUrl.lastIndexOf('/') + 1)
        };
        downlImg.src = fPath;

    } catch (error) {
        poster.src = MovieApi.noImgPH
        poster.alt = 'Image Absent'
    }
    finally {
        return poster
    }
}

async function DiscoverQuery() {
    try {
        await LLIB.parseJson(await MovieApi.makeDiscoveryQuery(1))
        await LLIB.MakePaggingAsync()
        await LLIB.FillPage()

    } catch (error) {
        console.log(error);
    }
}

async function SearchQueryAsync() {
    try {
        if (sField.value.length < 1) {
            await DiscoverQuery()
            return
        }
        await LLIB.parseJson(await MovieApi.makeSearcQuery(1))
        await LLIB.MakePaggingAsync()
        await LLIB.FillPage()

    } catch (error) {
        sCont.innerHTML = ''
        let errDiv = document.createElement('div')
        errDiv.textContent = `${sField.value} doesn't found.`
        errDiv.classList.add('text-center')
        errDiv.classList.add('text-dark')
        sCont.appendChild(errDiv)
        console.log(error)
    }
}

function ToggleModal() {
    $('#modal').modal('toggle');
}
//#endregion
