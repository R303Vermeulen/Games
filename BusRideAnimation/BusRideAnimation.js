let scene = 1;			//what scene we rockin (set to 1 to see from beginning)

let s = 0;				//used inside each scene to order events

let rtcx1aey = [];		//Road To City x1 At Each Y: x of left edge of the Road To City at each y value
let rtcx2aey = [];		//Roat To City x2 At Each Y: x of right edge of the Road To City at each y value

let rtcx1 = 300;		//Road To City X1
let rtcx2 = 305;		//Road To City X2
let rtcy1 = 250;		//Road To City Y1
let rtcx3 = 305;		//Road To City X3
let rtcx4 = 50;			//Road To City X4
let rtcy3 = 420;		//Road To City Y3

let rtch = rtcy3-rtcy1;	//Road To City Height, used to represent each y value in rtcx1aey & rtcx2aey

let sbx = -600;			//Side Bus X
let sby = 200;			//Side Bus Y

let tb = -220; 			//Top Bus (-220)

let px = [];			//Person X
let py = [];			//Person Y

let ph = [];			//Person Height

var c= [];				//color

var bbbbx = 400;		//Back Bus Boys Bariable X
var bbbby = 0;			//Back Bus Boys Bariable Y

var bbbbt = 3;			//Back Bus Boys Bariable Timer 

var desertX = 0;		//Desert X	
var desertY = 200; 		//Desert Y

var desertGroundX = 0;		//Desert Ground X
var desertGroundY = 400;	//Desert Ground Y

var roadsX = 0			//Desert Road x
var roadsY = 300 		//Desert Road Y

var sunX = 400; 		//Sun x
var sunY = 0;			//Sun Y

var xBuilding = [];		//X of each building
xBuilding[0] = 0;		//First building at x=0

var barnX = 200; 		//Barn X
var barnY = 150;		//Barn Y

var barnRoadX = 0; 		//Barn Road X
var barnRoadY = 300;	//Barn Road Y

var greenHillsX = 0; 	//Green Hills X
var greenHillsY = 335;	//Green Hills Y

var fencesX = 0; 		//Fences X
var fencesY = 290;		//Fences Y

var hayX = 100;			//Hay X
var hayY = 230;			//Hay Y

var sunsX = 0;			//Countryside Sun X
var sunsY = 0;			//Countryside Sun Y

var mountainsGX = 0;	//Mountains X
var mountainsGY = 250;	//Mountains Y

var hillsX = 0; 		//Hills X
var hillsY = 370;		//Hills Y

var w = [];				//Width of Each Tower
var wwe = [];			//Effects Ground Y of each building
var wew= [];			//Height of each building

function setup()
{
	createCanvas(400,400);
	background(100,150,200);
	for(let i=0; i<400; i++)
	{
		c[i]=(random(0,255));	//400 different values between 0,255 for colors
	}

	for(let i=0; i<=(15*30); i+=15)	//for each person
	{
		ph[i]=random(-0.5,0.5);	//randomizes each persons height 
	}
	
	for(let i=0; i<100; i++)	//for each building
	{

		if(i>0)		//if it's not the first building (xBuilding of [0-1] does not exist)
		{
			xBuilding[i] = xBuilding[i-1]+w[i-1]/4;		//starts when the last one ends
		}

		w[i] = random(70, 100); //randomizes the width
		
		wwe[i] = random(0,20);	//randoimizes where it's ground y value is

		if(xBuilding[i]>(300-w[i]/2) && xBuilding[i]<(305+w[i]/4)) //if the building is at the end of the road
		{
			wwe[i]=0;	//Stops building from being "built" on road
		}

		wew[i] = random(-230, -260);	//randomizes height
	}
}

