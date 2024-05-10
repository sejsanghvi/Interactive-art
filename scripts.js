document.addEventListener('DOMContentLoaded', function() {
    // Get references to important elements on the page
    const landingPage = document.getElementById('landing-page');
    const canvasPage = document.getElementById('canvas-page');
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');
    const canvas4 = document.getElementById('canvas4');

// Obtain references to each canvas element and their respective 2D rendering contexts (ctx1, ctx2, ctx3, ctx4).
    const ctx2 = canvas2.getContext('2d');
    const ctx3 = canvas3.getContext('2d');
    const ctx4 = canvas4.getContext('2d');
    
    
    // Set canvas dimensions to fill the window
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
    canvas4.width = window.innerWidth;
    canvas4.height = window.innerHeight;

    // Event listener for clicks on the landing page to switch to canvas page
    document.getElementById('start').addEventListener('click', switchToCanvasPage);

    // Event listener for the screenshot button click
    document.getElementById('screenshot-btn').addEventListener('click', takeScreenshot);

    //Event listener for the reset button click
    document.getElementById('reset').addEventListener('click', reset);

    // Event listener for menu toggle
    document.querySelector('.menu-content').addEventListener('click', toggleMenu);

    //Event listener to all shape buttons
    document.getElementById('line').addEventListener('click', drawShape);
    document.getElementById('square').addEventListener('click', drawShape);
    document.getElementById('triangle').addEventListener('click', drawShape);
    document.getElementById('circle').addEventListener('click', drawShape);

    //Event listener to all color buttons
    document.querySelector('.circle.circle1').addEventListener('click', color);
    document.querySelector('.circle.circle2').addEventListener('click', color);
    document.querySelector('.circle.circle3').addEventListener('click', color);
    document.querySelector('.circle.circle4').addEventListener('click', color);
    document.querySelector('.circle.circle5').addEventListener('click', color);
    document.querySelector('.circle.circle6').addEventListener('click', color);

    //Event listener to linewidth slider
    document.querySelector('.slider').addEventListener('click', Width);

});

// Variable to store the color and linewidth
let drawcolor='#FFF8DC';
let lineWidth= 2;
let lastActiveCanvas;

// Function to switch to canvas page and start drawing
function switchToCanvasPage() {
   
    const landingPage = document.getElementById('landing-page');
    const canvasPage = document.getElementById('canvas-page');
    landingPage.classList.add('hidden');
    canvasPage.classList.remove('hidden');
    initializeDrawing();
    lastActiveCanvas='canvas1';
    // Remove the event listener after switching to canvas page
    document.getElementById('start').removeEventListener('click', switchToCanvasPage);
}

// Function to handle drawing based on the shape button clicked
function drawShape(event) {
    // Get the id of the clicked shape button
    const shapeId = event.target.id;

    // Clear all canvases
    clearAllCanvases();

    // Determine which shape was clicked and call the corresponding drawing function
    if (shapeId === 'line') {
        initializeDrawing();
        lastActiveCanvas='canvas1';
    } else if (shapeId === 'square') {
        initializeDrawingSQ();
        lastActiveCanvas='canvas2';
    } else if (shapeId === 'triangle') {
        initializeDrawingTr();
        lastActiveCanvas='canvas3';
    } else if (shapeId === 'circle') {
        initializeDrawingCircle();
        lastActiveCanvas='canvas4';
    }
}


//Function to select color
function color(event) {
    const colorCircles = document.querySelectorAll('.circle');
    const computedStyle = window.getComputedStyle(event.target);
    const colorClicked = computedStyle.backgroundColor;

    // Remove 'selected' class from all color circles
    colorCircles.forEach(circle => circle.classList.remove('selected'));
    
    // Determine the color based on the clicked circle's background color
    let strokeColor;
    if (colorClicked === 'rgb(255, 234, 0)') {
        strokeColor = '#FFEA00';
    } else if (colorClicked === 'rgb(222, 49, 99)') {
        strokeColor = '#DE3163';
    } else if (colorClicked === 'rgb(0, 150, 255)') {
        strokeColor = '#0096FF';
    } else if (colorClicked === 'rgb(180, 196, 36)') {
        strokeColor = '#B4C424';
    } else if (colorClicked === 'rgb(255, 248, 220)') {
        strokeColor = '#FFF8DC';
    } else if (colorClicked === 'rgb(207, 159, 255)') {
        strokeColor = '#CF9FFF';
    }
    
    
    // Add 'selected' class to the clicked color circle
    event.target.classList.add('selected');
    drawcolor=strokeColor;
}

