package school;

import java.util.Scanner;

/**���������Ŀ��Գɼ�����ʾ��������
�ɼ�==100�֣��ְָ���������
�ɼ�>=90�֣����������MP4
90��>�ɼ�>=60�֣���������򱾲ο���
�ɼ�<60�֣�ʲô������
*/
public class Zhang_San {
	public static void main(String[] args) {
	int Score;
	Scanner sc=new Scanner(System.in);
	Score=sc.nextInt();
	if(Score==100) {
System.out.println("�ְָ���������");
	}else if(Score>=90 & Score<100) {
System.out.println("���������MP4");		
	}else if(Score>=60 & Score<90) {
System.out.println("��������򱾲ο���");		
	}else if(Score<60) {
System.out.println("ʲô������");
	sc.close();

}
}
}