const renderBook = (data) =>{
    return `<div class="book-display-wrapper">
                <a href="#">
                    <div class="book-cover"></div>
                    <div class="book-title">
                        <p>${data.title}</p>
                    </div>
                </a>
                <div class="book-author">
                    <p>${data.title}</p>
                </div>
            </div>`
}