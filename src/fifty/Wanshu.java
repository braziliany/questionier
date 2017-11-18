package fifty;
//一个数如果恰好等于它的因子之和，这个数就称为完数。例如 6 = 1 + 2 + 3. 编程找出 1000 以内的完数
public class Wanshu {
    public static boolean isWanshu( int a){
            int cup= 0 ;
            for ( int i= 1 ;i<a;i++){
                    if (a%i== 0 )
                          cup=cup+i;
                  }
            return (cup==a);
  }
    public static void main(String[] args){
            for ( int i= 1 ;i< 1000 ;i++){
                    if (isWanshu(i)){
                          System.out.println(i+ "," );
                  }
          }
  }
}
