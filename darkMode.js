const themeSwitch = document.getElementById("dark-mode-button");

themeSwitch.addEventListener("click", () => {
    console.log("Theme toggled");
    if (document.body.getAttribute("data-theme") === "dark") {
        document.body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
    } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});

const savedTheme = localStorage.getItem("theme");
if(savedTheme){
    if(savedTheme === "dark"){
        document.body.setAttribute("data-theme", "dark");
    } else{
        document.body.removeAttribute("data-theme");
    }
}   
