//je prepare le modal en recuperant les different elements
const modal = document.getElementById("myModal");
const btnmobal = document.getElementById("modifier");
const close = document.getElementsByClassName("close")[0];

//ouverture du modal au click sur le bouton
btnmobal.onclick = function() {
    modal.style.display = "block";
    //j'appelle les projets avec getWork
    
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