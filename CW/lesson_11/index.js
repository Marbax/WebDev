

// let promise = new Promise((success, error) => {
//     for (let i = 0; i < 10; i++) {
//         console.log(`Operation ${i}`)
//     }
//     success()
//     error()
// })
// // function some() {
// //     promise
// //         .then(x => console.log('Success!'))
// // }
// async function some() {
//     await promise
//     console.log('Success!')
// }
// some()
// fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
//     .then(x => x.json())
//         .then(x => console.log(x))
// class Some {
//     constructor() {
//         this.a = 10
//     }
// }
class Some {
    constructor() {
        this.a = 10
    }
}

// Some.prototype.b = 20

let a = new Some()
console.log(a)
console.log(a.toString())
