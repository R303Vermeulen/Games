
let l = 0; // lights are off

let t = 0; // timer for flame
let q = 0; // random for flame
let w = 0; //random for flame


function setup() 
{
	createCanvas(400, 400);    //canvas
}


function draw() 
{
	if(l==0)			//when lights off
	{
		background(0);			
	}
	if(l==1)			//when lights on
	{
		background(193,154,107);
		push();
			wall(5);		//background pattern
		pop();
	}

	push();
		candle(200,150,2,1.4); 		//candle
	pop();
		
	push();
		if(l==1)	
		{									
			suit(200,180,12);				//suit
		}
	pop();

}


function candle(x,y,sx,sy)
{

	translate(x,y);
	scale(sx,sy);
	noStroke();


	t++;							//timer
	if(t%5==0)
	{
		q=random(0,10);				//random to make fire flicker
		w=q+random(0,4)-2;
	}

	for(let i=50; i >0; i--)			//flame
	{
		if(i>25)
		{
			fill(255,250,125+5*(i-25));				//red flame
			ellipse(0,-10,0+i/3.7,i/1.2+q);	 
		}
		if(i<26)
		{
			fill(255,i*10,i*5);				//white flame
			ellipse(0,-5,0+i/2,i/1.2+q);
		}

	}

	for(let i=0; i < 60; i++)
	{
	
		if(i<20)
		{
			fill(255,255-(i*10),200-(i*10));	//white to red
			rect(-15,i,30,1.2);
		}

		if(l==0)
		{

			if(i>19 && i<40)
			{
				fill(255-(i-20)*10,55,0,255-(i-20)*7);		//red to black
				rect(-15,i,30,1.2)
			}

			if(i>39)
			{
				fill(55,55,0,140-((i-40)*7));  			//black to dark
					rect(-15,i,30,1.2);
			}
		}

		if(l==1)
		{
			if(i>19 && i<40)
			{
				fill(255,55+(i-20)*10,0+(i-20)*10);		//red to white
				rect(-15,i,30,1.2)
			}

			if(i>39)
			{
				fill(255,255,200);
				rect(-15,i,30,1.2); 			//white
			}
		}
	}


}





function suit(x,y,s)			//suit
{
	translate(x,y);
	scale(10,s);
	strokeWeight(0.14);

	fill(180,220,250);	 //shirt
	rect(-4,4,8,15);

	fill(180,220,250);
	quad(-3,2, 0,4, -1.2,6, -5,3);		//collar
	quad(3,2, 0,4, 1.2,6, 5,3);

	fill(240,100,100);
	quad(0,4.5, -1.5,15, 0,17, 1.5,15);  	//tie
	quad(0,4, -0.8,5.8, 0,6.1, 0.8,5.8);



	fill(50);					//pants
	strokeWeight(0.3);
	rect(-8,17.3,16,40);

	fill(0);						//belt
	strokeWeight(0.14);
	rect(-5,17.7,10,1.2);
	
	fill(200);						//buckle
	rect(-1.5,17.3, 3,2, 0.8);
	
	fill(0);						
	rect(-1,17.7, 2,1.2, 0.5);		//belt comin thru
	
	fill(200);
	rect(-1.1,18.1, 2.2,0.4, 0.08);		//metal thing that goes throught the belt hole
	
	fill(0);

	push();	
		scale(-1,1);					
		rect(-0.2,17.7, 1.25,1.2, 0.1, 0.4);	//black space that covers up the metal thingy
	pop();

	fill(50);

	push();
		translate(-11.8,12.9);					//sleeve
		rotate(PI/18);
		ellipse(0,0,5,21);
	pop();

	push();
		translate(11.8,12.9);			//sleeve
		rotate(-PI/18);
		ellipse(0,0,5,21);
	pop();

	quad(-3,2, -10,2.5, -9,19.7, -2,19.5);	//coat
	quad(3,2, 10,2.5, 9,19.7, 2,19.5);

}






function wall(s)
{
	strokeWeight(0);
	scale(s)

	for(let ix=0; ix<9; ix++)			//loop for each column
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
			
				ellipse(ix*10,iy,9);	//circles across tha wall
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
	
				ellipse(ix*10,iy,9);		//circles across the wall
			}
		}
	}
}




function mousePressed()
{
	
	if(mouseX> 170 && mouseX<230 && mouseY>150 && mouseY <235)		//candle parameters
	{
		l+=1;			//switches lights on or to two
	}


	if(l>1)
	{
		l=0;		//switches lights at 2 to off
	}
}


