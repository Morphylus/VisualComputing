let point_x = 0;
let point_y = 0;
let point_set = false;
const HEIGHT = 500;
const WIDTH = 500;

const sketch = p => {

    p.setup = function() {
        p.createCanvas(HEIGHT,WIDTH);
        p.background(200);
        p.noStroke();
        p.fill(0);

        // Reset Button
        button = p.createButton('reset');
        button.position(100,400);
        button.mousePressed(clearScreen);

        // Random line Button
        button2 = p.createButton('create random line');
        button2.position(180, 400);

    }

    p.mousePressed = function() {
        if(p.mouseX > HEIGHT || p.mouseY > WIDTH) return;

        p.ellipse(p.mouseX, p.mouseY, 5, 5);
            if(!point_set) {
                point_x = p.mouseX - WIDTH/2;
                point_y = p.mouseY - HEIGHT/2;
                point_set = true;
            }
    }
}

const sineWave = p => {
    p.setup = function() {
        p.createCanvas(HEIGHT,WIDTH);
        p.background(0);
    }

    p.draw = function() {
        if(point_set) {
            drawWave(this, point_x, point_y);
            point_set = false;
        }
    }

}

let drawingCanvas = new p5(sketch);
let sin = new p5(sineWave);

/**
 * @param {int} x
 * @param {int} y
 * @returns Array containing calculated values of wave in normal coordinate space rounded to nearest integer
 */
function calcWave(x, y) {
    let inc = 6.28318530717958647693 / WIDTH;
    yvalues = new Array(WIDTH);
    let dx = 0.0;
    for(let i = 0; i < WIDTH; i++) {
        yvalues[i] = Math.round(x * Math.cos(dx) - y * Math.sin(dx));
        dx += inc;
    }
    return yvalues;
}

/**
 * 
 * @param {p5} p 
 * @param {x} x 
 * @param {y} y
 * @description Takes x and y in cartesian coordinates and draws the given sin wave of the hough transform
 */
function drawWave(p, x, y) {
    p.noStroke();
    p.fill(255);
    let wave = calcWave(x,y);
    for(let i = 0; i < WIDTH; i++) {
        p.ellipse(i,wave[i] + HEIGHT/2, 1, 1);
    }
}

function clearScreen() {
    drawingCanvas.clear();
    drawingCanvas.background(200);
    sin.clear();
    sin.background(0);
}