function draw()
{
	if(scene==1) //plays scene one first
	{
		scene1();
	}

	if(scene==2)	//plays scene two second
	{
		scene2();
	}

	if(scene==3)	//so on
	{
		scene3();
	}

	if(scene==4)
	{
		scene4();
	}

	if(scene==5)
	{
		scene5();
	}

	if(scene==6)
	{
		scene6();
	}

	if(scene==7)
	{
		scene7();
	}

	if(scene==8)
	{
		scene8();
	}

	if(scene==9)
	{
		scene9();
	}

	if(scene==10)
	{
		scene10();
	}
	
	if(scene==11)
	{
		scene11();
	}
	
	if(scene==12)
	{
		scene12();
	}
}

function scene1()
{
	background(126, 253, 246);

	mountainsG(mountainsGX, mountainsGY);
	hills(hillsX, hillsY);
	roads1(0, 300);

	sby=400; //bus drives on bottom of screen
	
	if(s<1)	
	{
		sbx+=3;	//bus drives forward
	}
	
	if(s==1)
	{
		sbx+=3*((350-sbx)/150);	//bus decelerates
	}

	if(s==3)
	{
		sbx += 3 * ((sbx-345)/100); //bus accelerates away
	}

	if(s==0 && sbx>200)
	{
		s=1;	//starts bus's deceleration
	}

	if(s==1 && sbx>347)
	{
		s=2;	//opens doors so people can leave
	}

	if(s!=2)	
	{
		SideBus(sbx,sby,3/4,1);	//draws bus doors closed
	}
	if(s==2)
	{
		SideBus(sbx,sby,3/4,3);	//draws bus doors opened
	}
	
	for(let i=0; i<=(15*4); i+=15)	//for each person
	{
		if(s==0)	
		{
			px[i]=300-i*1.3;	//start at their spot in line
			py[i]=400;			//standing on bottom of canvas
		}
		if(s==2)
		{
			px[i]+=0.3;			//walk towards doors
		}
		if(py[i]==400)			
		{
			SidePassenger(px[i],py[i], -2-ph[i], c[i],c[i+1],c[i+2], c[i+3],c[i+4],c[i+5], c[i+6],c[i+7],c[i+8], c[i+9],c[i+10],c[i+11]);	//draws person facing right
		}
		if(px[i]>310 && py[i]==400)
		{
			py[i]=380;		//person steps on bus
		}
		if(py[i]==380)
		{
			px[i]-=0.6;		//person walks back to their seat
			SidePassenger(px[i],py[i], 2+ph[i], c[i],c[i+1],c[i+2], c[i+3],c[i+4],c[i+5], c[i+6],c[i+7],c[i+8], c[i+9],c[i+10],c[i+11]);	//draws person facing left
		}
		if(py[i]==380 && px[i]<303)
		{
			py[i]=2000;		//teleports person off screen once they're in the bus
		}
		if(py[60]==2000 && s==2)
		{
			s=3;			//bus starts moving once everyone is on
		}
	}

	if(sbx>800)
	{
		scene=2;			//end scene one start scene 2
		sbx=0;				//puts bus back to the left for scene 4
		s=0;
	}
}

function scene2()
{
	background(c[133],c[313],c[316]); //random background color
	road(200,200,0);	
	tb+=3;				//moves bus up road
	if(tb>220)			//if bus drives past the screen
	{
		scene=3;		//end scene 2 start scene 3
		tb=-280;		//moves bus back to beginning of road for scene 3
	}
}

function scene3()		//same mechanics as scene 2
{	
	background(c[189],c[239],c[172]);
	road(150,300,46);
	tb+=3;
	if(tb>180)
	{
		scene=4;
		tb=-355;
	}
}

