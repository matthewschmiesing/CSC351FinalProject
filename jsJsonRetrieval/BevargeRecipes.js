import { setupCarousel } from "../jsFunctions/carousel.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch("recipe/beverages_recipes.json")
        .then(response => response.json())
        .then(data => {
            displayRecipes(data, "beveragesRecipes");
            setupCarousel("beveragesRecipes");
        })
        .catch(error => console.error("Error loading recipes:", error));
});

function displayRecipes(recipes, containerId) {
    const container = document.getElementById(containerId);

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipeCardBox");

        card.innerHTML = `
            <div class="leftB">
                <h4>${recipe.name}</h4>
                <ul>
                    <li><strong>Category:</strong> ${recipe.category}</li>
                    <li><strong>Season:</strong> ${recipe.season}</li>
                    <li><strong>Cuisine:</strong> ${recipe.cuisine}</li>
                    <li><strong>Prep Time:</strong> ${recipe.prep_time}</li>
                    <li><strong>Difficulty:</strong> ${recipe.difficulty}</li>
                </ul>
            </div>
            <div class="rightB imageWrapper">
                <img src="recipeImage/${recipe.images[0]}" alt="Image of ${recipe.name}">
            </div>
        `;

        container.appendChild(card);
    });
}