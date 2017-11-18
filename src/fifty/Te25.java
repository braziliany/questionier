package fifty;
//：一个 5 位数，判断他是不是回文数。
	import java.util.*;
	public class Te25{
	    public static List<Integer> explodeNumber( long n){
	       List<Integer> l= new ArrayList<Integer>();
	        long cup=n;
	        while (cup!= 0 ){
	           l.add(( int )(cup% 10 ));
	           cup=cup/ 10 ;
	       }
	        return l;
	   }
	    public static void main(String[] args) {
	       System.out.println( " 输入一个数： " );
	       Scanner s= new Scanner(System.in);
	        long n= 0 ;
	        if (s.hasNext()) n=s.nextLong();
	       List<Integer> l=explodeNumber(n);
	       Integer[] a=(Integer[]) l.toArray( new Integer[]{});
	        for ( int i= 0 ;i<a.length/ 2 ;i++ ) {
	            if (!a[i] . equals(a[a.length-i- 1 ])) {
	               System.out.print( " 不是回文数 " );
	                return ;
	           }
	           s.close();
	       }
	       System.out.print( " 是回文数 " );
	   }
	}
