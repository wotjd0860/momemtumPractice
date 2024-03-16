const images = [
    "0.jpg"
    , "1.png"
    , "2.jpg"
    , "3.png"
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

document.body.style.backgroundImage = `url(img/${chosenImage})`;
document.body.style.backgroundPosition = "center"
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
