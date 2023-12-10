let maintiles = [];
let SpawnCounter = 0;
let bot = 0;
let botmovecount = 0;
let delay = 4;
let circles = [];
let circOn = 0;


function setup() 
{
   createCanvas(1200,500);
   background(150,150,150);
   for(let i = 0; i<16; i++)
   {
      maintiles[i] = 0;
   }
   for(let i = 0; i < 100; i ++)
   {
      let x = 600//Math.floor(Math.random() * 1200);
      let y = 250//Math.floor(Math.random() * 600);
      let s = Math.floor(Math.random() * 150) + 50;
      let c1 = Math.floor(Math.random() * 255);
      let d = Math.random() * 2 * Math.PI; // 3.14159265358979323846264338327950288419716939937510;
      let ss = (Math.floor(Math.random() * 4) + 2);
      let cci = (Math.floor(Math.random()));
      while(c1 < 175 && c1 > 75)
      {
         c1 = Math.floor(Math.random() * 255);
      }
      fill(c1,255-c1,255-c1);
      ellipse(x,y,s,s);
      let circle = [];
      circle[0] = x
      circle[1] = y
      circle[2] = s
      circle[3] = c1
      circle[4] = d
      circle[5] = ss
      circle[6] = cci
      circles[i] = circle

   }

   spawnTile(maintiles,1);
   spawnTile(maintiles,1);
   //noLoop();
}

function draw()
{
   if(bot == 1 && SpawnCounter == 0)
   {
      movebot1(maintiles);
   }
   if(circOn == 0)
   {
      background(150,150,150);
      drawcircles(circles);
   } 
   
   drawtiles(maintiles); 
}

function spawnTile(tiles, start)
{
   let emptyTiles = [];
   let etc = 0;
   for(let i = 0; i<16; i++)
   {
      if(tiles[i] == 0)
      {
         emptyTiles[etc] = i;
         etc += 1;
      }
   }
   if(etc > 0)
   {
      let ccc = Math.floor(Math.random() * etc);
      let idx = emptyTiles[ccc];
      if(start == 1)
      {
         tiles[idx] = 1;
      }
      else
      {
         tiles[idx] = -1; /// neeeds radnpopoooommmmmmmmmmm to be 4
      }
      
      return ccc;
   }
   return -1;
}

function keyTyped()
{
   if(SpawnCounter == 0 && bot == 0)
   {
      if(key == 'w')
      {
         mmove(maintiles, 0, 4, 1); //move up
      }
      if(key == 's')
      {
         mmove(maintiles, 15, -4, -1); //move down
      }
      if(key == 'd')
      {
         mmove(maintiles, 3, -1, 4); //move right
      }
      if(key == 'a')
      {
         mmove(maintiles, 12, 1, -4) //move left
      }
   }
   if(key == 'p')
   {
      if(bot != 1)
      {
         bot = 1;
      }
      else
      {
         bot = 0;
      }
   }
   if(key == 'c')
   {
      if(circOn != 0)
      {
         circOn = 0
      }
      else
      {
         circOn = 1
      }
   }
}

function movebot1(tiles)
{
   let botnextmove;
   botnextmove = findnextmove(tiles)
   if(botnextmove == 0)
   {
      mmove(tiles, 0, 4, 1); //move up
   }
   if(botnextmove == 1)
   {
      mmove(tiles, 3, -1, 4); //move right
   }
   if(botnextmove == 2)
   {
      mmove(tiles, 15, -4, -1); //move down
   }
   if(botnextmove == 3)
   {
      mmove(tiles, 12, 1, -4) //move left
   }
   if(botnextmove == -6)
   {
      bot = 0;
      background(0,255,0);
   }
}

function findnextmove(tiles)
{

   let uptiles = [];
   let rightiles = [];
   let downtiles = [];
   let leftiles = [];

   uptiles = tiles;
   rightiles = tiles;
   downtiles = tiles;
   leftiles = tiles;

   let upidx = fmove(uptiles, 0, 4, 1);
   let rightidx = fmove(rightiles, 3, -1, 4);
   let downidx = fmove(downtiles, 15, -4, -1);
   let leftidx = fmove(leftiles, 12, 1, -4);

   if(upidx > 0 && rightidx == 0 && downidx == 0 && leftidx ==0)
   {
      return 0;
   }
   
   let rscore = -1;
   let dscore = -1;
   let lscore = -1;

   if(rightidx > 0)
   {
      rscore = movescore(rightiles);
   }
   if(downidx > 0)
   {
      dscore = movescore(downtiles);
   }
   if(leftidx > 0)
   {
      lscore = movescore(leftiles);
   }

   if(rscore >= dscore && rscore >= lscore)
   {
      return 1;
   }
   if(dscore >= lscore)
   {
      return 2;
   }
   if(lscore > -1)
   {
      return 3;
   }

   return -6;
}

