package school;

//请输入5个同学的成绩，然后求他们的总成绩和平均成绩。

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
	System.out.println("请输入A同学的成绩：");
	int inputa=sc.nextInt();
	System.out.println("请输入B同学的成绩：");
	int inputb=sc.nextInt();
	System.out.println("请输入C同学的成绩：");
	int inputc=sc.nextInt();
	System.out.println("请输入D同学的成绩：");
	int inputd=sc.nextInt();
	System.out.println("请输入E同学的成绩：");
	int inpute=sc.nextInt();
	ss.setA(inputa);
	ss.setB(inputb);
	ss.setC(inputc);
	ss.setD(inputd);
	ss.setE(inpute);
	System.out.println("五位同学的总成绩是："+ss.All());
	System.out.println("五位同学的平均成绩是："+ss.Avage());
	sc.close();
}

  

}
