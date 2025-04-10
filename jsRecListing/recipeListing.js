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
    let currentPage = 1;
    const recipesPerPage = 14;
    let currentFilteredRecipes = [];


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
        const prepSet = new Set();
        const difficultySet = new Set();

        recipes.forEach(r => {
            if (r.category) categorySet.add(r.category);
            if (r.season) seasonSet.add(r.season);
            if (r.cuisine) cuisineSet.add(r.cuisine);
            if (r.prep_time) prepSet.add(r.prep_time);
            if (r.difficulty) difficultySet.add(r.difficulty)
            
            if (Array.isArray(r.dietary)) r.dietary.forEach(d => dietarySet.add(d));
        });

        populateSelect("categoryFilter", categorySet);
        populateSelect("seasonFilter", seasonSet);
        populateSelect("cuisineFilter", cuisineSet);
        populateSelect("dietaryFilter", dietarySet);
        populateSelect("prepFilter", prepSet);
        populateSelect("difficultyFilter", difficultySet);
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
        const prep_time = document.getElementById("prepFilter").value;
        const difficulty = document.getElementById("difficultyFilter").value;
    
        currentFilteredRecipes = allRecipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(search);
            const matchesCategory = !category || recipe.category === category;
            const matchesSeason = !season || recipe.season === season;
            const matchesCuisine = !cuisine || recipe.cuisine === cuisine;
            const matchesPrepTime = !prep_time || recipe.prep_time === prep_time;
            const matchesDifficulty = !difficulty || recipe.difficulty === difficulty;
            const matchesDietary = !dietary || (Array.isArray(recipe.dietary) && recipe.dietary.includes(dietary));
    
            return matchesSearch && matchesCategory && matchesSeason && matchesCuisine && matchesPrepTime && matchesDifficulty && matchesDietary;
        });
    
        currentPage = 1;
        displayPaginatedRecipes();
    }
    

    function displayPaginatedRecipes() {
        const container = document.getElementById("listingContainer");
        if (!container) return;
    
        container.innerHTML = "";
    
        const start = (currentPage - 1) * recipesPerPage;
        const end = start + recipesPerPage;
        const paginatedRecipes = currentFilteredRecipes.slice(start, end);
    
        if (paginatedRecipes.length === 0) {
            container.innerHTML = "<p>No matching recipes found.</p>";
            return;
        }
    
        // Group recipes by the first letter
        const groupedRecipes = {};
        paginatedRecipes.forEach(recipe => {
            const firstLetter = recipe.name[0].toUpperCase();
            if (!groupedRecipes[firstLetter]) {
                groupedRecipes[firstLetter] = [];
            }
            groupedRecipes[firstLetter].push(recipe);
        });
    
        const letters = Object.keys(groupedRecipes).sort();
        letters.forEach(letter => {
            const letterHeading = document.createElement("h2");
            letterHeading.textContent = letter;
            container.appendChild(letterHeading);
    
            groupedRecipes[letter].forEach(recipe => {
                const recipeLink = document.createElement("p");
                recipeLink.classList.add("clickable");
                recipeLink.dataset.recipeId = recipe.id;
                recipeLink.textContent = recipe.name;
                container.appendChild(recipeLink);
            });
        });
    
        addPaginationControls();
    }

    function addPaginationControls() {
        const container = document.getElementById("listingContainer");
        const totalPages = Math.ceil(currentFilteredRecipes.length / recipesPerPage);
    
        const paginationDiv = document.createElement("div");
        paginationDiv.classList.add("pagination");
    
        if (currentPage > 1) {
            const prevBtn = document.createElement("button");
            prevBtn.textContent = "Previous";
            prevBtn.onclick = () => {
                currentPage--;
                displayPaginatedRecipes();
            };
            paginationDiv.appendChild(prevBtn);
        }
    
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            if (i === currentPage) pageBtn.disabled = true;
            pageBtn.onclick = () => {
                currentPage = i;
                displayPaginatedRecipes();
            };
            paginationDiv.appendChild(pageBtn);
        }
    
        if (currentPage < totalPages) {
            const nextBtn = document.createElement("button");
            nextBtn.textContent = "Next";
            nextBtn.onclick = () => {
                currentPage++;
                displayPaginatedRecipes();
            };
            paginationDiv.appendChild(nextBtn);
        }
    
        container.appendChild(paginationDiv);
    }
    
    

    // Attach filter event listeners
    ["searchInput", "categoryFilter", "seasonFilter", "cuisineFilter", "dietaryFilter", "prepFilter", "difficultyFilter"].forEach(id => {
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
