package fifty;
//有 5 个人坐在一起，问第五个人多少岁？他说比第四个人打 2 岁。问第四个人岁数，他说比第三个人大 2 岁。问第三个人，。。。。。，第一个人 10 岁，求第五个人多少岁。

public class Te23{
public static int getAge( int n){
    if (n== 1 ) return 10 ;
    else return getAge(n- 1 )+ 2 ;
}
public static void main(String[] args) {
   System.out.print(getAge( 5 ));
}
}
