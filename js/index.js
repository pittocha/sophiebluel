const apiUrl = "http://localhost:5678/api/works/";
const container = document.querySelector(".gallery");
//fonction qui extrait les categories unique
function getUniqueCategories(data) {
    const uniqueCategories = new Set();
    data.forEach(item => {
        uniqueCategories.add(item.category.name);       
    });
    return [...uniqueCategories]
}

const getWork = () => {
    fetch(apiUrl)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        //appel de la fonction pour obtenir les categories
        const uniqueCategories = getUniqueCategories(data);

        console.log(uniqueCategories);
        data.forEach(function(work) {
            const figure = document.createElement("figure");
            figure.innerHTML =`
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        `;
        // ajout de l'attribut data-category avec la categorie correspondante
        figure.setAttribute("data-category", work.category.name);
        container.appendChild(figure);
        console.log(figure.innerHTML)
    })
    })
    .catch(function (error) {
        console.error("error fetching", error);
    })
}
// je selectione les boutons un à un
const btnAll = document.querySelector(".tous");
const btnObjets = document.querySelector(".objets");
const btnAppartements = document.querySelector(".appartements");
const btnHotels = document.querySelector(".hotels");

//ajout de l'addeventlistener à chaque bouton
btnAll.addEventListener("click", () => {
    filterFigures("Tous");
});

btnObjets.addEventListener("click", () => {
    filterFigures("Objets");
});

btnAppartements.addEventListener("click", () => {
    filterFigures("Appartements");
});

btnHotels.addEventListener("click", () => {
    filterFigures("Hotels & restaurants")
})

// Fonction pour filtrer les différent travaux
function filterFigures(category) {
    //on rappelle les balises figures
    const figures = container.querySelectorAll("figure");

    figures.forEach(figure => {
        const figureCategory = figure.getAttribute("data-category");
        if (category === "Tous" || figureCategory === category) {// le || est un ou logique qui dit que le block figure s'affiche seulement si il est associé à l'attribut correspondant
            figure.style.display = "block"; // Affiche la figure si elle correspond à la catégorie sélectionné
        } else {
            figure.style.display = "none"; // masque la figure quand elle n'est pas associé à la catégorie sélectioné
        }
    });
}

//function d'initialisation pour vérifier si l'utisateur est conecter ou pas
function init () {
    const token = sessionStorage.getItem("token");
    const loginLink = document.querySelector("#loginLink");
    const logoutLink = document.querySelector("#logoutLink");
    const filters = document.querySelector(".filtres");
    const blackblock = document.querySelector(".blackBlock")
    const btnmobal = document.getElementById("modifier");
    if (token) {
        logoutLink.style.display = "inline";
        loginLink.style.display = "none";
        logoutLink.addEventListener("click", function () {
            // Effacer le token de la session
            sessionStorage.removeItem("token");
            location.reload();
        })
        filters.style.display = "none";
    }else{
        logoutLink.style.display = "none";
        loginLink.style.display = "inline";
        loginLink.addEventListener("click", function() {

        })
        blackblock.style.display = "none";
        btnmobal.style.display = "none";
    }
}
window.addEventListener("load", init);
console.log(sessionStorage)
getWork()

