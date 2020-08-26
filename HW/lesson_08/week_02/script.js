//#region Task_1
/*
//========================================_Задание_1_========================================================
Создать массив «Список покупок». Каждый элемент массиваявляется объектом, который содержит название продукта,
 необходимое количество и куплен или нет. Написать несколько функций для работы с таким массивом.
1. Вывод всего списка на экран таким образом, чтобы сначала шли некупленные продукты, а потом – купленные.
2. Добавление покупки в список. Учтите, что при добавлении покупки с уже существующим в списке продуктом,
необходимо увеличивать количество в существующей покупке, а не добавлять новую.
3. Покупка продукта. Функция принимает название продукта и отмечает его как купленный.
//===========================================================================================================
*/
let shopingList = [
    {
        name: "milk",
        count: 5,
        bought: false
    },
    {
        name: "bread",
        count: 2,
        bought: true
    },
    {
        name: "beef",
        count: 3,
        bought: false
    },
    {
        name: "eggs",
        count: 5,
        bought: false
    },
    {
        name: "Rum",
        count: 15,
        bought: true
    }
]

//1. Вывод всего списка на экран таким образом, чтобы сначала шли некупленные продукты, а потом – купленные.
function ShowSorted(arr) {
    return arr.sort((f, s) => f.bought > s.bought)
}
// Closure version
function ShowSortedList(arr) {
    return function () {
        return arr.sort((f, s) => f.bought > s.bought)
    }
}
const sortedDescBought = ShowSortedList(shopingList)

//2. Добавление покупки в список. Учтите, что при добавлении покупки с уже существующим в списке продуктом,
//  необходимо увеличивать количество в существующей покупке, а не добавлять новую.
function AddGoodToList(arr, good) {
    const index = arr.findIndex(i => i.name === good.name)
    index != -1 ? arr[index].count += good.count : arr.push(good)
    return arr
}
// Closure version
function AddDirectToList(arr) {
    return function (item) {
        const index = arr.findIndex(i => i.name === item.name)
        index != -1 ? arr[index].count += item.count : arr.push(item)
        return arr
    }
}
const AddToShopingList = AddDirectToList(shopingList)

//3. Покупка продукта. Функция принимает название продукта и отмечает его как купленный.
function MarkGoodAsBought(arr, good) {
    const index = arr.findIndex(i => i.name === good.name)
    if (index != -1 && arr[index].bought === false) {
        arr[index].bought = true
        return arr
    }
}
// Closure version
function DirectMarkGoodAsBought(arr) {
    return function (item) {
        const index = arr.findIndex(i => i.name === item)
        if (index != -1 && arr[index].bought === false) {
            arr[index].bought = true
            return arr
        }
    }
}
const BoughtAGood = DirectMarkGoodAsBought(shopingList)

//Test
console.log('Default arr(but other methods done strange things) = ', shopingList)
//setTimeout(() => console.log('Sorted = ', ShowSorted(shopingList)), 2000) // странная очердность операций 
console.log('Closure sort = ', sortedDescBought());
console.log('Closure add to list = ', AddToShopingList({ name: "milkiwey", count: 2, bought: false }));
//setTimeout(() => console.log('Add to certain list = ', AddGoodToList(shopingList, { name: "milkiwey", count: 2, bought: false })), 4000)
console.log('Position bought = ', BoughtAGood("beef"));

//===========================================================================================================
//#endregion

//#region Task_2
/*
//========================================_Задание_2_========================================================
Создать массив, описывающий чек в магазине. Каждый элемент массива состоит из названия товара,
 количества и цены за единицу товара. Написать следующие функции.
1. Распечатка чека на экран.
2. Подсчет общей суммы покупки.
3. Получение самой дорогой покупки в чеке.
4. Подсчет средней стоимости одного товара в чеке.
//===========================================================================================================
*/
class Purchase {
    constructor(name, count, value) {
        this.Name = name
        this.Count = count
        this.Value = value
    }
    get TotalValue() {
        return this.Count * this.Value
    }
    toString() {
        return `name: ${this.Name} - count: ${this.Count} - value: ${this.Value}`
    }
}

let storeReceipt = [
    new Purchase('banana', 10, 9),
    new Purchase('pork', 5, 25),
    new Purchase('jam', 2, 15),
    new Purchase('peneapple', 1, 30),
    new Purchase('coconut', 12, 90)
]

//1. Распечатка чека на экран.
function ShowReceipt() {
    return this.reduce((out, i) => out += `${i.toString()}\n`, '')
}

//2. Подсчет общей суммы покупки.
function ReceiptTotalValue() {
    return this.reduce((out, i) => out += i.TotalValue, 0)
}

//3. Получение самой дорогой покупки в чеке.
function GetMostExpensivePurchase() {
    return this.reduce((out, i) => out = out.TotalValue <= i.TotalValue ? i : out, this[0])
}

//4. Подсчет средней стоимости одного товара в чеке.
function GoodAvgValue() {
    return (this.reduce((out, i) => out += i.Value, 0) / this.length)
}


