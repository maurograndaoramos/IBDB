let loadAPI = async (query) => {
    const response = await fetch ('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAVEf9Ve2HWx_OdPCf7Q8Am-BA4_0zgMwI');
    const books = await response.json();
    console.log(books.items[new URLSearchParams(query).get('bookId')].volumeInfo.title);
}

window.onload = () => {
    loadAPI(window.location.search);

}