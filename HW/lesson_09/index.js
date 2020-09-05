//#region Задание 1 +
/*
 Реализовать класс, описывающий окружность. 
 В классе долж-ны быть следующие компоненты:
    - поле, хранящее радиус окружности;
    - get-свойство, возвращающее радиус окружности;
    - set-свойство, устанавливающее радиус окружности;
    - get-свойство, возвращающее диаметр окружности;
    - метод, вычисляющий площадь окружности;
    - метод, вычисляющий длину окружности.
 Продемонстрировать работу свойств и методов.
*/
class Circle {
    _radius = 0

    constructor(r) {
        this._radius = r
    }

    set Radius(r) {
        this._radius = r
    }
    get Radius() {
        return this._radius
    }
    get Square() {
        return this._radius ** 2 * Math.PI
    }
    get Perimeter() {
        return this._radius * (Math.PI * 2)
    }
    get Diameter() {
        return this._radius * 2
    }

    toString() {
        return `${this._radius}`
    }
}

console.log('Task 1');

let testCircle = new Circle(15)
console.log(testCircle)
console.log('Radius = ', testCircle.Radius)
console.log('Square = ', testCircle.Square)
console.log('Perimeter = ', testCircle.Perimeter)
console.log('Diameter = ', testCircle.Diameter)
//#endregion


//#region Задание 2
/*
Реализовать класс, описывающий html элемент.
Класс HtmlElement должен содержать внутри себя:
    - название тега;
    - самозакрывающийся тег или нет;
    - текстовое содержимое;
    - массив атрибутов;
    - массив стилей;
    - массив вложенных таких же тегов;
    - метод для установки атрибута;
    - метод для установки стиля;
    - метод для добавления вложенного элемента в конец теку-щего элемента;
    - метод для добавления вложенного элемента в начало те-кущего элемента;
    - метод getHtml(), который возвращает html код в виде строки, включая html код вложенных элементов.
*/
class MyHtmlElement {
    _name = '' //- название тега;
    _isSelfClosing = false //- самозакрывающийся тег или нет;
    _textContent = '' //- текстовое содержимое;
    _attributes = [] //- массив атрибутов;
    _styles = [] //- массив стилей;
    _tags = [] //- массив вложенных таких же тегов;

    constructor(name, isSelfClosing, textContent, attributes, styles, tags) {
        this._name = name
        this._isSelfClosing = isSelfClosing
        this._textContent = textContent
        this._attributes = attributes
        this._styles = styles
        this._tags = tags
    }

    //- метод для установки атрибута;
    InstallAttribute(attribute) {
        if (this._attributes == null) {
            this._attributes = [attribute]
        }
        else {
            this._attributes.push(attribute)
        }
    }
    //- метод для установки стиля;
    InstallStyle(style) {
        if (this._styles == null) {
            this._styles = [style]
        }
        else {
            this._styles.push(style)
        }
    }
    //- метод для добавления вложенного элемента в конец теку-щего элемента;
    PushInnerTag(tag) {
        if (!this._isSelfClosing) {
            if (this._tags == null) {
                this._tags = [tag]
            }
            else {
                this._tags.push(tag)
            }
        }
    }
    //- метод для добавления вложенного элемента в начало те-кущего элемента;
    UnshiftInnerTag(tag) {
        if (!this._isSelfClosing) {
            if (this._tags == null) {
                this._tags = [tag]
            }
            else {
                this._tags.unshift(tag)
            }
        }
    }
    //- метод getHtml(), который возвращает html код в виде строки, включая html код вложенных элементов.
    getHtml() {
        // License type BFD(Blood From Eyes)
        return `<${this._name}${this._attributes != null ? ` ${this._attributes.join(' ')}` : ``}${this._styles != null ? ` style="${this._styles.join('; ')};"` : ``}${this._isSelfClosing ? `${this._textContent != null ? ` value="${this._textContent}"` : ``}>` : `>${this._textContent != null ? `${this._textContent}` : ``}${this._tags != null ? `  ${this._tags != null ? `  ${this._tags.flatMap((t) => t.getHtml()).join('')}` : ''}` : ``}</${this._name}>`}`
    }


}
// new Array(3).fill('\n').join('')
console.log('\n\n\nTask 2');

