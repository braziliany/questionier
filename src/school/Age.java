package school;
//已知班级同学的平均年龄是18岁，请输入一个同学的年龄，然后打印他和平均年龄相差多少岁。
import java.util.Scanner;
public class Age {
	int a=18;
	static int b;
	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		System.out.println("请输入一个同学的年龄：");
		int  a=sc.nextInt();
		if(a>=18) {
			b=a-18;
		System.out.println("该同学和平均年龄相差"+b+"岁");	
		}else {
			b=18-a;
			System.out.println("该同学和平均年龄相差"+b+"岁");	
		}
		
	}

}
