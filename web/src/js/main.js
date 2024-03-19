let loadAPI = async (query) => {
    const response = await fetch ('https://www.googleapis.com/books/v1/volumes?q=fiction&orderBy=newest&maxResults=6&&key=AIzaSyAVEf9Ve2HWx_OdPCf7Q8Am-BA4_0zgMwI');
    const books = await response.json();

    return books;
    //console.log(books.items[new URLSearchParams(query).get('bookId')].volumeInfo.title);
}

let loadBooks = (apiContent) => {
    
    //console.log(apiContent)
    apiContent.items.forEach(element => {
        console.log(element.volumeInfo.title)
        document.getElementById("book-container").innerHTML += renderBook(element.id, element.volumeInfo);
    });
    
}

window.onload = async() => {
    loadBooks(await loadAPI());
}