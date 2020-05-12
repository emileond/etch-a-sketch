// Select elements (canvas, button)
const canvasWrapper = document.querySelector('.canvasWrap');
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 20;
const buttons = document.querySelectorAll('.btn')


// Setup the canvas for drawing

// const width = canvas.width
// const height = canvas.height;
// destructuring :
const { width, height } = canvas;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

// Creating a random number for the starting point
let x = Math.floor(Math.random() * width)
let y = Math.floor(Math.random() * height)

ctx.beginPath() //point first point of drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {
    // increment the hue by 1
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    // start the path
    ctx.beginPath();
    ctx.moveTo(x, y);

    // moving our x and y values depending on what the user did
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
        default:
            break;
    }
    ctx.lineTo(x, y)
    ctx.stroke()
}

// Write a handler for the keys
function handlerKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault()
        draw({ key: e.key })
        console.log(e.key)
    }
}

// Write shake (clear) function
function clearCanvas() {
    ctx.clearRect(0, 0, width, height)
    canvasWrapper.classList.add('wobble-hor-bottom');
    canvasWrapper.addEventListener('animationend', () => {
        canvasWrapper.classList.remove('wobble-hor-bottom');
    }, { once: true })
}

//  Listen for arrow keys
window.addEventListener('keydown', handlerKey);
shakeButton.addEventListener('click', clearCanvas);