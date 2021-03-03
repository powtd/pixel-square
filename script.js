var canvas = document.querySelector('canvas')
c = canvas.getContext("2d")

white = '#FCFCFC'
gray = '#D3D3D3'
pp = '#3b395c'
black = '#000'
const squareSize = 15;

function clickbutt(v) {
    var xfrom, yfrom;
    let toolNumber = v
    console.log(toolNumber)

    canvas.addEventListener('mousedown', down)
    canvas.addEventListener('mousedown', down1)
    canvas.addEventListener('mouseup', up)

    function down1(event) {
        loc = getMouseCoords(event)

        xfrom = Math.floor(loc.x / squareSize);
        yfrom = Math.floor(loc.y / squareSize);
        drawSquare(xfrom * squareSize, yfrom * squareSize, squareSize, black)
    }


    function down(event) {
        loc = getMouseCoords(event)
        canvas.addEventListener('mousemove', m)
        xfrom = Math.floor(loc.x / squareSize);
        yfrom = Math.floor(loc.y / squareSize);
    }

    function m(event) { // ลากเม้าส์
        locMove = getMouseCoords(event)
        let x = Math.floor(locMove.x / squareSize);
        let y = Math.floor(locMove.y / squareSize);

        if (toolNumber == 'draw') {
            drawSquare(x * squareSize, y * squareSize, squareSize, black)
        }
        if (toolNumber == 'square') {
            drawGrid()
            for (let z = xfrom; z <= x; z++) {
                for (let a = yfrom; a < y; a++) {
                    drawSquare(z * squareSize, yfrom * squareSize, squareSize, black)
                    drawSquare(xfrom * squareSize, a * squareSize, squareSize, black)
                    drawSquare(x * squareSize, a * squareSize, squareSize, black)
                    drawSquare(z * squareSize, y * squareSize, squareSize, black)
                    //console.log('re')
                }
            }
        }

        if (toolNumber == 'line') { // use Bresenham’s algorithm
            drawGrid()
            let xx, yy, dx, dy, dx1, dy1, px, py, xe, ye, i;

            dx = x - xfrom;
            dy = y - yfrom;

            dx1 = Math.abs(dx);
            dy1 = Math.abs(dy);

            px = 2 * dy1 - dx1;
            py = 2 * dx1 - dy1;

            if (dy1 <= dx1) {

                if (dx >= 0) {
                    xx = xfrom; yy = yfrom; xe = x;
                } else {
                    xx = x; yy = y; xe = xfrom;
                }
                drawSquare(xx * squareSize, yy * squareSize, squareSize, black)

                for (i = 0; xx < xe; i++) {
                    xx = xx + 1;

                    if (px < 0) {
                        px = px + 2 * dy1;
                    } else {
                        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                            yy = yy + 1;
                        } else {
                            yy = yy - 1;
                        }
                        px = px + 2 * (dy1 - dx1);
                    }
                    drawSquare(xx * squareSize, yy * squareSize, squareSize, black)
                }
            } else {
                if (dy >= 0) {
                    xx = xfrom; yy = yfrom; ye = y;
                } else {
                    xx = x; yy = y; ye = yfrom;
                }
                drawSquare(xx * squareSize, yy * squareSize, squareSize, black)

                for (i = 0; yy < ye; i++) {
                    yy = yy + 1;

                    if (py <= 0) {
                        py = py + 2 * dx1;
                    } else {
                        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                            xx = xx + 1;
                        } else {
                            xx = xx - 1;
                        }
                        py = py + 2 * (dx1 - dy1);
                    }
                    drawSquare(xx * squareSize, yy * squareSize, squareSize, black)
                }
            }
        }
        if (toolNumber == 'circle') {
            let r = x - xfrom;
            var zero = 0;
            var radiusError = 1 - r;
            drawGrid()
            console.log(xfrom, x, r)
            while (r >= zero) {
                drawSquare((r + xfrom) * squareSize, (zero + yfrom) * squareSize, squareSize, black)
                drawSquare((zero + xfrom) * squareSize, (r + yfrom) * squareSize, squareSize, black)
                drawSquare((-r + xfrom) * squareSize, (zero + yfrom) * squareSize, squareSize, black)
                drawSquare((-zero + xfrom) * squareSize, (r + yfrom) * squareSize, squareSize, black)
                drawSquare((-r + xfrom) * squareSize, (-zero + yfrom) * squareSize, squareSize, black)
                drawSquare((-zero + xfrom) * squareSize, (-r + yfrom) * squareSize, squareSize, black)
                drawSquare((r + xfrom) * squareSize, (-zero + yfrom) * squareSize, squareSize, black)
                drawSquare((zero + xfrom) * squareSize, (-r + yfrom) * squareSize, squareSize, black)
                zero++;

                if (radiusError < 0) {
                    radiusError += 2 * zero + 1;
                }
                else {
                    r--;
                    radiusError += 2 * (zero - r + 1);
                }
            }
        }
    }

    function up() { //ยกเลิกคลิก
        canvas.removeEventListener('mousemove', m)
        canvas.removeEventListener('mousedown', down)
    }

    function getMouseCoords(event) {
        rect = canvas.getBoundingClientRect()
        x = event.clientX - rect.left
        y = event.clientY - rect.top
        return { x: x, y: y }
    }
}

//-------------------------------

function drawSquare(x, y, w, color) {
    c.fillStyle = color
    c.fillRect(x, y, w, w)
}

function drawGrid() {

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
    //drawState()
}
drawGrid()