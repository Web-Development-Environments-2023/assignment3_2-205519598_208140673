[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11248463&assignment_repo_type=AssignmentRepo)

ron shukron: 205519598, noa brosh: 208140673.

rescipe website backend server

this server code lets you run the backend of a recipe website.
letting you retrive recipes from spooncular api.
letting the client add personal recipes and familiy recipes.
leting the client save favorite recipes.

you'll need to add a mysql server to this server. contain the following tables (continnig the following culomns):
favoriterecipes: user_id, recipe_id
familyrecipes: user_id,username, recipe_id,title,image,how_to_make,time_to_make,likes,is_vegan,is_gluten_free,servings.
myrecipes: user_id,username, recipe_id,title,image,how_to_make,time_to_make,likes,is_vegan,is_gluten_free,servings.
users: user_id,username,username,lastname,country,password,email.
