const apiUrl = "http://localhost:5678/api/works/";
const container = document.querySelector(".gallery");

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
            const figure =document.createElement("figure");
            figure.innerHTML =`
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        `;
        container.appendChild(figure);
    })
    })
    .catch(function (error) {
        console.error("error fetching", error);
    })
}

getWork()