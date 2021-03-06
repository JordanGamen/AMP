const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let points = [];
let maxPoints = 39;
let counter = 0;
let hit = 0;


for(let i = 0; i < maxPoints; i++)
{
  addPoint("rgba(255,0,0,1)");
}

let mouse = new Vector2d();
let difference = new Vector2d();

window.addEventListener('click',(e)=>{
  mouse.dx = e.clientX;
  mouse.dy = e.clientY;

  for (let i = 0; i < points.length; i++) {
    difference.differenceVector(points[i].position, mouse);
     if(difference.magnitude < points[i].radius)
     {
       points[i].color = "rgba(0,0,255,1)";
       hit++;
     }
   }
   console.log(hit);
  if(hit >= maxPoints)
  {
    hit = 0;
    counter = 0;
    points.splice(0, maxPoints)
    for (let i = 0; i < maxPoints; i++)
    {
      addPoint("rgba(255,0,0,1)");
    }
  }
});

function animate() {
  context.clearRect(0, 0, width, height);
  requestAnimationFrame(animate);

  for(let i = 0; i < points.length; i++)
  {
    points[i].draw(context);
  }
}

animate();


function getRandom(max)
{
  let rand = Math.floor(Math.random() * max);
  return rand;
}

function addPoint(color)
{
  let a = new Point(new Vector2d(getRandom(width),getRandom(height)), 50, color, "Miku");
  a.label = counter;
  counter++;
  points.push(a);
}