//Function to get linewidth value
function Width(){
    lineWidth = document.querySelector('.slider').value;
}

// Function to take a screenshot of the canvas
function takeScreenshot() {
    const lastCanvas = document.getElementById(lastActiveCanvas);
    const screenshotImg = lastCanvas.toDataURL('image/png'); // Convert canvas to base64 image URL
    const downloadLink = document.createElement('a');
    downloadLink.href = screenshotImg;
    downloadLink.download = 'canvas_screenshot.png'; // Set download filename
    document.body.appendChild(downloadLink);
    downloadLink.click(); // Simulate click to download
    document.body.removeChild(downloadLink); // Clean up: Remove the download link from the document
}


// Function to toggle menu visibility
function toggleMenu() {
    const menuContent = document.querySelector('.menu-content');
    menuContent.classList.toggle('show-menu'); // Toggle the 'show-menu' class on menu content
}


//Function to clear all canvases
function clearAllCanvases() {
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext('2d');
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    const canvas3 = document.getElementById('canvas3');
    const ctx3 = canvas3.getContext('2d');
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    const canvas4 = document.getElementById('canvas4');
    const ctx4 = canvas4.getContext('2d');
    ctx3.clearRect(0, 0, canvas4.width, canvas4.height);

}

//Function to reset
function reset(){
    clearAllCanvases();
    initializeDrawing();
    lastActiveCanvas='canvas1';
}


 // Function to initialize drawing lines on the canvas
function initializeDrawing(){

    document.getElementById('canvas1').style.display = 'block';
    document.getElementById('canvas2').style.display = 'none';
    document.getElementById('canvas3').style.display = 'none';
    document.getElementById('canvas4').style.display = 'none';
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext('2d');
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    
        let drawing = false; // Flag to track if drawing is in progress
        
        ctx1.lineWidth = lineWidth;
        ctx1.globalCompositeOperation = 'destination-over'; 
        ctx1.shadowOffsetX = 0;
        ctx1.shadowOffsetY = 10;
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = 'rgba(0, 0, 0, 0.5)';

        // Define a class for creating and updating line objects in random direction and at random speed
        class Root {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.angle = Math.random() * Math.PI * 2; // Random initial angle
                this.length = Math.random() * 10 + 50; // Random line length
                this.speed = Math.random() * 2 + 1; // Random speed
                this.angularVelocity = Math.random() * 0.04 - 0.02; // Random angular velocity
                this.growing = true; // Flag to track if the line is still growing
                this.maxLength = Math.random() * 100 + 50; // Random maximum length
            }

            update() {
                // Update position based on angle and speed
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                // Update angle based on angular velocity
                this.angle += this.angularVelocity;

                // Calculate new end point of the line
                const endX = this.x + Math.cos(this.angle) * this.length;
                const endY = this.y + Math.sin(this.angle) * this.length;

                // Draw the line up to a certain length or until it stops growing
                if (this.growing && this.length < this.maxLength) {
                    ctx1.lineWidth = lineWidth;
                    ctx1.beginPath();
                    ctx1.moveTo(this.x, this.y);
                    ctx1.lineTo(endX, endY);
                    ctx1.strokeStyle = drawcolor;
                    ctx1.stroke();
                    this.length += this.speed; // Increment line length
                } else {
                    this.growing = false; // Stop growing the line
                }

                // Request animation frame for continuous update
                if (this.growing) {
                    requestAnimationFrame(this.update.bind(this));
                }
            }
        }

        // Event listener for mouse movements on the window
        canvas1.addEventListener('mousemove', function(e) {
            if (drawing) {
                for (let i = 0; i < 3; i++) {
                    const root = new Root(e.clientX, e.clientY);
                    root.update(); // Start updating line objects
                }
            }
        });

        // Event listener for mouse button down on the window
        canvas1.addEventListener('mousedown', function(e) {
            drawing = true; // Start drawing on mouse down
        });

        // Event listener for mouse button up on the window
        canvas1.addEventListener('mouseup', function() {
            drawing = false; // Stop drawing on mouse up
        });
    }




