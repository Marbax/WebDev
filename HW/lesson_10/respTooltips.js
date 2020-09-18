//#region Task 6
/*
Создать html-страницу с несколькими кнопками.
При наведении на кнопку, должна появляться подсказка с текстом.
По умолчанию – подсказка появляется сверху от кнопки.
Но если она не помещается сверху от кнопки, тогда отображается снизу.
*/
let tTips = document.getElementsByClassName('tooltip')

for (let item of tTips) {
    item.addEventListener('mouseenter', (e) => {
        let tText = e.target.querySelector('.tooltiptext')
        if (e.clientY < tText.offsetHeight) {
            tText.classList.add('tooltiptextBot')
        } else {
            tText.classList.add('tooltiptextTop')
        }
    })
}
//#endregion
