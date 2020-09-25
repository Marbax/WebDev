let expandObjsArr = document.querySelectorAll('.eObj')
let expadedObj = null

expandObjsArr.forEach(element => {
    //let expTrigger = element.querySelector('.eTrigger')
    let expContent = element.querySelector('.eContent')

    element.addEventListener('click', () => {
        if (expContent !== expadedObj) {
            hideExpanded(expadedObj)
            expContent.classList.remove('eContentin')
            expContent.classList.add('eContentOut')
            expadedObj = expContent
        } else {
            hideExpanded(expadedObj)
        }
    })

    expContent.addEventListener('click', () => {
        expContent.classList.remove('eContentOut')
        expContent.classList.add('eContentin')
    })
});

function hideExpanded(eObj) {
    if (eObj !== null) {
        eObj.classList.remove('eContentOut')
        eObj.classList.add('eContentin')
        expadedObj = null
    }
}
