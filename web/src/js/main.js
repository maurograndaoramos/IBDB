let query = ""

const loadAPI = async (query='', genre='', order='relevance') => {
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

const loadBooks = (apiContent) => {
    document.getElementById("book-container").innerHTML = ""
    // console.log(apiContent)
    if(apiContent.items) {
        apiContent.items.forEach(element => {
            console.log(element.volumeInfo.title)
            document.getElementById("book-container").innerHTML += renderBook(element.id, element.volumeInfo);
        }); 
    }


}

const getCookie = (name) => {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
}

function getCookieValue(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

let loadUser = async (username="", email="",password="",hash) => {
    const url = "http://localhost:8001/api/user_hash/";
    const data = { username, email, password, hash };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const users = await response.json();

    console.log("response: " + users);

    return users; 
}

const search = async() =>{
    query = document.getElementById("searchbar").value;
    loadBooks(await loadAPI(query));
}

window.onload = async() => {
    let genre = "";
    let order = "";
    let username = ""
    let email = ""
    let password = ""

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    if(urlParams.get('q') != null){
        query = urlParams.get('q');
        loadBooks(await loadAPI(query));
    }else {
        loadBooks(await loadAPI());
    }

    document.getElementById("book-filter-submit-button").onclick = async () => {
        genre = document.getElementById("dropdown-filter-genre").value;
        order = document.getElementById("dropdown-filter-order").value;
        loadBooks(await loadAPI(query, genre, order));
    };

    console.log("cookie: " + getCookie("id"));

    if(getCookie("id") == null){
        document.getElementById("navbar").innerHTML += 
            `<div #buttons-wrapper>
                <button id="login-button">Login</a>
                <button id="register-button">Register</a>
            </div>`

        document.getElementById("login-button").onclick = () => {
            window.location.replace("login_page.html")
        }

        document.getElementById("register-button").onclick = () => {
            window.location.replace("register_page.html")
        }

    }else{
        console.log(getCookieValue("id"))
        const user = await loadUser(username, email, password, getCookieValue("id"));
     
        document.getElementById("navbar").innerHTML += 
            `<div #buttons-wrapper>
                <span class="user-text">Olá ${user.username}!</span>
                <button id="logout-button">Logout</a>
            </div>`

        document.getElementById("logout-button").onclick = () => {
            document.cookie = 'id=; Max-Age=0; path=/;';
            window.location.replace("home_page.html");
        }
    }
}

