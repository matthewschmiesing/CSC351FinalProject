const themeSwitch = document.querySelector("#theme-switch input");

themeSwitch.addEventListener("change", () => { // Use "change" event instead of "click"
    console.log("Theme toggled");
    if (document.body.getAttribute("data-theme") === "dark") {
        document.body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
    } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});

const savedTheme = localStorage.getItem('theme');
if(savedTheme){
    body.setAttribute('data-theme', savedTheme);
}
