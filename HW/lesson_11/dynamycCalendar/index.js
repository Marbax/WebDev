const calendarContainer = document.querySelector('.calendarContainer')

let calIndex = 0

async function asyncMakeCalendar(conteiner) {
    let calOut = document.createElement('div')
    calOut.classList.add('calOut')

    let calendar = await document.createElement('div')
    calendar.classList.add('calendar')

    let calendarForm = await document.createElement('form')
    calendarForm.classList.add('calForm')

    let calFormInputs = await document.createElement('div')
    calFormInputs.classList.add('cfInputs')

    let divMonth = await document.createElement('div')
    divMonth.classList.add('frmGroupHor')

    let monthLabel = await document.createElement('label')
    monthLabel.setAttribute('for', `month${calIndex}`)
    monthLabel.textContent = 'Month:'

    let monthInput = await document.createElement('input')
    monthInput.setAttribute('name', `month${calIndex}`)
    monthInput.setAttribute('type', 'text')
    monthInput.setAttribute('id', `month${calIndex}`)

    let divYear = await document.createElement('div')
    divYear.classList.add('frmGroupHor')

    let yearLabel = await document.createElement('label')
    yearLabel.setAttribute('for', `year${calIndex}`)
    yearLabel.textContent = 'Year:'

    let yearInput = await document.createElement('input')
    yearInput.setAttribute('name', `year${calIndex}`)
    yearInput.setAttribute('type', 'text')
    yearInput.setAttribute('id', `year${calIndex}`)

    let calSubmit = await document.createElement('button')
    calSubmit.setAttribute('type', 'button')
    calSubmit.addEventListener('click', () => asyncGenCalTable(calOut, monthInput.value, yearInput.value))
    calSubmit.textContent = 'Generate'

    await divMonth.appendChild(monthLabel)
    await divMonth.appendChild(monthInput)
    await calFormInputs.appendChild(divMonth)

    await divYear.appendChild(yearLabel)
    await divYear.appendChild(yearInput)
    await calFormInputs.appendChild(divYear)


    await calendarForm.appendChild(calFormInputs)
    await calendarForm.appendChild(calSubmit)
    await calendar.appendChild(calendarForm)
    await calendar.appendChild(calOut)
    await conteiner.appendChild(calendar);
}

asyncMakeCalendar(calendarContainer)


async function asyncGenCalTable(container, month, year) {
    let m = parseInt(month)
    let y = parseInt(year)

    if ((m > 0 && m <= 12) && (y >= 1970)) {
        let date = new Date(y, m, 0)
        let mName = date.toLocaleString('default', { month: 'long' })
        let myLabel = await document.createElement('label')
        myLabel.textContent = `${mName[0].toUpperCase() + mName.slice(1)}, ${date.getFullYear()}`
        myLabel.classList.add('bold')

        container.innerHTML = null
        container.appendChild(myLabel)
        container.appendChild(await makeMonthTable(y, m))
    }
    else {
        alert('Wrong date format!')
    }
}

async function makeMonthTable(year, month) {

    let fDayOfWeek = new Date(year, month - 1, 1).getDay()
    fDayOfWeek = fDayOfWeek === 0 ? 7 : fDayOfWeek // stupid american week's begining from Sundays
    let daysInMonth = new Date(year, month, 0).getDate()

    let tHead = await document.createElement('thead')
    for (let i = 1; i < 8; i++) {
        let th = await document.createElement('th')
        th.textContent = `${new Date(2020, 5, i).toLocaleString('default', { weekday: 'short' })}`
        tHead.appendChild(th)
    }

    let tBody = await document.createElement('tbody')
    let day = 1;
    let index = 1
    for (let i = 0; i <= Math.floor((daysInMonth + fDayOfWeek) / 7); i++) {
        let tr = await document.createElement('tr')
        for (let j = 0; j < 7; j++) {
            let td = await document.createElement('td')
            if ((fDayOfWeek <= index) && (day <= daysInMonth)) {
                td.textContent = day++
            }
            tr.appendChild(td)
            index++
            ///console.log(year, month, fDayOfWeek, index, day, daysInMonth);
        }
        tBody.appendChild(tr)
    }


    let table = await document.createElement('table')
    table.appendChild(tHead)
    table.appendChild(tBody)

    return table
}
