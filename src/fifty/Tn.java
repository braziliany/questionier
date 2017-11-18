package fifty;
//有 1 ， 2 ， 3 ， 4 个数字，能组成多少个互不相同且无重复数字的三位数？都是多少？
public class Tn {
	 public static void main(String[] args) {
	        for ( int i= 1 ;i<= 4 ;i++ ) {
	            for ( int j= 1 ; j<= 4 ;j++ ) {
	                if (j==i)
	                    continue ;
	                for ( int k= 1 ; k<= 4 ;k++ ) {
	                    if (k==j||k==i)
	                        continue ;
	                  System.out.print(i* 100 +j* 10 +k+ "," );
	              }
	          }
	      }
	  }
	}

