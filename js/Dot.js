var Dot = function (ctx,cw,ch,dotsColor) {
  this.ctx = ctx; // getContext for canvas
  this.cw = cw; // width for canvas
  this.ch = ch; // height for canvas
  this.dotsColor = dotsColor
  this.x; // X axes
  this.y; // Y axes
  this.r; // radius for a dot
  this.sx; // horizontal displacement
  this.sy; // longitudinal displacement
};
Dot.prototype = {
  constructor: Dot,
  init: function(x,y){
    this.x = x || Math.random() * this.cw;
    this.y = y || Math.random() * this.ch;
    this.r = Math.random() * 2;
    this.sx = Math.random() * 2 - 1;
    this.sy = Math.random() * 2 - 1;
    this.paintDot(this.x,this.y,this.r)
  },
  update: function(){
    this.x = this.x + this.sx;
    this.y = this.y + this.sy;
    if (this.x < 0 || this.x > this.cw || this.y < 0 || this.y > this.ch) {
      this.init();
      return
    }
    this.paintDot(this.x, this.y, this.r)
  },
  paintDot: function(x,y,r) {
    this.ctx.fillStyle = 'rgba('+this.dotsColor+',.8)';
    this.ctx.beginPath();
    this.ctx.arc(x,y,r,0,Math.PI*2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}