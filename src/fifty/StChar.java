package fifty;
import java.io.*;
import java.util.*;
public class StChar {
    public static Map<Integer,Integer> countchar(String str){
      Map<Integer,Integer> m= new HashMap<Integer,Integer>();
      m.put( 1 , 0 );
      m.put( 2 , 0 );
      m.put( 3 , 0 );
      m.put( 4 , 0 );
        char [] ch=str.toCharArray();
        for ( int i= 0 ;i<ch.length ;i++ ) {
            if (ch[i]>= 'a' &&ch[i]>= 'A' && ch[i]<= 'Z' )
              m.put( 1 ,m.get( 1 )+ 1 );
            else if (ch[i]== ' ' )
              m.put( 2 ,m.get( 2 )+ 1 );
            else if (ch[i]>= '0' && ch[i]<= '9' ) {
              m.put( 3 ,m.get( 3 )+ 1 );
          } else
              m.put( 4 ,m.get( 4 )+ 1 );
      }
        return m;
  }
    public static void main(String[] args) {
      BufferedReader buffer= new BufferedReader( new InputStreamReader(System.in));
      String str= null ;
        try {
          str=buffer.readLine();
      } catch (Exception e) {
          e.printStackTrace();
      }
      Map<Integer,Integer>m=countchar(str);
      Set<Integer>keys=m.keySet();
      Iterator<Integer> it=keys.iterator();
        int n,k;
        while (it.hasNext()){
          k=it.next();
          n=m.get(k);
            switch (k){
                case 1 :
              System.out.print( " 英文字母： " +n);
                break ;
                case 2 :
              System.out.print( " 空格： " +n);
                break ;
                case 3 :
              System.out.print( " 数字： " +n);
                break ;
                case 4 :
              System.out.print( " 其他字符： " +n);
                break ;
                default :
                    break ;
          }
      }
  }
}
