
//#region Task 1
/*
Создать html-страницу для ввода имени пользователя.
Необходимо проверять каждый символ, который вводит пользователь. 
Если он ввел цифру, то не отображать ее в input.
*/
let inNameForm = document.getElementById('inName')
inNameForm.addEventListener('keypress', checkName);

function checkName(evt) {
    var charCode = evt.charCode;
    if (charCode != 0 && charCode <= 57 && charCode >= 48) {
        evt.preventDefault();
    }
}
//#endregion

//#region Task 2
/*
Создать html-страницу с кнопкой Открыть и модальным окном. 
На модальном окне должен быть текст и кнопка Закрыть.
Изначально модальное окно не отображается. 
При клике на кнопку Открыть появляется модальное окно, на кнопку Закрыть исчезает.
*/
let openModal = document.getElementById('openModel')
let closeModal = document.getElementById('closeModal')
let modalWindow = document.getElementById('modalWindow')

openModal.addEventListener('click', OpenModal)
closeModal.addEventListener('click', CloseModal)

function OpenModal() {
    modalWindow.style.display = 'block'
}
function CloseModal() {
    modalWindow.style.display = 'none'
}
//#endregion

//#region Task 4
/*
Создать html-страницу со светофором и кнопкой, которая переключает светофор на следующий цвет.
*/
let tlGreen = document.getElementById('tlGreen')
let tlYellow = document.getElementById('tlYellow')
let tlRed = document.getElementById('tlRed')
let tlNext = document.getElementById('lightsButton')
let last = tlGreen

tlNext.addEventListener('click', () => {
    if (last === tlGreen) {
        tlGreen.style.backgroundColor = '#888'
        tlYellow.style.backgroundColor = 'yellow'
        last = tlYellow

    } else if (last === tlYellow) {
        tlYellow.style.backgroundColor = '#888'
        tlRed.style.backgroundColor = 'red'
        last = tlRed

    } else if (last === tlRed) {
        tlRed.style.backgroundColor = '#888'
        tlGreen.style.backgroundColor = 'green'
        last = tlGreen
    }
})
//#endregion

//#region Task 5
/*
Создать html-страницу со списком книг.
При щелчке на книгу, цвет фона должен меняться на оранжевый.
Учтите, что при повторном щелчке на другую книгу, предыдущей необходимо возвращать прежний цвет.
*/
let bookArr = ['In Search of Lost Time by Marcel Proust.', 'Ulysses by James Joyce.', 'Don Quixote by Miguel de Cervantes.', 'The Great Gatsby by F.', 'One Hundred Years of Solitude by Gabriel Garcia Marquez.', 'Moby Dick by Herman Melville.', 'War and Peace by Leo Tolstoy.', 'Lolita by Vladimir Nabokov.']
let activeBook = null

let booksContainer = document.getElementById('booksContainer')

bookArr.forEach(item => {
    let book = document.createElement('li')
    book.textContent = item
    book.addEventListener('click', () => {
        if (activeBook != null) {
            activeBook.style.backgroundColor = 'white'
        }
        book.style.backgroundColor = 'orange'
        activeBook = book
    })
    booksContainer.appendChild(book)
});
//#endregion

