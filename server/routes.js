const config = require('./config.json')

const randomDrink = async function(req, res) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(resJson => {
        const cocktail = resJson.drinks[0];
        res.send(cocktail);
    })
    .catch((error) => {
        console.error(error);
        return null;
    });
}

const findDrink = async function(req, res) {
    const keyword = req.params.keyword;

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`);
        const data = await response.json();

        if (data.drinks === null || data.drinks.length === 0) {
            res.json({});
        } else {
            const cocktail = data.drinks;
            res.send(cocktail);
        }
    } catch (error) {
        console.log(error);
        res.json({});
    }
}

const findIngredient = async function(req, res) {
    const ingredient = req.params.ingredient;

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();

        if (data.drinks === null || data.drinks.length === 0) {
            res.json({});
        } else {
            const cocktail = data.drinks;
            res.send(cocktail);
        }
    } catch (error) {
        console.log(error);
        res.json({});
    }
}

const findFood = async function(req, res) {
    const type = req.params.type;

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`);
        const data = await response.json();

        if (data.meals === null || data.meals.length === 0) {
            res.json({});
        } else {
            const food = data.meals;
            res.send(food);
        }
    } catch (error) {
        console.log(error);
        res.json({});
    }
}

module.exports = {
    randomDrink, findDrink, findIngredient, findFood,
}