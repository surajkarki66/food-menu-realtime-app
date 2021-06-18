const monk = require("monk");
const config = require("./config");

const db = monk(config.MONGODB_URI);
const foodItems = db.get("FoodItems");

module.exports = foodItems;