function scene4()		//same mechanics as scene 1
{
	background(66, 235, 235);
	
	desert(desertX, desertY);
	desertground(desertGroundX, desertGroundY);
	roads(roadsX, roadsY);
	sun(sunX, sunY);

	
	sby=400;
	
	if(s<1)
	{
		sbx+=3;
	}
	
	if(s==1)
	{
		sbx+=3*((250-sbx)/150);
	}

	if(s==3)
	{
		sbx += 3 * ((sbx-245)/100);
	}

	if(s==0 && sbx>100)
	{
		s=1;
	}

	if(s==1 && sbx>247)
	{
		s=2;
	}

	if(s!=2)
	{
		SideBus(sbx,sby,3/4,1);
	}
	if(s==2)
	{
		SideBus(sbx,sby,3/4,3);
	}
	
	for(let i=75; i<=(15*17); i+=15)
	{
		if(s==0)
		{
			px[i]=275-i;
			py[i]=400;
		}
		if(s==2)
		{
			px[i]+=0.4;
		}
		if(py[i]==400)
		{
			SidePassenger(px[i],py[i], -(2+ph[i]), c[i],c[i+1],c[i+2], c[i+3],c[i+4],c[i+5], c[i+6],c[i+7],c[i+8], c[i+9],c[i+10],c[i+11]);
		}
		if(px[i]>210 && py[i]==400)
		{
			py[i]=380;
		}
		if(py[i]==380)
		{
			px[i]-=0.7;
			SidePassenger(px[i],py[i], 2+ph[i], c[i],c[i+1],c[i+2], c[i+3],c[i+4],c[i+5], c[i+6],c[i+7],c[i+8], c[i+9],c[i+10],c[i+11]);
		}
		if(py[i]==380 && px[i]<203)
		{
			py[i]=2000;
		}
		if(py[255]==2000 && s==2)
		{
			s=3;
		}
	}
	
	if(sbx>800)
	{
		scene=5;
		sbx=-100;
		s=0;
	}
}

function scene5() 	//same mechanics as scene 2
{
	background(c[203],c[98],c[232]);
	road(179,144,191);
	tb+=3;
	if(tb>190)
	{
		scene=6;
		tb=-160;
	}
}

function scene6()	//same mechanics as scene 2
{
	background(c[115],c[157],c[385]);
	road(247,129,182);
	tb+=3;
	if(tb>300)
	{
		scene=7;
		tb=-360;
	}
}

function scene7()	//same mechanics as scene 1
{
	background(66, 235, 235);

	suns(sunsX, sunsY);

	greenHills(greenHillsX, greenHillsY);

	barn(barnX, barnY);

	hay(hayX, hayY);

	fences(fencesX, fencesY);

	barnRoad(barnRoadX, barnRoadY);
	
	sby=400;
	
	if(s<1)
	{
		sbx+=3;
	}
	
	if(s==1)
	{
		sbx+=3*((300-sbx)/150);
	}

	if(s==3)
	{
		sbx += 3 * ((sbx-295)/100);
	}

	if(s==0 && sbx>150)
	{
		s=1;
	}

	if(s==1 && sbx>297)
	{
		s=2;
	}

	if(s!=2)
	{
		SideBus(sbx,sby,3/4,1);
	}
	if(s==2)
	{
		SideBus(sbx,sby,3/4,3);
	}
	
	for(let i=270; i<=(300); i+=15)
	{
		if(s==0)
		{
			px[i]=240-3*(i-270);
			py[i]=400;
		}
		if(s==2)
		{
			px[i]+=0.3;
		}
		if(py[i]==400)
		{
			SidePassenger(px[i],py[i], -(2+ph[i]), c[i],c[i+1],c[i+2], c[i+3],c[i+4],c[i+5], c[i+6],c[i+7],c[i+8], c[i+9],c[i+10],c[i+11]);
		}
		if(px[i]>260 && py[i]==400)
		{
			py[i]=380;
		}
		if(py[i]==380)
		{
			px[i]-=0.6;
			SidePassenger(px[i],py[i], 2+ph[i], c[i],c[i+1],c[i+2], c[i+3],c[i+4],c[i+5], c[i+6],c[i+7],c[i+8], c[i+9],c[i+10],c[i+11]);
		}
		if(py[i]==380 && px[i]<253)
		{
			py[i]=2000;
		}
		if(py[300]==2000 && s==2)
		{
			s=3;
		}
	}
	
	if(sbx>800)
	{
		scene=8;
		sbx=-100;
		s=0;
	}
}

function scene8()		//same mechanics as scene 2
{
	background(c[141],c[76],c[208]);
	road(271,235,275);
	tb+=3;
	if(tb>200)
	{
		scene=9;
		tb=-280;
	}
}

