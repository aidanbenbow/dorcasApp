import express from "express";
const router = express();

import { getAllItems, updateItem } from "../config/dynamoDB.js";

router.get("/", async (req, res) => {
        try {
            const data = await getAllItems();
            const names = data.Items.map(item =>{ 
                const id = item.id;
                const createdAt = item.createdAt;
                const name = item.name;
                const report = item.report;
                const message = item.message;
                return {id, createdAt, name, report, message}
            }).sort((a, b) => a.name.localeCompare(b.name)); // Sort names alphabetically
            // Render the index page with the fetched data
            
    res.render("index", { names: names, title: "Raport de Progress" });
        } catch (error) {
            console.error("Error fetching items:", error);
        }
        
    })

router.post("/saveReport", async (req, res) => {
    const {id,createdAt, name, report, message } = req.body;
    try {
        await updateItem(id, createdAt, report, message);
        
        res.render('saved')
    } catch (error) {
        console.error("Error updating item:", error);
    }
    
});

    export default router;