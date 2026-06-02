import express from "express";
const router = express();

// import { getAllItems, updateItem } from "../config/dynamoDB.js";

import db from "../config/dynamoDB.js";

function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

router.get("/", async (req, res) => {
        try {
            const data = await db.getAllItems();

            const names = data.Items
    .map(({ id, createdAt, name, report, message, status }) => ({
        id,
        createdAt,
        name,
        report,
        message,
        status
    }))
    .sort((a, b) => (a.name || "").localeCompare(b.name || "", undefined, {
        sensitivity: "base"
    }));
            
    res.render("index", { names: names, title: "Raporte de Progress", numar: names.length });
        } catch (error) {
            console.error("Error fetching items:", error)
        }
        
    })

router.post("/saveReport", async (req, res) => {
    const {id,createdAt, name, report, message } = req.body;
    const wordCount = countWords(report);
    if(wordCount > 150 || wordCount < 120) {
        return res.status(400).send(`Raportul trebuie să aibă între 120 și 150 de cuvinte. Ați trimis ${wordCount} cuvinte.`);
    }
    try {
        await db.updateItem(id, createdAt, report, message);
        
        res.render('saved')
    } catch (error) {
        console.error("Error updating item:", error);
    }
    
});

    export default router;