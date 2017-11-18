package fifty;
//输入三个整数 x ， y ， z 。请把三个数由大到小输出
import java.io.*;
import java.util.*;
public class Sort{
    public static List<Double> readDouble(String str,String sp){
       List<Double> l= new ArrayList<Double>();
        int j= 0 ;
        for ( int i= 0 ;i<str.length() ;i++ ) {
            if (str.substring(i,i+ 1 ) . equalsIgnoreCase(sp)) {
               l.add(Double.parseDouble(str.substring(j,i)));
               j=i+ 1 ;
           }
        } 
        return l;
   }
    public static void main(String[] args) {
       BufferedReader br= new BufferedReader( new InputStreamReader(System.in));
       List<Double> l= null ;
        try {
           System.out.println( " 请输入数据，如： 1,2,3,4" );
           l=readDouble(br.readLine(), "," );
           } catch (IOException e) {
               e.printStackTrace();
           }
           System.out.println(l.isEmpty());
           Collections.sort(l);
           Iterator<Double> it=l.iterator();
            while (it.hasNext()) {
               System.out.println(it.next()+ " " );
           }
   }
}
