package fifty;
//��ӡ�����е�ˮ�ɻ�����
/** ��ӡ�����е�ˮ�ɻ�������ν " ˮ�ɻ��� " ��ָһ����λ�������λ���ֵ������͵��ڸ������� */


public class FindaffodilNumber {
	public static boolean isDaffodilNumber( int n){


        char [] ch=String.valueOf(n) . toCharArray();


        int cup = 0 ;


        for ( int i= 0 ;i<ch.length ;i++) {


              cup=cup+( int )Math.pow(Integer.parseInt(String.valueOf(ch[i])), 3 );


              


      }


        return (cup==n);



}


public static void main(String[] args) {


        for ( int i= 100 ;i< 1000 ;i++ ) {


                if (isDaffodilNumber(i)) {


                      System.out.print(i+ "," );


                      


              }


              


      }


}




}


