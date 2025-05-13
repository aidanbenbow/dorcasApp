import { formHelper } from "./formHelper.js"

document.addEventListener("DOMContentLoaded", ()=>{

    const helper = new formHelper({
        dataSelector: "#namesData",
        formSelector: "form",
        nameSelector: "#name",
        listSelector: "#autocomplete-list",
        messageSelector: "#message",
        raportSelector: "#report",
        createdAtSelector: "#createdAt",
        idSelector: "#id",
        messageWordCountSelector: "#messageWordCount",
        raportWordCountSelector: "#wordCount"
    })

    
} )



// const namesData = JSON.parse(document.querySelector("#namesData").textContent);
// const nameInput = document.querySelector("#name");
// const list = document.querySelector("#autocomplete-list");
// const message = document.querySelector("#message");
// const raport = document.querySelector("#report");
// const createdAt = document.querySelector("#createdAt");
// const id = document.querySelector("#id");
// const wordCount = document.querySelector("#wordCount");
// const form = document.querySelector("form");

// function showSuggestions() {
//     const value = nameInput.value.toLowerCase();
//     list.innerHTML = ""; // Clear previous suggestions

//     const filtered = value ? namesData.filter(item => item.name.toLowerCase().includes(value)) : namesData;

//     filtered.forEach(item => {
//         const itemElement = document.createElement("div");
//         itemElement.classList.add("list-group-item","list-group-item-action" );
//         itemElement.textContent = item.name;

//         itemElement.classList.add(item.status === 'sponsored' ? 'bg-sponsored' : 'bg-unsponsored');

//         itemElement.addEventListener("click", function () {
//             populateFields(item); // Populate fields with clicked suggestion
//            updateWordCount(raport, "#wordCount"); // Update word count for report textarea
//             updateWordCount(message, "#messageWordCount"); // Update word count for message textarea
//             list.innerHTML = ""; // Clear suggestions after selection
//         });
//         list.appendChild(itemElement);
//     } );
// }

// nameInput.addEventListener("input", showSuggestions);
// nameInput.addEventListener("focus", showSuggestions);

// function populateFields(item) {
//     nameInput.value = item.name; // Set input value to clicked suggestion
//     message.value = item.message; // Set message value to clicked suggestion
//     raport.value = item.report; // Set report value to clicked suggestion
//     createdAt.value = item.createdAt; // Set createdAt value to clicked suggestion
//     id.value = item.id; // Set id value to clicked suggestion
// }


// document.addEventListener("click", function (event) {
//     if (!nameInput.contains(event.target) && !list.contains(event.target)) {
//         list.innerHTML = ""; // Clear suggestions if clicking outside
//     }
// });

// // Function to update the word count for the message textarea
// function updateWordCount(textarea, counterId) {
//     const text = textarea.value;
//     const wordCount = countWords(text);
//     document.querySelector(counterId).textContent = `${wordCount}`;
//     textarea.style.height = "auto"; // Reset height to auto to calculate the new height
//     textarea.style.height = `${textarea.scrollHeight}px`; // Set height to the scroll height
// }

// message.addEventListener("input", function () {
//     updateWordCount(message, "#messageWordCount");
// });

// raport.addEventListener("input", function () {
//     updateWordCount(raport, "#wordCount");
// });

// function countWords(text) {
//     return text.split(/\s+/).filter(word => word.length > 0).length;
// }

// form.addEventListener("submit", function (event) {
    
//     const report = raport.value.trim(); // Trim whitespace from the report text
    
//     const words = countWords(report);

//     if (words > 150 || words < 120) {
//         event.preventDefault(); // Prevent form submission
//         alert(`Raportul trebuie să aibă între 120 și 150 de cuvinte. Ați trimis ${words} cuvinte.`);
//     }

 
// });