# 1
> The mouse click event of the react+ts version, colorful fireworks effects will appear when the mouse clicks.
> feedback: send shitian1.clover@gmail.com
> github:https://github.com/Mnxj


# 2
``` js
// npm i react-click-display-fireworks

// step1
import MouseClickAnimation from 'react-click-display-fireworks';

// mount get dom
const canvasEl = document.querySelector ('.fireworks') as any;

// step2 create hover
const mouse = new MouseClickAnimation(canvasEl);

// step3 listener
const onMousedown = (e ) => {
          mouse.updateCoords(e)
          mouse.animateParticules()
}

document.addEventListener('mousedown',onMousedown)
mouse.setCanvasSize();// init
window.addEventListener('resize', mouse.setCanvasSize);

// step4 remember clear
```
