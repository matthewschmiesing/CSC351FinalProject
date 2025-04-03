import { setupCarousel } from "../jsFunctions/carousel.js";
import { toggleFavorites } from "../jsFunctions/favorites.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch("recipe/winter_recipes.json")
        .then(response => response.json())
        .then(data => {
            displayRecipes(data, "winterRecipes");
            setupCarousel("winterRecipes");
        })
        .catch(error => console.error("Error loading recipes:", error));
});

function displayRecipes(recipes, containerId) {
    const container = document.getElementById(containerId);

    recipes.forEach(recipe => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        const card = document.createElement("div");
        card.classList.add("recipeCardBox")
        
        const isFavorite = favorites.includes(recipe.id.toString());

        card.innerHTML = `
            <div class="column">
                <div class="cardRow">
                    <div class="leftC"></div>
                    <div class="like-container rightC">
                        <button class="like-btn ${isFavorite ? "liked" : ""}" data-recipe-id="${recipe.id}">&#x2661;</button>
                    </div>
                </div>
                <div class="cardRow">
                    <div class="leftB">
                        <h4 class="clickable" data-recipe-id="${recipe.id}">${recipe.name}</h4>
                        <ul>
                            <li class="clickable" data-recipe-id="${recipe.id}"><strong>Category:</strong> ${recipe.category}</li>
                            <li class="clickable" data-recipe-id="${recipe.id}"><strong>Season:</strong> ${recipe.season}</li>
                            <li class="clickable" data-recipe-id="${recipe.id}"><strong>Cuisine:</strong> ${recipe.cuisine}</li>
                            <li class="clickable" data-recipe-id="${recipe.id}"><strong>Prep Time:</strong> ${recipe.prep_time}</li>
                            <li class="clickable" data-recipe-id="${recipe.id}"><strong>Difficulty:</strong> ${recipe.difficulty}</li>
                        </ul>
                    </div>
                    <div class="rightB imageWrapper">
                        <img class="clickable" src="recipeImage/${recipe.images[0]}" alt="Image of ${recipe.name}" data-recipe-id="${recipe.id}">
                    </div>
                </div>
                
            </div>
            
        `;

        container.appendChild(card);
    });

    //event listener like button
    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("clickable")) {
            const recipeId = event.target.dataset.recipeId;
            window.location.href = `recipe_page.html?id=${recipeId}`;
        }
    });

    // Like button
    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("like-btn")) {
            const button = event.target;
            const recipeId = button.dataset.recipeId;
            toggleFavorites(recipeId);
            button.classList.toggle("liked");
        }
    });
}