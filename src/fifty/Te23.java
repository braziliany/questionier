package fifty;
//�� 5 ��������һ���ʵ�����˶����ꣿ��˵�ȵ��ĸ��˴� 2 �ꡣ�ʵ��ĸ�����������˵�ȵ������˴� 2 �ꡣ�ʵ������ˣ���������������һ���� 10 �꣬�������˶����ꡣ

public class Te23{
public static int getAge( int n){
    if (n== 1 ) return 10 ;
    else return getAge(n- 1 )+ 2 ;
}
public static void main(String[] args) {
   System.out.print(getAge( 5 ));
}
}
