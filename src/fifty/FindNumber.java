package fifty;
//һ�������������� 100 ������ȫƽ�������ټ��� 168 ������ȫƽ���������ʸ����Ƕ��٣�
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