function movescore(ttiles)
{
   let rrightiles = [];
   let ddowntiles = [];
   let lleftiles = [];

   rrightiles = ttiles;
   ddowntiles = ttiles;
   lleftiles = ttiles;

   let rrightidx = fmove(rrightiles, 3, -1, 4);
   let ddownidx = fmove(ddowntiles, 15, -4, -1);
   let lleftidx = fmove(lleftiles, 12, 1, -4);
   
   let rrscore = -1;
   let ddscore = -1;
   let llscore = -1;

   if(rrightidx > 0)
   {
      rrscore = gsscore(rrightiles);
   }
   if(ddownidx > 0)
   {
      ddscore = gsscore(ddowntiles);
   }
   if(lleftidx > 0)
   {
      llscore = gsscore(lleftiles);
   }

   lleast = -1;
   if(rrscore > lleast)
   {
      lleast = rrscore;
   }
   if(ddscore > lleast)
   {
      lleast = ddscore;
   }
   if(llscore > lleast)
   {
      lleast = llscore;
   }
   return lleast;
}

function gsscore(tttiles)
{
   let ssscore = 0;
   let maxval = -1;

   for(let i = 0; i<16; i++)
   {
      let inc;
      let incdxdx = tttiles[i];

      
      while(incdxdx > 1)
      {
         inc += Math.pow(2, incdxdx);
         
         incdxdx -= 1;
      }
      //if(i == 3 || i == 6 )

      ssscore += inc;

      
      if(tttiles[i] == 0)
      {
         ssscore += 1;
      }
      if(tttiles[i] > maxval)
      {
         maxval = tttiles[i];
      }
   }
   if(tttiles[15] == maxval)
   {
      let inc;
      inc = 8*Math.pow(2, maxval)
      ssscore += inc;
   }
   
   
   
   ssscore += 2*checkdirec(tttiles, 0, 0); //0 for down, 0 for 0th col
   ssscore += 4*checkdirec(tttiles, 0, 1); //0 for down, 1 for 1th col
   ssscore += 8*checkdirec(tttiles, 0, 2); //0 for down, 2 for 2th col
   ssscore += 16*checkdirec(tttiles, 0, 3); //0 for down, 3 for 3th col
   ssscore += 16*checkdirec(tttiles, 1, 3); //1 for right, 3 for 3rd row

   return ssscore;
}

function checkdirec(t4tiles, direc, col)
{
   let s4score = 0;
   if(direc == 0)
   {
      let s4 = col;
      if(t4tiles[s4+4] >= t4tiles[s4])
      {
         s4score += 1;
      }
      if(t4tiles[s4+8] >= t4tiles[s4+4])
      {
         s4score += 2;
      }
      if(t4tiles[s4+12] >= t4tiles[s4+8])
      {
         s4score += 8;
      }
   }
   if(direc == 1)
   {
      let s4 = col*4;
      if(t4tiles[s4+1] >= t4tiles[s4])
      {
         s4score += 1;
      }
      if(t4tiles[s4+2] >= t4tiles[s4+1])
      {
         s4score += 2;
      }
      if(t4tiles[s4+3] >= t4tiles[s4+2])
      {
         s4score += 8;
      }
   }
   return s4score;
}

function mmove(tiles, start, rowinc, colinc) //tiles,   starting idx,  increment to go down each row ; inc for each col
{
   yes = 0;
   let rowon = start;
   yes += rowcheck(tiles, rowon, rowinc); //first row
   rowon += colinc;
   yes += rowcheck(tiles, rowon, rowinc); //second row
   rowon += colinc;
   yes += rowcheck(tiles, rowon, rowinc); //third row
   rowon += colinc;
   yes += rowcheck(tiles, rowon, rowinc); //fourth row
   if(yes > 0)
   {
      spawnTile(tiles,0);
      SpawnCounter += 1;
      //tiles[0] = 6;
   }
   return yes;
}

