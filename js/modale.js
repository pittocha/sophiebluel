const apiUrl = "http://localhost:5678/api/works/";

//je prepare le modal en recuperant les different elements
const modal = document.getElementById("myModal");
const btnmobal = document.getElementById("modifier");
const close = document.getElementsByClassName("close")[0];
const modalImg = document.querySelector(".modal-image");
const btnAdditem = document.getElementsByClassName("addItem");


//fonction pour recuperer les données depuis l'api
async function fetchData() {
    try {
        const resp = await fetch(apiUrl);
        if (!resp.ok) {
            console.log("Erreur lors de la recupperation des données");
            return[];
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la recupperation des données",error);
        return[];
    }
}

//fonction de suppression
async function deleteElement(work, image) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        console.log("Token manquan");
        return;
    }

    try {
        const resp = await fetch(apiUrl + work.id, {
            method: "DELETE",
            headers: {
                Authorization: `bearer ${token}`,
            },
        });

        if (resp.ok) {
            modalImg.removeChild(image);
            const notification = document.querySelector(".notification");
            notification.textContent = "Élément suprimmer avec succès!";
            notification.style.display = "block";

            setTimeout(function (event) {
                notification.style.display = "none";
                event.preventDefault();
            }, 1500);
        } else {
            console.log("Erreur lors de la supression");
        }
    } catch (error) {
        console.error("Erreur lors de la supression", error);
    }
}

// Fonction pour afficher les images dans le modal
async function displayImages() {
    modalImg.innerHTML = "";
  
    const data = await fetchData();
  
    data.forEach(function (work) {
      const image = document.createElement("div");
      image.innerHTML = `
        <img src="${work.imageUrl}" id="${work.id}" alt="${work.title}" class="miniature">
        <i class="fa-solid fa-trash-can" id="delete-icon"></i>
      `;
      image.classList.add("small-work");
      modalImg.appendChild(image);
  
      const deleteIcon = image.querySelector("#delete-icon");
      deleteIcon.addEventListener("click", function () {
        deleteElement(work, image);
      });
    });
}

//ouverture du modal au click sur le bouton
btnmobal.onclick = function() {
    modal.style.display = "block";
    displayImages ();
}

//fermeture du modal avec le croix
close.onclick = function() {
    modal.style.display = "none";
}

//fermeture du modal au click en dehors de la fenetre
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    };
};