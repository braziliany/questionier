
package school;

public class Teacher {
	private String name;
	private String school;
	public Teacher(String myName,String mySchool) {
		name=myName;
		school=mySchool;
		}
	public void giveLesson() {
		System.out.println("知识点讲解");
		System.out.println("总结提问");
	}
	public void introduction() {
		System.out.println("大家好！我是" + school + "的" + name + "。");
	}
	

	
}
