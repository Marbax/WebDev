let nContainer = document.querySelector('.newsContainer')

const newsArr = []
for (let i = 0; i < 10; i++) {
    const header = document.createElement('h2')
    header.textContent = `${i + 1} - Lorem ipsum dolor sit.`
    const paragraph = document.createElement('p')
    paragraph.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nisi nostrum facere. Necessitatibus temporibus corporis sint omnis quasi dolorem alias nesciunt reiciendis doloribus amet. Omnis deleniti ut repellat debitis officia totam qui explicabo rerum, eius velit nobis, iusto enim doloremque ducimus, veniam quae suscipit dolores ratione corporis illo? Accusamus perferendis aliquid ipsam sint autem, libero, maiores magnam laborum numquam debitis, illo delectus molestias excepturi. Explicabo impedit commodi, deleniti repudiandae placeat ipsam minus aspernatur molestiae adipisci natus pariatur! Optio quam consectetur magni dolore sequi neque necessitatibus soluta aut, ratione, minus id nihil inventore eum quae alias incidunt illo? Quibusdam deleniti saepe quod voluptas, eum eligendi ipsum, commodi cumque impedit culpa asperiores molestias non aliquid quaerat ut quae ab id eius dolorem modi. Unde distinctio praesentium, dolorem dolore quas harum soluta alias esse quos libero ut itaque commodi veniam minus blanditiis voluptatibus fugit! Quia, quos molestias itaque eveniet perferendis at dolores quae vitae impedit suscipit quod excepturi iure deserunt est sed esse cumque, magnam asperiores nostrum, dolorem rem! Dolores, ex accusamus! Esse, error adipisci quidem quo sunt facere enim ratione aliquam dolorem sint in animi laboriosam tempora maxime modi, aliquid nesciunt corrupti omnis earum. Odit, labore eum sed beatae provident facere eius ullam eaque aut. Consequatur officia nesciunt porro doloribus consectetur alias optio molestiae quam illo dolore maiores beatae voluptas inventore minus in quae, et excepturi earum! Odio magnam earum minima amet dicta temporibus cum, iste in. Autem unde vero, illo iste nihil minima fugiat dolore quas quam in ex numquam cumque, nostrum facilis laboriosam possimus similique necessitatibus deleniti. Illum laudantium natus, hic dolor, veritatis adipisci laborum eaque ad et officiis iusto aut officia in sequi quam minima blanditiis voluptas enim inventore, vero dolorum fugit. Ipsam quaerat porro quisquam laudantium obcaecati alias maiores at rerum nemo! Quisquam fugiat ex quos consequuntur molestias.'
    const div = document.createElement('div')
    div.appendChild(header)
    div.appendChild(paragraph)
    newsArr.push(div)
}

let index = 0
let scrollPos = 0
asyncAddNews()


document.addEventListener('scroll', () => asyncAddNews())

async function asyncAddNews() {
    scrollPos = await window.scrollY + window.innerHeight
    while (nContainer.offsetHeight <= scrollPos && index < newsArr.length) {
        try {
            await nContainer.appendChild(newsArr[index])
            //console.log(newsArr[index], scrollPos, nContainer.offsetHeight, index, newsArr.length);
            index++
        } catch (error) {
            console.log(error);
        }
    }
}
