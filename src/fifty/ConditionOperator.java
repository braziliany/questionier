package fifty;

import java.io.*;

//利用条件嵌套来完成此题：学习成绩〉 = 90 分的用 A 表示， 60 - 90 分之间的用 B 表示， 60 分以下的用 C 表示
//有问题
public class ConditionOperator {


    public static void main(String[] args){


      BufferedReader bf= new BufferedReader( new InputStreamReader(System.in));


        int N= 0 ;


        try {


          BufferedReader buffer;
		N=Integer.parseInt(buffer.readLine());


      } catch (IOException e){


          e.printStackTrace();


          


      }


      System.out.println( " 学习成绩为： " +((N< 60 )? "C" :(N< 90 )? "B" : "A" ));


  }


  



}