function scene9()		//same mechanics as scene 2
{
	background(c[1],c[200],c[69]);
	road(140,208,191);
	tb+=3;
	if(tb>270)
	{
		scene=10;
		tb=-135;
	}
}

function scene10()		//same mechanics as scene 2
{
	background(c[248],c[3],c[82]);
	road(112,298,261);
	tb+=3;
	if(tb>340)
	{
		scene=11;
	}
}

function scene11()		
{
	background(66, 235, 235);

	for(let i=0; i<=(rtcy3-rtcy1); i++) //for every y value of the road
	{
		rtcx1aey[i]=rtcx1+(i*(rtcx4-rtcx1)/(rtcy3-rtcy1));	//uses the slope of the road to establish what x value the left side of the road is at each y value.
		rtcx2aey[i]=rtcx2+(i*(rtcx3-rtcx2)/(rtcy3-rtcy1));	//same thing but for the right side
	}

	fill(126,200,80);
	rect(0,250,400,200);		//grass foreground
	
	RoadToCity(rtcx1, rtcx2, rtcy1, rtcx3, rtcx4, rtcy3);
	
	bbbby+=1;	//makes bus move up 1 each frame
	rtch-=1;	//used to identify what x value the road is at each y

	bbbbx = rtcx1aey[rtch]+((2/3)*(rtcx2aey[rtch]-rtcx1aey[rtch]));		//bus moves left with slope of road

	for(let i=0; i<100; i++) //for every building
	{	
		building(4,xBuilding[i], height-150+wwe[i], w[i], wew[i], c[i+6],c[2*i],c[i+20]);	
	}

	BackBus(bbbbx, 420-bbbby);	

	if(rtch<1)		//if bus gets to the top of the road
	{
		scene=12;	//ends scene 11 begins scene 12
	}

	

}

function scene12()	//same mechanics as scene 1 except the people walk out of the bus instead of in
{
	background(66, 235, 235);
	for(let i=0; i<100; i++)
	{	
		if(i>0)
		{
			xBuilding[i] = xBuilding[i-1]+w[i-1];
		}
		building(1,xBuilding[i], 300, w[i], wew[i], c[i+6],c[2*i],c[i+20]);	
	}

	roads(roadsX, roadsY);

	sby=400;

	if(s<1)
	{
		sbx+=3;
	}
	
	if(s==1)
	{
		sbx+=3*((300-sbx)/150);
	}

	if(s==3)
	{
		sbx += 3 * ((sbx-295)/100);
	}

	if(s==0 && sbx>150)
	{
		s=1;
	}

	if(s==1 && sbx>297)
	{
		s=2;
	}

	if(s!=2)
	{
		SideBus(sbx,sby,3/4,1);
	}
	if(s==2)
	{
		SideBus(sbx,sby,3/4,3);
	}
	
	for(let i=0; i<=(300); i+=15)
	{
		if(s==0)
		{
			px[i]=500+1.3*i
			py[i]=380;
		}
		if(s==2 && px[i]>450)
		{
			px[i]-=0.3;
		}
		if(s==2 && px[i]<450)
		{
			px[i]+=0.3;
		}

		if(px[i]<480 && px[i]>450)
		{
			px[i]=263;
		}
		
		if(px[i]>267 && px[i]<300)
		{
			py[i]=400;
		}

		if(py[i]==400)
		{

			px[i]-=0.8;
			
			SidePassenger(px[i],py[i], (2+ph[i]), c[i],c[i+1],c[i+2], c[i+3],c[i+4],c[i+5], c[i+6],c[i+7],c[i+8], c[i+9],c[i+10],c[i+11]);
		}
		
		if(py[i]==380)
		{
			SidePassenger(px[i],py[i], -(2+ph[i]), c[i],c[i+1],c[i+2], c[i+3],c[i+4],c[i+5], c[i+6],c[i+7],c[i+8], c[i+9],c[i+10],c[i+11]);
		}
		if(px[300]<200 && s==2)
		{
			s=3;
		}
	}
}

