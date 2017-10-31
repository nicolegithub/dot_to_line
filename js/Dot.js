var Dot = function (obj) {
  this.ctx = obj.ctx; // getContext for canvas
  this.cw = obj.cw; // width for canvas
  this.ch = obj.ch; // height for canvas
  this.dotsColor = obj.dotsColor
  this.dotsDistance = obj.dotsDistance
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
  update: function(callback){
    this.x = this.x + this.sx;
    this.y = this.y + this.sy;
    if (this.x < -this.dotsDistance || this.x > this.cw + this.dotsDistance || this.y < -this.dotsDistance || this.y > this.ch + this.dotsDistance) {
      if(callback){
        callback()
      }else{
        this.init()
      }
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