
// let url = 'https://swapi.dev/api/people/'

// let mainTag = document.getElementById('main')

// let btn = document.getElementById('btn')

// btn.addEventListener('click', function(event) {
//     fetch(url)
//     .then(x => x.json())
//         .then(x => {

//             let html = `<table class="table">`


//             for (let hero of x.results) {
//                 html += `
//                     <tr>
//                         <td>${hero.name}</td>
//                         <td>${hero.height}</td>
//                         <td>${hero.mass}</td>
//                         <td>${hero.hair_color}</td>
//                     </tr>
//                 `
//             }

//             html += `</table>`
//             mainTag.innerHTML = html

//         })
        
// })



// let url = 'https://swapi.dev/api/people/'

// let mainTag = document.getElementById('main')

// let btn = document.getElementById('btn')

// btn.addEventListener('click', async function(event) {
//     let res = await fetch(url)
//     res = await res.json()
//     let html = `<table class="table">`
//     for (let hero of res.results) {
//         html += `
//             <tr>
//                 <td>${hero.name}</td>
//                 <td>${hero.height}</td>
//                 <td>${hero.mass}</td>
//                 <td>${hero.hair_color}</td>
//             </tr>
//         `
//     }
//     html += `</table>`
//     mainTag.innerHTML = html
        
// })




let url = 'https://swapi.dev/api/people/'

let mainTag = document.getElementById('main')

let btn = document.getElementById('btn')

btn.addEventListener('click', async function(event) {
    let res = await fetch(url)
    res = await res.json()

    let newelem = document.createElement('div')
    newelem.className = 'flex'
    
    for (let hero of res.results) {
        let inDiv = document.createElement('div')
      
        let contentHtml = ``
        contentHtml += `
            <div>${hero.name}</div>
            <div>${hero.height}</div>
        `
        inDiv.innerHTML = contentHtml
        newelem.appendChild(inDiv)
    }
   
    mainTag.appendChild(newelem)
        
})
