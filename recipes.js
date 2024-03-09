import mongoose from "mongoose";
import dotenv from "dotenv";
import { recipe } from "./recipesData.js";

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successful");
}).catch((err) => {
    console.log("Error: ", err.message);
});

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    steps: [String],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

async function insertAllDocuments() {
    try {
        for (const singleRecipe of recipe) {
            const newRecipe = new Recipe(singleRecipe);
            const result = await newRecipe.save();
            console.log(`Document inserted with _id: ${result._id}`);
        }
    } finally {
        mongoose.connection.close();
        console.log('Connection closed');
    }
}

insertAllDocuments();
