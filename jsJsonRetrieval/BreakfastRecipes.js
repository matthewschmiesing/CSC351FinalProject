import { setupCarousel } from "../jsFunctions/carousel.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch("recipe/breakfast_recipes_part1.json")
        .then(response => response.json())
        .then(data => {
            displayRecipes(data, "breakfastRecipes");
            setupCarousel("breakfastRecipes");
        })
        .catch(error => console.error("Error loading recipes:", error));
});

function displayRecipes(recipes, containerId) {
    const container = document.getElementById(containerId);

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipeCardBox");

        card.innerHTML = `
            <div class="column">
                <div class="cardRow">
                    <div class="leftC"></div>
                    <div class="like-container rightC">
                        <button class="like-btn" data-recipe-id="${recipe.id}">&#x2661</button>
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
            window.location.href = `recipeDetails.html?id=${recipeId}`;
        }
    });

    // Like button
    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("like-btn")) {
            event.target.classList.toggle("liked");
        }
    });
}