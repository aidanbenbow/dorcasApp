const namesData = JSON.parse(document.querySelector("#namesData").textContent);
const nameInput = document.querySelector("#name");
const list = document.querySelector("#autocomplete-list");
const message = document.querySelector("#message");
const raport = document.querySelector("#report");
const createdAt = document.querySelector("#createdAt");
const id = document.querySelector("#id");
const wordCount = document.querySelector("#wordCount");
const form = document.querySelector("form");

console.log(wordCount.textContent);

nameInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    list.innerHTML = ""; // Clear previous suggestions

    if (!value) return; // If input is empty, do nothing

    const matches = namesData.filter(item => item.name.toLowerCase().includes(value));
    
    matches.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("list-group-item","list-group-item-action" );
        itemElement.textContent = item.name;

        itemElement.addEventListener("click", function () {
            nameInput.value = item.name; // Set input value to clicked suggestion
            message.value = item.message; // Set message value to clicked suggestion
            raport.value = item.report; // Set report value to clicked suggestion
            createdAt.value = item.createdAt; // Set createdAt value to clicked suggestion
            id.value = item.id; // Set id value to clicked suggestion

            list.innerHTML = ""; // Clear suggestions after selection
        });
        list.appendChild(itemElement);
        
    } );
} );

document.addEventListener("click", function (event) {
    if (!nameInput.contains(event.target) && !list.contains(event.target)) {
        list.innerHTML = ""; // Clear suggestions if clicking outside
    }
});

function updateWordCount(textarea) {
    const text = textarea.value;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    document.querySelector("#wordCount").textContent = `Word count: ${wordCount}`;


    textarea.style.height = "auto"; // Reset height to auto to calculate the new height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to the scroll height
}

window.updateWordCount = updateWordCount;

function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

form.addEventListener("submit", function (event) {
    
    const report = raport.value.trim(); // Trim whitespace from the report text
    
    const words = countWords(report);

    if (words > 150 || words < 120) {
        event.preventDefault(); // Prevent form submission
        alert(`Raportul trebuie să aibă între 120 și 150 de cuvinte. Ați trimis ${words} cuvinte.`);
    }

 
});