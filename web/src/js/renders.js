const renderBook = (id, data) =>{
    console.log(data)
    return `<a href="book_page.html?bookId=${id}" class="book-display-wrapper">
                <div class="book-card">
                    <img class="book-cover" src="${data.imageLinks.thumbnail}"/>
                    <div class="book-title">
                        <p>${data.title}</p>
                    </div>
                </div>
                <div class="book-author">
                    <p>${data.authors}</p>
                </div>
            </a>`
}

const renderBookContent = (data) =>{
    console.log(data)
    return `<div id="top-section">
                <img src="${data.imageLinks.thumbnail} id="selected-book-cover" class="image-placaeholder"/>
                <div id="book-name-wrapper">
                    <h2 id="book-name">${data.title}</h2>
                </div>
                <h3>Overview:</h3>
                <article id="book-overview">${data.description}</article>
                <div id="bottom-section">
                    <div id="authors-wrapper">
                        <h4>Author(s):</h4>
                        <article>${data.authors}</article>
                    </div>
                    <div id="publications-wrapper">
                        <h4>Publication:</h4>
                        <article>${data.publishedDate}</article>
                    </div>
                    <div id="pages-wrapper">
                        <h4>Pages:</h4>
                        <article>${data.pageCount}</article>
                    </div>
                </div>
                



            </div>

            <!-- <div class="bottom-text-wrapper" id="synopsis-wrapper">
                <h3>Synopsis:</h3>
                <article id="book-synopsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, officiis eum! Unde voluptates dolores expedita quae placeat sint cum nulla, nam provident blanditiis, voluptatibus labore consequatur eius odio aliquam rem repellat et nihil iste nobis, aliquid magni fugiat dicta. Unde explicabo doloremque officia porro, doloribus accusantium distinctio neque deleniti assumenda aperiam consequuntur asperiores placeat nobis commodi quisquam vitae rerum. Repellat eveniet totam temporibus est praesentium laboriosam ex magni quam tempore assumenda. Facilis libero ducimus minus nam dolorum ipsa exercitationem odit obcaecati, suscipit voluptatibus placeat incidunt laudantium vero rem dolorem voluptas, eum est accusantium explicabo omnis officia voluptatum dolore natus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor ipsam laborum autem a, odit sapiente odio facilis veritatis asperiores consequuntur, sed facere libero at cupiditate illum deserunt, excepturi quae harum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aperiam laboriosam temporibus aspernatur accusamus, eius praesentium sint asperiores? Necessitatibus, aliquam?</article>
            </div> -->`
}