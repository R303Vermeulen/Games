import java.util.ArrayList;
import java.util.Random;

public class Rand extends Player{ //rand object for random players

    public Rand(int num, int type) //initializes each object with player number and type (should always be 2)
    {
        super(num,type);
    }

    public int randMove(Spot spit) //checks if randomly called spot is filled
    {
        if(spit.filled==0)
        {
            return spit.num; //returns spot number if open
        }
        return -1; //returns -1 if filled
    }

}
