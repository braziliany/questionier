package fifty;
/**猴子吃桃问题：猴子第一天摘下若干个桃子，当即吃掉了一半，还不过瘾，又多吃了一个，第二天早上又将剩下的桃子吃掉一半，又多吃了一个。以后每天早上都吃了前一天剩下的一半零一个。
到第十天早上想再吃时，见只剩下一个桃子。求第一天共摘了多少？*/
public class MonkeyEatPeach{
    public static int getNum( int d){
            if (d== 0 ) return 1 ;
            else return (getNum(d- 1 )+ 1 )* 2 ;
  }
    public static void main(String[] args) {
          System.out.println(getNum( 10 ));
  }
}
