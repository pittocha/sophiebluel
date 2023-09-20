const apiUrl = "http://localhost:5678/api/works/";

//je prepare le modal en recuperant les different elements
const modal = document.getElementById("myModal");
const btnmobal = document.getElementById("modifier");
const close = document.getElementsByClassName("close")[0];
const modalImg = document.querySelector(".modal-image");



//ouverture du modal au click sur le bouton
btnmobal.onclick = function() {
    
    modal.style.display = "block";
    //selection du conteneur image modal
        
        //je recupere les images et je les implemente   
        fetch(apiUrl)
        .then(function(resp) {
            return resp.json();
        })
        .then(function (data) {
            modalImg.innerHTML = "";
            
            data.forEach(function(work) {
                
                const image = document.createElement("div");
                image.innerHTML = `
                <img src="${work.imageUrl}" id="${work.id}" alt="${work.title}" class="miniature">
                <i class="fa-solid fa-trash-can" id="delete-icon"></i>
                `;
                image.classList.add("small-work")
                modalImg.appendChild(image);
                console.log(image.innerHTML);
            })

        })

}

//fermeture du modal au click sur la croix
close.onclick = function() {
    modal.style.display = "none";

}

//fermeture du modal au click en dehors de la boite
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}