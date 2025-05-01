const namesData = JSON.parse(document.querySelector("#namesData").textContent);
const nameInput = document.querySelector("#name");



nameInput.addEventListener("input", function () {
    const selectedName = nameInput.value.toLowerCase();
    const match = namesData.find(item => item.name.toLowerCase() === selectedName);

    if (match) {
        document.querySelector("#report").value = match.report;
        document.querySelector("#message").value = match.message;
        document.querySelector("#id").value = match.id;
        document.querySelector("#createdAt").value = match.createdAt;
    } else {
        document.querySelector("#report").value = "";
        document.querySelector("#message").value = "";
        document.querySelector("#id").value = "";
        document.querySelector("#createdAt").value = "";
    }
} );

function updateWordCount(textarea) {
    const text = textarea.value;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    document.querySelector("#wordCount").textContent = `Word count: ${wordCount}`;


    textarea.style.height = "auto"; // Reset height to auto to calculate the new height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to the scroll height
}

window.updateWordCount = updateWordCount;