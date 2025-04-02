const stars = document.querySelectorAll('.star');
const ratingDisplay = document.getElementById('count');
let rating = 0; 


function updateStars(ratingValue) {
    stars.forEach((star, idx) => {
        if (idx < ratingValue) {
            star.classList.add('star-filled'); 
        } else {
            star.classList.remove('star-filled'); 
        }
    });
}


stars.forEach((star, index) => {
    star.addEventListener('click', function () {
        rating = index + 1;  
        ratingDisplay.textContent = rating; 
        updateStars(rating);
    });

    star.addEventListener('mouseover', function () {
        updateStars(index + 1); 
    });

star.addEventListener('mouseout', function () {
    updateStars(rating); 
});
});
