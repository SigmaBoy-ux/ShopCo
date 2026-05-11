const mainImg = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        mainImg.src = thumb.src;

        document.querySelector('.thumb.active').classList.remove('active');
        thumb.classList.add('active');
    });
});

const countSpan = document.getElementById('count');
let count = 1;

document.getElementById('plus').addEventListener('click', () => {
    count++;
    countSpan.innerText = count;
});

document.getElementById('minus').addEventListener('click', () => {
    if (count > 1) {
        count--;
        countSpan.innerText = count;
    }
});

const sizeBtns = document.querySelectorAll('.size-btn');
sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.size-btn.active').classList.remove('active');
        btn.classList.add('active');
    });
});

const colorCircles = document.querySelectorAll('.color-circle');
colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
        document.querySelector('.color-circle.active').classList.remove('active');
        circle.classList.add('active');
    });
});