package fifty;
import java.io.*;
public class Te6{
public static int getGCDNormal( int m, int n){
int i=(m>n?n:m);
for (;i> 1 ;i-- ) {
if (m%i== 0 && n%i== 0 )
return i;
}
 return 1 ;
}
public static int getGCD( int m, int n){
if (m%n== 0 )
 return n;
 else return getGCD(n,m%n);
  }
    public static int getLCM( int m, int n){
        return (m*n)/getGCD(m,n); // ��С��������������֮�ͳ������Լ��
  }
    public static void main(String[] args) {
      BufferedReader buffer = new BufferedReader( new InputStreamReader(System.in));
        int m= 0 ,n= 0 ;
        try {
          System.out.println("����һ������m��");
          m=Integer.parseInt(buffer.readLine());
          System.out.println("������һ������n��");
          n=Integer.parseInt(buffer.readLine());
      } catch (IOException e){
          e.printStackTrace();
      }
      System.out.println( " ��С�������� " +getLCM(m,n));
      System.out.println( " ���Լ���� " +getGCD(m,n));
  }
}
