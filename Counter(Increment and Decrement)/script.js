const countMain = document.getElementById('number');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const resetButton = document.getElementById('reset');
const incrementInput = document.getElementById('increment');

let count = 0;

// Function to update the count display
function updateCount() {
    countMain.innerText = count;
}

// Event listener for addition
addButton.addEventListener('click', function () {
    let incrementValue = parseInt(incrementInput.value) || 1;
    count += incrementValue;
    updateCount();
});

// Event listener for subtraction
subtractButton.addEventListener('click', function () {
    let incrementValue = parseInt(incrementInput.value) || 1;
    count -= incrementValue;
    updateCount();
});

// Event listener for reset
resetButton.addEventListener('click', function () {
    count = 0;
    updateCount();
});

// Initialize the display
updateCount();
