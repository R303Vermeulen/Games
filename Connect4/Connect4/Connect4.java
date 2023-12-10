import processing.core.PApplet;
import processing.core.PImage;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class Connect4<scheme> extends PApplet
{

	public void settings() {
    size(700, 700);
	}

	public int turn = 0;  //turn the game is on, 1 is player 1 and 2 is player 2

	private boolean redraw=false;   //redraw section of draw loop
	private boolean donestart = false;  //true when start loop is done
	private boolean start= true;  //start section of draw loop
	private boolean drop = false;  //drop section of draw loop
	private boolean end = false;  //end section of draw loop
	private int count = 0;   //counts one every loop
	private int playspeed = 25; //number of count till autoplayer moves

	int p1 = 0;  //Player p1 = new Player(1,0); //player 1 type
	int p2 = 0;  //Player p2 = new Player(2,0); //player 2 type
	int winner = 0; //winner of game
	Human p1h; //Human object if p1=1
	Human p2h; //Human object if p2=1
	Rand p1r; //Rand object if p1=2
	Rand p2r; //Rand object if p2=2
	Smart p1s; //Smart object if p1=3
	Smart p2s; //Smart object if p2=3


	float colorvibe; //color theme for background

	ArrayList<Spot> spotlist = new ArrayList<Spot>(); //list of all spaces coins could be place

	ArrayList<Circle> circlist = new ArrayList<Circle>(); //list of all spaces circles could be placed

	PImage img; //grid image

	public void setup()
	{
    	background(0); //sets background to black

		img = loadImage("connect4.png"); //loads in grid image

		for(int i = 0; i<42; i++) //for each possible spot
		{
			float xinc = (float) 70; //distance between each spot (x)
			float yinc = (float) 70; //distance between each spot (y)
			float x = (float) 136 + (i % 7) * (xinc); //x pos for spot
			float y = (float) 238 + ((i - i % 7) / 7) * (yinc); //y pos for spot
			spotlist.add(new Spot(x,y,i)); //adds spot to list of spots
		}

		colorvibe = random(3); //random color theme
		colorvibe = colorvibe - (colorvibe % 1); //makes colorvibe an int
		for(int i = 0; i<1000; i++) //for each circle in background
		{
			float xx = random(0,700); //random x
			float yy = random(0,700); //random y
			float r = random(25,250); //random radius
			float c1 = random(75,225); //random color
			float c2 = random(75,225); //random color
			Circle circ = new Circle(xx,yy,r,c1,c2); //creates a circle object
			circlist.add(circ); //adds circle to circle list
		}


  	}

  	public void draw()
	{

		if (start) //start loop
		{
			textSize(30); //large text
			fill(255,255,255); //fill white
			text("Welcome to Connect 4!", 170, 50); //prints text
			rect(130,65,420,45); //prints background rectangle for text

			fill(0, 102, 153); // fill this color
			text("Click box to start playing", 155, 100); //prints text


			fill(255,255,255);
			text("Player 1 Option:", 25, 350); //prints text
			text("Player 2 Option:", 442, 350); //prints text

			fill(0,255,255);
			rect(50,400,250,50); //draws p1 human rect
			rect(400,400,250,50); //draws p2 human rect

			fill(255,255,0);
			rect(50,450,250,50); //draws p1 rand rect
			rect(400,450,250,50); //draws p2 rand rect

			fill(255,0,255);
			rect(50,500,250,50); //draws p1 smart rect
			rect(400,500,250,50); //draws p2 smart rec

			fill(0,0,0);
			textSize(25);
			text("Human", 130, 435); //prints text
			text("Human", 480, 435);
			text("Random CPU", 95, 485);
			text("Random CPU", 445, 485);
			text("Smart CPU", 115, 535);
			text("Smart CPU", 465, 535);



			if(mouseX >= 50 && mouseX <= 300 && mouseY>=400 && mouseY<=450)
			{
				p1 = 1; //player 1 is human if human box clicked
			}
			if(mouseX >= 400 && mouseX <= 650 && mouseY>=400 && mouseY<=450)
			{
				p2 = 1; //player 2 is human if human box clicked
			}

			if(mouseX >= 50 && mouseX <= 300 && mouseY>=450 && mouseY<=500)
			{
				p1 = 2;  //player 1 is rand if rand box clicked
			}
			if(mouseX >= 400 && mouseX <= 650 && mouseY>=450 && mouseY<=500)
			{
				p2 = 2;  //player 2 is rand if rand box clicked
			}

			if(mouseX >= 50 && mouseX <= 300 && mouseY>=500 && mouseY<=550)
			{
				p1 = 3; //player 1 is smart if smart box clicked
			}
			if(mouseX >= 400 && mouseX <= 650 && mouseY>=500 && mouseY<=550)
			{
				p2 = 3; //player 2 is smart if smart box clicked
			}

			if(p1>0) //if player 1 option has been picked
			{
				int inc = p1 * 50; //increment for border
				stroke(255, 255, 255);
				strokeWeight(12);
				line(55, 355 + inc, 295, 355 + inc); //draws white border around selected box
				line(295, 355 + inc, 295, 395 + inc);
				line(295, 395 + inc, 55, 395 + inc);
				line(55, 395 + inc, 55, 355 + inc);

				stroke(0, 0, 0);
				strokeWeight(3);
				line(55, 355 + inc, 295, 355 + inc); //draws black stripe in border
				line(295, 355 + inc, 295, 395 + inc);
				line(295, 395 + inc, 55, 395 + inc);
				line(55, 395 + inc, 55, 355 + inc);

			}
			if(p2>0) //if player 2 option is picked
			{
				int inc = p2 * 50; //increment for border
				stroke(255, 255, 255);
				strokeWeight(12);
				line(405, 355 + inc, 645, 355 + inc); //draws white border around selected box
				line(645, 355 + inc, 645, 395 + inc);
				line(645, 395 + inc, 405, 395 + inc);
				line(405, 395 + inc, 405, 355 + inc);

				stroke(0, 0, 0);
				strokeWeight(3);
				line(405, 355 + inc, 645, 355 + inc); //draws black stripe in border
				line(645, 355 + inc, 645, 395 + inc);
				line(645, 395 + inc, 405, 395 + inc);
				line(405, 395 + inc, 405, 355 + inc);

			}
			strokeWeight(1);

            if(mouseX >= 130 && mouseX <= 550 && 65<=mouseY && mouseY<=110 && p1>0 && p2>0) //if start button is clicked and both players have chosen an option
			{
				donestart = true; //donestart loop starts running
				redraw = true; //redraw runs once
				if(p1 == 1)
				{
					p1h = new Human(1, 1); //creates Human object if player 1 is human
				}
				if(p2 == 1)
				{
					p2h = new Human(2, 1); //creates Human object if player 2 is human
				}
				if(p1 == 2)
				{
					p1r = new Rand(1, 2); //creates Rand object if player 1 is rand
				}
				if(p2 == 2)
				{
					p2r = new Rand(2, 2);  //creates Rand object if player 2 is rand
				}
				if(p1 == 3)
				{
					p1s = new Smart(1, 3); //creates Smart object if player 1 is smart
				}
				if(p2 == 3)
				{
					p2s = new Smart(2, 3); //creates Smart object if player 2 is smart
				}
			}

			turn = 1;  //sets turn to 1, player 1 goes first

			start = false; //stops start from running every draw loop

		}

		int p1next = -1; //sets player one next move to -1 (won't play anything if next move stays -1)
		int p2next = -1; //sets player two next move to -1 (won't play anything if next move stays -1)

		if(donestart) //calls every draw loop after start is over
		{
			count += 1; //counter
			if(count>playspeed) //current player plays after playspeed amount of draw loops if cpu
			{
				if(turn==1) //if player 1 is up
				{
					if(p1==2 || p1 ==3) //if player 1 is a cpu
					{
						redraw=true; //start redraw loop (will cause cpu to turn)
						count = 0; //count restarts for next move
					}

				}
				if(turn==2) //if player 2 is up
				{
					if(p2==2 || p2 == 3) //if player 2 is a cpu
					{
						redraw=true; //start redraw loop (will cause cpu to turn)
						count = 0; //count restarts for next move
					}
				}
			}
		}

		if(redraw) //calls every time human clicks or cpu counter is greater than playspeed
		{

			background(0); //background to black

			stroke(0);
			for (Circle circ: circlist) //for each background circle
			{
				if(colorvibe<1) //if the theme is 1
				{
					fill(circ.c2, circ.c1, circ.c1); //green and blue are the same
				}
				if(colorvibe>=1 && colorvibe<2) //if the theme is 2
				{
					fill(circ.c1, circ.c2, circ.c1); //red and blue are the same
				}
				if(colorvibe>=2) //if the theme is 3
				{
					fill(circ.c1, circ.c1, circ.c2); //red and green are the same
				}
				ellipse(circ.x, circ.y, circ.r, circ.r); //draws background circle
			}

			fill(0);
			rect(100,200,492,424); //draws background square behind grid

			image(img,100,200); ///draws grid


			if(turn==1) //if player 1 is up
			{
				if(p1==2) //if player 1 is rand
				{
					int c = 0;
					while (c == 0) //loop till random finds open spot
					{
						float randonando = random(42); //random spot
						randonando -= randonando%1; //makes randonando int
						Spot spit = spotlist.get((int)randonando); //spot at randonando
						p1next = p1r.randMove(spit); //checks if spot is open, returns spot number if yes and -1 if filled
						if(p1next>-1) //if p1next is open
						{
							c = 1; //stop loop
						}
					}
				}
				if(p1==3) //if player 1 is smart
				{
					int smart = p1s.smartMove(spotlist); //finds smartest move

					if(smart>-1) //if smartMove returned viable move
					{
						p1next = smart; //next move is smartest move
					}

					else //failsafe incase smartMove cannot find a move (randomizes instead)
					{
						int c = 0;
						while (c == 0) //loop till random finds open spot
						{
							float randonando = random(42); //random spot
							randonando -= randonando%1; //makes randonando int
							Spot spit = spotlist.get((int)randonando); //spot at randonando
							p1next = p1r.randMove(spit); //checks if spot is open, returns spot number if yes and -1 if filled
							if(p1next>-1) //if p1next is open
							{
								c = 1;//stop loop
							}
						}
					}
				}
			}

			if(turn==2) //if player 2 is up
			{
				if(p2 == 2) //if player 2 is rand
				{
					int c = 0;
					while (c == 0) //loop till random finds open spot
					{
						float randonando = random(42); //random spot
						randonando -= randonando%1; //makes randonando int
						Spot spit = spotlist.get((int)randonando); //spot at randonando
						p2next = p2r.randMove(spit); //checks if spot is open, returns spot number if yes and -1 if filled
						if(p2next>-1) //if p2next is open
						{
							c = 1; //stop loop
						}
					}
				}
				if(p2 == 3) //if player 2 is smart
				{
					int smart = p2s.smartMove(spotlist); //find smartest move

					if(smart>-1) //if smartMove returned viable move
					{
						p2next = smart;//next move is smartest move
					}

					else  //failsafe incase smartMove cannot find a move (randomizes instead)
					{
						int c = 0;
						while (c == 0) //loop till random finds open spot
						{
							float randonando = random(42); //random spot
							randonando -= randonando%1; //makes randonando int
							Spot spit = spotlist.get((int)randonando); //spot at randonando
							p2next = p2r.randMove(spit); //checks if spot is open, returns spot number if yes and -1 if filled
							if(p2next>-1) //if p2next is open
							{
								c = 1; //stop loop
							}
						}
					}
				}
			}


			boolean mooved = false; //true if move has been made

			for (Spot spot: spotlist) //for every spot, checks if each spot is the one currently being played,
				                      //if it's possible to play there, and draws a coin there if filled
			{
				float x = spot.x; //spot x
				float y = spot.y; //spot y
				int r = spot.rad; //spot radius

				if (spot.filled == 0) //if spot is open
				{
					if(turn==1) //if player 1 is up
					{
						if(p1==1) //if player 1 is human
						{
							p1h.humanMove(spot, mouseX, mouseY); //checks if mouse clicked on this spot and fills it if so

							if(spot.filled > 0) //if spot was played on
							{
								mooved = true; //a move was made
							}
						}
					    if(p1==2 && spot.num==p1next) //if p1 is rand and this is the spot randomly chosen
						{
							spot.setfill(1); //fill spot
							mooved = true; //a move was made
						}
						if(p1==3 && spot.num==p1next) //if p1 is smart and this is the spot smartly chosen
						{
							spot.setfill(1); //fill spot
							mooved = true; //a move was made
						}
					}

					if(turn==2) //if player 2 is up
					{
						if(p2==1) //if player 2 is human
						{
							p2h.humanMove(spot, mouseX, mouseY);//checks if mouse clicked on this spot and fills it if so

							if(spot.filled > 0) //if spot was played on
							{
								mooved = true; //a move was made
							}
						}
						if(p2==2 && spot.num==p2next) //if p2 is rand and this is the spot randomly chosen
						{
							spot.setfill(2); //fill the spot
							mooved = true; //a move was made
						}
						if(p2==3 && spot.num==p2next) //if p2 is smart and this is the spot smartly chosen
						{
							spot.setfill(2); //fill the spot
							mooved = true; //a move was made
						}
					}
				}

				int nextspot = spot.num+7; //number of spot below this one

				if(nextspot<42 && spot.filled > 0) //if this spot is filled and there's a spot below it
				{
					if(spotlist.get(nextspot).filled==0) //if the spot below it is empty
					{
						spotlist.get(nextspot).setfill(turn); //fill the spot below
						spot.setfill(0); //clear this spot (played coin drops to spot below
					}
				}

				if(spot.filled == 1) //if spot is filled by player 1, draw red coin
				{
					stroke(255,0,0);
					fill(255,0,0);
					ellipse(x, y, r, r);
					fill(0);
					stroke(0);
					ellipse(x,y,r-25,r-25);
					stroke(255,0,0);
					fill(255,0,0);
					ellipse(x, y, r-29, r-29);

				}

				if(spot.filled == 2) //if spot is filled by player 2, draw yellow coin
				{
					stroke(255,255,0);
					fill(255,255,0);
					ellipse(x, y, r, r);
					fill(0);
					stroke(0);
					ellipse(x,y,r-25,r-25);
					stroke(255,255,0);
					fill(255,255,0);
					ellipse(x, y, r-29, r-29);
				}
			}

			for (Spot spot: spotlist) //for every spot, checks for any connect 4s
			{
				int n = spot.num; //spot number
				int col = n%7; //spot column
				int row = (n-n%7)/7; //spot row
				if(spot.filled > 0 && turn<4) //if spot is filled and turn is less than 4 (only 4 after player wins)
				{
					if (col < 4) //if column is less than 4 (possible connect 4 to right)
					{
						Spot right1 = spotlist.get(n + 1); //spot 1 to the right
						Spot right2 = spotlist.get(n + 2); //spot 2 to the right
						Spot right3 = spotlist.get(n + 3); //spot 3 to the right

						if (spot.filled == right1.filled && spot.filled == right2.filled && spot.filled == right3.filled) //if all four are filled by same player
						{
							end = true; //game is ended
							winner = turn; //winner is whoever took last turn (winning play)
							turn = 4; //turn is set to 4 so nobody can play again
						}

					}

					if (row < 3) //if row is less than 3 (possible connect 4 down)
					{
						Spot down1 = spotlist.get(n + 7); //spot 1 down
						Spot down2 = spotlist.get(n + 14); //spot 2 down
						Spot down3 = spotlist.get(n + 21); //spot 3 down
						if (spot.filled == down1.filled && spot.filled == down2.filled && spot.filled == down3.filled) //if all four are filled by same player
						{
							end = true; //game is ended
							winner = turn; //winner is whoever took last turn (winning play)
							turn = 4; //turn is set to 4 so nobody can play again
						}
					}

					if (row<3 && col<4) //if row is less than 3 and col is less than 4 (possible connect4 down right)
					{
						Spot dr1 = spotlist.get(n+8); //spot down right 1
						Spot dr2 = spotlist.get(n+16); //spot down right 2
						Spot dr3 = spotlist.get(n+24); //spot down right 3
						if (spot.filled == dr1.filled && spot.filled == dr2.filled && spot.filled == dr3.filled) //if all four are filled by same player
						{
							end = true; //game is ended
							winner = turn; //winner is whoever took last turn (winning play)
							turn = 4; //turn is set to 4 so nobody can play again
						}
					}

					if (row<3 && col>2)  //if row is less than 3 and col is greater than 2 (possible connect 4 down left)
					{
						Spot dl1 = spotlist.get(n+6); //spot down left 1
						Spot dl2 = spotlist.get(n+12); //spot down left 2
						Spot dl3 = spotlist.get(n+18); //spot down left 3
						if (spot.filled == dl1.filled && spot.filled == dl2.filled && spot.filled == dl3.filled) //if all four are filled by same player
						{
							end = true; //game is ended
							winner = turn; //winner is whoever took last turn (winning play)
							turn = 4; //turn is set to 4 so nobody can play again
						}
					}
				}
			}

			if(mooved && turn<4) //if a move was made but wasn't a winning move
			{
				 if(turn<2) //if current turn is not player 2's
				 {
					 turn = 2; //player 2's turn is up
				 }
				 else
				 {
					 turn = 1; //player 1's turn is up
				 }
			}

			textSize(30);
			fill(0);
			text("Current Turn:" + turn, 240,50); //prints text

			if(turn == 1) //if player 1 is up, displays p1 in a red square to show its player 1's turn
			{
				stroke(0);
				fill(255,0,0);
				rect(300,75,100,100);
				fill(255);
				text("P1", 330, 135);
			}
			if(turn == 2) //if player 2 is up, displays p2 in a yellow square to show its player 1's turn
			{
				stroke(0);
				fill(255,255,0);
				rect(300,75,100,100);
				fill(0);
				text("P2", 330, 135);
			}

			if(end) //if game is ended
			{
				if(winner == 1) //if player 1 wins, background is red
				{
					fill(255,0,0);
				}
				if(winner == 2) //if player 2 wins, background is yellow
				{
					fill(255,255,0);
				}

				rect(0,0,700,200);
				fill(0);
				textSize(69);
				text("Player "+winner+" wins!!", 120, 125); //print who the winner is
			}

			redraw = false; //stops redraw from calling every draw loop and instead only when player plays
		}
	}

  	public void mousePressed() //if mouse is pressed
	{
		if (donestart) //if start loop is done
		{
			redraw = true; //run redraw to play next turn
			count = 0; //reset cpu counter
		}
		else
		{
			start = true; //update start screen
		}
	}

  	public static void main(String args[]) //run main function
	{
      PApplet.main("Connect4");
    }
}
