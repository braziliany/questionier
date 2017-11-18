package fifty;

public class FindPrimeNumber{


    public static boolean isP( int n){


        if (n== 2 ) return true ;


        for ( int i= 2 ;i<=n/ 2 ;i++ ) {


            if (n%i== 0 ) return false ;


          }


        return true ;


  }


    public static void main(String[] args) {


        int n= 0 ;


        for ( int i= 101 ;i<= 200 ;i++ ) {


            if (isP(i)) {


              n++;


              System.out.print(i+ "," );


             }


       }


      System.out.print( "\n101-200 之间有 " +n+ " 个素数 " );


  }



}

