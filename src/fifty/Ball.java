package fifty;
//һ��� 100 �׸߶��������£�ÿ����غ����ظ߶ȵ�һ�룬�����¡������ڵ�ʮ�����ʱ�������������ף���ʮ�η�����ߣ�

public class Ball{
    public static double sumBallHeight( double h, int n){
        if (n== 1 ) return h/ 2 ;
        else return sumBallHeight(h/ 2 ,n- 1 );
  }
    public static void main(String[] args) {
      System.out.println(sumBallHeight( 100 , 10 ));
  }
}