function fmove(tiles, start, rowinc, colinc)
{
   yes = 0;
   let rowon = start;
   yes += rowcheck(tiles, rowon, rowinc); //first row
   rowon += colinc;
   yes += rowcheck(tiles, rowon, rowinc); //second row
   rowon += colinc;
   yes += rowcheck(tiles, rowon, rowinc); //third row
   rowon += colinc;
   yes += rowcheck(tiles, rowon, rowinc); //fourth row
   return yes;
}

function rowcheck(tiles, start, rowinc)
{
   let t0 = start;
   let t1 = start + rowinc;
   let t2 = start + (2 * rowinc);
   let t3 = start + (3 * rowinc);
   let yes = 0;
   if(tiles[t0] > 0)
   {
      if(tiles[t1] == 0)
      {
         yes += 1;
         if(tiles[t2] == 0)
         {
            if(tiles[t3] > 0)
            {
               if(tiles[t0] == tiles[t3])
               {
                  tiles[t0] = tiles[t0] + 1;
                  tiles[t3] = 0;
               }
               else
               {
                  tiles[t1] = tiles[t3];
                  tiles[t3] = 0;
               }
            }
         }
         else if(tiles[t0] == tiles[t2])
         {
            tiles[t0] = tiles[t0] + 1;
            tiles[t2] = 0;
            if(tiles[t3] > 0)
            {
               tiles[t1] = tiles[t3];
               tiles[t3] = 0;
            }
         }
         else
         {
            if(tiles[t2] == tiles[t3])
            {
               tiles[t1] = tiles[t2] + 1;
               tiles[t2] = 0;
               tiles[t3] = 0;
            }
            else if(tiles[t3] > 0)
            {
               tiles[t1] = tiles[t2];
               tiles[t2] = tiles[t3];
               tiles[t3] = 0;
            }
            else
            {
               tiles[t1] = tiles[t2];
               tiles[t2] = 0;
            }
         }
      }
      else if(tiles[t0] == tiles[t1])
      {
         yes += 1;
         tiles[t0] = tiles[t0] + 1;

         if(tiles[t2] > 0)
         {
            if(tiles[t2] == tiles[t3])
            {
               tiles[t1] = tiles[t2] + 1;
               tiles[t2] = 0;
               tiles[t3] = 0;
            }
            else if(tiles[t3] > 0)
            {
               tiles[t1] = tiles[t2];
               tiles[t2] = tiles[t3];
               tiles[t3] = 0;
            }
            else
            {
               tiles[t1] = tiles[t2];
               tiles[t2] = 0;
            }
         }
         else if(tiles[t3] > 0)
         {
            tiles[t1] = tiles[t3];
            tiles[t3] = 0;
         }
         else
         {
            tiles[t1] = 0;
         }
      }
      else
      {
         if(tiles[t2] > 0)
         {
            if(tiles[t1] == tiles[t2])
            {
               yes += 1;
               tiles[t1] = tiles[t1] + 1;
               tiles[t2] = 0;
               if(tiles[t3] > 0)
               {
                  tiles[t2] = tiles[t3];
                  tiles[t3] = 0;
               }
            }
            else if(tiles[t2] == tiles[t3])
            {
               yes += 1;
               tiles[t2] = tiles[t2] + 1;
               tiles[t3] = 0;
            }
         }
         else if(tiles[t3] > 0)
         {
            yes += 1;
            if(tiles[t1] == tiles[t3])
            {
               tiles[t1] = tiles[t1] + 1;
               tiles[t3] = 0;
            }
            else
            {
               tiles[t2] = tiles[t3];
               tiles[t3] = 0;
            }
         }
      }
   }
   else if(tiles[t1] > 0)
   {
      yes += 1;
      if(tiles[t2] > 0)
      {
         if(tiles[t1] == tiles[t2])
         {
            tiles[t0] = tiles[t1] + 1;
            tiles[t1] = 0;
            tiles[t2] = 0;
            if(tiles[t3] > 0)
            {
               tiles[t1] = tiles[t3];
               tiles[t3] = 0;
            }
         }
         else if(tiles[t3] > 0)
         {
            if(tiles[t2] == tiles[t3])
            {
               tiles[t0] = tiles[t1];
               tiles[t1] = tiles[t2] + 1
               tiles[t2] = 0;
               tiles[t3] = 0;
            }
            else
            {
               tiles[t0] = tiles[t1];
               tiles[t1] = tiles[t2];
               tiles[t2] = tiles[t3];
               tiles[t3] = 0;
            }
         }
         else
         {
            tiles[t0] = tiles[t1];
            tiles[t1] = tiles[t2];
            tiles[t2] = 0;
         }
      }
      else if(tiles[t3] > 0)
      {
         if(tiles[t1] == tiles[t3])
         {
            tiles[t0] = tiles[t1] + 1;
            tiles[t1] = 0;
            tiles[t3] = 0;
         }
         else
         {
            tiles[t0] = tiles[t1];
            tiles[t1] = tiles[t3];
            tiles[t3] = 0;
         }
      }
      else
      {
         tiles[t0] = tiles[t1];
         tiles[t1] = 0;
      }
   }
   else if(tiles[t2] > 0)
   {
      yes += 1;
      if(tiles[t3] > 0)
      {
         if(tiles[t2] == tiles[t3])
         {
            tiles[t0] = tiles[t2] + 1;
            yes += 1;
            tiles[t2] = 0;
            tiles[t3] = 0;
         }
         else
         {
            tiles[t0] = tiles[t2];
            tiles[t1] = tiles[t3];
            tiles[t2] = 0;
            tiles[t3] = 0;
         }
      }
      else
      {
         tiles[t0] = tiles[t2];
         tiles[t2] = 0;
      }
   }
   else if(tiles[t3] > 0)
   {
      yes += 1;
      tiles[t0] = tiles[t3];
      tiles[t3] = 0;
   }
   return yes;
}

