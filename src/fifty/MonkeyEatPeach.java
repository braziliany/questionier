package fifty;
/**���ӳ������⣺���ӵ�һ��ժ�����ɸ����ӣ������Ե���һ�룬������񫣬�ֶ����һ�����ڶ��������ֽ�ʣ�µ����ӳԵ�һ�룬�ֶ����һ�����Ժ�ÿ�����϶�����ǰһ��ʣ�µ�һ����һ����
����ʮ���������ٳ�ʱ����ֻʣ��һ�����ӡ����һ�칲ժ�˶��٣�*/
public class MonkeyEatPeach{
    public static int getNum( int d){
            if (d== 0 ) return 1 ;
            else return (getNum(d- 1 )+ 1 )* 2 ;
  }
    public static void main(String[] args) {
          System.out.println(getNum( 10 ));
  }
}