function BackBus(bx, by)
{
	push();

	strokeWeight(2);
	stroke(60);

	translate(bx,by);	
	scale((rtch)/((rtcy3-rtcy1)));	//shinks bus as it drives forward 
	
	fill(255)
	rect(-25,0, 100,-130, 15);		//main white frame of bus
	
	noStroke();

	fill(70);	
	rect(-27,0,104,-20, 5);			//gray line along bottom
	
	rect(-10,-40, 70,-2);			//small lines between lights
	rect(-10,-30, 70,-2);

	fill(255,0,0);
	ellipse(-18,-40,5);				//red lights
	ellipse(68,-40,5);

	fill(252,106,3);
	ellipse(-18,-30,5);				//orange lights
	ellipse(68,-30,5);

	fill(63,117,162);
	rect(-20,-60, 90,-65, 15);		//window

	pop();
}

function TopBus(y)
{
	fill(255);
	rect(-10,y, 5, 20);				//white frame

	fill(0);
	rect(-8.5,y+5, 2,2);			//black things on top idk what they are i just have a strong feeling that it's a thing on a bus
	rect(-8.5,y+12,2,2);
}

function SideBus(x,y,s,d)
{
	push();
	
	noStroke();
	translate(x,y);
	scale(s,1.2*s);

	fill(255);								//side of the bus, white
	rect(-10,-25, -300,-100, 10);
	triangle(-10,-35, -5,-35, -10,-115);
	
	fill(70);								//bottom gray across bus
	rect(0,-15,-315,-20, 4);
	
	fill(255);								//surrounding wheel wells
	arc(-90,-15, 45,45, PI,0);
	arc(-250,-15, 45,45, PI,0);

	fill(0);
	arc(-90,-15, 38,38, PI,0);				//wheel wells
	arc(-250,-15, 38,38, PI,0);

	fill(40);								//tire
	ellipse(-90,-15,30);
	ellipse(-250,-15,30);

	fill(150);								//wheel
	ellipse(-90,-15,20);
	ellipse(-250,-15,20);

	push();									//dots on wheel
		translate(-90,-15);					//translates grid (pushed) to center of the wheel
		rotate(x/6);						//rotates dots around center wheel as bus moves

		for(let i=0; i<8; i++)					//draws dot 8 times in radial symmetry				
		{
			fill(0);					
			ellipse(0,8,2);
			rotate(2*PI/8);
		}
		ellipse(0,0,2);						//dot in center of wheel
	pop();
	
	push();									//same as above but for other wheel
		translate(-250,-15);	
		rotate(x/6);
	
		for(i=0; i<8; i++)
		{
			fill(0);
			ellipse(0,8,2);
			rotate(2*PI/8);
		}
		ellipse(0,0,2);
	pop();

	fill(10);								//things on ceiling that I think are on a bus so I drew them
	rect(-80,-125,-40,-3,2);
	rect(-200,-125,-40,-3,2);

	fill(100);								//mirror
	rect(-30,-105,3,-10);
	rect(-30,-109,27,-2);
	rect(-3,-115,2,20);

	fill(0);								//light case
	rect(-7,-40,3,-16);

	fill(252,174,30);						//light
	arc(-5,-48, 10,10, 19*PI/12, 5*PI/12, CHORD);

	strokeWeight(2);
	stroke(60);
	fill(63,117,162);

	rect(-245,-70,-60,-50,10);				//windows
	rect(-65,-70,-42,-50);
	rect(-107,-70,-42,-50);
	rect(-149,-70,-42,-50);
	rect(-221,-70,-42,-50);
	
	if(d==1)
	{
		rect(-35,-16,-30,-104);					//doors
		line(-50,-16, -50,-120);
	}

	if(d>1)
	{	
		fill(100);
		rect(-35,-16,-30,-104);	

		fill(63,117,162);
		quad(-35,-16, -35,-120, -30,-122, -30,-14);
		quad(-65,-16, -65,-120, -70,-122, -70,-14);
	}

	rect(-191,-16,-30,-104);				//other doors
	line(-206,-16, -206,-120);

	quad(-30,-120, -11.3,-120, -8,-70, -30, -70);	//front windshield

	noStroke();								//ledge at base of doors
	fill(200);
	rect(-34,-15, -32,-3);
	rect(-190,-15, -32,-3);

	pop();
}

