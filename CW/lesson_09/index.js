
// function Car(title, model) {
//     this.title = title
//     this.model = model
// }


// Car.prototype.show = function() {
//     alert(`${this.title} ${this.model}`)
// }


// class Car {
//     constructor(title, model) {
//         this.title = title
//         this.model = model
//     }

//     show() {
//         alert(`${this.title} ${this.model}`)
//     }

//     toString() {
//         alert(`${this.title} ${this.model}`)
//         return `${this.title} ${this.model}`
//     }

// }


// let car = new Car('Honda', 'Accord')
// let car2 = new Car('fdfdf', 'dfdfdfdfdf')
// car.show()

// setTimeout(car.toString, 2000);
// let fn = car.show.bind(car2)
// setTimeout(fn, 2000)


let obj = {
    title: "honda",
    model: "accord"
}

let json = JSON.stringify(obj)


let obj2 = JSON.parse(json)
console.log(obj2)
console.log(obj2.title)
console.log(obj2["title"])