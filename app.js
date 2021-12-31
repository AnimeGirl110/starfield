let can,
  con,
  maxR,
  timePrior = 0;
let stars = [];

window.onload = init;

function animate(timeNow) {
  let timeChange = timeNow - timePrior;
  //do stuff
  update(timeChange);
  detectEdges();
  draw();
  timePrior = timeNow;

  requestAnimationFrame(animate);
}

function detectEdges() {
  for (let star of stars) {
    if (star.r > maxR) {
      star.vel = 0;
      star.r = can.width * Math.random() * 0.1;
      star.a = Math.random() * 2 * Math.PI;
      star.acc = 0.0001 + star.r * 0.0001 * star.multi;
      star.op = 0.2 + 0.8 * (star.r / maxR);
    }
  }
}

function draw() {
  con.clearRect(0, 0, can.width, can.height);
  con.translate(can.width / 2, can.height / 2);

  for (let star of stars) {
    star.draw();
  }
  con.translate(-can.width / 2, -can.height / 2);
}

function handleKD(e) {
  // console.log("I am working");
  switch (e.keyCode) {
    case 38:
      for (let star of stars) {
        if (star.multi <= 1.7) {
          star.multi += 0.02;
        }
        // console.log(star.acc);
      }
      break;
    case 40:
      for (let star of stars) {
        if (star.multi >= 0.2) {
          star.multi -= 0.02;
        }
        // console.log(star.acc);
      }
      break;
  }
}

function init() {
  console.log("initializing");
  can = document.getElementById("can");
  con = can.getContext("2d");
  document.addEventListener("keydown", handleKD);
  window.onresize = resize;
  resize();
  makeStars(1000);
  requestAnimationFrame(animate);
}

function makeStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    let x = -can.width / 2 + Math.random() * can.width;
    let y = -can.height / 2 + Math.random() * can.height;
    let r = Math.sqrt(x * x + y * y);
    let a = Math.atan2(y, x);
    let v = 0;
    let star = new Star(r, a, v, con, maxR);
    stars.push(star);
  }
}

function resize() {
  console.log("resizing");
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  maxR = Math.sqrt(can.width * can.width + can.height * can.height) / 2;
}

function update(timeChange) {
  for (let star of stars) {
    star.update(timeChange);
  }
}
