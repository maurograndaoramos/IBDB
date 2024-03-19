let loadUser = async (username="", email,password,hash) => {
    const url = "http://localhost:8001/api/users/";
    const data = { username, email, password,hash };

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

window.onload = async() => {
    let username = ""
    let email = ""
    let password = ""
    let hash = ""

    document.getElementById("submit-login").onclick = async () => {
        email = document.getElementById("uemail").value;
        password = document.getElementById("psw").value;

        const users = await loadUser(username, email, password, hash);

        console.log(users)

        if(users == "")
            window.alert("Utilizador não existe, por favor faça um registo!")
        else{
            console.log(users);
            const d = new Date();
            d.setTime(d.getTime() + (100*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = `id=${users.hash};expires=${expires};path=/`;
            window.location.replace("home_page.html")
        }
    }

}

