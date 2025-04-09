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

    let allRecipes = [];

    function fetchAllRecipes(index = 0) {
        if (index >= recipeFiles.length) {
            allRecipes.sort((a, b) => a.name.localeCompare(b.name));
            includeFilterOptions(allRecipes);
            displayFilteredRecipes();
            return;
        }

        fetch(recipeFiles[index])
            .then(response => response.json())
            .then(data => {
                allRecipes.push(...data);
                fetchAllRecipes(index + 1);
            })
            .catch(error => {
                console.error(`Error loading ${recipeFiles[index]}:`, error);
                fetchAllRecipes(index + 1);
            });
    }

    function includeFilterOptions(recipes) {
        const categorySet = new Set();
        const seasonSet = new Set();
        const cuisineSet = new Set();
        const dietarySet = new Set();

        recipes.forEach(r => {
            if (r.category) categorySet.add(r.category);
            if (r.season) seasonSet.add(r.season);
            if (r.cuisine) cuisineSet.add(r.cuisine);
            if (Array.isArray(r.dietary)) r.dietary.forEach(d => dietarySet.add(d));
        });

        populateSelect("categoryFilter", categorySet);
        populateSelect("seasonFilter", seasonSet);
        populateSelect("cuisineFilter", cuisineSet);
        populateSelect("dietaryFilter", dietarySet);
    }

    function populateSelect(id, values) {
        const select = document.getElementById(id);
        values = Array.from(values).sort();
        values.forEach(v => {
            const option = document.createElement("option");
            option.value = v;
            option.textContent = v;
            select.appendChild(option);
        });
    }

    function displayFilteredRecipes() {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const category = document.getElementById("categoryFilter").value;
        const season = document.getElementById("seasonFilter").value;
        const cuisine = document.getElementById("cuisineFilter").value;
        const dietary = document.getElementById("dietaryFilter").value;

        const filtered = allRecipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(search);
            const matchesCategory = !category || recipe.category === category;
            const matchesSeason = !season || recipe.season === season;
            const matchesCuisine = !cuisine || recipe.cuisine === cuisine;
            const matchesDietary = !dietary || (Array.isArray(recipe.dietary) && recipe.dietary.includes(dietary));

            return matchesSearch && matchesCategory && matchesSeason && matchesCuisine && matchesDietary;
        });

        displayRecipeNames(filtered, "listingContainer");
    }

    function displayRecipeNames(recipes, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = "";

        if (recipes.length === 0) {
            container.innerHTML = "<p>No matching recipes found.</p>";
            return;
        }

        // Group recipes by the first letter
        const groupedRecipes = {};
        recipes.forEach(recipe => {
            const firstLetter = recipe.name[0].toUpperCase();
            if (!groupedRecipes[firstLetter]) {
                groupedRecipes[firstLetter] = [];
            }
            groupedRecipes[firstLetter].push(recipe);
        });

        // Sort letters alphabetically
        const letters = Object.keys(groupedRecipes).sort();

        letters.forEach(letter => {
            // Add the letter as a heading
            const letterHeading = document.createElement("h2");
            letterHeading.textContent = letter;
            container.appendChild(letterHeading);

            // List the recipes under the corresponding letter
            groupedRecipes[letter].forEach(recipe => {
                const recipeLink = document.createElement("p");
                recipeLink.classList.add("clickable");
                recipeLink.dataset.recipeId = recipe.id;
                recipeLink.textContent = recipe.name;
                container.appendChild(recipeLink);
            });
        });
    }

    // Attach filter event listeners
    ["searchInput", "categoryFilter", "seasonFilter", "cuisineFilter", "dietaryFilter"].forEach(id => {
        document.getElementById(id).addEventListener("input", displayFilteredRecipes);
        document.getElementById(id).addEventListener("change", displayFilteredRecipes);
    });

    // Handle click to open recipe page
    document.getElementById("listingContainer").addEventListener("click", event => {
        if (event.target.classList.contains("clickable")) {
            const recipeId = event.target.dataset.recipeId;
            window.location.href = `recipe_page.html?id=${recipeId}`;
        }
    });

    fetchAllRecipes();
});
