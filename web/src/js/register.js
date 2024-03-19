let registerUser = async (username,email,password,hash) => {
    const url = "http://localhost:8001/api/create_user/";
    const data = { username, email, password,hash};

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const users = await response.json();

        return users; 

    } catch (error) {
        console.error('Error:', error.message);
    }
}

let loadUser = async (username="",email,password,hash) => {
    const url = "http://localhost:8001/api/users/";
    const data = { username, email, password,hash};

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

    document.getElementById("submit-register").onclick = async () => {
        username = document.getElementById("uname").value;
        email = document.getElementById("uemail").value;
        password = document.getElementById("psw").value;

        const register = await registerUser(username, email, password, hash);

        if(register == "")
            window.alert("Utilizador não existe, por favor faça um registo!")
        else{
            const user = await loadUser(username, email, password,hash);
            console.log(user);
            const d = new Date();
            d.setTime(d.getTime() + (100*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = `id=${user.hash};expires=${expires};path=/`;
            window.location.replace("home_page.html");
        }
    }

}

