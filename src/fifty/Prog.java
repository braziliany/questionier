package fifty;
/**����ƹ����ӽ��б������������ˡ��׶�Ϊ a �� b �� c ���ˡ��Ҷ�Ϊ x �� y �� z ���ˡ��Գ�ǩ���������������������Ա���������������� a ˵������ x �ȣ� 
 * c ˵������ x �� z �ȣ������ҳ��������ֵ�������*/
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

