package school;
//��֪�༶ͬѧ��ƽ��������18�꣬������һ��ͬѧ�����䣬Ȼ���ӡ����ƽ�������������ꡣ
import java.util.Scanner;
public class Age {
	int a=18;
	static int b;
	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		System.out.println("������һ��ͬѧ�����䣺");
		int  a=sc.nextInt();
		if(a>=18) {
			b=a-18;
		System.out.println("��ͬѧ��ƽ���������"+b+"��");	
		}else {
			b=18-a;
			System.out.println("��ͬѧ��ƽ���������"+b+"��");	
		}
		
	}

}