function drawcircles(circles)
{
   for(let i = 0; i < 100; i ++)
   {
      let x = circles[i][0]
      let y = circles[i][1]
      let s = circles[i][2]
      let c1 = circles[i][3]
      let d = circles[i][4]
      let ss = circles[i][5]
      let cci = circles[i][6]

      if(c1 < 10)
      {
         circles[i][6] = 1
         cci = 1
      }
      if(c1 > 245)
      {
         circles[i][6] = 0
         cci = 0
      }


      let nx = Math.cos(d) * ss
      let ny = Math.sin(d) * ss

      if((y + ny) - (s/2) < 0)
      {  
         circles[i][4] = (2*Math.PI - d);
         d = circles[i][4] 
         ny = Math.sin(d)

         if(cci == 0)
         {
            circles[i][3]  -= 10
         }
         if(cci == 1)
         {
            circles[i][3]  += 10
         }
      }
      if(y+ny+(s/2) > 500)
      {
         circles[i][4] = (2*Math.PI - d);
         d = circles[i][4] 
         ny = Math.sin(d)

         if(cci == 0)
         {
            circles[i][3]  -= 10
         }
         if(cci == 1)
         {
            circles[i][3]  += 10
         }
      }

      if((x+nx) - (s/2) < 0)
      {
         nd = (Math.PI - d);
         if (nd < 0)
         {
            nd += 2*Math.PI;
         }
         circles[i][4] = nd
         d = circles[i][4] 
         nx = Math.cos(d)

         if(cci == 0)
         {
            circles[i][3]  -= 10
         }
         if(cci == 1)
         {
            circles[i][3]  += 10
         }
      }
      if(x+nx +(s/2) > 1200)
      {
         nd = (Math.PI - d);
         if (nd < 0)
         {
            nd += 2*Math.PI;
         }
         circles[i][4] = nd
         d = circles[i][4] 
         nx = Math.cos(d)

         if(cci == 0)
         {
            circles[i][3]  -= 10
         }
         if(cci == 1)
         {
            circles[i][3]  += 10
         }
      }

      circles[i][0] += nx
      circles[i][1] += ny
      x = circles[i][0]
      y = circles[i][1]
      
      fill(c1,255-c1,255-c1);
      ellipse(x,y,s,s);
   }
}

