const apiUrl = "http://localhost:5678/api/works/";
const container = document.querySelector(".gallery");


const getWork = () => {
    fetch(apiUrl)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
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