package school;

import java.util.Scanner;

public class Chang_Fang_Xing {

	/**
	 * ����
	 * ��һ�����ε��ܳ������
	 */
	//�����Ա���������Ϳ�
	private int length;
	private int width;
	//����setXxx����,ע���ȡ���Ϳ��ֵ�ڴ˴�û���壬��ֻ����set����
	public void setLength(int length){
		this.length=length;
	}
	public void setWidth(int width){
		this.width=width;
	}
	//���幹�췽��
	public Chang_Fang_Xing() {
		
	}
	//�����Ա�������ܳ���
	public int perimeter(){
		return (length+width)*2;
	}
	//�����Ա�����������
    public int area(){
    	return length*width;
    }
    //���Է���
    public static void main(String[] args) {
		//��������
    	Chang_Fang_Xing rec = new Chang_Fang_Xing();
    	Scanner sc = new Scanner(System.in);
    	System.out.println("�����볤���εĳ���");
    	int inputlength = sc.nextInt();
    	System.out.println("�����볤���εĿ�");
    	int inputwidth = sc.nextInt();
    	rec.setLength(inputlength);
    	rec.setWidth(inputwidth);
    	System.out.println("�����ε��ܳ��ǣ�"+rec.perimeter());
    	System.out.println("�����ε�������ǣ�"+rec.area());
	}
}