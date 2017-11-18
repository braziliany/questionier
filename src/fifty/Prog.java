package fifty;
/**两个乒乓球队进行比赛。各处三人。甲队为 a ， b ， c 三人。乙队为 x ， y ， z 三人。以抽签决定比赛名单。有人向队员打听比赛的名单。 a 说他不和 x 比， 
 * c 说他不和 x ， z 比，请编程找出三队赛手的名单。*/
public class Prog {
	public static void main(String[] args) {
        String[] team1 = { "a" , "b" , "c" };
        String[] team2 = { "x" , "y" , "z" };
          for ( int i= 0 ;i< 3 ;i++ ) {
                  for ( int j= 0 ;j< 3 ;j++ ) {
                          if (i== 0 && j== 0 )
                                  continue ;
                          else if (i== 2 &&(j== 0 || j== 2 ))
                                  continue ;
                          else {
                                System.out.println(team1[i]+ "<-->" +team2[j]);
                        }
                }
        }
}
}