let tag021 = new MyHtmlElement('a', false, 'More...', ['href="https://www.ipsum.com/"', 'target="_blank"'], null, null)
let p0 = '"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero doloremque itaque dicta debitis illum. Facilis mollitia enim nobis debitis consequuntur doloribus libero aperiam quae vero non voluptas deserunt quo incidunt rerum sapiente quidem quaerat eaque maiores quibusdam commodi, dicta consectetur."'
let tag02 = new MyHtmlElement('p', false, p0, ['class="text"'], null, null)
let tag01 = new MyHtmlElement('img', true, null, ['src="lipsum.jpg"', 'alt="Lorem Ipsum"', 'class="img"'], null, null)
let tag00 = new MyHtmlElement('h3', false, 'What is Lorem Ipsum?', null, null, null)
let tag0 = new MyHtmlElement('div', false, null, ['class="block"'], null, null)
let rootTag = new MyHtmlElement('div', false, null, ['id="wrapper"', 'class="wrap"'], null, [tag0])
rootTag.PushInnerTag(tag0)
tag0.PushInnerTag(tag00)
tag0.PushInnerTag(tag01)
tag0.PushInnerTag(tag02)
tag02.PushInnerTag(tag021)

console.log(rootTag)
console.log(rootTag.getHtml())
//document.write(rootTag.getHtml())
//#endregion


//#region Задание 3
/*
Реализовать класс, который описывает css класс. Класс CssClass должен содержать внутри себя:
    - название css класса;
    - массив стилей;
    - метод для установки стиля;
    - метод для удаления стиля;
    - метод getCss(), который возвращает css код в виде стро-ки.
*/
class CssClass {
    _name = '' //- название css класса;
    _styles = [] //- массив стилей;

    constructor(name = null, styles = []) {
        this._name = name
        this._styles = styles
    }

    //- метод для установки стиля;
    AddStyle(style) {
        if (this._styles == null) {
            this._styles = [style]
        }
        else {
            this._styles.push(style)
        }
    }
    //- метод для удаления стиля;
    RemoveStyle(style) {
        if (this._styles != null && this._styles.includes(style)) {
            this._styles = this._styles.filter(i => i !== style)
        }
    }
    //- метод getCss(), который возвращает css код в виде стро-ки.
    getCss() {
        return `${this._name} {\n\t${this._styles != null ? `${this._styles.join(';\n\t')};` : ``}\n}`
    }

}

console.log('\n\n\nTask 3');

let clsWrap = new CssClass('.wrap')
clsWrap.AddStyle('display: flex')

let clsBlock = new CssClass('.block')
clsBlock.AddStyle('width: 300px')
clsBlock.AddStyle('margin: 10px')

let clsImg = new CssClass('.img')
clsImg.AddStyle('width: 100%')

let clsText = new CssClass('.text')
clsText.AddStyle('text-align: justify')

console.log(clsWrap, clsBlock, clsImg, clsText);
console.log(clsBlock.getCss());

//#endregion


//#region Задание 4
/*
Реализовать класс, описывающий блок html документ. Класс HtmlBlock должен содержать внутри себя:
    - коллекцию стилей, описанных с помощью класса CssClass;
    - корневой элемент, описанный с помощью класса HtmlElement;
    - метод getCode(), который возвращает строку с html ко-дом (сначала теги style с описанием всех классов,
        а потом все html  содержимое  из  корневого  тега  и  его  вложенных  элементов).
*/
class HtmlBlock {
    _styles = [] //- коллекцию стилей, описанных с помощью класса CssClass;
    _root = null //- корневой элемент, описанный с помощью класса HtmlElement;

    constructor(styles = [], root = null) {
        this._styles = styles
        this._root = root
    }
    //- метод getCode(), который возвращает строку с html ко-дом (сначала теги style с описанием всех классов,
    //  а потом все html  содержимое  из  корневого  тега  и  его  вложенных  элементов).
    getCode() {
        return `<style>\n${this._styles.flatMap(s => s.getCss()).join('\n')}\n</style>\n${this._root.getHtml()}`
    }

}

console.log('\n\nTask 4');
htmlB = new HtmlBlock([clsWrap, clsBlock, clsImg, clsText], rootTag)
console.log(htmlB);
console.log(htmlB.getCode());
document.write(htmlB.getCode())
//#endregion