//square drawing
 function initializeDrawingSQ() {
    document.getElementById('canvas2').style.display = 'block';
    document.getElementById('canvas3').style.display = 'none'
    document.getElementById('canvas1').style.display = 'none';
    document.getElementById('canvas4').style.display = 'none';
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    let drawing = false;

    ctx2.lineWidth = lineWidth;
    ctx2.globalCompositeOperation = 'destination-over';
    ctx2.shadowOffsetX = 0;
    ctx2.shadowOffsetY = 10;
    ctx2.shadowBlur = 10;
    ctx2.shadowColor = 'rgba(0, 0, 0, 0.5)';

    class Root {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.speedX = Math.random() * 4 - 2; 
            this.speedY = Math.random() * 4 - 2;
            this.maxSize = Math.random() * 7 + 20;
            this.size = 0;
            this.vs = Math.random() * 0.2 + 0.5;
            this.angleX = Math.random() * 6.2;
            this.vax = Math.random() * 0.6 - 0.3;
            this.angleY = Math.random() * 6.2;
            this.vay = Math.random() * 0.6 - 0.3;
            this.angle = 0;
            this.va = Math.random() * 0.02 + 0.05;
        }

        update() {
            this.x += this.speedX + Math.sin(this.angleX);
            this.y += this.speedY + Math.sin(this.angleY);
            this.size += this.vs;
            this.angleX += this.vax;
            this.angleY += this.vay;
            this.angle += this.va;

            if (this.size < this.maxSize) {
                ctx2.lineWidth = lineWidth;
                ctx2.save();
                ctx2.translate(this.x, this.y);
                ctx2.rotate(this.angle);
                ctx2.fillStyle = drawcolor;
                ctx2.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size); //(x,y,height,width)
                ctx2.strokeStyle = '#3C5186';
                let double = this.size * 2;
                ctx2.strokeRect(0 - double / 2, 0 - double / 2, double, double);
                ctx2.strokeStyle = drawcolor;
                let triple = this.size * 3;
                ctx2.strokeRect(0 - triple / 2, 0 - triple / 2, triple, triple);
                ctx2.restore();
                requestAnimationFrame(this.update.bind(this));
            }
        }
    }

    canvas2.addEventListener('mousemove', function(e) {
        if (drawing) {
            for (let i = 0; i < 3; i++) {
                const root = new Root(e.clientX, e.clientY);
                root.update();
            }
        }
    });

    canvas2.addEventListener('mousedown', function(e) {
        drawing = true;
        for (let i = 0; i < 30; i++) {
            const root = new Root(e.clientX, e.clientY);
            root.update();
        }
    });

    canvas2.addEventListener('mouseup', function() {
        drawing = false;
    });
}


