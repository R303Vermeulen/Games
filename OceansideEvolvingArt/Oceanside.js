//Offset controls seed of coordinate noise
let yOff1 = 0.0;

//x-Iterations controls stepping of wave on x-coordinate ie. amount of sections of vertex curves
let xIter1 = 0.05;

//y-Iterations controls intensity of change in y-coordinate interval
//ie. bigger number == spikier wave
let yIter1 = 0.02;


let yOff2 = 0.0;
let xIter2 = 0.02;
let yIter2 = 0.03;


let yOff3 = 0.0;
let xIter3 = 0.025;
let yIter3 = 0.03;


let yOff4 = 0.0;
let xIter4 = 0.07;
let yIter4 = 0.03;



let surreal = false;
let lighthouse = false;



let oceanColor;
let midColor;
let darkColor;
let edge;



//y-coordinate intervals for each wave
let waveX = 0;

let skyX = 0;

let waveY41 = 130;
let waveY42 = 110;

let waveY31 = 50;
let waveY32 = 25;

let waveY21 = 25;
let waveY22 = 5;

let waveY1 = 5;
let waveY2 = 0;


let quadX1 = 250;
let quadX2 = 250;

let quadX3 = 750;
let quadX4 = 750;


//Light beam variables
let lightHeight = 200;

let lightX = 0;
let lightSize = 25;

let lightX2 = 1000;
let lightSize2 = 25;

let lightBig = 200;
let lightSmall = 200;

let lightStop = false;



let thisismyvariable = 0;
let rt = 0;
let rq = 0;
let rw = 0;
let rcu = 120;
var bemovin = 0;
var howmuch = 0;
var updown = true;


function setup() {

  createCanvas(1000, 800);
  
}


function draw() {
  
  
  let beachColor = color(253, 216, 181);
  const half = height / 2;

  

  background(beachColor);

  if(!surreal) {

    oceanColor = color(187, 219, 247);
    midColor = color(146, 196, 238);
    darkColor = color(100, 171, 227);

    edge = color(29, 95, 181, 250);


  } else {

      //oceanColor = 'red'
      //midColor = 'crimson'
      //darkColor = 'darkred'

      if(waveX < 180) {

        waveX += 1;
        skyX += 1;

        waveY41 -= 0.2;
        waveY42 -= 0.23;

        waveY31 -= -0.1;
        waveY32 -= -0.05;

        waveY21 -= -0.09;
        waveY22 -= -0.1;

        waveY1 -= -0.075;
        waveY2 -= -0.07;


        quadX1 += 2.56;
        quadX2 -= 1.38;

        quadX3 -= 2.56;
        quadX4 += 1.38;

        xIter4 += 0.0002;
        xIter3 += 0.0002;
        xIter2 += 0.0002;
        xIter1 += 0.0002;

        
      }

    }


  strokeWeight(1);

  drawBeach(quadX1, quadX2, quadX3, beachColor);

  noStroke();

  fill('darkblue');
  rect(0, 0, width, skyX);

  if(thisismyvariable>1)
  {
    push();
      backgroundcheck(3);
    pop();
  }

  //drawWave(y1, y2, xIter, yOff, fillColor, outline, outColor, weight)

  strokeWeight(1);

  drawWave(half - waveY1, half - waveY2, xIter1, yOff1, 250, true, 0);
  yOff1 += yIter1;

  drawWave(half - waveY21 , half - waveY22, xIter2, yOff2, oceanColor, true, edge);
  yOff2 += yIter2;

  drawWave(half - waveY31, half - waveY32, xIter3, yOff3, midColor, true, edge);
  yOff3 += yIter3;

  drawWave(half - waveY41, half - waveY42, xIter4, yOff4, darkColor, true, edge);
  yOff4 += yIter4;



  if(lighthouse) {
    //ellipse(100,100,100);
    stroke(edge);
    line(485, 200, 515, 200);
    
    fill('crimson');
    noStroke();
    quad(490, 200, 510, 200, 507, lightHeight, 492, lightHeight);

    fill(0);
    ellipse(500, lightHeight + 5, 5);


    if(lightHeight > 50) {

      lightHeight -= 1;

    } else if(lightHeight <= 50 && thisismyvariable ==0){


        fill(255, lightBig);
        ellipse(lightX, 100, lightSize);

        fill(255, lightSmall);
        ellipse(lightX2, 100, lightSize2);


      }

  }



  if(lightHeight <= 50 && lightX < width && thisismyvariable==0) {

    fill(255, lightBig);
    triangle(500, lightHeight + 5, lightX, 100 - (lightSize / 2), lightX, 100 + (lightSize / 2));

    fill(255, lightSmall);
    triangle(500, lightHeight + 5, lightX2, 100 - (lightSize2 / 2), lightX2, 100 + (lightSize2 / 2));
          
    lightX += 1;
    lightX2 -= 1;

    if(lightX < width / 2) {

      lightSize += 4;
      lightSize2 -= 0.05;

      lightBig += 0.025;
      lightSmall -= 0.25;

    } else if(lightX > width / 2) {

        lightSize -= 4;
        lightSize2 += 0.05;

        lightBig -= 0.025;
        lightSmall += 0.25;

        if(lightX >= width) {

          lightX = 0;
          lightSize = 25;
          lightBig = 200;

        }

        if(lightX2 <= 0) {

          lightX2 = width;
          lightSize2 = 25;
          lightSmall = 200;

        }

      }

  }


  // Perspective Lines
  // line(width / 2, 180, width / 2, height)
  // line(0, height, width / 2, 180)
  // line(width, height, width / 2, 180)
  // line(0, height / 2, width / 2, 180)
  // line(width, height / 2, width / 2, 180)

  // line(360, 0, 360, height);


  if(thisismyvariable >0)
  {
    push();
      candle(500,47,0.8,1.26);
    pop();
  }
  
  
}




