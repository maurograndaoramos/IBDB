let loadAPI = async (id) => {
    const response = await fetch (`https://www.googleapis.com/books/v1/volumes/${id}`);
    const books = await response.json();

    return books;
    //console.log(books.items[new URLSearchParams(query).get('bookId')].volumeInfo.title);
}

let loadBooks = (element) => {
    //console.log(apiContent)
    document.getElementById("book-info").innerHTML += renderBookContent(element.volumeInfo);
}

window.onload = async() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    loadBooks(await loadAPI(urlParams.get('bookId')));
}