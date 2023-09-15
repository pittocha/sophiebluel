const requestUrl = "http://localhost:5678/api/users/login";
const userId = 1



let form = document.querySelector("form");
const error = "mot de passe ou email invalide"

// je commence par l'addevnt listener 
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    //je récupère les valeur entrée par l'utilisateur
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value

    // je crée un objet avec les information de l'utilisateur
    const data = {
        email: email,
        password: password,
    };

    try {
        //j'envoie la requete au serveur
        const response = await fetch(requestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),//je convertis le data en json
        });
        console.log(data)
        if (response.ok) {
            //authentification réussi
            const responseData = await response.json();
            // je stocke le token dans le local storage(je suis pas super à l'aise avec cette methode pour des raisons de ssecurité)
            sessionStorage.setItem("token", responseData.token);
            //je redirige vers l'index
            window.location.href = "index.html";
            console.log(localStorage);
        }else{
            //echec d'authentification
            const errorContainer = document.getElementById("identification");
            const errorMsg = document.createElement("div");
            errorMsg.innerText = "Identifiants incorrect";
            errorMsg.classList.add("error-message");
            errorContainer.appendChild(errorMsg);
            console.error("Echec d'authentification", error);
        }
    } catch (error) {
        console.error("une erreue est survenue", error);
    }
});
