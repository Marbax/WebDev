// let obj = {
//     name: 'Alex',
//     lastname: 'Klar'
// }

// alert(obj.name)
// console.log(obj);


// function some(obj) {

// }

// some({x:10, y:20})

// let obj = {
//     x: 0,
//     y: 0,
//     show: function() {
//         alert(this.x + ' ' + this.y)
//     }
// }

// obj.d = 25;

// console.log(obj)
// delete obj.x

// obj.show()


// function Car(title, model, year) {
//     this.title = title
//     this.model = model
//     this.year = year
//     this.show = function() {
//             alert(`${this.title} ${this.model} ${this.year}`)
//     }
// }

// Car.prototype.show = function() {
//     alert(`${this.title} ${this.model} ${this.year}`)
// }

// let car1 = new Car('Honda', 'Accord', 'Black')
// let car2 = new Car('Lexus', null, 'Red')

// for (let prop in car1) {
//     console.log(`${prop} ${car1[prop]}`)
// }

// car1.title = 'Mercedes'
// car1['title'] = 'Mercedes'

// function test(func) {
//     func()
// }

// let fn = car1.show.bind(car1)
// test(fn)

// console.log(car1)
// console.log(car2)


//let arr = new Array()
let arr = [
    4,
    6,
    7,
    'fff',
    2.3,
    [
        {
            a: 10
        },
        {
            b: 2,
            c: [3, 4, 5]
        }
    ]
]


// let ar = [1,2,3]
// ar[2423] = 24

// alert(ar[2423])


// let numbers = []

// for (let i = 0; i < 10; i++) {
//     numbers.push(Math.ceil(Math.random() * 10))
//     // console.log(numbers[i])
// }
// console.log(numbers)

// let numbers2 = [...numbers]
// console.log(numbers2)



// function some(a, b, c) {
//     console.log(arguments)
// }

// let a = [1,2,3]

// // some(a[0], a[1], a[2])
// some(...a)


// let obj = {
//     a: 10
// }

// let obj2 = {
//     b: 20
// }

// obj = {...obj, ...obj2}
// console.log(obj)


// let a = [1,2,3]
// let x = a[0]
// let y = a[1]
// let z = a[2]

//let [x,y,z] = a

let some = {
    name: 'a',
    lastname: 'b',
    f: 2,
    c: 8
}

const {f,c} = some
alert(f + c)


// let html = '<ul>'

// html += numbers.map(x => `<li>${x}</li>`)

// html += '</ul>'
// document.body.innerHTML = html