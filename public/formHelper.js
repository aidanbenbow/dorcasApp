export class formHelper{
    constructor(config){
        this.data = JSON.parse(document.querySelector(config.dataSelector).textContent);
         this.form = document.querySelector(config.formSelector);
        this.nameInput = document.querySelector(config.nameSelector);
        this.list = document.querySelector(config.listSelector);
        this.fields = {
            message: document.querySelector(config.messageSelector),
            raport: document.querySelector(config.raportSelector),
            createdAt: document.querySelector(config.createdAtSelector),
            id: document.querySelector(config.idSelector),
        }
        this.wordCounters = {
            message: document.querySelector(config.messageWordCountSelector),
            raport: document.querySelector(config.raportWordCountSelector),
    } 
    this.setUplisteners();
}
    setUplisteners(){
        this.nameInput.addEventListener("input", () => this.showSuggestions());
        this.nameInput.addEventListener("focus", () => this.showSuggestions());
        document.addEventListener("click", (event) => {
            if (!this.nameInput.contains(event.target) && !this.list.contains(event.target)) {
                this.list.innerHTML = ""; // Clear suggestions if clicking outside
            }
        });
        this.fields.raport.addEventListener("input", () => this.updateWordCount(this.fields.raport, "#wordCount"));
        this.fields.message.addEventListener("input", () => this.updateWordCount(this.fields.message, "#messageWordCount"));
        this.form.addEventListener("submit", (e) => this.validateForm(e));
    }

    showSuggestions() {
        const value = this.nameInput.value.toLowerCase();
        this.list.innerHTML = ""; // Clear previous suggestions

        const filtered = value ? this.data.filter(item => item.name.toLowerCase().includes(value)) : this.data;

        filtered.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("list-group-item","list-group-item-action" );
            itemElement.textContent = item.name;
            itemElement.classList.add(item.status === 'sponsored' ? 'bg-sponsored' : 'bg-unsponsored');

            itemElement.addEventListener("click", () => {
                this.populateFields(item); // Populate fields with clicked suggestion
                this.updateWordCount(this.fields.raport, "#wordCount"); // Update word count for report textarea
                this.updateWordCount(this.fields.message, "#messageWordCount"); // Update word count for message textarea
                this.list.innerHTML = ""; // Clear suggestions after selection
            });
            this.list.appendChild(itemElement);
        } );
    }

    populateFields(item) {
        this.nameInput.value = item.name; // Set input value to clicked suggestion
        this.fields.message.value = item.message; // Set message value to clicked suggestion
        this.fields.raport.value = item.report; // Set report value to clicked suggestion
        this.fields.createdAt.value = item.createdAt; // Set createdAt value to clicked suggestion
        this.fields.id.value = item.id; // Set id value to clicked suggestion
    }

    countWords(text) {
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }

    updateWordCount(textarea, counterId) {
        const text = textarea.value;
        const wordCount = this.countWords(text);
        document.querySelector(counterId).textContent = `${wordCount}`;
        textarea.style.height = "auto"; // Reset height to auto to calculate the new height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to the scroll height
    }
    validateForm(e){
        const wordCount = this.countWords(this.fields.raport.value);
        if(wordCount > 150 || wordCount < 120) {
            e.preventDefault();
            alert(`Raportul trebuie să aibă între 120 și 150 de cuvinte. Ați trimis ${wordCount} cuvinte.`);
        }
    }
}