package fifty;
//������������ x �� y �� z ������������ɴ�С���
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
           System.out.println( " ���������ݣ��磺 1,2,3,4" );
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