function SidePassenger(x,y,s, r1,g1,b1, r2,g2,b2, r3,g3,b3, r4,g4,b4)
{
	push();

	translate(x,y-abs(s)*17);
	scale(s,abs(s));
	noStroke();
	
	//pants	
	fill(r1,g1,b1);			
	rect(0,0,3.48,15);
	ellipse(3.2,5/2,2.5,5);

	
	//shirt
	fill(r2,g2,b2);
	rect(0,0,3.714,-6);




	//arm

	translate(x,y);				
	push();
		translate(-x+3.3,-y-1.7);
		rotate(PI/30);
		fill(r3,g3,b3)
		ellipse(0, 0, 1.8, 6);

	pop();
	translate(-x,-y);
	

	//pocket

	fill(r1,g1,b1);	
	rect(1.6, 0.5, 2.3, 2);


	//sleeve and more shirt
	fill(r2,g2,b2);
	rect(2.1,-3.4,2.2,-1.5);
	triangle(3.6,-4.9, 3.6,-8.6, 4.3,-4.9);

	rect(0,-5.9,3.6,-2.6);
	triangle(3.7,-8.4, 2.2,-11, 2.2,-8.4)
	rect(0,-8.4, 2.3,-2.6); 


	//head
	fill(r3,g3,b3);
	quad(0,-11, 0.4,-12.3, 2.3,-12.9, 2.3, -11);
	ellipse(1.15,-14.3,4,4.4);

	//hat
	fill(r4/2,g4/2,r4/2);
	rect(-1,-15,4.3,-2);
	ellipse(1.2,-15,6.24,0.3);

	//shoes
	rect(0,15,3.48,2);
	ellipse(0,16,4,2);
	rect(0,15.8, -2,1.2, 2);

	pop();
	
}

function road(x,y,r)
{
	push();
	noStroke();

	translate(x,y);
	rotate(r);
	
	fill(100);
	rect(-15,-600, 30, 1200); //road

	for(let i=0; i<1200; i++) // for each slice perpendicular to the road
	{
		fill(255);
		if(i%29==0)
		{
			rect(-0.5,-600+i,1,10);	//draws a little white rectangle in the middle of the road
		}
	}

	TopBus(tb)

	pop();
}

function RoadToCity(x1, x2, y1, x3, x4, y3)
{
	fill(100);
	quad(x1,y1, x2,y1, x3,y3, x4, y3); 	//road

	let jfk=0;		//used to identify how wide the road is at each y
	let kfj=0; 		//used to know how many times the while loop has looped
	let jfj;		//what increment jfk is increasing at

	while(jfk<y3-y1)
	{
		jfj=int((rtcx2aey[jfk]-rtcx1aey[jfk])/5);	//integer value of how wide the road is, allows jfk to increase proportionally to how wide the road is
		
		if(jfj>1)
		{
			jfk+=jfj; //jfk increases by jfj
		}

		else
		{
			jfk+=1;	//ensures that while loop finishes
		}

		kfj+=1;		//keeps track of how many times it's been looped

		fill(255);

		if(kfj%3==0)	//every three increments of jfk
		{
			quad(rtcx1aey[jfk]+9*(rtcx2aey[jfk]-rtcx1aey[jfk])/20, y1+jfk,   rtcx1aey[jfk]+11*(rtcx2aey[jfk]-rtcx1aey[jfk])/20, y1+jfk, rtcx1aey[jfk-jfj]+11*(rtcx2aey[jfk-jfj]-rtcx1aey[jfk-jfj])/20, y1+jfk-jfj,  rtcx1aey[jfk-jfj]+9*(rtcx2aey[jfk-jfj]-rtcx1aey[jfk-jfj])/20, y1+jfk-jfj);	//draws white rectangles in the middle of the road but parrelel to the sides of the road to maintain perspective.
		}

		noStroke();
	}
	
		
}

