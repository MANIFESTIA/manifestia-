
const API_KEY = "AIzaSyD5nAb6OcDrH09cTIyCbkfFp3eDIUIzSOg";

async function listModels() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("Error:", data);
            return;
        }

        const fs = require('fs');
        fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
        console.log("Models saved to models.json");

    } catch (error) {
        console.error("--> Network Error:", error);
    }
}

listModels();
