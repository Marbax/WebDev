//#region Task_1
/*
//========================================_Задание_1_========================================================
Создать объект, описывающий автомобиль (производитель,модель, год выпуска, средняя скорость), 
и следующие функции для работы с этим объектом.
1. Функция для вывода на экран информации об автомобиле.
2. Функция для подсчета необходимого времени для преодоления переданного расстояния со средней скоростью.
Учтите, что через каждые 4 часа дороги водителю необходимо делать перерыв на 1 час.
//===========================================================================================================
*/
let carExamle = {
    Manufacturer: "Manuf",
    Model: "Car Model",
    Year: new Date(2010, 5, 22),
    AvgSpeed: 45,
    Show: function () {
        alert(`${this.Manufacturer},\n${this.Model},\n${this.Year.toDateString()},\n${this.AvgSpeed}`)
    },
    TimeToRide: function (distance) {
        let timeWithoutRest = parseInt(distance / this.AvgSpeed)
        let allTime = timeWithoutRest + parseInt(timeWithoutRest / 4)
        alert(allTime)
    }
}
//===========================================================================================================
//#endregion

//#region Task_2
/*
//========================================_Задание_2_========================================================
Создать объект, хранящий в себе отдельно числитель и знаменатель дроби,
 и следующие функции для работы с этим объектом.
1. Функция сложения 2-х объектов-дробей.
2. Функция вычитания 2-х объектов-дробей.
3. Функция умножения 2-х объектов-дробей.
4. Функция деления 2-х объектов-дробей.
5. Функция сокращения объекта-дроби.
//===========================================================================================================
*/

class Fraction {
    constructor(num, denom = 1) {
        this.Numerator = parseInt(num)
        this.Denominator = parseInt(denom)
    }
    toString() {
        return `${this.Numerator}/${this.Denominator}`
    }
    //1. Функция сложения 2-х объектов-дробей.
    Add(second) {
        let fr2 = Fraction.parseFraction(second)
        let newDen = fr2.Denominator * this.Denominator
        let newNum = this.Numerator * fr2.Denominator + this.Denominator * fr2.Numerator
        return new Fraction(newNum, newDen).Normalize()
    }
    //2. Функция вычитания 2-х объектов-дробей.
    Sub(second) {
        let fr2 = Fraction.parseFraction(second)
        let newDen = fr2.Denominator * this.Denominator
        let newNum = this.Numerator * fr2.Denominator - this.Denominator * fr2.Numerator
        return new Fraction(newNum, newDen).Normalize()
    }
    //3. Функция умножения 2-х объектов-дробей.
    Mul(second) {
        let fr2 = Fraction.parseFraction(second)
        let newDen = fr2.Denominator * this.Denominator
        let newNum = this.Numerator * fr2.Numerator
        return new Fraction(newNum, newDen).Normalize()
    }
    //4. Функция деления 2-х объектов-дробей.
    Div(second) {
        let fr2 = Fraction.parseFraction(second)
        let newDen = this.Denominator * fr2.Numerator
        let newNum = this.Numerator * fr2.Denominator
        return new Fraction(newNum, newDen).Normalize()
    }
    static parseFraction(str) {
        let arr = str.toString().split('/')
        return new Fraction(arr[0], arr[1])
    }
    //5. Функция сокращения объекта-дроби.
    Normalize() {
        if (this.Numerator % this.Denominator === 0) {
            return this.Numerator / this.Denominator
        }
        else {
            let min_gd = Fraction.MinGeneralDivider(this.Numerator, this.Denominator)
            return `${this.Numerator / min_gd}/${this.Denominator / min_gd}`
        }
    }
    static MinGeneralDivider(a, b) {
        if (b === 0) {
            return a
        }
        else {
            return this.MinGeneralDivider(b, (a % b))
        }
    }
}

let fr1 = new Fraction(15, 30)
let fr2 = new Fraction(15, 60)
console.log(`fact1 = ${fr1}\nfact2 = ${fr2}\nfact1 + fact2 = ${fr1.Add(fr2)}\nfact1 - fact2 = ${fr1.Sub(fr2)}\nfact1 * fact2 = ${fr1.Mul(fr2)}\nfact1 / fact2 = ${fr1.Div(fr2)}`)
//===========================================================================================================
//#endregion

//#region  Task_3
/*
//========================================_Задание_3_========================================================
Создать объект, описывающий время (часы, минуты, секунды), и следующие функции для работы с этим объектом.
1. Функция вывода времени на экран.
2. Функция изменения времени на переданное количество секунд.
3. Функция изменения времени на переданное количество минут.
4. Функция изменения времени на переданное количество часов.
Учтите, что в последних 3-х функциях, при изменении одной части времени, может измениться и другая.
Например: если ко времени «20:30:45» добавить 30 секунд, то должно получиться «20:31:15», а не «20:30:75».
//===========================================================================================================
*/
class Time {
    constructor(hours, minutes, seconds) {
        this.H = parseInt(hours)
        this.M = parseInt(minutes)
        this.S = parseInt(seconds)
    }
    //1. Функция вывода времени на экран.
    toString() {
        return `${this.H}:${this.M}:${this.S}`
    }
    //2. Функция изменения времени на переданное количество секунд.
    set Seconds(secs) {
        if (parseInt(secs)) {
            this.S = parseInt(secs)
            this.Update()
        }
    }
    AddSeconds(secs) {
        if (parseInt(secs)) {
            this.S += parseInt(secs)
            this.Update()
        }
    }
    //3. Функция изменения времени на переданное количество минут.
    set Minutes(mins) {
        if (parseInt(mins)) {
            this.M = parseInt(mins)
            this.Update()
        }
    }
    AddMinutess(mins) {
        if (parseInt(mins)) {
            this.M += parseInt(mins)
            this.Update()
        }
    }
    //4. Функция изменения времени на переданное количество часов.
    set Hours(hours) {
        if (parseInt(hours)) {
            this.H = parseInt(hours)
            this.Update()
        }
    }
    AddHours(hours) {
        if (parseInt(hours)) {
            this.H += parseInt(hours)
            this.Update()
        }
    }
    Update() {
        if (this.S > 59) {
            this.M += parseInt(this.S / 60)
            this.S %= 60
        } else if (this.S < 0) {
            this.M -= parseInt(this.S * (-1) / 60)
            let secs = (this.S * (-1) % 60)
            this.S = secs > 0 ? 60 - secs : 0
        }

        if (this.M > 59) {
            this.H += parseInt(this.M / 60)
            this.M %= 60
        } else if (this.M < 0) {
            this.H -= parseInt(this.M * (-1) / 60)
            let mins = (this.M * (-1) % 60)
            this.M = mins > 0 ? 60 - mins : 0
        }

        if (this.H > 23) {
            this.H %= 24
        } else if (this.H < 0) {
            let hours = (this.H * (-1) % 24);
            this.H = hours > 0 ? 24 - hours : 0
        }
    }
}

let t1 = new Time(16, 30, 21)
console.log(`Start time = ${t1.toString()}`)
t1.AddHours(2)
console.log(`Add two hours = ${t1.toString()}`)
t1.AddSeconds("6620qwe")
console.log(`Add "6620qwe" seconds = ${t1.toString()}`)
//===========================================================================================================
//#endregion
