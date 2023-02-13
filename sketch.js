let point_x = 0;
let point_y = 0;
let point_set = false;
const HEIGHT = 500;
const WIDTH = 500;
const DIAG = Math.round(Math.sqrt(HEIGHT*HEIGHT + WIDTH * WIDTH));
let grid = new Array(HEIGHT);

for(let i = 0; i < HEIGHT; i++) {
    grid[i] = new Array(WIDTH);
    grid[i].fill(0);
}

const sketch = p => {

    p.setup = function() {
        p.createCanvas(HEIGHT,WIDTH);
        p.background(200);
        p.fill(0);

        // Reset Button
        button = p.createButton('reset');
        button.position(WIDTH/2,HEIGHT);
        button.mousePressed(clearScreen);

    }

    p.mousePressed = function() {
        if(p.mouseX > HEIGHT || p.mouseY > WIDTH) return;

        p.noStroke();
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
        p.createCanvas(WIDTH, DIAG);
        p.background(0);
    }

    p.draw = function() {
        if(point_set) {
            drawWave(this, point_x, point_y);
            point_set = false;
            checkForLines();
        }
    }

}

let drawingCanvas = new p5(sketch);
let sin = new p5(sineWave);

// Draw line given angle and radius - could be done easier if I was better at Linalg lol
function drawLine(p, r, theta) {
    p.stroke(255,0,0);
    if(r == 0) {
        let dx = Math.cos(-theta + Math.PI/2);
        let dy = Math.sin(-theta + Math.PI/2);
        let norm = Math.sqrt(dx*dx + dy*dy);
        let orthLine = [dx / norm, dy / norm];
        p.line(-orthLine[0] * WIDTH + WIDTH/2, -orthLine[1] * HEIGHT + HEIGHT/2, orthLine[0] * WIDTH + WIDTH/2, orthLine[1] * HEIGHT + HEIGHT/2);
        return;
    }

    let dx = r * Math.cos(-theta);
    let dy = r * Math.sin(-theta);
    let norm = Math.sqrt(dx*dx + dy*dy);
    let orthLine = [-dy / norm, dx / norm];
    p.line((dx - orthLine[0] * WIDTH) + WIDTH/2, (dy - orthLine[1] * HEIGHT) + HEIGHT/2, (dx + orthLine[0] * WIDTH) + WIDTH/2, (dy + orthLine[1] * HEIGHT) + HEIGHT/2);
}

// Calculate wave values (discrete)
function calcWave(x, y) {
    let inc = Math.PI / WIDTH;
    yvalues = new Array(WIDTH);
    let dx = 0.0;
    for(let i = 0; i < WIDTH; i++) {
        yvalues[i] = Math.round(x * Math.cos(dx) - y * Math.sin(dx));
        dx += inc;
    }
    return yvalues;
}

// Draw wave and add to grid
function drawWave(p, x, y) {
    p.noStroke();
    p.fill(255);
    let wave = calcWave(x,y);
    for(let i = 0; i < WIDTH; i++) {
        p.noStroke();
        p.ellipse(i,wave[i] + DIAG/2, 1, 1);
        grid[i][wave[i]+DIAG] += 1;
    }
}

function checkForLines() {
    for(let i = 0; i < HEIGHT; i++) {
        for(let j = 0; j < WIDTH; j++) {
            if (grid[i][j] > 2) {
                drawLine(drawingCanvas, i - HEIGHT/2, 2*Math.PI / WIDTH * j);
                grid[i][j] = 0;
                return;
            }
        }
    }
}


function clearScreen() {
    drawingCanvas.clear();
    drawingCanvas.background(200);
    sin.clear();
    sin.background(0);
}
