package fifty;

import java.util.*;

public class Te24{

    public static List<Integer> explodeNumber( long n){

       List<Integer> l= new ArrayList<Integer>();

        long cup=n;

        while (cup!= 0 ) {

           l.add(( int )(cup% 10 ));

           cup=cup/ 10 ;


       }

        return l;

   }

    public static void main(String[] args) {

       System.out.println( " 给一个不多余 5 位的正整数： " );

       Scanner s= new Scanner(System.in);

        long n= 0 ;

        if (s.hasNext()) n=s.nextInt();

       List<Integer> l=explodeNumber(n);

       System.out.println( " 他是： " +l.size()+ " 位数 " );

       Iterator<Integer> it=l.iterator();

        while (it.hasNext()) {

           System.out.print(it.next());

           

       }

       s.close();

   }

}

