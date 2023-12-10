import java.util.ArrayList;

public class Smart extends Player //smart object for smart players
{

    public Smart(int num, int type) //initializes each object with player number and type (should always be 3)
    {
        super(num,type);
    }

    public int smartMove(ArrayList<Spot> spotlist) //finds smartest move to play
    {
        ArrayList<Spot> playable = new ArrayList<Spot>(); //spot list for playable spots (open but won't drop)

        for (Spot spot: spotlist) //for each spot
        {
            if(spot.filled==0) //if spot is open
            {
                int n = spot.num; //spot number
                if(n<35) //if spot has a spot below it
                {
                    Spot below = spotlist.get(n+7); //spot below it
                    if(below.filled>0) //if spot below it is filled
                    {
                        playable.add(spot); //spot is playable
                    }
                }
                else //spot on bottom rom
                {
                    playable.add(spot); //spot is playable
                }
            }
        }

        int highspotnum = -1; //keeps track of num of highest scoring spot
        int highspotscore = -1; //keeps track of score of highest scoring spot

        for (Spot spot: playable) //for each playable spot
        {
            int currentscore = spot.checkHowSmart(spotlist, this.num); //gets score for this spot based on how smart it is

            if(currentscore>highspotscore) //if this spot's score is higher than highest scoring so far
            {
                highspotscore = currentscore; //this spot's score is the highest score
                highspotnum = spot.num; //this spot is the highest scoring spot
            }
        }

        return highspotnum; //return number of highest scoring (smartest) spot
    }

}
