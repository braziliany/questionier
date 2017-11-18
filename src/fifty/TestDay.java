package fifty;
//输入某年某月某日，判断这一天是这一年的第几天？
import java.io.BufferedReader;
import java.io.InputStreamReader;
public class TestDay{
    public static boolean isLeapYear( int y){
        if (( y % 4 == 0 && y % 100 != 100 || y% 400 == 0 ))
            return true ;
        else
            return false ;
   }
    public static int sumDays( int y, int m, int d){
        int [] MonthDays={ 31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31 };
        if (isLeapYear(y)) MonthDays[ 1 ]= 29 ;
        int ans= 0 ;
        for ( int i= 0 ;i<m- 1 ;i++ ) {
           ans=ans+MonthDays[i];
       }
        return ans+d;
   }
    public static void main(String[] args) {
       BufferedReader br= new BufferedReader( new InputStreamReader(System.in));
       String in = null ;
        try {
           System.out.println( " 请输入年月日，例如： 2012-01-01" );
           in=br.readLine();
           } catch (Exception e) {
               System.out.print( " 格式错误 " );
           }
            int y=Integer.parseInt(in.substring( 0 ,in.indexOf( '-' )));
            int m=Integer.parseInt(in.substring(in.indexOf( '-' )+ 1 ,in.lastIndexOf( '-' )));
            int d=Integer.parseInt(in.substring(in.lastIndexOf( '-' )+ 1 ));
           System.out.println(sumDays(y,m,d));
   }
}
