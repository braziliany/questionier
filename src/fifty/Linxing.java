package fifty;
//打印如下图形
public class Linxing{
    public static void print( int n){
        int i = 0 ;
        int j= 0 ;
        for (i= 0 ;i<n ;i++ ) {
            for (j= 0 ;j<n+i ;j++ ) {
                if (j<n-i- 1 )
                  System.out.print( " " );
                else
                  System.out.print( "*" );
          }
          System.out.println();
      }
        for (i= 1 ;i<n ;i++ ) {                 // 后三行
            for (j= 0 ;j<( 2 *n-i- 1 ) ;j++ ) {
                if (j<i)
                  System.out.print( " " );
                else
                  System.out.print( "*" );
          }
           System.out.println();
          }
      }
        public static void main(String[] args) {
          print( 4 );
      }
  }