function drawtiles(tiles)
{
   for(let i=0; i<16; i++)
   {
      let x = 440 + 80 * (i%4)
      let y = 90 + 80 * ((i - i%4) / 4)

      ii = tiles[i];
      
      if(ii > 0)
      {
         fill(0,250,0);
         if(ii < 6)
         {
            let gfac = ii * 30;
            let bfac = ii * 5;
            fill(250, 250 - gfac, 50+bfac);
         }
         else
         {
            let iii = ii - 10;
            let rfac = iii * 20;
            let bfac = iii * 10;
            fill(250-rfac, 70, 100 + bfac);
         }
         
         rect(x, y, 80, 80);
         fill(0);
         let pi = Math.pow(2, ii);
         if(ii<4)
         {
            textSize(30);
            text(pi, x+32, y+55);
         }
         else if(ii< 7)
         {
            textSize(29);
            text(pi, x+24, y+55);
         }
         else if(ii < 10)
         {
            textSize(28);
            text(pi, x+16, y+55);
         }
         else if(ii<14)
         {
            textSize(27);
            text(pi, x+8, y+55);
         }
         else
         {
            textSize(26);
            text(pi, x+3, y+55);
         }
      }
      else
      {
         fill(255);
         rect(x,y,80,80);

         if(ii == -1)
         {
            fill(250, 220, 55);
            let sink = 40/delay;
            let s = 40 + sink*SpawnCounter;
            let ss = ((80 - s)/80)*40;
            rect(x+ss, y+ss, s,s);

            let ts = 10/delay;
            let ttss = 20 + ts*SpawnCounter;
            let xys = 2/delay;
            let xyssyx = 2 - xys*SpawnCounter;
            fill(0);
            textSize(ttss);
            text(2, x+32+xyssyx, y+55-xyssyx);



            SpawnCounter += 1;
            if(SpawnCounter == delay)
            {
               tiles[i] = 1;
               SpawnCounter = 0;
            }
         }
      }
   }

}



// function move(tiles, direc) // down direc = 2; right = 3 left 4
// {
//    let yes = 0;
//    for(let i = 0; i < 12; i++)
//    {
//       let idx;
//       let inc;
//       if(direc == 1)
//       {
//          idx = i + 4;
//          inc = -4;
//       }
//       if(direc == 2)
//       {
//          idx = 11 - i;
//          inc = 4;
//       }
//       if(direc == 3)
//       {
//          idx = (2 - ((i-i%4)/4)) + 4*(i%4);
//          inc = 1;
//       }
//       if(direc == 4)
//       {
//          idx = 1 + (i-i%4)/4 + 4*(i%4);
//          inc = -1;
//       }

//       if(tiles[idx] != 0)
//       {
//          let done = tileCheck(tiles, i, idx, inc);
//          if(done > 100)
//          {
//             yes = 1;
//             done -= 100;
//             if(done > 100)
//             {
//                done -= 100;
//                tiles[idx+inc*done] = tiles[idx] + 1;
//                tiles[idx] = 0;
//             }
//             else
//             {
//                tiles[idx+inc*done] = tiles[idx];
//                tiles[idx] = 0;
//             }
//          }
//       }
//    }
//    if(yes == 1)
//    {
//       spawnTile(tiles);
//       SpawnCounter += 1;
//    }
// }

// function tileCheck(tiles, i, idx, inc)
// {
//    let dist = 0;
//    let done = 0;
//    if(tiles[idx+inc] == 0)
//    {
//       dist = 1;
//       done = 1;
//       if(i > 3)
//       {
//          if(tiles[idx + 2*inc] == 0)
//          {
//             dist = 2;
//             if(i > 7)
//             {
//                if(tiles[idx + 3*inc] == 0)    // fill 3 away
//                {
//                   dist = 3;
//                }
//                else 
//                {
//                   if(tiles[idx + 3 * inc] == tiles[idx])    // combine 3 away
//                   {
//                      dist = 3;
//                      done = 2;
//                   }
//                }
//             }
//          }
//          else
//          {
//             if(tiles[idx + 2*inc] == tiles[idx])    // combine 2 away
//             {
//                dist = 2;
//                done = 2;
//             }
//          }
//       }
//    }
//    else if(tiles[idx + inc] == tiles[idx])    // combine 1 away
//    {
//       dist = 1;
//       done = 2;
//    }
//    return dist + (done * 100);
// }