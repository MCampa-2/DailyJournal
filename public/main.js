const hamburger = document.querySelector(".hamburger");
const nav = document.getElementById("navbar");

function openNav(){
    nav.style.width = "100%";
    hamburger.style.display = "none";
}

function closeNav(){
    nav.style.width = "0%"
    hamburger.style.display = "block";
    
}