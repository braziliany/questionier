package school;

//������5��ͬѧ�ĳɼ���Ȼ�������ǵ��ܳɼ���ƽ���ɼ���

import java.util.Scanner;
public class Cheng_Ji {
  private int a;
  private int b;
  private int c;
  private int d;
  private int e;
public void setA(int a) {
	this.a = a;
}
public void setB(int b) {
	this.b = b;
}
public void setC(int c) {
	this.c = c;
}
public void setD(int d) {
	this.d = d;
}
public void setE(int e) {
	this.e = e;
}
public int All() {
	return a+b+c+d+e;
}
public int Avage() {
	return (a+b+c+d+e)/5;
}
public static void main(String[] args) {
	Cheng_Ji ss=new Cheng_Ji();
	Scanner sc=new Scanner(System.in);
	System.out.println("������Aͬѧ�ĳɼ���");
	int inputa=sc.nextInt();
	System.out.println("������Bͬѧ�ĳɼ���");
	int inputb=sc.nextInt();
	System.out.println("������Cͬѧ�ĳɼ���");
	int inputc=sc.nextInt();
	System.out.println("������Dͬѧ�ĳɼ���");
	int inputd=sc.nextInt();
	System.out.println("������Eͬѧ�ĳɼ���");
	int inpute=sc.nextInt();
	ss.setA(inputa);
	ss.setB(inputb);
	ss.setC(inputc);
	ss.setD(inputd);
	ss.setE(inpute);
	System.out.println("��λͬѧ���ܳɼ��ǣ�"+ss.All());
	System.out.println("��λͬѧ��ƽ���ɼ��ǣ�"+ss.Avage());
	sc.close();
}

  

}
