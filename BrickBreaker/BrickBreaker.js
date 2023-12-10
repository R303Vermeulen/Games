let WhichBackgroundDoYouWant = 2;

let bx = [];
let by = [];
let bn = 50;
let bd = [];
let bsm = [];

bx[0]=250;
by[0]=400;


let rx = [];
let ry = [];
let rc = [];
let rh = [];

let t = 0;
let n = 0;
let fd = 0;
let l = 1;

let frametimer = 0;

let ccc = [];	
let xxx = [];	
let yyy = [];	
let sss = [];
let spsp = [];	

let ttt = [];
let nnn = 10;

var flucc = [];
var cs = 5;

flucc[1] = 255;
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


function setup()
{
	createCanvas(500,500);
	for(let j=0; j<4000; j+=1)
	{
		rh[j]=500;
		rc[j]=random(2,4);
		if(rc[j]<3)
		{
			rc[j]=0;
		}
		else
		{
			rc[j]=1;
		}
	}

	for(let i=0; i<100; i++)
	{
		let j=i+1000;

		ccc[i] = random(150,255);
		ccc[j] = random(150,255);
		xxx[i] = random(0,500);
		yyy[i] = random(-100,600);
		sss[i] = random(100,200);
		spsp[i]= random(5,20);
	}

	for(let i=0; i<nnn; i++)	
	{	
		for(let j=0; j<3.3*nnn; j++)
		{
			let q=i+j*1000;			//nested for loop, combines two variables into one unique value
			ttt[q]=random(0,6);		//assigns ranom color type to each structure
			ttt[q]-=ttt[q]%1;		//changes to integer
		}
	}
}

function draw()
{
	
	frametimer+=1;
	if(frametimer%2==0)
	{
		if(WhichBackgroundDoYouWant==1)
		{behindtheaction1();}

		if(WhichBackgroundDoYouWant==2)
		{behindtheraction2();}

		if(WhichBackgroundDoYouWant==3)
		{wall(5);}
		
		aimhelp();

		ballsfiring();
	
		brickbuild();
	
		bottomrowscore();

		deathscreen();
	}	
}

function aimhelp()
{
	if(t==0)
	{
		for(let i=0; i<5; i++)
		{
			push();
				translate(bx[0]+25*i*cos(atan2(mouseY-400,mouseX-bx[0])),400+25*i*sin(atan2(mouseY-400,mouseX-bx[0])));
				fill(0);
				ellipse(0,0,10);
			pop();
		}	
	}
}

