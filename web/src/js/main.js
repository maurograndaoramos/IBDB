let loadAPI = async (query='', genre='', order='relevance') => {
    let link = ""

    if(query === '' && genre === '')
        link = `https://www.googleapis.com/books/v1/volumes?q=novel&orderBy=${order}&maxResults=6&key=AIzaSyAVEf9Ve2HWx_OdPCf7Q8Am-BA4_0zgMwI`;
    else if(genre === '')
        link = `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=${order}&maxResults=6&key=AIzaSyAVEf9Ve2HWx_OdPCf7Q8Am-BA4_0zgMwI`
    else
        link = `https://www.googleapis.com/books/v1/volumes?q=${query}+${genre}&orderBy=${order}&maxResults=6&key=AIzaSyAVEf9Ve2HWx_OdPCf7Q8Am-BA4_0zgMwI`

    console.log("link: " + link)
    const response = await fetch (link);
    const books = await response.json();

    return books;
    //console.log(books.items[new URLSearchParams(query).get('bookId')].volumeInfo.title);
}

let loadBooks = (apiContent) => {
    document.getElementById("book-container").innerHTML = ""
    // console.log(apiContent)
    if(apiContent.items) {
        apiContent.items.forEach(element => {
            console.log(element.volumeInfo.title)
            document.getElementById("book-container").innerHTML += renderBook(element.id, element.volumeInfo);
        }); 
    }


}

window.onload = async() => {
    let query = "";
    let genre = "";
    let order = "";

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    if(urlParams.get('q') != null)
        loadBooks(await loadAPI(urlParams.get('q')));
    else
        loadBooks(await loadAPI());

    document.getElementById("submit-button").onclick = async () => {
        query = document.getElementById("searchbar").value;
        loadBooks(await loadAPI(query, genre, order));
    }

    document.getElementById("book-filter-submit-button").onclick = async () => {
        genre = document.getElementById("dropdown-filter-genre").value;
        order = document.getElementById("dropdown-filter-order").value;
        loadBooks(await loadAPI(query, genre, order));
    };
}

