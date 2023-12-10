let ttt = [];	//randomizes starting color of each background hexagon
let nnn = 20;	//square is proportional to amount of background hexagons drawn

let hs = 2;		//size of background hexagons

var flucc = [];		//fluctuating color values for background hexagons
var cs = 10;			//speed at which color values fluctuate

var x = [];		//x of moving hexagons
var y = [];		//y of moving hexagons
var d = [];		//direction of moving hexagons
var r = [];		//rotation of moving hexagons
var s = 10; 	//size of moving hexagons
var n = 7;		//number of moving hexagons


/*
flucc[1] = 255;		//starting values for each color variable
flucc[2] = 0.5;

flucc[3] = 200;
flucc[4] = 50.5;

flucc[5] = 150;
flucc[6] = 100.5;

flucc[7] = 100;
flucc[8] = 150.5

flucc[9] = 50;
flucc[10] = 200.5

flucc[11] = 0;
flucc[12] = 255.5;
*/



function setup()
{
	createCanvas(500,500);

	for(let i=0; i<nnn; i++)	//for each column
	{	
		for(let j=0; j<3.3*nnn; j++)	//for each row
		{
			let q=i+j*1000;			//nested for loop, combines two variables into one unique value
			ttt[q]=random(0,6);		//assigns ranom color type to each structure
			ttt[q]-=ttt[q]%1;		//changes to integer
		}
	}

	for(let i=1; i<=n; i++)		//for each moving shape
	{
		x[i] = random(100,400);		//random starting x
		y[i] = random(100,400);		//random starting y
		d[i] = random(0,2*PI);		//random starting direction
		r[i] = random(-2*PI,2*PI);	//random starting angle
        r[i+100] = random(20,40);	//random speed of rotation
	}

	for(let i=0; i<36; i++)
	{
	    flucc[i] = random(0,255);
	    /*if(flucc[i] < (255/2))
	    {
	        flucc[i+1] = 255
	        flucc[i+2] = 255
	    }
	    else
	    {
	        flucc[i-1] = 0
	        flucc[i+2] = 0
	    }*/
	}

}

function draw()
{
	behindthescenes();

	movingthings();
}

function movingthings()
{
	for(let i=1; i<=n; i++) //for each moving hexagon
	{
		x[i] += (5*cos(d[i]));	//moves in x direction proportional to angle
		y[i] += (5*sin(d[i]));	//moves in y direction proportional to angle

		if(r[i]>0)	//if anlge is positive
		{
			r[i] += PI/(r[i+100]);	//grow more positive
		}

		else		//if angle is negative
		{
			r[i] -= PI/(r[i+100]);	//grow more negative
		}

		if(x[i] > 500-5*s)	//if hexagon hits right side of screen
		{
			d[i] = (PI-d[i]);	//bounces left
		}

		if(x[i] < 0+5*s)	//if hexagon hits left side of screen
		{
			d[i] = (PI-d[i]);	//bounces right
		}
		
		if(y[i] > 500-5*s)	//if hexagon hits bottom of screen
		{	
			d[i] = (-d[i]);	//bounces up
		}

		if(y[i] < 0+5*s)	//if hexagon hits top of screen
		{
			d[i] = (-d[i]);	//bounces down
		}


		fill(250,250,10);

		push();
			hexy(x[i],y[i],s,r[i]);
		pop();

		push();
			trap(x[i],y[i],s,r[i])
		pop();
	}
}

