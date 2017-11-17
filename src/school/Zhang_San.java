package school;

import java.util.Scanner;

/**输入张三的考试成绩，显示所获奖励：
成绩==100分，爸爸给他买辆车
成绩>=90分，妈妈给他买MP4
90分>成绩>=60分，妈妈给他买本参考书
成绩<60分，什么都不买
*/
public class Zhang_San {
	public static void main(String[] args) {
	int Score;
	Scanner sc=new Scanner(System.in);
	Score=sc.nextInt();
	if(Score==100) {
System.out.println("爸爸给他买辆车");
	}else if(Score>=90 & Score<100) {
System.out.println("妈妈给他买MP4");		
	}else if(Score>=60 & Score<90) {
System.out.println("妈妈给他买本参考书");		
	}else if(Score<60) {
System.out.println("什么都不买");
	sc.close();

}
}
}