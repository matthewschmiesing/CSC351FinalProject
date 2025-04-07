document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get("id")); // Ensure ID is an integer

    if (!recipeId) {
        console.error("No story ID provided in URL.");
        return;
    }

    const storyFiles = "recipe/All_recipe_stories.json";

    
    
    fetch(storyFiles)
        .then(response => response.json())
        .then(data => {
            let story = data.find(r => r.id === recipeId); // Find recipe by ID

            if (story) {
                displayStory(story);
            } else {
                console.log("Story Not Found") 
            }
        })
        .catch(error => console.error(`Error loading ${story}:`, error));
    

    function displayStory(story) {
        
        let recipeStory = document.getElementById("recipeStory");

        if (recipeStory) {
            recipeStory.innerHTML = story.story;
        } else {
            console.error("Recipe story elements not found in the document.");
        }
    }

});