// Test
console.log('Receipt :\n' + ShowReceipt.apply(storeReceipt));
console.log('Receipt totel value = ' + ReceiptTotalValue.apply(storeReceipt));
console.log('Most expensive purchase = ' + GetMostExpensivePurchase.apply(storeReceipt));
console.log('Avarage good value in the Receipt', GoodAvgValue.apply(storeReceipt));
//===========================================================================================================
//#endregion

//#region Task_3
/*
//========================================_Задание_3_========================================================
Создать массив css-стилей (цвет, размер шрифта, выравнивание, подчеркивание и т. д.).
Каждый элемент массива – это объект, состоящий из двух свойств: название стиля и значение стиля.
Написать функцию, которая принимает массив стилей и текст,
 и выводит этот текст с помощью document.write() в тегах <p></p>,
 добавив в открывающий тег атрибут style со всеми стилями, перечисленными в массиве.
//===========================================================================================================
*/
class CSSStyle {
    constructor(name, value) {
        this.Name = name
        this.Value = value
    }
    toString() {
        return `${this.Name}: ${this.Value};`
    }
}

let stylesArr = [
    new CSSStyle('color', 'red'),
    new CSSStyle('font-size', '4rem'),
    new CSSStyle('background-color', 'purple'),
    new CSSStyle('text-align', 'center'),
    new CSSStyle('margin', '5px')
]

function AddParagraphWithStyles(styles, text) {
    style = "width: 2px;"
    document.write(`<p style="${styles.reduce((out, i) => out += i.toString(), '')} ">${text}</p>`)
}

// Test
AddParagraphWithStyles(stylesArr, "Hello World")
//===========================================================================================================
//#endregion

//#region Task_4
/*
//========================================_Задание_4_========================================================
Создать массив аудиторий академии. Объект-аудитория состоит из названия,
 количества посадочных мест (от 10 до 20) и названия факультета, для которого она предназначена.
Написать несколько функций для работы с ним.
1. Вывод на экран всех аудиторий.
2. Вывод на экран аудиторий для указанного факультета.
3. Вывод на экран только тех аудиторий, которые подходят для переданной группы. Объект-группа состоит из названия,
 количества студентов и названия факультета.
4. Функция сортировки аудиторий по количеству мест.
5. Функция сортировки аудиторий по названию (по алфавиту).
//===========================================================================================================
*/
class Auditory {
    constructor(name, seats, faculty) {
        this.Name = name
        if (seats < 10) {
            this.Seats = 10
        } else if (seats > 20) {
            this.Seats = 20
        } else {
            this.Seats = seats
        }
        this.Faculty = faculty
    }
    toString() {
        return `${this.Name} ${this.Seats} ${this.Faculty}`
    }
}

class Group {
    constructor(name, count, faculty) {
        this.Name = name
        this.Count = count
        this.Faculty = faculty
    }
    toString() {
        return `${this.Name} ${this.Count} ${this.Faculty}`
    }
}

let auditoriesArr = [
    new Auditory('Budi-200', 8, 'Dev'),
    new Auditory('Cab-201', 18, 'Eng'),
    new Auditory('Cab-202', 13, 'Deutch'),
    new Auditory('Aud-203', 18, 'Literature'),
    new Auditory('Cab-204', 17, 'Dev'),
    new Auditory('Cab-205', 25, 'Math')
]

//1. Вывод на экран всех аудиторий.
function ShowAuditories(arr) {
    return arr.reduce((out, i) => out += i.toString() + '\n', '')
}

//2. Вывод на экран аудиторий для указанного факультета.
function ShowAuditoriesByFaculty(arr, faculty) {
    return arr.filter(i => i.Faculty === faculty).reduce((out, i) => out += i.toString() + '\n', '')
}

//3. Вывод на экран только тех аудиторий, которые подходят для переданной группы. Объект-группа состоит из названия,
// количества студентов и названия факультета.
function CorrectAuditoriesForGroup(arr, group) {
    return ShowAuditories(arr.filter(i => i.Seats >= group.Count && i.Faculty == group.Faculty))
}

//4. Функция сортировки аудиторий по количеству мест.
function SortAuditoriesBySeats(arr) {
    return arr.sort((f, s) => f.Seats < s.Seats)
}

//5. Функция сортировки аудиторий по названию (по алфавиту).
function SortAuditoriesByName(arr) {
    return arr.sort((f, s) => f.Name > s.Name)
}


// Test
console.log('Auditories :\n' + ShowAuditories(auditoriesArr));
const fac = 'Dev'
console.log(`Auditories by faculty "${fac}" :\n` + ShowAuditoriesByFaculty(auditoriesArr, fac));
const gr = new Group('Devs', 10, 'Dev')
console.log(`Auditories for "${gr}" : \n` + CorrectAuditoriesForGroup(auditoriesArr, gr));
console.log('Auditories sorted by seats : \n' + ShowAuditories(SortAuditoriesBySeats(auditoriesArr)));
console.log('Auditories sorted by name : \n' + ShowAuditories(SortAuditoriesByName(auditoriesArr)));
//===========================================================================================================
//#endregion
