document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get("id")); // Ensure ID is an integer

    if (!recipeId) {
        console.error("No recipe ID provided in URL.");
        return;
    }

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
        "recipe/autumn_recipes.json",
        "recipe/winter_recipes.json"

    ];

    function fetchRecipes(index) {
        if (index >= recipeFiles.length) {
            console.error("Recipe not found in any file.");
            return;
        }
    
        fetch(recipeFiles[index])
            .then(response => response.json())
            .then(data => {
                let recipe = data.find(r => r.id === recipeId); // Find recipe by ID
    
                if (recipe) {
                    displayRecipe(recipe);
                } else {
                    fetchRecipes(index + 1); // Try the next file
                }
            })
            .catch(error => console.error(`Error loading ${recipeFiles[index]}:`, error));
    }

    function displayRecipe(recipe) {
        let name = document.getElementById("recipeName");
        let image = document.getElementById("image");
        let category = document.getElementById("category");
        let ingredientsCon = document.getElementById("ingredients");
        let dietary = document.getElementById("dietary");
        let season = document.getElementById("season");
        let cuisine = document.getElementById("cuisine");
        let prep_time = document.getElementById("prep_time");
        let difficulty = document.getElementById("difficulty");
        let recipeSteps = document.getElementById("recipeSteps");

        if (name) {
            name.innerHTML = recipe.name;
            image.src = `recipeImage/${recipe.images[1]}`;

            recipe.steps.forEach((step, index) => {
                let p = document.createElement("p");
                p.textContent = `${index + 1}. ${step}`;
                recipeSteps.appendChild(p);
            });

            category.innerHTML = recipe.category;
            dietary.innerHTML = recipe.dietary;
            season.innerHTML = recipe.season;
            cuisine.innerHTML = recipe.cuisine;
            prep_time.innerHTML = recipe.prep_time;
            difficulty.innerHTML = recipe.difficulty;

            recipe.ingredients.forEach(ingredient => {
                let div = document.createElement("div");
                let label = document.createElement("label");
                let checkbox = document.createElement("input");
                
                checkbox.classList.add("checkmark");
                checkbox.type = "checkbox";
                checkbox.name = "filter";
                checkbox.value = ingredient;

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(` ${ingredient}`));

                checkbox.addEventListener("change", () => {
                    if (checkbox.checked) {
                        label.classList.add("strikethrough");
                    } else {
                        label.classList.remove("strikethrough");
                    }
                });

                div.appendChild(label);
                div.appendChild(document.createElement("br"));

                

                ingredientsCon.appendChild(div);
            });
        } else {
            console.error("Recipe content elements not found in the document.");
        }
    }

    fetchRecipes(0);
    
     // Start checking files from the first one
});

