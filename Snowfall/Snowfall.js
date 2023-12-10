var sx = [];		//x position of snowflake

var sy = [];		//y position of snowflake

var sw = [];		//size of snowflake

var sr = [];		//rotation of snowflake

var ss = [];		//speed of snowflake

var st = [];		//type of snowflake (how many lines it has)

var n = 100;		//number of of snowflakes

var c=0;            //if time is stopped

var timer=195;			//size of snow pile initially (under screen)


function setup()
{
	createCanvas(400,400);		//creates canvas
	
	for(var i=0; i<n; i++)		//for loop to initialize each snowflake
	{
		sx[i] = random(-20,420);	//random x location

		sy[i] = random(-20,420);	//random y location

		sw[i] = random(2,15);		//random size

		sr[i] = random(0,2*PI);		//random rotation

		ss[i] = random(3,15);		//random speed

		st[i] = random(5,10);		//random type of snowflake
	}
}


function draw()
{	
	background(113);	//background

	for(var i=0; i<n; i++)	//for loop to draw each snowflake
	{
		push();
			snowflake(sx[i], sy[i], sw[i], sr[i], st[i]-st[i]%1);	//calls snowflake function
		pop();

		if(c%2==0) //if time is not frozen
		{
			sy[i] += ss[i];		//makes snow fall
		}

		if(sy[i] > 400+2*sw[i])	//if snow is below screen
		{
			sx[i] = random(-20,420);	//new random x location

			sy[i] = 0-2*sw[i];	//y is set to above screen

			sw[i] = random(2,15);	//new random size

			sr[i] = random(0,2*PI);	//new random rotation

			ss[i] = random(3,15);	//new random speed

			st[i] = random(5,10);	//new random type
		}

	}

	if(c%2==0)  //if time is not frozen
	{
		timer+=0.1; 	//pile of snow grows
	}

	if(timer>1100)	//if pile of snow is covering screen
	{
		noLoop();	//stops loop
	}

	noStroke();
	fill(255);
	ellipse(200,500, 4*timer, timer);	//pile of snow

}


function snowflake(x,y,w,r,t)
{
	translate(x,y);
	rotate(r);

	strokeWeight(1.5);
	stroke(255);

	for(var j=0; j<t; j++)	//for loop to draw multiple different line structures
	{
		rotate((2*PI)/t); 	//rotates each line group to create radial symmetry
		line(0,0, w,0);	//main line from center of flake

		line(w*(2/5),0, w*(2/5)+w/10, -w*(0.866/5));	//small line towards the middle branching out above the main line
		line(w*(2/5),0, w*(2/5)+w/10, w*(0.866/5));		//small line towards the middle branching out below the main line

		line(w*(3/4),0, w*(3/4)+w/6, -w*(0.866/3));		//bigger line towards the end branching out above the main line
		line(w*(3/4),0, w*(3/4)+w/6, w*(0.866/3));		//bigger line towards the end branching out below the main line
	}
}

function mouseClicked()		//if mouse is clicked
{
	c+=1;	//changes whether or not time is frozen
}








