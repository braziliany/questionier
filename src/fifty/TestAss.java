//�� s=a+aa+aaa+aaaa+aa.. . a ��ֵ������ a ��һ�����֡����� 2 + 22 + 222 + 2222 + 22222 ����ʱ���� 5 ������ӣ�����������ɼ��̿��ƣ���
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
