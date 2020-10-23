//#region Classes
class Carousel {

    //#region Carousel scope DOM objects
    _rootContainer = null
    _imgContainer = null
    _paggingContainer = null

    _imgUpload = null

    _toStartBtn = null
    _prevBtn = null
    _nextBtn = null
    _toEndBtn = null

    _playBtn = null
    _pauseBtn = null

    _maximizeBtn = null
    _minimizeBtn = null
    //#endregion

    _logs = []
    _fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

    _paggingItems = []
    _paggingMaxLength = 7

    _images = []
    _curImg = { 'id': -1, 'img': new Image() }

    _isSlideShowRunning = false
    _slideShowTimer = null
    _slideShowInterval = 2000
    _animInterval = 400
    _isMaximized = false

    constructor(container) {
        this._rootContainer = container
        this.initScopeDom()
        this.initEvents()
    }

    //#region Inits
    initScopeDom() {
        this._imgContainer = this._rootContainer.querySelector('.img-container')
        this._imgUpload = this._rootContainer.querySelector('.img-upload')
        this._toStartBtn = this._rootContainer.querySelector('.nav-to-start')
        this._prevBtn = this._rootContainer.querySelector('.nav-to-prev')
        this._nextBtn = this._rootContainer.querySelector('.nav-to-next')
        this._toEndBtn = this._rootContainer.querySelector('.nav-to-end')
        this._playBtn = this._rootContainer.querySelector('.nav-play')
        this._pauseBtn = this._rootContainer.querySelector('.nav-pause')
        this._maximizeBtn = this._rootContainer.querySelector('.nav-maximize')
        this._minimizeBtn = this._rootContainer.querySelector('.nav-minimize')
        this._paggingContainer = this._rootContainer.querySelector('.pagging-container')
    }
    initEvents() {
        this._imgUpload.addEventListener('change', async () => this.uploadImagesAsync())
        this._toStartBtn.addEventListener('click', async () => this.toStart())
        this._prevBtn.addEventListener('click', async () => this.prev())
        this._nextBtn.addEventListener('click', async () => this.next())
        this._toEndBtn.addEventListener('click', async () => this.toEnd())
        this._playBtn.addEventListener('click', async () => this.play())
        this._pauseBtn.addEventListener('click', async () => this.pause())
        this._maximizeBtn.addEventListener('click', async () => this.maximize())
        this._minimizeBtn.addEventListener('click', async () => this.minimize())
    }
    initImage() {
        if (this._imgContainer.hasChildNodes()) {
            this._imgContainer.removeChild(this._curImg.img)
        }
        this._curImg.id = 0
        this._curImg.img = this._images[0]
        this._imgContainer.appendChild(this._curImg.img)
    }
    //#endregion


