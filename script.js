const paletteContainer = document.getElementById('palette-container');
const savedPalettesContainer = document.getElementById('saved-palettes-container');
const generateBtn = document.getElementById('generate-btn');

// Load saved palettes from LocalStorage
let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];

// Generate random hex color
function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Generate a palette
function generatePalette() {
    paletteContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const color = generateRandomColor();
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;
        colorBox.textContent = color;

        // Copy color to clipboard on click
        colorBox.addEventListener('click', () => copyToClipboard(color));

        // Append to container
        paletteContainer.appendChild(colorBox);
    }

    // Add "Save Palette" button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Palette';
    saveButton.addEventListener('click', savePalette);
    paletteContainer.appendChild(saveButton);
}

// Copy color to clipboard
function copyToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        alert(`Copied ${color} to clipboard!`);
    });
}

// Save the current palette
function savePalette() {
    const colors = Array.from(paletteContainer.querySelectorAll('.color-box')).map(
        (box) => box.textContent
    );

    if (colors.length === 5) {
        savedPalettes.push(colors);
        localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
        renderSavedPalettes();
    } else {
        alert('Generate a full palette before saving!');
    }
}

// Render saved palettes
function renderSavedPalettes() {
    savedPalettesContainer.innerHTML = '';

    savedPalettes.forEach((palette, index) => {
        const paletteRow = document.createElement('div');
        paletteRow.classList.add('palette-row');

        palette.forEach((color) => {
            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box');
            colorBox.style.backgroundColor = color;
            colorBox.textContent = color;
            colorBox.addEventListener('click', () => copyToClipboard(color));
            paletteRow.appendChild(colorBox);
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => deleteSavedPalette(index));
        paletteRow.appendChild(deleteButton);

        savedPalettesContainer.appendChild(paletteRow);
    });
}

// Delete a saved palette
function deleteSavedPalette(index) {
    savedPalettes.splice(index, 1);
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
    renderSavedPalettes();
}

// Initialize app
generateBtn.addEventListener('click', generatePalette);
renderSavedPalettes();
