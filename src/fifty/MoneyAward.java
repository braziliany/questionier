package fifty;
import java.io.*;
public class MoneyAward{
    public static double sumMoneyAward( double i){
        if (i<= 10 ){
            return i* 0.1 ;
      } else if (i< 20 ) {
            return ((i- 10 )* 0.075 + 1 );
      }
        else if (i< 40 ) {
            return (i- 20 )* 0.05 ;
      } else if (i< 60 ) {
            return (i- 40 )* 0.03 ;
      }
        else if (i< 100 ) {
            return (i- 60 )* 0.015 ;            
      } else {
            return (i- 100 )* 0.001 ;
      }
  }
    public static void main(String[] args) {
      BufferedReader br= new BufferedReader( new InputStreamReader(System.in));
        double I= 0 ;
        try {
          System.out.println( " 请输入当月利润 I:( 单位：万元） " );
          I=Integer.parseInt(br.readLine());
      } catch (Exception e) {
          e.printStackTrace();
      }
      System.out.println( " 奖金总数： " +sumMoneyAward(I)+ " 万 " );
  }
}
