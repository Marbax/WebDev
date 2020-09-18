
//#region Task 3
/*
Создать html-страницу с футбольным полем, которое занимает всю ширину и высоту экрана, и мячом размером 100 на 100пикселей.
Сделать так, чтобы при клике мышкой по полю, мяч плавно перемещался на место клика. 
Учтите: необходимо, чтобы центр мяча останавливался именно там, где был совершен клик мышкой.
Также предусмотрите, чтобы мяч не выходил за границы поля.
*/

let fBall = document.getElementById('fBall')

document.addEventListener('click', function (e) {
    let coords = {
        x: e.clientX - fBall.clientWidth / 2,
        y: e.clientY - fBall.clientHeight / 2
    }
    const { x, y } = coords
    fBall.style.left = `${x}px`
    fBall.style.top = `${y}px`
})


//#endregion