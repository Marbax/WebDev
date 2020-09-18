

let d1 = document.getElementById('d1')
let kvColl = document.getElementsByClassName('kv')


// let data = document.querySelector('ul#menu > li')

// d1.onclick = function(e) {
//     alert('hello')
// }

// function onClick(e) {
//     alert('hello')
// }

// d1.addEventListener('click', onClick)
// d1.removeEventListener(onClick)

// d1.addEventListener('click', function() {
//     // d1.style.backgroundColor = 'blue'
//     d1.className = 'kv'
//     d1.classList.add('k2v')
// })


// for (let elem of kvColl) {
//     elem.addEventListener('click', function(e) {
      
//         const {offsetLeft} = e.target
        
//         elem.style.left = `${offsetLeft+50}px`
        
//     })
// }

// let nameField = document.getElementById('nameField')
// let res = document.getElementById('res')


// nameField.addEventListener('input', function() {
//     res.innerHTML = `<h1>${nameField.value}</h1>`
// })


let panel = document.getElementsByClassName('rightPanel')[0]
let btnAdd = document.getElementById('btnAdd')

btnAdd.addEventListener('click', function() {
    let elem = document.createElement('div')
    elem.className = 'blaItem'
    elem.innerText = '5'
    panel.appendChild(elem)

    setInterval(function() {
        let count = parseInt(elem.innerText)
        count -= 1
        elem.innerText = count
    }, 1000)

    setTimeout(function() {
        panel.removeChild(elem)
    }, 5000)
})


document.addEventListener('click', function(e) {
    let coords = {
        x: e.clientX - btnAdd.clientWidth / 2,
        y: e.clientY - btnAdd.clientHeight / 2
    }
 

    const {x,y} = coords

    btnAdd.style.left = `${x}px`
    btnAdd.style.top = `${y}px`
})