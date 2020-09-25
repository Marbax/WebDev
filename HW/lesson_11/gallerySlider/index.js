
const imgWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--input-img-width'))
const imgCount = 1;
const carouselList = document.querySelectorAll('.carousel')

const imgArr = ['https://images.freeimages.com/images/large-previews/07a/beach-soft-light-1379401.jpg',
    'https://images.freeimages.com/images/large-previews/f3f/land-from-above-2-1636750.jpg',
    'https://images.freeimages.com/images/large-previews/8e8/barren-land-1220144.jpg',
    'https://images.freeimages.com/images/large-previews/044/bieszczady-1548386.jpg',
    'https://images.freeimages.com/images/large-previews/bd7/falloxbow-1058032.jpg',
    'https://images.freeimages.com/images/large-previews/773/koldalen-4-1384902.jpg',
    'https://images.freeimages.com/images/large-previews/cef/koldalen-1-1384917.jpg',
    'https://images.freeimages.com/images/large-previews/4f3/verde-que-te-quiero-verde-1-1408392.jpg',
    'https://images.freeimages.com/images/large-previews/10e/verde-que-te-quiero-verde-4-1234458.jpg']


carouselList.forEach(element => {
    let ul = element.querySelector('.images')
    let listItems = []
    let pos = 0
    let prev = element.querySelector('.prev')
    prev.style.display = 'none'
    let next = element.querySelector('.next')

    imgArr.forEach(img => {
        let li = document.createElement('li')
        let iiImg = document.createElement('img')
        let downlImg = new Image();
        downlImg.onload = function () {
            let path = this.src
            iiImg.src = path
            iiImg.alt = path.substring(path.lastIndexOf('/') + 1)
        };
        downlImg.src = img;
        li.appendChild(iiImg)
        listItems.push(li)
        ul.appendChild(li)
    });

    prev.addEventListener('click', () => {
        if (pos >= imgWidth * -imgCount) {
            prev.style.display = 'none'
        }
        if (pos >= imgWidth * -(imgArr.length - 1)) {
            next.style.display = 'block'
        }
        pos += imgWidth * imgCount;
        pos = Math.min(pos, 0)
        ul.style.marginLeft = pos + 'px';
    });

    next.addEventListener('click', () => {
        pos -= imgWidth * imgCount;
        if (pos <= imgWidth * -imgCount) {
            prev.style.display = 'block'
        }
        if (pos <= imgWidth * -(imgArr.length - imgCount)) {
            next.style.display = 'none'
        }
        pos = Math.max(pos, -imgWidth * (listItems.length - imgCount));
        ul.style.marginLeft = pos + 'px';
    });

});
