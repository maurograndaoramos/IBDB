let loadAPI = async (query) => {
    const response = await fetch ('https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?projection=lite&key=AIzaSyAVEf9Ve2HWx_OdPCf7Q8Am-BA4_0zgMwI');
    const books = await response.json();

    return books;
    //console.log(books.items[new URLSearchParams(query).get('bookId')].volumeInfo.title);
}

let loadBooks = (apiContent) => {
    
    console.log(apiContent);
    //apiContent.forEach(element => {
        //document.getElementById("book-container").innerHTML+= renderBook(element);
    //});
    
}

window.onload = () => {
    apiContent = loadAPI();
    loadBooks(apiContent);
}