// triangle drawing
function initializeDrawingTr() {
    document.getElementById('canvas3').style.display = 'block';
    document.getElementById('canvas2').style.display = 'none'
    document.getElementById('canvas1').style.display = 'none';
    document.getElementById('canvas4').style.display = 'none';
    const canvas3 = document.getElementById('canvas3');
    const ctx3 = canvas3.getContext('2d');
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    let drawing = false;

    ctx3.lineWidth = lineWidth;
    ctx3.globalCompositeOperation = 'destination-over';
    ctx3.shadowOffsetX = 0;
    ctx3.shadowOffsetY = 10;
    ctx3.shadowBlur = 10;
    ctx3.shadowColor = 'rgba(0, 0, 0, 0.5)';

    class Triangle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.maxSize = Math.random() * 7 + 20;
            this.size = 0;
            this.vs = Math.random() * 0.2 + 0.5;
            this.angleX = Math.random() * 6.2;
            this.vax = Math.random() * 0.6 - 0.3;
            this.angleY = Math.random() * 6.2;
            this.vay = Math.random() * 0.6 - 0.3;
            this.angle = 0;
            this.va = Math.random() * 0.02 + 0.05;
        }

        update() {
            this.x += this.speedX + Math.sin(this.angleX);
            this.y += this.speedY + Math.sin(this.angleY);
            this.size += this.vs;
            this.angleX += this.vax;
            this.angleY += this.vay;
            this.angle += this.va;

            if (this.size < this.maxSize) {
                ctx3.lineWidth = lineWidth;
                ctx3.save();
                ctx3.translate(this.x, this.y);
                ctx3.rotate(this.angle);
                ctx3.beginPath();
                ctx3.moveTo(0, -this.size / 2);
                ctx3.lineTo(this.size / 2, this.size / 2);
                ctx3.lineTo(-this.size / 2, this.size / 2);
                ctx3.closePath();
                ctx3.fillStyle = drawcolor;
                ctx3.fill();
                ctx3.strokeStyle = '#3C5186';
                ctx3.stroke();
                ctx3.restore();
                requestAnimationFrame(this.update.bind(this));
            }
        }
    }

    canvas3.addEventListener('mousemove', function(e) {
        if (drawing) {
            for (let i = 0; i < 3; i++) {
                const triangle = new Triangle(e.clientX, e.clientY);
                triangle.update();
            }
        }
    });

    canvas3.addEventListener('mousedown', function(e) {
        drawing = true;
        for (let i = 0; i < 30; i++) {
            const triangle = new Triangle(e.clientX, e.clientY);
            triangle.update();
        }
    });

    canvas3.addEventListener('mouseup', function() {
        drawing = false;
    });
}

//circle drawing
function initializeDrawingCircle() {
    document.getElementById('canvas4').style.display = 'block';
    document.getElementById('canvas1').style.display = 'none';
    document.getElementById('canvas2').style.display = 'none';
    document.getElementById('canvas3').style.display = 'none';

    const canvas4 = document.getElementById('canvas4');
    const ctx4 = canvas4.getContext('2d');
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
    let drawing = false;

    ctx4.lineWidth = lineWidth;
    ctx4.globalCompositeOperation = 'destination-over';
    ctx4.shadowOffsetX = 0;
    ctx4.shadowOffsetY = 10;
    ctx4.shadowBlur = 10;
    ctx4.shadowColor = 'rgba(0, 0, 0, 0.5)';

    class Circle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.maxSize = Math.random() * 7 + 20;
            this.size = 0;
            this.vs = Math.random() * 0.2 + 0.5;
            this.angleX = Math.random() * 6.2;
            this.vax = Math.random() * 0.6 - 0.3;
            this.angleY = Math.random() * 6.2;
            this.vay = Math.random() * 0.6 - 0.3;
            this.angle = 0;
            this.va = Math.random() * 0.02 + 0.05;
        }

        update() {
            this.x += this.speedX + Math.sin(this.angleX);
            this.y += this.speedY + Math.sin(this.angleY);
            this.size += this.vs;
            this.angleX += this.vax;
            this.angleY += this.vay;
            this.angle += this.va;

            if (this.size < this.maxSize) {
                ctx4.lineWidth = lineWidth;
                ctx4.save();
                ctx4.translate(this.x, this.y);
                ctx4.rotate(this.angle);
                ctx4.beginPath();
                ctx4.arc(0, 0, this.size / 2, 0, Math.PI * 2); //(x,y,start angle,end angle)
                ctx4.closePath();
                ctx4.fillStyle = drawcolor;//color
                ctx4.fill();
                ctx4.strokeStyle = '#3C5186';
                ctx4.stroke();
                ctx4.restore();
                requestAnimationFrame(this.update.bind(this)); //calls update again and again
            }
        }
    }

    canvas4.addEventListener('mousemove', function(e) {
        if (drawing) {
            for (let i = 0; i < 3; i++) {
                const circle = new Circle(e.clientX, e.clientY);
                circle.update();
            }
        }
    });

    canvas4.addEventListener('mousedown', function(e) {
        drawing = true;
        for (let i = 0; i < 30; i++) {
            const circle = new Circle(e.clientX, e.clientY);
            circle.update();
        }
    });

    canvas4.addEventListener('mouseup', function() {
        drawing = false;
    });
}