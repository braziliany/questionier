
package school;

public class Teacher {
	private String name;
	private String school;
	public Teacher(String myName,String mySchool) {
		name=myName;
		school=mySchool;
		}
	public void giveLesson() {
		System.out.println("֪ʶ�㽲��");
		System.out.println("�ܽ�����");
	}
	public void introduction() {
		System.out.println("��Һã�����" + school + "��" + name + "��");
	}
	

	
}
