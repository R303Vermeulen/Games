// To start the animation click anywhere in the window
var loc, dir;
var neckR, wingR;

var neckDown = true;
var wingDown = false;
var animate = false;

var longlegs = 8;
var legspeed = 0.2;
var legR = [];   //1 is upper left, 2 is upper right, 3 is lower left, 4 is lower right
var legD = [];



// normal set up
function setup() 
{
   createCanvas(400, 400);
   
   legR[1] = PI/6;
   legD[1] = 2;

   legR[2] = -PI/6;
   legD[2] = 1;

   legR[3] = PI/6;
   legR[4] = -PI/6;

   loc = createVector(width*.9, height*.5);
   dir = createVector(-1, 0);
   neckR = 0;
   wingR = -PI/10;
}

// normal draw
function draw() 
{
   backscene();

 

   drawDuck();
   if (animate) 
   {
      moveDuck();
   }
}

// method to control starting the duck over again and 
// control animation on and off
function mousePressed() 
{
   loc = createVector(width*.9, height*.5);
   animate = !animate;
}

// code to draw the duck with animation parameters 
// neckR and wingR - other transforms align the pieces 
// to the correct pivot points Be very careful modifying 
// this code - the structure of the push and pops are 
// what builds the hierarchical relationships
function drawDuck() 
{
   noStroke();

   push();
      //move the entire duck
      translate(loc.x, loc.y);
      scale(2); //scale the entire duck



      // draw body
      fill(245, 226, 12);
      ellipse(0, 0, 40, 30); 

      //draw neck and head with possible animation transforms
      push();
         translate(-16, 0); //move into pivot position
         rotate(neckR);  //rotate by neckR parameter
         ellipse(0, -10, 10, 18); //neck
         ellipse(0, -17, 14, 14); //head
         fill(0);
         ellipse(0, -19, 4, 4);  //eye
         fill(155, 111, 16);
         
         if(!neckDown)  //if head moving up 
         { 
            triangle(-12, -18, -6, -21, -6, -15); //beak closed
         }
         else           //if head moving down
         {
            triangle(-12, -21, -6, -21, -6, -18);  //beak open
            triangle(-12, -15, -6, -18, -6, -15);
         }
      pop();

      //draw wing with possible animation transforms
      fill(227, 208, 66);
      push();
         translate(-8, -5); //move into pivot position
         rotate(wingR); //animtion parameter to control wing flap
         ellipse(14, 0, 34, 20); //wing
      pop();

      //TODO - this is where you will add the code to animation the legs - follow
      //the examples for the wings and neck 
      push();
         translate(-5,14)
         fill(0);
         strokeWeight(2)
         stroke(0)
         
         push();  
            rotate(legR[1]);
            line(0,0,0,longlegs);   //upper left leg
         pop();

         push(); 
            translate(sin(-legR[1])*longlegs, cos(-legR[1])*longlegs)
            rotate(legR[3])

            line(0,0,0,longlegs)   //lower left leg
            line(0,longlegs,-longlegs/4,longlegs)  //lower left foot
         pop();


         translate(10,0)
         
         push();
            rotate(legR[2])
            line(0,0,0,longlegs);      //upper right leg
         pop();

         push();
            translate(sin(-legR[2])*longlegs, cos(-legR[2])*longlegs)
            rotate(legR[4])


            line(0,0,0,longlegs)       //lower right leg
            line(0,longlegs,-longlegs/4,longlegs)    //lower right time
         pop();   
      pop();


   pop();
}

// function to update all animation parameters - very 
// simple scripted animation
function moveDuck() 
{
   // update the ducks global location
   loc.add(dir);

   // find out how much the neck is rotated to decide which way to rotate
   // these constrain how much the neck moves up and down
   if (neckR < -PI/2) 
   {
      neckDown = false;
   } 
   if (neckR > PI/15) 
   {
      neckDown = true;
   }

   // depending on which way we need to rotate, do so
   if (neckDown) 
   {
      neckR -= PI/60;
   } 
   else 
   {
      neckR += PI/100;
   }

   
   for(let i=1; i<=2; i++) //for the upper right and left legs
   {
      if(legD[i]==1)    //depending on direction, move that way
      {
         legR[i] += PI/12*legspeed
      }

      if(legD[i]==2)
      {
         legR[i] -= PI/12*legspeed
      }

      if(legR[i] > PI/6)   //too far, move other way
      {
         legD[i]=2;
      }

      if(legR[i] < -PI/6)
      {
         legD[i]=1;
      }
   }

   for(let i=3; i<=4; i++)
   {
      j=i-2;
      if(legD[j]==2)    //if moving back, leg is straight
      {
         legR[i]=legR[j];
      }
      if(legD[j]==1)    //if leg moving forward
      {
         if(legR[j]<0)  //kick up foot
         {
            legR[i] -= (PI/6)*legspeed;
         }
         else           //bring foot back out front
         {
            legR[i] += (PI/3)*legspeed;
         }
      }
   }

   // find out how much the wing is rotated to decide which way to rotate
   // these constrain how much the wing moves up and down
   if (wingR < -2*PI/5) 
   {
      wingDown = true;
   } 
   if (wingR > -PI/20) 
   {
      wingDown = false;
   }

   // depending on which way we need to rotate, do so
   if (wingDown == false) 
   {
      wingR -= PI/10;
   } 
   else 
   {
      wingR += PI/10;
   }
}

function backscene()
{
   background(135,206,235)
   strokeWeight(1)
   stroke(0)

   //foreground
   fill(78, 155, 16);
   rect(0, height/2, width, height/2);

   barn(0,60)

   hay(75,300)
   hay(175,300)
   hay(275,300)

   fences(0,330)

   sun(400,0)
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


  
function sun(x, y){
  
   push(); 
  
      noStroke();
      translate(x, y);
      fill(255, 255, 0);
      ellipse(-10, 10, 70, 70);
  
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
