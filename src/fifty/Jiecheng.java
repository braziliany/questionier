package fifty;
//�� 1 + 2 �� + 3 !+...+ 20 ! �ĺ�
public class Jiecheng {

	public static long jieCheng( int n){

        if (n == 1 ) return 1 ;

        else return jieCheng(n- 1 )*n;

   }

    public static void main(String[] args) {

        long ans= 0 ;

        for ( int i= 1 ;i<= 20 ;i++ ) {

           ans=ans+jieCheng(i);


       }

       System.out.print(ans+ "\n" );

   }


}

