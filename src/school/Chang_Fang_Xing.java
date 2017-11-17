package school;

import java.util.Scanner;

public class Chang_Fang_Xing {

	/**
	 * 需求：
	 * 求一长方形的周长和面积
	 */
	//定义成员变量，长和宽
	private int length;
	private int width;
	//设置setXxx方法,注意获取长和宽的值在此处没意义，顾只设置set方法
	public void setLength(int length){
		this.length=length;
	}
	public void setWidth(int width){
		this.width=width;
	}
	//定义构造方法
	public Chang_Fang_Xing() {
		
	}
	//定义成员方法（周长）
	public int perimeter(){
		return (length+width)*2;
	}
	//定义成员方法（面积）
    public int area(){
    	return length*width;
    }
    //测试方法
    public static void main(String[] args) {
		//创建对象
    	Chang_Fang_Xing rec = new Chang_Fang_Xing();
    	Scanner sc = new Scanner(System.in);
    	System.out.println("请输入长方形的长：");
    	int inputlength = sc.nextInt();
    	System.out.println("请输入长方形的宽：");
    	int inputwidth = sc.nextInt();
    	rec.setLength(inputlength);
    	rec.setWidth(inputwidth);
    	System.out.println("长方形的周长是："+rec.perimeter());
    	System.out.println("长方形的面积长是："+rec.area());
	}
}