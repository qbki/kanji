class ReadingChip extends HTMLElement {
    static PLACEHOLDER = "?";


    static get observedAttributes() {
        return ['value'];
    }


    constructor() {
        super();
        this.classList.add("components-reading-chip");
        this.chips = [];
    }


    get value() {
        return this.getAttribute('value');
    }


    set value(newValue) {
        if (newValue === null || newValue === undefined) {
            this.removeAttribute('value');
            return;
        }

        this.setAttribute('value', newValue);
        const characters = [...newValue];
        const isOpened = false;
        for (const character of characters) {
            this.chips.push({
                isOpened,
                character,
            });
        }
        this.textContent = this.chips.map(() => ReadingChip.PLACEHOLDER).join("")
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.value = newValue;
        }
    }


    connectedCallback() {
        this.addEventListener("click", () => {
            const chips = this.chips.filter((value) => !value.isOpened);
            const chip = chips[Math.floor(Math.random() * chips.length)];
            if (chip) {
                chip.isOpened = true;
            } else {
                return;
            }
            this.render();
        });
    }


    solve() {
        for (const chip of this.chips) {
            chip.isOpened = true;
        }
        this.classList.add("solved");
        this.render();
    }


    render() {
        this.textContent = this.chips
            .map((value) => value.isOpened ? value.character : ReadingChip.PLACEHOLDER)
            .join("")
    }


    isOpened() {
        for (const chip of this.chips) {
            if (chip.isOpened === false) {
                return false;
            }
        }
        return true;
    }
}

customElements.define('reading-chip', ReadingChip);