    //#region Image Upload Methods
    async uploadImagesAsync() {
        if (this._imgUpload.files.length > 0) {
            this._images = []
            for (const file of this._imgUpload.files) {
                const img = await this.GetImageAsync(window.URL.createObjectURL(file))
                this._images.push(img)
            }
            this.initImage()
            await this.updateUI()
        }
    }
    async GetImageAsync(imgPath) {

        let image = document.createElement('img')
        image.classList.add('slider-img')

        try {
            if (imgPath == null || imgPath.length < 1) {
                throw new Error('No image.')
            }
            let downlImg = new Image();
            downlImg.onload = function () {
                let imgUrl = this.src
                image.src = imgUrl
                image.alt = imgUrl.substring(imgUrl.lastIndexOf('/') + 1)
            };
            downlImg.src = imgPath;
            return image

        } catch (error) {
            this._logs.push(error)
        }
    }
    validFileType(file) {
        for (let i = 0; i < fileTypes.length; i++) {
            if (file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }
    returnFileSize(number) {
        if (number < 1024) {
            return number + 'bytes';
        } else if (number > 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + 'KB';
        } else if (number > 1048576) {
            return (number / 1048576).toFixed(1) + 'MB';
        }
    }
    //#endregion


    //#region Navigation Operations
    async toStart() {
        if (!this.isDisabled(this._toStartBtn)) {
            await this.changeTo(0)
        }
    }
    async prev() {
        if (!this.isDisabled(this._prevBtn)) {
            await this.changeTo(this._curImg.id - 1)
        }
    }
    async next() {
        if (!this.isDisabled(this._nextBtn)) {
            await this.changeTo(this._curImg.id + 1)
        }
    }
    async toEnd() {
        if (!this.isDisabled(this._toEndBtn)) {
            await this.changeTo(this._images.length - 1)
        }
    }
    async play() {
        if (!this.isDisabled(this._playBtn)) {
            this._isSlideShowRunning = true
            await this.updateUI()
            this._slideShowTimer = setInterval(async () => {
                await this.next()
                if (this._curImg.id === this._images.length - 1) {
                    this.pause()
                }
            }, this._slideShowInterval);
        }
    }
    async pause() {
        if (!this.isDisabled(this._pauseBtn)) {
            this._isSlideShowRunning = false
            await this.updateUI()
            clearInterval(this._slideShowTimer)
        }
    }
    async maximize() {
        if (!this.isDisabled(this._maximizeBtn)) {
            this._isMaximized = true
            await this.updateUI()
        }
    }
    async minimize() {
        if (!this.isDisabled(this._minimizeBtn)) {
            this._isMaximized = false
            await this.updateUI()
        }
    }
    async changeTo(id) {
        if (this._images.length > 0 && id >= 0 && id < this._images.length && id !== this._curImg.id) {

            const imgDisAnim = this._curImg.img.animate([
                { transform: `translate3D(0, 0, 0)` },
                { transform: `translate3D(0, ${this._rootContainer.offsetHeight}px, 0)` }
            ], {
                duration: this._animInterval,
                iterations: 1
            })
            await imgDisAnim.finished
            this._imgContainer.removeChild(this._curImg.img)

            this._curImg.id = id
            this._curImg.img = this._images[id]
            this._imgContainer.appendChild(this._curImg.img)
            const imgAppAnim = this._curImg.img.animate([
                { transform: `translate3D(0, -${this._rootContainer.offsetHeight}px, 0)` },
                { transform: `translate3D(0, 0, 0)` }
            ], {
                duration: this._animInterval,
                iterations: 1
            })
            await imgAppAnim.finished

            await this.updateUI()
        }
    }
    isDisabled(obj) {
        return obj.classList.contains('nav-disabled')
    }
    //#endregion


    //#region UI Updates
    async updateUI() {
        if (this._images.length > 0) {
            await this.updateBackArrows()
            await this.updatePlayPause()
            await this.updateForwardArrows()
            await this.updateMaximizeMinimize()
            await this.makePagging()
        }
    }
    async updateBackArrows() {
        if (this._curImg.id != 0) {
            this._toStartBtn.classList.remove("nav-disabled")
            this._prevBtn.classList.remove("nav-disabled")
        }
        else {
            this._toStartBtn.classList.add("nav-disabled")
            this._prevBtn.classList.add("nav-disabled")
        }
    }
    async updatePlayPause() {
        if (this._images.length > 1 && this._curImg.id < this._images.length - 1 && !this._isSlideShowRunning) {
            this._playBtn.classList.remove("nav-disabled")
        }
        else {
            this._playBtn.classList.add("nav-disabled")
        }

        if (this._isSlideShowRunning) {
            this._playBtn.classList.add("not-displayed")
            this._pauseBtn.classList.remove("not-displayed")
        }
        else {
            this._playBtn.classList.remove("not-displayed")
            this._pauseBtn.classList.add("not-displayed")
        }
    }
    async updateForwardArrows() {
        if (this._curImg.id < this._images.length - 1) {
            this._nextBtn.classList.remove("nav-disabled")
            this._toEndBtn.classList.remove("nav-disabled")
        } else {
            this._nextBtn.classList.add("nav-disabled")
            this._toEndBtn.classList.add("nav-disabled")
        }
    }
    async updateMaximizeMinimize() {
        this._maximizeBtn.classList.remove("nav-disabled")
        if (this._isMaximized) {
            this._maximizeBtn.classList.add("not-displayed")
            this._minimizeBtn.classList.remove("not-displayed")
            this._rootContainer.classList.remove('carousel-minimized')
            this._rootContainer.classList.add('carousel-maximized')
        }
        else {
            this._maximizeBtn.classList.remove("not-displayed")
            this._minimizeBtn.classList.add("not-displayed")
            this._rootContainer.classList.remove('carousel-maximized')
            this._rootContainer.classList.add('carousel-minimized')
        }
    }
    async makePagging() {
        await this.removeOldPagging()
        const [sideLength, start, end] = await this.calcPagging()

        for (let i = start; i <= end; i++) {
            const paggingItem = await this.makePagginBlock(i)
            if (i === this._curImg.id) {
                paggingItem.classList.add('active')
            }
            this._paggingItems.push(paggingItem)
            this._paggingContainer.appendChild(paggingItem)
        }
    }
    async removeOldPagging() {
        while (this._paggingContainer.firstChild) {
            this._paggingContainer.removeChild(this._paggingContainer.lastChild);
        }
        this._paggingItems = []
    }
    async calcPagging() {
        const sideLength = Math.floor(this._paggingMaxLength / 2)
        const start = this._curImg.id - sideLength > 0 ? this._curImg.id - sideLength : 0
        const end = this._curImg.id + sideLength >= this._images.length - 1 ? this._images.length - 1 : this._curImg.id + sideLength
        return [sideLength, start, end]
    }
    async makePagginBlock(id) {
        const padB = document.createElement('div')
        padB.classList.add('pagging-item')
        padB.addEventListener('click', async () => await this.changeTo(id))
        return padB
    }
    //#endregion


}
//#endregion


//#region Init
const carouselsSelectors = document.querySelectorAll('.carousel')
let carousels = []
carouselsSelectors.forEach(item => {
    carousels.push(new Carousel(item))
});
//#endregion

