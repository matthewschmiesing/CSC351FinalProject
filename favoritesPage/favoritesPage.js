import { toggleFavorites } from "../jsFunctions/favorites.js";

document.addEventListener("DOMContentLoaded", () => {
    const recipeFiles = [
        "recipe/breakfast_recipes_part1.json",
        "recipe/lunch_recipes_part1.json",
        "recipe/dinner_recipes_part1.json",
        "recipe/appetizer_recipes.json",
        "recipe/autumn_recipes.json",
        "recipe/beverages_recipes.json",
        "recipe/dessert_recipes_part1.json",
        "recipe/snacks_recipes.json",
        "recipe/spring_recipes.json",
        "recipe/summer_recipes.json",
        "recipe/winter_recipes.json"
    ];

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    let favoriteRecipes = []; // Store found recipes

    // Function to fetch all recipe files
    function fetchAllRecipes(index = 0) {
        if (index >= recipeFiles.length) {
            // When all files are processed, display the collected favorite recipes
            displayRecipes(favoriteRecipes, "favoritesContainer");
            return;
        }

        fetch(recipeFiles[index])
            .then(response => response.json())
            .then(data => {
                // Find all recipes that are in favorites
                let foundRecipes = data.filter(r => favorites.includes(r.id.toString()));

                if (foundRecipes.length > 0) {
                    favoriteRecipes.push(...foundRecipes);
                }

                // Fetch the next file
                fetchAllRecipes(index + 1);
            })
            .catch(error => {
                console.error(`Error loading ${recipeFiles[index]}:`, error);
                fetchAllRecipes(index + 1); // Continue with next file even if there's an error
            });
    }

    // Start fetching
    fetchAllRecipes();
});

// Function to display recipes
function displayRecipes(recipes, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content

    recipes.forEach(recipe => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const card = document.createElement("div");
        card.classList.add("recipeCardBox");

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

    // Event listener for clicking on recipes
    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("clickable")) {
            const recipeId = event.target.dataset.recipeId;
            window.location.href = `recipe_page.html?id=${recipeId}`;
        }
    });

    // Like button functionality
    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("like-btn")) {
            const button = event.target;
            const recipeId = button.dataset.recipeId;
            toggleFavorites(recipeId);
            button.classList.toggle("liked");
        }
    });
}
