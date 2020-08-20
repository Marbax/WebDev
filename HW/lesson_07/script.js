//1. Написать функцию, которая принимает 2 числа и возвращает -1, если первое меньше, чем второе;
//    1 – если первое больше, чем второе; 
//    и 0 – если числа равны.
function myComparer(fValue, sValue) {
    let f = parseInt(fValue)
    let s = parseInt(sValue)
    if (f < s) {
        return -1
    }
    else if (f > s) {
        return 1
    }
    else if (f === s) {
        return 0
    }
    else {
        return 'Wrong format'
    }
}

//2. Написать функцию, которая вычисляет факториал переданного ей числа.
function findFactorial(numIn) {
    let num = parseInt(numIn)
    if (num === 0) {
        return 1
    }
    return findFactorial(num - 1) * num
}
function findFactorialCycle(numIn) {
    let num = parseInt(numIn)
    let factorial = 1
    while (num > 1) {
        factorial *= num
        num -= 1
    }
    return factorial
}

// 3. Написать функцию, которая принимает три отдельные цифры и превращает их в одно число. Например: 
//      цифры 1, 4, 9 превратятся в число 149.
function threeNumsToString(num1, num2, num3) {
    let f = parseInt(num1)
    let s = parseInt(num2)
    let t = parseInt(num3)
    let str = '' + f + s + t
    return parseInt(str)
}

//4. Написать функцию, которая принимает длину и ширину прямоугольника и вычисляет его площадь. 
//      Если в функцию передали 1 параметр, то она вычисляет площадь квадрата.
function findRectArea(width, height) {
    let w = parseInt(width)
    let h = parseInt(height)
    if (h > 0) {
        return w * h
    }
    else {
        return w * w
    }
}

//5. Написать функцию, которая проверяет, является ли переданное ей число совершенным. 
//      Совершенное число – это число, равное сумме всех своих собственных делителей.
function isPerfectNumber(number) {
    let n = parseInt(number)
    let sum = 0
    for (let i = 1; i < n; i++) {
        if (n % i === 0) {
            sum += i
        }
    }
    if (sum === n) {
        return true
    }
    else {
        return false
    }
}

//6. Написать функцию, которая принимает минимальное и максимальное значения для диапазона, 
//      и выводит толькоте числа из диапазона, которые являются совершенными.
//      Используйте написанную ранее функцию, чтобы узнавать,совершенное число или нет.
function getPerfectNumbersInRange(rangeStart, rangeEnd) {
    let s = parseInt(rangeStart)
    let e = parseInt(rangeEnd)
    let arr = []
    for (let i = s; i < e; i++) {
        if (isPerfectNumber(i)) {
            arr.push(i)
        }
    }
    return arr
}

//7. Написать функцию, которая принимает время (часы, минуты, секунды) и выводит его на экран в формате «чч:мм:сс».
//      Если при вызове функции минуты и/или секунды не были переданы, то выводить их как 00.
function toTime(hours, minutes, seconds) {
    let h = parseInt(hours)
    let m = parseInt(minutes)
    let s = parseInt(seconds)
    let time = ''
    if (h > 0) {
        time += h < 10 ? '0' + h : h
    } else {
        time += '00'
    }
    time += ':'
    if (m > 0) {
        time += m < 10 ? '0' + m : m
    }
    else {
        time += '00'
    }
    time += ':'
    if (s > 0) {
        time += s < 10 ? '0' + s : s
    } else {
        time += '00'
    }
    return time
}

//8. Написать функцию, которая принимает часы, минуты и секунды и возвращает это время в секундах.
function timeToSeconds(hours, minutes, seconds) {
    let h = parseInt(hours)
    let m = parseInt(minutes)
    let s = parseInt(seconds)
    h = h > 0 ? h : 0
    m = m > 0 ? m : 0
    s = s > 0 ? s : 0

    if (h > 0) {
        m += h * 60
    }
    if (m > 0) {
        s += m * 60
    }
    return s
}

//9. Написать функцию, которая принимает количество секунд, переводит их в часы, 
//      минуты и секунды и возвращает в виде строки «чч:мм:сс».
function secondsToTime(seconds) {
    let s = parseInt(seconds)
    let h = 0, m = 0
    s = s > 0 ? s : 0
    if (s > 59) {
        m = parseInt(s / 60)
        s = s % 60
    }
    if (m > 59) {
        h = parseInt(m / 60)
        m = m % 60
    }
    return toTime(h, m, s)
}

//10. Написать функцию, которая считает разницу между датами.
//      Функция принимает 6 параметров, которые описывают 2 даты, и возвращает результат в виде строки «чч:мм:сс». 
//      При выполнении задания используйте функции из предыдущих 2-х заданий: сначала обе даты переведите в секунды,
//      узнайте разницу в секундах, а потом разницу переведите обратно в «чч:мм:сс».
function getTimeStamp(fYear, fMonth, fDay, sYear, sMonth, sDay) {
    let fS = getSecondsFromDate(fYear, fMonth, fDay)
    let sS = getSecondsFromDate(sYear, sMonth, sDay)
    let sStamp = fS >= sS ? fS - sS : sS - fS
    let time = secondsToTime(sStamp)
    return time
}

function getSecondsFromDate(year, month, day) {
    return (new Date(year, month, day) - new Date(0, 0, 0, 0, 0, 0, 0)) / 1000
}
