package fifty;
//Êä³ö 9 * 9 ¿Ú¾÷¡£
public class Mathe{
    public static void main(String args[]){
for ( int n= 1 ;n <= 9 ; n++){
                      //2.loop(1.2.3.4.)
                      //1*5=5 2*5=10 3*5=15 4*5=20 5*5=25   i * n= (i*n)
                      for ( int i= 1 ; i <=  n  ; i++){
                           System.out.print(i+ "*" + n + "=" +(i*n)+ "\t" );
                   }
                   System.out.println();
           }
   }
}
