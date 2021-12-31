class Star {
  constructor(r, a, v, con, maxR) {
    this.r = r;
    this.maxR = maxR;
    this.a = a;
    this.vel = v;
    this.multi = 1.0;
    this.acc = 0.0001 + this.r * 0.00001 * this.multi; //play with number
    this.con = con;
    this.op = 0.2 + 0.8 * (r / maxR);
  }

  draw() {
    this.con.globalAlpha = this.op;
    this.con.fillStyle = "white";
    this.con.rotate(this.a);
    this.con.translate(this.r, 0);
    this.con.fillRect(-1, -1, 2, 2);
    this.con.translate(-this.r, 0);
    this.con.rotate(-this.a);
    this.con.globalAlpha = 1;
  }

  update(timeChange) {
    this.vel += this.acc * timeChange;
    this.r += this.vel;
    this.op = 0.2 + 0.8 * (this.r / this.maxR);
  }
}
