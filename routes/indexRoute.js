import express from "express";
const router = express();

import { getAllItems, updateItem } from "../config/dynamoDB.js";

function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

router.get("/", async (req, res) => {
        try {
            const data = await getAllItems();
            const names = data.Items.map(item =>{ 
                const id = item.id;
                const createdAt = item.createdAt;
                const name = item.name;
                const report = item.report;
                const message = item.message;
                const status = item.status;
                return {id, createdAt, name, report, message, status}
            }).sort((a, b) => a.name.localeCompare(b.name)); // Sort names alphabetically
            // Render the index page with the fetched data
            
    res.render("index", { names: names, title: "Raport de Progress" });
        } catch (error) {
            console.error("Error fetching items:", error);
        }
        
    })

router.post("/saveReport", async (req, res) => {
    const {id,createdAt, name, report, message } = req.body;
    const wordCount = countWords(report);
    if(wordCount > 150 || wordCount < 120) {
        return res.status(400).send(`Raportul trebuie să aibă între 120 și 150 de cuvinte. Ați trimis ${wordCount} cuvinte.`);
    }
    try {
        await updateItem(id, createdAt, report, message);
        
        res.render('saved')
    } catch (error) {
        console.error("Error updating item:", error);
    }
    
});

    export default router;