function behindthescenes()
{
	background(0);	
	
	for(let i=0; i<=12; i++)	//for each of the 12 color variables used
	{
		if(flucc[i]%1==0)	//if there's no decimal
		{
			flucc[i] -= (cs);	//value goes down by cs
		}

		else		//there's a decimal
		{
			flucc[i] += (cs);	//value goes up by cs
		}

		if(flucc[i]<1)	//if value is less than 1
		{
			flucc[i] = 0.5;		//gets a decimal
		}

		if(flucc[i]>255)	//if value is greater than 255
		{
			flucc[i] = 255;		//no more decimal
		}
	}


	for(let i=0; i<nnn; i++)	//for each column of hexagons
	{	
		for(let j=0; j<3.3*nnn; j++)	//for each row of hexagons
		{
			let q=i+j*1000;	//assigns the two variables into one number
			
			if(ttt[q]==0){fill(flucc[1],flucc[2],flucc[3])}	//fills in a color based off random variable at start assigned to each structure
			if(ttt[q]==1){fill(flucc[4],flucc[5],flucc[6])}
			if(ttt[q]==2){fill(flucc[7],flucc[8],flucc[9])}
			if(ttt[q]==3){fill(flucc[10],flucc[11],flucc[12])}
			if(ttt[q]==4){fill(flucc[13],flucc[14],flucc[15])}
			if(ttt[q]==5){fill(flucc[16],flucc[17],flucc[18])}
			
			
			let hx = i*hs*15;				//assigns x value for structure, incrementing at the scale times 15
			let hy = j*hs*4.33;		//assigns y value for structure, incrementing at the scale times 4.33
			

			if(j%2==0)					//if the row number is even
			{
				hx+=hs*7.5;			//move the x by half the increment they are apart
			}

			push();
				hexy(hx,hy,hs,0);	//call hexy function (outer hexagons)
			pop();
		}
	}
}

function hexy(a,b,c,d)
{
	translate(a,b);
	scale(c);	
	rotate(d);
	strokeWeight(0.05);

	beginShape();					//draws hexagon
    		vertex(-2.5, -4.33);
    		vertex(2.5, -4.33);
    		vertex(5, 0);
    		vertex(2.5, 4.33);
    		vertex(-2.5, 4.33);
    		vertex(-5, 0);
    endShape(CLOSE);   
}

function trap(e,f,g,h)
{
	translate(e,f);
	scale(g);
	rotate(h);
	strokeWeight(0);

	for(let k=0; k<6; k++) //this for loop draws a trapazoid inward from each edge of the hexagon
	{
		rotate(PI/3);	//rotates 1/6 of the full circle creating hexagonal symmetry 
		quad(-2.5,-4.33, 2.5,-4.33, 1.25, -2.166, -1.25,-2.166);
	}
	
	strokeWeight(0.1);
	scale(1/2);
	for(let k=0; k<6; k++)	//this one draws trapazoids inward from the smaller hexagon made from the first trapazoid
	{
		rotate(PI/3);	
		strokeWeight(0.25);
		quad(-2.5,-4.33, 2.5,-4.33, 1.25, -2.166, -1.25,-2.166);
		
		strokeWeight(0.05);		//lines stemming from center of base line of the trapazoids to the inner vetices. creates 3 equilateral triangles in each trapazoid
		line(1.25,-2.166, 0,-4.33);
		line(-1.25,-2.166, 0,-4.33);
	}
	
	for(let l=0; l<6; l++)	//calls above loop 6 more times, but inward from the edge of the original hexagon & inside the first set of trapazoids
	{						//creates triangles everywhere around the middle hexagon
		translate(0,-2*4.33);
		rotate(PI/3);
		for(let k=0; k<3; k++) //same for loop as above, but only half because it's cut off by the other hexagons
		{
			rotate(PI/3);
			
			strokeWeight(0.1);
			quad(-2.5,-4.33, 2.5,-4.33, 1.25, -2.166, -1.25,-2.166);
			
			strokeWeight(0.05);
			line(1.25,-2.166, 0,-4.33);
			line(-1.25,-2.166, 0,-4.33);
		}
		
		triangle(-2.5,0, -1.25, -2.166, 0,0); //draws a triangle inside the trapazoid formed inside the three trapzoids drawn above. This fills equilateral trianlges into the last space they were missing from
		rotate(2*PI/3);
		translate(0,2*4.33);
		rotate(PI/3);

	}

	line(-5,0, 5,0);			//lines through the center to complete equilateral triangle lattice
	line(-2.5,-4.33, 2.5,4.33);
	line(2.5,-4.33, -2.5,4.33);
}