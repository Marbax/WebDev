class SwapiData {
    count = 0
    nextPage = ''
    previousPage = ''
    items = []

    constructor(props) {
        if (props) {
            this.count = props['count']
            this.nextPage = props['next']
            this.previousPage = props['previous']
            this.items = props['results']
        }
    }
}

export default SwapiData
