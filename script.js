document.addEventListener("DOMContentLoaded",function(){
    const apiKey ="984f5faec26a43849595aa615e299726";

    //function to fetch recipes
    //https://api.spoonacular.com/recipes/random?number=5&apikey=${apiKey}
    //const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=pasta`;

    async function fetchRecipes(query = "") {
        try {
            // If no query is provided, the search will be broad and not restricted to any ingredient
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeInformation=true`);
            console.log(response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            return data.results;
        } catch (error) {
            console.error("Error fetching data", error);
            return [];
        }
    }
    
    // Function to display recipes
    async function displayRecipes(query = "") {
        const recipeSection = document.getElementById("recipes");
        recipeSection.innerHTML = "";
        const recipes = await fetchRecipes(query);
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipes");
            recipeDiv.id = `recipe-${recipe.id}`;
            recipeDiv.innerHTML = `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="recipes"><p>${recipe.summary}</p></div>
                <a href="${recipe.sourceUrl}" target="_blank"><button id="view-recipe">View Recipe</button></a>
            `;
            recipeSection.appendChild(recipeDiv);
        });
    }
    
    // Event listener for the search button
    document.getElementById("search-button").addEventListener("click", () => {
        const query = document.getElementById("recipe-input").value;
        displayRecipes(query);  // Pass the user's query directly to displayRecipes
    });    
})