function building(s,x, y, w, h, r, g, b){

    push();

	  translate(x, y);
	  scale(1/s);
      noStroke();
      fill(r,g,b);
      rect(0, 0, w, h);

      fill(0, 11, 0);
      
      
      rect(10, -10, w/5, h/6);

      rect(10, h+150, w/5, h/6);

      rect(10, h+70, w/5, h/6);

      rect(55, -10, w/5, h/6);

      rect(55, h+150, w/5, h/6);

      rect(55, h+70, w/5, h/6);



    pop();

}

function desert(x, y){

	push(); 
		  noStroke();
		  translate(x,y);
		  //strokeWeight(5);
		  point(150, 20);
		  point(100, -30);
		  point(50, -80);
		  point(0, 0);
		  
		  //strokeWeight(0.3);
		 
		  fill(255, 200, 1);
		  beginShape(); 
		  curveVertex(150, 20);
		  curveVertex(150, 20);
		  curveVertex(100,-30);
		  curveVertex(50, -80);
		  curveVertex(0, 0);
		  curveVertex(0, 0);
		  endShape();
  
	pop();
	
	push();
		  noStroke();
		  translate(x,y);
		  strokeWeight(5);
		  point(300, 0);
		  point(250, -10);
		  point(200, -40);
		  point(150, 0);
		  
		  strokeWeight(0.3);
		 
		  fill(255, 200, 1);
		  beginShape(); 
		  curveVertex(300, 0);
		  curveVertex(300, 0);
		  curveVertex(250,-10);
		  curveVertex(200, -40);
		  curveVertex(130, 0);
		  curveVertex(130, 0);
		  endShape();
	pop();
  
  
	push();
		  noStroke();
		  translate(x,y);
		  strokeWeight(5);
		  point(450, 0);
		  point(400, -30);
		  point(350, -80);
		  point(300, 0);
		  
		  strokeWeight(0.3);
		 
		  fill(255, 200, 1);
		  beginShape(); 
		  curveVertex(450, 0);
		  curveVertex(450, 0);
		  curveVertex(400,-30);
		  curveVertex(350, -80);
		  curveVertex(300, 0);
		  curveVertex(300, 0);
		  endShape();
	pop();
  
  
  
}
  
function desertground(x, y, scal)
  {
	push(); 
		
		noStroke();
		translate(x, y);
		scale(scal);
		fill(255, 217, 28);
		rect(0, -100, width, height-500);
  
		//cactus 1
		stroke(0.1);
		fill(0, 150, 0);
		ellipse(40, -190, 15, 40);
		ellipse(50, -176, 30, 15);
		ellipse(60, -185, 15, 100);
		ellipse(75, -166, 30, 15);
		ellipse(85, -180, 15, 40);
  
  
		//cactus 2
		stroke(0.1);
		fill(0, 150, 0);
		ellipse(240, -190, 15, 40);
		ellipse(250, -176, 30, 15);
		ellipse(260, -185, 15, 100);
		ellipse(275, -166, 30, 15);
		ellipse(285, -180, 15, 40);
  
  
  pop();
  
  
}
  
function roads(x, y){
  
	push(); 
		
		translate(x, y);
		noStroke();
		fill(130, 117, 130);
		rect(0, 0, width, 100)
		
		//White spots on the road
		fill(255, 255, 255);
		rect(30, 60, 60, -20);
		rect(180, 60, 60, -20);
		rect(330, 60, 60, -20);
  
  
	pop(); 
  
  
}
  
function sun(x, y){
  
	push(); 
  
		noStroke();
		translate(x, y);
		fill(255, 255, 0);
		ellipse(-10, 10, 70, 70);
  
	pop();
}

