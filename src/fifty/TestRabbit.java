package fifty;

public class TestRabbit{


    public static int sumRabbitNumber( int m){


            int n= 1 ; // �� 0 ���¶���


            int e= 0 ; // �� 0 ���¶���


            int cup= 0 ;


            for ( int i= 1 ;i<m ;i++ ) {


                  cup=n;


                  n=e+n;


                  e=cup;


                  


          }


            return n;


  }


    public static void main(String[] args) {


            for ( int i= 1 ;i< 10 ;i++ ) {


                  System.out.print(sumRabbitNumber(i)+ "," );     


          }


  }



}
