import anime from "animejs";
const debounce = (fn,delay)=> {
  let timer;
  return function(...args) {
    timer && clearTimeout(timer);
    if(!timer){
      fn.apply(this,args);
    }
    timer = setTimeout(()=> {
      fn.apply(this,args);
    }, delay);
  }
}
const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
const _createParticule = Symbol('createParticule')
export default class MouseClickAnimation {
  
  pointerX = 0;
  pointerY = 0;
  left = 0;
  top = 0;
  ctx;
  setCanvasSize;
  constructor (canvasEl) {
    const ctx = canvasEl.getContext ('2d')
    this.setCanvasSize = debounce(() => {
      canvasEl.width = 2 * window.innerWidth;
      canvasEl.height = 2 * window.innerHeight;
      canvasEl.style.width = window.innerWidth + 'px';
      canvasEl.style.height = window.innerHeight + 'px';
      ctx.scale(2, 2);
    }, 500);
    anime({ duration: 1 / 0, update: () => ctx.clearRect(0, 0, canvasEl.width, canvasEl.height) })
    const {left,top} = canvasEl.getBoundingClientRect()
    this.top = top
    this.left = left
    this.ctx = ctx;
  }

  updateCoords = (e) => {
    this.pointerX = (e.clientX || e.touches[0].clientX) - this.left
    this.pointerY = e.clientY || e.touches[0].clientY - this.top
  }

  animateParticules = () =>{
    let n =[];
    for (let i = 0; i < 30; i++) {
      n.push(this[_createParticule]())
    }
    anime.timeline().add({
      targets: n,
      x: (e) => e.endPos.x,
      y: (e) => e.endPos.y,
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: "easeOutExpo",
      update: renderParticule
    });
  }
   [_createParticule](){
    let a = {} as any;
    const ctx = this.ctx;
    return a.x = this.pointerX,
      a.y = this.pointerY,
      a.color = colors[anime.random(0, colors.length - 1)],
      a.radius = anime.random(16, 32),
      a.endPos = setParticuleDirection(a),
      a.draw = () =>{
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0)
        ctx.fillStyle = a.color
        ctx.fill()
      },
      a
  }
  
}

const setParticuleDirection = (e) => {
  const t = anime.random (0, 360) * Math.PI / 180,
    a = anime.random (50, 180),
    n = [-1, 1][anime.random (0, 1)] * a;
  return {
    x: e.x + n * Math.cos(t),
    y: e.y + n * Math.sin(t)
  }
}

const renderParticule = (e) =>{
  for (let t = 0; t < e.animatables.length; t++) {
    e.animatables[t].target.draw()
  }
}
