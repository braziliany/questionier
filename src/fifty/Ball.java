package fifty;
//一球从 100 米高度自由落下，每次落地后反跳回高度的一半，再落下。求他在第十次落地时，共经过多少米？第十次反跳多高？

public class Ball{
    public static double sumBallHeight( double h, int n){
        if (n== 1 ) return h/ 2 ;
        else return sumBallHeight(h/ 2 ,n- 1 );
  }
    public static void main(String[] args) {
      System.out.println(sumBallHeight( 100 , 10 ));
  }
}
