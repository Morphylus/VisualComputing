var point_x = 0;
var point_y = 0;
var point_set = false;
var reset = false;

const sketch = p => {

    p.setup = function() {
        p.createCanvas(400,400);
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
        if(p.mouseX > 400 || p.mouseY > 400) return;

        p.ellipse(p.mouseX, p.mouseY, 5, 5);
            if(!point_set) {
                point_x = p.mouseX;
                point_y = p.mouseY;
                point_set = true;
            }
    }
}

const sineWave = p => {
    p.setup = function() {
        p.createCanvas(400,400);
        p.background(0);
    }

    p.draw = function() {
        if(point_set) {
            drawWave(this, point_x, point_y);
            point_set = false;
        }
    }

}

var drawingCanvas = new p5(sketch);
var sin = new p5(sineWave);

function calcWave(x, y) {
    let inc = 6.28318530717958647693 / 400;
    yvalues = new Array(400);
    var dx = 0.0;
    for(let i = 0; i < 400; i++) {
        yvalues[i] = x * Math.cos(dx) - y * Math.sin(dx) + 200;
        dx += inc;
    }
    return yvalues;
}

function drawWave(p, x, y) {
    p.noStroke();
    p.fill(255);
    let wave = calcWave(x/4,y/4);
    for(let i = 0; i < 400; i++) {
        p.ellipse(i,wave[i],1,1);
    }
}

function clearScreen() {
    drawingCanvas.clear();
    drawingCanvas.background(200);
    sin.clear();
    sin.background(0);
}

function createRandomLine() {
    let x = getRandomInt(0,400);
    let y = getRandomInt(0,400);
    p.ellipse(x, y, 5, 5);
            if(!point_set) {
                point_x = x;
                point_y = y;
                point_set = true;
            }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
function computeHoughLine(x_coord, y_coord) {
    left = y_coord;
    right = -400.0 * x_coord + y_coord;
}*/