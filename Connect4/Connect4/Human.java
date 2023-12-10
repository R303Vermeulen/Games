import java.util.ArrayList;

public class Human extends Player //object human for human players
{

    public Human(int num, int type) //initializes human with player number and type (should always be 1)
    {
        super(num,type);
    }

    public int humanMove(Spot spit, float xxx, float yyy) //checks if current spot is area where human clicked
    {
        float xtot = xxx-spit.x;
        float ytot = yyy-spit.y;
        float dist = (float) Math.sqrt((xtot*xtot)+(ytot*ytot)); //finds distance between spot center and mouse click location
        if(dist<28) //if mouse click was within this spot
        {
            spit.setfill(super.num); //player playnum fills the spot
        }
        return spit.num; //return spot number
    }


}