function barn(x, y){

	push(); 
  
		translate(x, y);
		fill(255, 0, 0); 
		triangle(-40, 0, 50, -100, 140, 0);//Top head 
		rect(-40, 0, 180, 140);
  
  
		//windows 
		fill(255, 255, 255, 10);
		rect(23, -55, 55, 45);
		fill(66, 235, 235);
		rect(23, -55, 27.5, 22.5);
		rect(23, -32.5, 27.5, 22.5);
		rect(50.5, -32.5, 27.5, 22.5);
		rect(50.5, -55, 27.5, 22.5);
  
  
		//gates 
		fill(255, 255, 255);
		rect(-20, 20, 70, 120);
		rect(50, 20, 70, 120);
  
		line(-20, 20, 120, 140);
		line(120, 20, -20, 140);
  
  
	pop();
}
  
  
function barnRoad(x, y)
  {
  
	  push(); 
			noStroke(); 
			translate(x, y); 
			fill(130, 117, 130);
			rect(0, 30, width, 100); 
  
			//whitespots 
			fill(255, 255, 255); 
			rect(20, 55, 60, 20);
			rect(130, 55, 60, 20);
			rect(240, 55, 60, 20);
			rect(350, 55, 60, 20);
  
	  pop();
}
  
function fences(x, y){

    push(); 

        noStroke();
        translate(x,y); 
        fill(110, 78, 46);
         
        ellipse(0, 0, 10, 80);
        ellipse(35, -10, 80, 10);
        ellipse(35, 20, 80, 10);
        ellipse(75, 0, 10, 80);
        
        ellipse(110, -10, 80, 10);
        ellipse(110, 20, 80, 10);
        ellipse(150, 0, 10, 80);

        ellipse(185, -10, 80, 10);
        ellipse(185, 20, 80, 10);
        ellipse(225, 0, 10, 80);

        ellipse(260, -10, 80, 10);
        ellipse(260, 20, 80, 10);
        ellipse(300, 0, 10, 80);

        ellipse(335, -10, 80, 10);
        ellipse(335, 20, 80, 10);
        ellipse(375, 0, 10, 80);

        ellipse(410, -10, 80, 10);
        ellipse(410, 20, 80, 10);

    pop();
}
  
function greenHills(x, y){
  
	  push(); 
  
		  translate(x, y); 
  
		  fill(0, 200, 0); 
  
		  ellipse(270, 0, 550, 350);
  
  
	  pop();
  
}
  
  
function hay(x, y){
  
	  push(); 
  
			translate(x, y); 
			fill(225, 198, 0);
			rect(0, 0, 40, 30);
			rect(0, -30, 40, 30);
			
			//redline on hay 
			fill(255, 0, 0);
			rect(10, 0, 5, 30);
			rect(25, 0, 5, 30);
  
			rect(10, -30, 5, 30);
			rect(25, -30, 5, 30);
  
	  pop();
  
}
  
function suns(x, y){
  
	  push(); 
  
			translate(x, y); 
			fill(255, 247, 1);
  
			ellipse(0, 0, 70, 70);
  
  
	  pop();
  
  
  
  
}

function mountainsG(x, y){
	push(); 
  
		noStroke();
		translate(x, y); 
		fill(47, 112, 130);
		triangle(-10, 0, 50, -150, 150, 0);
  
		triangle(80, 0, 150, -200, 300, 0);
  
		triangle(230, 0, 350, -200, 450, 0);
  
  
	pop();
  
}  
  
function hills(x, y){
  
	  push(); 
  
		  noStroke();
		  translate(x, y); 
		  fill(0, 150, 0);
		  ellipse(130, 0, 400, 350)
  
		  fill(0, 200, 0);
		  ellipse(350, 20, 600, 350);
  
		  fill(0, 255, 0);
		  ellipse(0, 0, 900, 200);
  
	  pop();
  
  
}
   
function roads1(x, y){
  
	push(); 
  
	  noStroke();
	  translate(x, y); 
	  fill(130, 117, 130); 
	  rect(0, 20, 400, 150);
  
	  //White Shades 
	  fill(255, 255, 255);
  
	  for(let i = 40; i <= 140; i+=80){
  
	  rect(i*2, 50, 70, 20);
	  }
  
	pop();
  
}
  