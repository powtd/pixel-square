canvas = document.getElementById('pixel')
c = canvas.getContext("2d")

function getMouseCoords(event) {
    rect = canvas.getBoundingClientRect()
    x = event.clientX - rect.left
    y = event.clientY - rect.top
    return { x: x, y: y }
}

function drawMouseLoc(event) {
    loc = getMouseCoords(event)
    squareSize = getNumberValue("size");

    x = Math.floor(loc.x / squareSize)
    y = Math.floor(loc.y / squareSize)

    drawGrid()
    drawSquare(x * squareSize, y * squareSize, squareSize, yellow)

    console.log(x, y)
}
function drawMouseLoc1(e) {
    squareSize = getNumberValue("size");
    locfrom = getMouseCoords(e)
    xfrom = Math.floor(locfrom.x / squareSize)
    yfrom = Math.floor(locfrom.y / squareSize)
    canvas.addEventListener("mousemove", square)

    function square(event) {
        loc = getMouseCoords(event)
        x = Math.floor(loc.x / squareSize)
        y = Math.floor(loc.y / squareSize)
        drawGrid()

        for (let z = xfrom; z <= x; z++) {
            for (let a = yfrom; a < y; a++) {

                drawSquare(z * squareSize, yfrom * squareSize, squareSize, red)
                drawSquare(xfrom * squareSize, a * squareSize, squareSize, red)
                drawSquare(x * squareSize, a * squareSize, squareSize, red)
                drawSquare(z * squareSize, y * squareSize, squareSize, red)
                canvas.addEventListener('mouseup', stroke)
                canvas.addEventListener('mouseup', function () {
                    canvas.removeEventListener('mouseup', stroke)
                    storeState(xfrom, yfrom, x, y, squareSize)
                })

                //canvas.addEventListener('mouseup', saveState(z, a, yfrom, xfrom, y, x, squareSize))
                //saveState(z, a, yfrom, xfrom, y, x, squareSize)
            }
        }
    }

    function stroke() {
        canvas.removeEventListener("mousemove", square);

    }
    function storeState(xfrom, yfrom, x, y, squareSize) {
        xfrom1.push(xfrom)
        yfrom1.push(yfrom)
        x1.push(x)
        y1.push(y)
        squareSize1.push(squareSize)
    }

}


function drawState() {
    for (let arrlength = 0; arrlength < xfrom1.length; arrlength++) {

        for (let z = xfrom1[arrlength]; z <= x1[arrlength]; z++) {
            for (let a = yfrom1[arrlength]; a < y1[arrlength]; a++) {

                drawSquare(z * squareSize, yfrom1[arrlength] * squareSize, squareSize, red)
                drawSquare(xfrom1[arrlength] * squareSize, a * squareSize, squareSize, red)
                drawSquare(x1[arrlength] * squareSize, a * squareSize, squareSize, red)
                drawSquare(z * squareSize, y1[arrlength] * squareSize, squareSize, red)
            }
        }
    }
}
var xfrom1 = [], yfrom1 = [], x1 = [], y1 = [], squareSize1 = []


blue = '#ABCDEF'
white = '#FCFCFC'
yellow = 'rgba(255, 255, 0, 0.75)'
red = '#FF0000'
gray = '#D3D3D3'
function getNumberValue(id) {
    return document.getElementById(id).value
}

function drawSquare(x, y, w, color) {
    c.fillStyle = color
    c.fillRect(x, y, w, w)
}
var save = [[]]


function drawGrid() {
    const squareSize = getNumberValue("size");

    for (var y = 0; y < (canvas.height / squareSize); y++) {
        for (var x = 0; x < (canvas.width / squareSize); x++) {
            // If an even row
            if (y % 2 == 0) {
                if (x % 2 == 0) {
                    drawSquare(x * squareSize, y * squareSize, squareSize, gray)

                }
                else {
                    drawSquare(x * squareSize, y * squareSize, squareSize, white)

                }
            }
            else {
                if (x % 2 == 0) {
                    drawSquare(x * squareSize, y * squareSize, squareSize, white)

                }
                else {
                    drawSquare(x * squareSize, y * squareSize, squareSize, gray)

                }
            }
        }

    }

    drawState()

}
function saveState(z, a, yfrom, xfrom, y, x, squareSize) {
    drawSquare(z * squareSize, yfrom * squareSize, squareSize, red)
    drawSquare(xfrom * squareSize, a * squareSize, squareSize, red)
    drawSquare(x * squareSize, a * squareSize, squareSize, red)
    drawSquare(z * squareSize, y * squareSize, squareSize, red)
}


function selectTool(v) {
    console.log(v)
    if (v == 1) {
        canvas.addEventListener('mousemove', drawMouseLoc)
        canvas.removeEventListener('mousedown', drawMouseLoc1)
    }
    if (v == 2) {
        canvas.removeEventListener('mousemove', drawMouseLoc)
        canvas.addEventListener('mousedown', drawMouseLoc1)
    }
}

drawGrid()
