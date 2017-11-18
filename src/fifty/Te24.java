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

       System.out.println( " ��һ�������� 5 λ���������� " );

       Scanner s= new Scanner(System.in);

        long n= 0 ;

        if (s.hasNext()) n=s.nextInt();

       List<Integer> l=explodeNumber(n);

       System.out.println( " ���ǣ� " +l.size()+ " λ�� " );

       Iterator<Integer> it=l.iterator();

        while (it.hasNext()) {

           System.out.print(it.next());

           

       }

       s.close();

   }

}