function ballsfiring()
{
	if(t==1)
	{
		t=0;
		for(let i=0; i<=n; i++)
		{
			if(i>0)
			{
				bx[i] += (25*cos(bd[i]));
				by[i] += (25*sin(bd[i]));
			}

			if(by[i]<370)
			{
				bsm[i]=1;
			}

			if(bx[i]>489) 
			{
				bd[i]=(PI-bd[i]);
				bx[i]=489;
			}
			if(bx[i]<11)
			{
				bd[i]=(PI-bd[i]);
				bx[i]=11;
			}

			if(by[i]<11)
			{
				bd[i]=(-bd[i]);
			}

			for(let j=0; j<(10*l); j+=1)
			{
				if(bx[i]>(rx[j]-6) && bx[i]<(rx[j]+89) && by[i]>(ry[j]+34) && by[i]<(ry[j]+89))
				{
					if(by[i] < ry[j]+60)	//quadrants 1&2
					{
						if(bx[i] < (rx[j]+42))	//quadrant 1
						{
							if((bx[i]-rx[j]) > (by[i]-ry[j]))
							{
								by[i] = ry[j]+34;
								bd[i] = (-bd[i]);
								rh[j] -= 1;
							}

							else if((bx[i]-rx[j]) < (by[i]-ry[j]))
							{
								bx[i] = rx[j]-6;
								bd[i] = (PI-bd[i]);
								rh[j] -= 1;
							}

							else
							{
								bx[i] = rx[j]-6;
								by[i] = ry[j]+34;
								bd[i] += PI;
								rh[j] -= 1;
							}
						}

						else	//quadrant 2
						{	
							if((rx[j]-bx[i]) > (by[i]-ry[j]))
							{
								by[i] = ry[j]+34;
								bd[i] = (-bd[i]);
								rh[j] -= 1;
							}
	
							else if((rx[j]-bx[i]) < (by[i]-ry[j]))
							{
								bx[i] = rx[j]+89;
								bd[i] = (PI-bd[i]);
								rh[j] -= 1;
							}
	
							else
							{
								bx[i] = rx[j]+89;
								by[i] = ry[j]+34;
								bd[i] += PI
								rh[j] -= 1;
							}
						}
					}
					
					else	//quadrants 3&4
					{
						if(bx[i] > (rx[j]+42))	//quadrant 3
						{
							if((rx[j]-bx[i]) > (ry[j]-by[i]))
							{
								by[i] = ry[j]+86;
								bd[i] = (-bd[i]);
								rh[j] -= 1;
							}

							else if((rx[j]-bx[i]) < (ry[j]-by[i]))
							{
								bx[i] = rx[j]+89;
								bd[i] = (PI-bd[i]);
								rh[j] -= 1;
							}

							else
							{
								bx[i] = rx[j]+89;
								by[i] = ry[j]+86;
								bd[i] += PI
								rh[j] -= 1;
							}
						}

						else		//quadrant 4
						{
							if((bx[i]-rx[j]) > (ry[j]-by[i]))
							{
								by[i] = ry[j]+86;
								bd[i] = (-bd[i]);
								rh[j] -= 1;
							}

							else if((bx[i]-rx[j]) < (ry[j]-by[i]))
							{
								bx[i] = rx[j]-6;
								bd[i] = (PI-bd[i]);
								rh[j] -= 1;
							}

							else
							{
								bx[i] = rx[j]-6;
								by[i] = ry[j]+86;
								bd[i] += PI;
								rh[j] -= 1;
							}
						}
					}
				}

				if(rh[j]<=0)
				{
					ry[j]=1000;
				}
			}

			if(by[i]>394  && bsm[i]==1)
			{
				if(fd==0)
				{
					fd=1;
					bx[0]=bx[i];
					if(bx[0]>490)
					{
						bd[0]=490;
					}
					if(bx[0]<10)
					{
						bd[0]=10;
					}
				}
				else
				{
					by[i]=500;
				}
			}
			
			
			if(by[i]<400)
			{
				t=1;
			}


			if(i>0)
			{
				push();
					translate(bx[i],by[i]);
					fill(0);
					ellipse(0,0,10);
				pop();
			}
			
		}

		if(t==0)
		{
			l+=1;
		}
		
		bn=l;

		if(n<bn)
		{
			n+=1;
		}
	}
}

function brickbuild()
{
	for(let j=0; j<(10*l); j+=1)
	{	
		if(rc[j]==1)
		{
			rx[j]=(j%10)*500/6;
			ry[j]=l*40-((j-(j%10))*4+80);
			ry[j]+=40;
		}

		if(ry[j]==0 && rh[j]==500)
		{
			rh[j]=l;
		}

		if(rh[j]<=0)
		{
			ry[j]=1000;
		}

		if(ry[j]>300 && ry[j]<1000 && rx[j]<500)
		{
			t=2;
		}
				
		fill(255);
		rect(rx[j],ry[j]+40,500/6,40);

		fill(0);
		textSize(10);
		text(rh[j],rx[j]+40,ry[j]+60);
	}
}

function bottomrowscore()
{
	fill(200,100,100);
	rect(0,400,550,150);

	fill(0);
	textSize(35)
	text(l,50,460);

	textSize(20);
	text("Score",35,480);
}

function deathscreen()
{
	if(t==2)
	{
		
		fill(255,0,0,75);
		rect(0,0,500,400);
		
		fill(0);
		text("You Died",185,440);
		textSize(25);
		text("Refresh To Restart",150,480);
	}
}

