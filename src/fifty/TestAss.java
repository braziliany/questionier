//求 s=a+aa+aaa+aaaa+aa.. . a 的值，其中 a 是一个数字。例如 2 + 22 + 222 + 2222 + 22222 （此时共有 5 个数相加，几个数相加由键盘控制）。
package fifty;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;;
public class TestAss {
        public static long sumAss( int a, int n){
                long cup= 0 ;
                long ans= 0 ;
                for ( int i= 0 ;i<n;i++){
                      cup= 0 ;
                        for ( int j= 0 ;j<i;j++){
                      cup=cup+a*( long )Math.pow( 10 , j);
                      }
              ans=ans+cup;
              }
        return ans;
      }
public static void main(String[] args){
      BufferedReader buffer= new BufferedReader( new InputStreamReader(System.in));
        int n= 0 ;
        try {
              n=Integer.parseInt(buffer.readLine());
      } catch (IOException e){
              e.printStackTrace();
      }
      System.out.println(sumAss( 20 ,n));
}
}
