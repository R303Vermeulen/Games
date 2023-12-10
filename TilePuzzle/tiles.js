let tiles = [];
let mixed = 0;


function setup() 
{
   createCanvas(500, 500);
   background(150,150,150);
   for(let i = 0; i<9; i++)
   {
      tiles[i] = i
   }

   //noLoop();
}

function draw()
{
   background(150,150,150);
   for(let i=0; i<9; i++)
   {
      let x = 100 + 100 * (i%3)
      let y = 100 + 100 * ((i - i%3) / 3)
      
      if(tiles[i] == 0)
      {
         fill(0);
         rect(x, y, 100, 100);
      }
      else
      {
         fill(255);
         rect(x, y, 100, 100);
         fill(0);
         textSize(30);
         text(tiles[i], x+40, y+60)
      }
   }
   if(mixed == 1)
   {
      let solved = 1;
      for(let i=0; i<9; i++)
      {
         if(tiles[i] != i)
         {
            solved = 0;
         }
      }
      if(solved == 1)
      {
         textSize(50);
         text("You Win!!!!", 140, 70);
      }
   }

}

function mixUpTiles(spot)
{
   for(let i = 0; i < 1000; i++)
   {
      randMove = random(0,4);
      randMove -= randMove%1;

      if(randMove == '0')
      {
         if(spot > 2)
         {
            tiles[spot] = tiles[spot-3]
            tiles[spot-3] = 0;
            spot = spot - 3;
         }
      }
      if(randMove == '1')
      {
         if(spot < 6)
         {
            tiles[spot] = tiles[spot+3]
            tiles[spot+3] = 0;
            spot = spot + 3;
         }
      }
      if(randMove == '2')
      {
         if(spot % 3 < 2)
         {
            tiles[spot] = tiles[spot+1]
            tiles[spot+1] = 0;
            spot = spot + 1;

         }
      }
      if(randMove == '3')
      {
         if(spot % 3 > 0)
         {
            tiles[spot] = tiles[spot-1]
            tiles[spot-1] = 0;
            spot = spot - 1;
         }
      }
   }
}


function keyTyped()
{
   let spot = -1
   for(let i=0; i<9; i++)
   {
      if(tiles[i] == 0)
      {
         spot = i
      }
   }
   if(key == 'r')
   {
      mixed = 1;
      mixUpTiles(spot)
   }
   if(key == 's')
   {
      mixed = 1;
      if(spot > 2)
      {
         tiles[spot] = tiles[spot-3]
         tiles[spot-3] = 0
      }
   }
   if(key == 'w')
   {
      mixed = 1;
      if(spot < 6)
      {
         tiles[spot] = tiles[spot+3]
         tiles[spot+3] = 0
      }
   }
   if(key == 'a')
   {
      mixed = 1;
      if(spot % 3 < 2)
      {
         tiles[spot] = tiles[spot+1]
         tiles[spot+1] = 0
      }
   }
   if(key == 'd')
   {
      mixed = 1;
      if(spot % 3 > 0)
      {
         tiles[spot] = tiles[spot-1]
         tiles[spot-1] = 0
      }
   }
}
