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

            const names = data.Items.map(item =>{ 
                const id = item.id;
                const createdAt = item.createdAt;
                const name = item.name;
                const report = item.report;
                const message = item.message;
                const status = item.status;
                return {id, createdAt, name, report, message, status}
            }).sort((a, b) =>{
                const nameA = (a.name|| "").toLowerCase();
                const nameB = (b.name|| "").toLowerCase();
                const statusOrder = (a.status === "sponsored" ? -1 : 1) - (b.status === "sponsored" ? -1 : 1); // Sort by status first
                return statusOrder !== 0 ? statusOrder : nameA.localeCompare(nameB); // Then sort by name
            })
            
    res.render("index", { names: names, title: "Raport de Progress" });
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