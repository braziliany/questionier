package fifty;
//一个整数，他加上 100 后是完全平方数，再加上 168 又是完全平方数，请问该数是多少？
public class FindNumber{
    public static void main(String[] args) {
        for ( int i= 0 ;i< 10000 ;i++ ) {
            if (Math.sqrt(i+ 100 )% 1 == 0 && Math.sqrt(i+ 268 )% 1 == 0 ) {
              System.out.println(i);
                break ;
          }
      }
  }
}
