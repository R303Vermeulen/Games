import java.util.ArrayList;

public class Spot //spot object for each spot on bored (filled or not)
{

    public float x; //x position
    public float y; //y position
    public int rad = 55; //radius (fixed for all spots)
    public int num; //number in grid
    public int filled = 0; //status of filled (0 is open, 1 is filled by player 1, 2 is filled by player 2.


    public Spot(float x, float y, int num) //initializes each object
    {
        this.x = x;
        this.y = y;
        this.num = num;
    }

    public void setfill(int ttt) //sets fill to input
    {
        this.filled = ttt;
    }


    public int checkHowSmart(ArrayList<Spot> spotlist, int pnum) //checks how smart this spot is to play
    {

        int currentscore = 0; //keeps a score of how good the move is

        if(num%7 == 3)    //checks if spot is in the middle
        {
            currentscore += 1;
        }

        currentscore += checkDirec(spotlist, pnum, -1, 1, 0); //tests how smart this move is for spots to the left

        currentscore += checkDirec(spotlist, pnum, 1, -1,0); //tests how smart this move is for spots to the right

        currentscore += checkDirec(spotlist,pnum,7,0,-1); //tests how smart this move is for spots that are down

        currentscore += checkDirec(spotlist,pnum,-8,1,1); //tests how smart this move is for spots that are up left

        currentscore += checkDirec(spotlist,pnum,6,1,-1); //tests how smart this move is for spots that are down left

        currentscore += checkDirec(spotlist,pnum, 8,-1,-1); //tests how smart this move is for spots that are down right

        currentscore += checkDirec(spotlist,pnum,-6,-1,1); //tests how smart this move is for spots that are up right

        return currentscore; //returns this spot's score

    }

    public int checkDirec(ArrayList<Spot> spotlist, int pnum, int spotInc, int colInc, int rowInc) //checks how smart this spot is in a certain direction
    //spotInc is how far away spots are in the given direction
    //colInc is either -1 (checking spots to the right of this one), 0 (only checking down or up), or 1 (checking spots to the left of this one)
    //rowInc is either -1 (checking spots below this one), 0 (only checking right or left), or 1 (checking spots above this one)
    {
        int col = num%7; //column of spot
        int row = (num-num%7)/7; //row of spot
        int currentscore = 0; //keeps track of score

        int onum = -1; //other player num

        if(pnum == 1) //if player num is 1
        {
            onum = 2; //other player num is 2
        }
        if(pnum == 2) //if player num is 2
        {
            onum = 1; //other player num is 1
        }

        if(col > -1 + colInc && col < 7 +colInc && row > -1 + rowInc && row < 6 + rowInc) //checks if there's a spot 1 over in the given direction
        {
            Spot spot1 = spotlist.get(num+spotInc); //spot 1 over
            if(spot1.filled == pnum) //if spot 1 over is filled by this player
            {
                currentscore += 2; //making a 2-in-a-row is possible
            }
            if(col > -1 + (2*colInc) && col < 7 + (2*colInc) && row > -1 + (2*rowInc) && row < 6 + (2*rowInc)) //checks if there's a spot 2 over in the given direction
            {
                Spot spot2 = spotlist.get(num+(2*spotInc)); //spot 2 over
                if(spot1.filled == spot2.filled) //if spots 1 and 2 over are filled by the same player
                {
                    if(spot1.filled == pnum) //if spot 1 over is filled by this player
                    {
                        currentscore += 5; //making a 3-in-a-row is possible
                        if(pnum == 1) //if this player is player 1, add more points (player 1 is offensive minded)
                        {
                            currentscore += 3;
                        }
                    }
                    if(spot1.filled == onum) //if spot 1 over is filled by other player
                    {
                        currentscore += 5; //blocking the opponent from a 3-in-a-row is possible
                        if(pnum == 2) //if this player (pnum) is player 2, add more points (player 2 is defensive minded)
                        {
                            currentscore += 3;
                        }
                    }
                }
                if(col > -1 + (3*colInc) && col < 7 + (3*colInc) && row > -1 + (3*rowInc) && row < 6 + (3*rowInc)) //checks if there's a spot 3 over in the given direction
                {
                    Spot spot3 = spotlist.get(num+(3*spotInc)); //spot 3 over
                    if(spot1.filled == spot2.filled && spot2.filled == spot3.filled) //if spots 1, 2, & 3 over are filled by the same player
                    {
                        if(spot1.filled == pnum) //if spot 1 over is filled by this player
                        {
                            currentscore += 1000; //making a 4-in-a-row (winning) is possible
                        }
                        if(spot1.filled == onum)  //if spot 1 over is filled by other player
                        {
                            currentscore += 100; //blocking the opponent from a 4-in-a-row (stopping opponent from winning) is possible
                        }
                    }
                }
            }

        }

        return currentscore; //retrun score
    }

}

