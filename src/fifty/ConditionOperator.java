package fifty;

import java.io.*;

//��������Ƕ������ɴ��⣺ѧϰ�ɼ��� = 90 �ֵ��� A ��ʾ�� 60 - 90 ��֮����� B ��ʾ�� 60 �����µ��� C ��ʾ
//������
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


      System.out.println( " ѧϰ�ɼ�Ϊ�� " +((N< 60 )? "C" :(N< 90 )? "B" : "A" ));


  }


  



}

