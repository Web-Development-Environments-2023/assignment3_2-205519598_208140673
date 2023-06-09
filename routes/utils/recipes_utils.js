const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const DButils = require("./DButils");



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}



async function getRecipeDetailsFromDB(recipe_id) {
    // console.log("getRecipeDetailsFromDB recipe_id", recipe_id)
    const recipe_details = await DButils.execQuery(`SELECT * FROM myrecipes WHERE recipe_id='${recipe_id}'`);
    // console.log("getRecipeDetailsFromDB recipe_id", recipe_details[0])
    return recipe_details[0];
}

async function getRecipeDetailsFromDBfamily(recipe_id) {
    // console.log("getRecipeDetailsFromDB recipe_id", recipe_id)

    const recipe_details = await DButils.execQuery(`SELECT * FROM familyrecipes WHERE recipe_id='${recipe_id}'`);

    // console.log("getRecipeDetailsFromDB recipe_id", recipe_details[0])
    return recipe_details[0];
}


async function getRecipeDetails(recipe_id) {
    let recipe_info = null;

    try {
        // try to get recipe info from API
        recipe_info = await getRecipeInformation(recipe_id);
        return recipe_info;

    // if we want to format the recipe in the server
        // let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
        // return {
        //     id: id,
        //     title: title,
        //     readyInMinutes: readyInMinutes,
        //     image: image,
        //     popularity: aggregateLikes,
        //     vegan: vegan,
        //     vegetarian: vegetarian,
        //     glutenFree: glutenFree,  
        // }
    } catch (error) {
        console.log(`Failed to get details for recipe with id ${recipe_id} from API, checking local database...`);
        recipe_info = null;
    }
    // console.log(recipe_info)

    if (recipe_info == null) {
        try {
            // if API failed, get recipe info from local database
            recipe_info = await getRecipeDetailsFromDB(recipe_id);
            return recipe_info;

        } catch (error) {
            console.error(`Failed to get details for recipe with id ${recipe_id} from local database`);
            throw error;
        }
    }
    // if we want to format the recipe in the server
    // let { user_id, username, my_recipe_id, description, how_to_make, time_to_make, likes, is_vegan, is_gluten_free } = recipe_info;
    // return {
    //     user_id: user_id,
    //     username: username,
    //     recipe_id: recipe_id,
    //     description: description,
    //     how_to_make: how_to_make,
    //     time_to_make: time_to_make,
    //     likes: likes,
    //     is_vegan: is_vegan,
    //     is_gluten_free: is_gluten_free,  
    // }
}


async function getRecipesPreview(recipeIds) {
    let recipes = [];

    // Loop over all recipe ids and fetch their details
    for (const id of recipeIds) {
        try {
            const recipeDetails = await getRecipeDetails(id);
            // console.log(recipeDetails)
            recipes.push(recipeDetails);
        } catch (error) {
            console.log(`Failed to get details for recipe with id ${id}`);
            console.error(error);
        }
    }

    return recipes;
}


async function getRandomRecipes() {
    try {
        console.log("wallak2")
        const response = await axios.get('https://api.spoonacular.com/recipes/random?number=1', {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            apiKey: process.env.spooncular_apiKey
          }
        });

        return response.data;
        // console.log(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    return response.data;
    };







exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipeDetailsFromDBfamily = getRecipeDetailsFromDBfamily;