function behindtheaction1()
{
	background(25,200,200);

	for(let i=0; i<100; i++)
	{
		let j = i+1000;
		fill(ccc[i],ccc[j],ccc[j]);
		ellipse(xxx[i],yyy[i],sss[i]);

		yyy[i]+=spsp[i];

		if(yyy[i]>500)
		{
			yyy[i]=0-2*sss[i];
			spsp[i]=random(5,20);
			sss[i]=random(100,200);
		}

	}
	
	fill(ccc);
	ellipse(xxx,yyy,sss);
	
}

function behindtheraction2()
{	
	for(let i=0; i<=12; i++)
	{
		if(flucc[i]%1==0)
		{
			flucc[i] -= (cs);
		}

		else
		{
			flucc[i] += (cs);
		}

		if(flucc[i]<1)
		{
			flucc[i] = 0.5;
		}

		if(flucc[i]>255)
		{
			flucc[i] = 255;
		}
	}


	for(let i=0; i<nnn; i++)
	{	
		for(let j=0; j<3.3*nnn; j++)
		{
			q=i+j*1000;	//assigns the two variables into one number
			
			if(ttt[q]==0){fill(flucc[1],flucc[2],flucc[2])}	//fills in a color based off random variable at start assigned to each structure
			if(ttt[q]==1){fill(flucc[3],flucc[4],flucc[4])}
			if(ttt[q]==2){fill(flucc[5],flucc[6],flucc[6])}
			if(ttt[q]==3){fill(flucc[7],flucc[8],flucc[8])}
			if(ttt[q]==4){fill(flucc[9],flucc[10],flucc[10])}
			if(ttt[q]==5){fill(flucc[11],flucc[12],flucc[12])}
			
			let hs = 10;
			let hx = i*hs*15;				//assigns x value for structure, incrementing at the scale times 15
			let hy = j*hs*4.33;		//assigns y value for structure, incrementing at the scale times 4.33
			

			if(j%2==0)					//if the row number is even
			{
				hx+=hs*7.5;			//move the x by half the increment they are apart
			}

			push();
				hexy(hx,hy,hs);	//call hexy function (outer hexagons)
			pop();
		}
	}
}

function hexy(a,b,c)
{
	translate(a,b);
	scale(c);	
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

function wall(sizeofthewall)
{
	push();

	background(25,200,200);

	strokeWeight(0);
	scale(sizeofthewall)


	for(let ix=0; ix<11; ix++)			//loop for each column
	{
		if(ix%2==0) 				//even columns
		{
			for(let iy=0; iy<100; iy++) 	//loop for each circle in column
			{
				if((iy)%2==0)			//even circles are black
				{
					fill(255,0,0);
				}
				
				if((iy)%2!=0)		//odd circles are white
				{
					fill(0,255,255);
				}
			
				ellipse(ix*10,iy,10);	//circles across tha wall
			}
		}

		if(ix%2 != 0)			//odd columns
		{
			for(let iy=100; iy>-10; iy--)		//loop for each circle in column
			{
				if((iy)%2==0)			//even circles are black
				{
					fill(0,255,255);		
				}
				
				if((iy)%2!=0)			//odd circles are white
				{
					fill(255,0,0);
				}
	
				ellipse(ix*10,iy,10);		//circles across the wall
			}
		}
	}

	pop();
}

function mouseReleased()
{
	if(t==0 && (atan2(mouseY-400,mouseX-bx[0]))<(-PI/36) && (atan2(mouseY-400,mouseX-bx[0]))>(-PI+PI/36))
	{
		t=1;
		bd[0]=atan2(mouseY-400,mouseX-bx[0]);
		n=1;
		fd=0;

		for(let i=0; i<=bn; i++)
		{
			bd[i]=bd[0];
			bx[i]=bx[0];
			by[i]=400;
			bsm[i]=0;
		}
	}
}