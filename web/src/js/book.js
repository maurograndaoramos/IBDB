let loadAPI = async (id) => {
    const response = await fetch (`https://www.googleapis.com/books/v1/volumes/${id}?langRestrict=en`);
    const books = await response.json();

    return books;
    //console.log(books.items[new URLSearchParams(query).get('bookId')].volumeInfo.title);
}

let loadBooks = (element) => {
    //console.log(apiContent)
    document.getElementById("book-info").innerHTML += renderBookContent(element.volumeInfo);
}

const getCookie = (name) => {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
}

let loadUser = async (username="", email="",password="", hash) => {
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

window.onload = async() => {
    let username = ""
    let email = ""
    let password = ""

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    loadBooks(await loadAPI(urlParams.get('bookId')));

    document.getElementById("submit-button").onclick = async () => {
        query = document.getElementById("searchbar").value;
        window.location.replace(`home_page.html?q=${query}`)
    }

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

