

var x = [];		//x of each structure(built around center)
var y = [];		//y of each structure
var t = [];		//color type of each structure
var s = 4;		//starting scale
var n = 15;		//number of structures in a row, 3 * n in vertical rows
var q;			//used to determine color of each structure	
var scroll=1;	//if even, user can scroll
var pee = 255;
var poo = 255;
var cum = 255;



function setup()
{
	createCanvas(400,400);
	background(0);

	pee = random(0,255);
	poo = random(0,255);
	cum = random(0,255);


	for(let i=0; i<n; i++)	
	{	
		for(let j=0; j<3.3*n; j++)
		{
			q=i+j*1000;			//nested for loop, combines two variables into one unique value
			t[q]=random(0,6);	//assigns ranom color type to each structure
			t[q]-=t[q]%1;		//changes to integer
		}
	}
}




function draw()
{
	
	if(scroll%2==0)	//if scroll is even
	{
		if(s>2)		//if the scale isn't too small
		{
			if(mouseY>200)	//if the mouse is below halfway down the canvas
			{
				s-=(mouseY-200)/1000;	//scale is decreased, rate according to distance from midline
			}
		}	
		if(mouseY<200)	//if the mouse above halfway up the screen
		{
			s-=(mouseY-200)/1000;	//scale is increased, rate according to distance from midline
		}
	}

		
	

	var yellow1 = color(255, 221, 0);	//different color sets
	var yellow2 = color(255,246,0);
	var yellow3 = color(230,210,39);
	var yellow4 = color(255,238,64);
	var yellow5 = color(230,210,0);
	var yellow6 = color(255,233,60);
	
	
	
	
	for(let i=0; i<n; i++)
	{	
		for(let j=0; j<3.3*n; j++)
		{
			q=i+j*1000;	//assigns the two variables into one number
			
			if(t[q]==0){fill(yellow1)}	//fills in a color based off random variable at start assigned to each structure
			if(t[q]==1){fill(yellow2)}
			if(t[q]==2){fill(yellow3)}
			if(t[q]==3){fill(yellow4)}
			if(t[q]==4){fill(yellow5)}
			if(t[q]==5){fill(yellow6)}			

			x[q]=i*s*15;				//assigns x value for structure, incrementing at the scale times 15
			y[q]=j*s*4.33;				//assigns y value for structure, incrementing at the scale times 4.33

			if(j%2==0)					//if the row number is even
			{
				x[q]+=s*7.5;			//move the x by half the increment they are apart
			}

			push();
				hexy(x[q],y[q],s);	//call hexy function (outer hexagons)
			pop();

			push();
				trap(x[q],y[q],s);		//call trap function (inner shapes)
			pop();




		}
	}


}


function hexy(a,b,c)
{
	translate(a,b);
	scale(c);	
	strokeWeight(0.5);

	beginShape();					//draws hexagon
    		vertex(-2.5, -4.33);
    		vertex(2.5, -4.33);
    		vertex(5, 0);
    		vertex(2.5, 4.33);
    		vertex(-2.5, 4.33);
    		vertex(-5, 0);
    endShape(CLOSE);   
}

function trap(e,f,g)
{



	translate(e,f);
	scale(g);
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
		//quad(-2.5,-4.33, 2.5,-4.33, 1.25, -2.166, -1.25,-2.166);
		
		strokeWeight(0.05);		//lines stemming from center of base line of the trapazoids to the inner vetices. creates 3 equilateral triangles in each trapazoid
		//line(1.25,-2.166, 0,-4.33);
		//line(-1.25,-2.166, 0,-4.33);
	}
	
	for(let l=0; l<6; l++)	//calls above loop 6 more times, but inward from the edge of the original hexagon & inside the first set of trapazoids
	{						//creates triangles everywhere around the middle hexagon
		translate(0,-2*4.33);
		rotate(PI/3);
		for(let k=0; k<3; k++) //same for loop as above, but only half because it's cut off by the other hexagons
		{
		    rotate(PI/3);
			
			strokeWeight(0.1);

			if(k==0)
			{
			    fill(abs(pee-cum), abs(poo-pee), abs(cum-poo))
			}
			if(k==1)
			{
			    fill(pee,poo,cum)

			}
			if(k==2)
			{
			    fill(abs(pee-poo), abs(poo-cum), abs(cum-pee))
			}
			quad(-2.5,-4.33, 2.5,-4.33, 1.25, -2.166, -1.25,-2.166);
			
			strokeWeight(0.05);
			//line(1.25,-2.166, 0,-4.33);
			//line(-1.25,-2.166, 0,-4.33);
		}
		
		//triangle(-2.5,0, -1.25, -2.166, 0,0); //draws a triangle inside the trapazoid formed inside the three trapzoids drawn above. This fills equilateral trianlges into the last space they were missing from
		rotate(2*PI/3);
		translate(0,2*4.33);
		rotate(PI/3);

	}

	//line(-5,0, 5,0);			//lines through the center to complete equilateral triangle lattice
	//line(-2.5,-4.33, 2.5,4.33);
	//line(2.5,-4.33, -2.5,4.33);




}

function mouseClicked()
{
	scroll+=1;	//switches whether the mouse scroll is on, which allows the mouse to change the scale

}