function drawBeach(quadX1, quadX2, quadX3, beachColor) {

  stroke(0, 25);

  fill(0, 50);
  quad(quadX1, 0, width / 2, 0, width / 2, height, quadX2, height);

  fill(0, 25);
  quad(width / 2, 0, quadX3, 0, quadX4, height, width / 2, height);

  fill(0, 25);
  quad(0, 0, quadX1, 0, quadX2, height, 0, height);

  fill(0, 50);
  quad(quadX3, 0, width, 0, width, height, quadX4, height);


}


//The drawWave function will only display the same static wave unless you refresh the page.
//This is because yOff and xOff don't keep memory of past iterations.
//When you call a function, it resets all xOff and yOff values.

//xOff requires being reset to 0 because it applies on a pixel x pixel basis.
//If you skip around or iterate in too large of chunks, the noise becomse chaotic.
//So the noise function *probably* only gives organic outputs if iterated through in order.

//yOff needs to keep past iterations because it determines the y-coord.
//The y-coord is constantly changing in order to animate so it needs to saved.
//I'm like 80% sure this is why.

//To solve this, iterate xOff INSIDE of the function in order to reset it to 0 per pixel.
//Iterate yOff outside the function in order to keep save past iterations and not reset to 0.

//TODO: Figure out the confusion behind how the noise function generates values.

function drawWave(y1, y2, xIter, yOff, fillColor, outline, outColor, weight) {

  if(outline) {
    stroke(outColor);

  } else { noStroke(); }

  fill(fillColor);

  beginShape();
  let xOff = 0.0; //Value to iterate through and generate nosise

  vertex(0, waveX); //Sets the start of the vertex curve at left side of the canvase

  for(let x = 0; x <= width; x += 5) {

    //Translates a value between 0 and 1 to the interval of y-coordinates of the specific wave
    //Sets coordinate to y
    let y = map(noise(xOff, yOff), 0, 1, y1, y2); 

    vertex(x, y); //Draws a vetex curve at the coordinate of x and y. x between 0 & width.

    //Iterates noise generation value
    xOff += xIter;
    //print(xOff);
  }

  vertex(width, waveX); //Ends vertex curve at width of canvas

  endShape(CLOSE);

}


function candle(rx,ry,rsx,rsy)
{
	translate(rx,ry);
	scale(rsx,rsy);
	noStroke();
  
  if(rcu>0)
  {
    rcu-=1;
  }

  rt++;              //timer
  if(rt%5==0)
  {
    rq=random(0,10);       //random to make fire flicker
    rw=rq+random(0,4)-2;
  }

  if(rcu==0)
  {
    for(let i=50; i>0; i--)     //flame
    {
      if(i>25)
      {
        fill(255,250,125+5*(i-25));       //red flame
        ellipse(0,-10,0+i/3.7,i/1.2+rq);  
       } 
      if(i<26)
      {
        fill(255,i*10,i*5);       //white flame
        ellipse(0,-5,0+i/2,i/1.2+rw);
      }
   }
  }

  for(let i=120; i>rcu; i--)
  {
   
     if(i<20)
      {
       fill(255,255-(i*10),200-(i*10));  //white to red
       rect(-15-(i-120)/22,i,30+(i-120)/11,1.2);
     }

     if(i>19 && i<40)
     {
       fill(255,55+(i-20)*10,0+(i-20)*10);   //red to white
       rect(-15-(i-120)/22,i,30+(i-120)/11,1.2)
      }

      if(i>39)
      {
       fill(255,255,200);
       rect(-15-(i-120)/22,i,30+(i-120)/11,1.2);       //white
      }
    }
  }

function backgroundcheck(s)
{
 
  strokeWeight(0);
  translate(-1400+bemovin,-50);
  scale(s);

  if(bemovin<1400)
  {
    bemovin+=2;
  }

  else
  {
    bemovin=1281;
  }

  if(updown)
  {
    howmuch+=0.1;
  }

  if(howmuch>0.5)
  {
    updown=false;
  }

  if(!updown)
  {
    howmuch-=0.1;
  }

  if(howmuch<-0.5)
  {
    updown=true;
  }


	for(let ix=0; ix<45; ix++)			//loop for each column
	{
		if(ix%2==0) 				//even columns
		{
			for(let iy=0; iy<100; iy++) 	//loop for each circle in column
			{
				if((iy)%2==0)			//even circles are black
				{
					fill(0);
				}
				
				if((iy)%2!=0)		//odd circles are white
				{
					fill(255);
				}
			
				ellipse(ix*10,iy+howmuch,9.2);	//circles across tha wall
			}
		}

		if(ix%2 != 0)			//odd columns
		{
			for(let iy=100; iy>-10; iy--)		//loop for each circle in column
			{
				if((iy)%2==0)			//even circles are black
				{
					fill(0);		
				}
				
				if((iy)%2!=0)			//odd circles are white
				{
					fill(255);
				}
	
				ellipse(ix*10,iy-howmuch,9.2);		//circles across the wall
			}
		}
	}
}





function mouseClicked() {

  surreal = true;

  

  if(lighthouse==true)
  {
    thisismyvariable += 1 ;

  }
  


  if(waveX >= 180){

    lighthouse = true;

  }

  

}