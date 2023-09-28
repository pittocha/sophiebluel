const apiUrl = "http://localhost:5678/api/works/";
const categoryUrl = "http://localhost:5678/api/categories"
//je prepare le modal en recuperant les different elements
const modal = document.getElementById("myModal");
const btnmobal = document.getElementById("modifier");
const close = document.getElementsByClassName("close");
const modalImg = document.querySelector(".modal-image");
const btnAdditem = document.getElementById("addItem");
const gallery = document.querySelector(".modal-content");
//réfèrencement des éléments pour la naviguation dans le modal
const modalAddItem = document.querySelector(".modal-addItem"); 
const back = document.getElementsByClassName("previous")[0];
//réfèrencement des elements pour l'ajout de photo
const fileInput = document.getElementById("fileImput");
const addTool = document.querySelector(".add-tool");
const importedPhoto = document.querySelector(".imported-photo");
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
//function pour recuperer les categories
async function fetchCategory() {
    try {
        const resp = await fetch(categoryUrl);
        if (!resp.ok){
            console.log("Erreur lors de la recupperation des données");
            return[];
        }
        const catId = await resp.json();
        return catId;
    } catch (error){
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
      deleteIcon.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        deleteElement(work, image);
      });
    });
}

//event listener pour l'ajout de photo
fileInput.addEventListener("change", function(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        //vérification du format de l'image
        if (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") {
            //véreifcation de la taille du fichier
            if (selectedFile.size <= 4 * 1024 * 1024) {

                const reader = new FileReader();
                
                reader.addEventListener("load", function() {
                    //Masquer le contenu de la div add-tool quand la photo est charger
                    addTool.style.display = "none";
                    //mise à jours de l'elements img quand le load est terminer
                    importedPhoto.src = reader.result;
                });
                
                //commencer la lecture du fichier en tant qu'URL
                reader.readAsDataURL(selectedFile);
            } else {
                //message pour indiquer que le fichier est trop volumineux
                alert("Le fichier est trop volumineux, la taille maximum autorisée est de 4 Mo.");
            }
        } else {
            //message pour indiquer que le fichier n'est pas au bon format
            alert("Le fichier doit être au format JPG ou PNG.");
        }
    }
});

//fonction pour récupererles categories et leur id pour les injecter dans les option dde la partie select du form
async function displayCategory() {
    const catId = await fetchCategory();
    const categorieSelect =  document.getElementById("categorie");

    catId.forEach(function (category) {
        const option = document.createElement("option");
        option.value = category.id;//l'item value de chaque option correspondrat à l'id de la categorie
        option.text = category.name;//le texte de chaque selection serat le nom de la categorie
        categorieSelect.appendChild(option);
    });
}

function resetModal() {
    gallery.style.display = "block";
    modalAddItem.style.display = "none";
    modalImg.innerHTML = "";
}

//ouverture du modal au click sur le bouton
btnmobal.onclick = function() {
    modal.style.display = "block";
    modalAddItem.style.display = "none";
    displayImages ();
}

//fermeture du modal avec le croix
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        modal.style.display = "none";
        resetModal();
    }
}

//fermeture du modal au click en dehors de la fenetre
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        resetModal();
    };
};

//switch entre fonction suppression et ajout
btnAdditem.onclick = function() {
    gallery.style.display = "none";
    modalAddItem.style.display = "block";
}
back.onclick = function() {
    gallery.style.display = "block";
    modalAddItem.style.display = "none";
}

displayCategory();
