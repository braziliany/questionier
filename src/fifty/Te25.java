package fifty;
//��һ�� 5 λ�����ж����ǲ��ǻ�������
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
	       System.out.println( " ����һ������ " );
	       Scanner s= new Scanner(System.in);
	        long n= 0 ;
	        if (s.hasNext()) n=s.nextLong();
	       List<Integer> l=explodeNumber(n);
	       Integer[] a=(Integer[]) l.toArray( new Integer[]{});
	        for ( int i= 0 ;i<a.length/ 2 ;i++ ) {
	            if (!a[i] . equals(a[a.length-i- 1 ])) {
	               System.out.print( " ���ǻ����� " );
	                return ;
	           }
	           s.close();
	       }
	       System.out.print( " �ǻ����� " );
	   }
	}
