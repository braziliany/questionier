package fifty;
//将一个正整数分解质因数
import java.io.BufferedReader;


import java.io.IOException;


import java.io.InputStreamReader;




public class Explode {


        public static boolean isP( int n){


                if (n== 2 ) return true ;


                for ( int i= 2 ;i<=n/ 2 ;i++){


                        if (n%i== 0 )


                                return false ;


                      


              }


                return true ;


      }


        public static void main(String[] args){


              BufferedReader buffer= new BufferedReader( new InputStreamReader(System.in));


                int N= 0 ;


                try {


                      N=Integer.parseInt(buffer.readLine());


              } catch (IOException e){


                      e.printStackTrace();


              }


              System.out.println(N+ "=" );


                for ( int i= 2 ;i<N;i++){


                        if (!isP(i)) continue ;


                        while (N%i== 0 ){


                              System.out.print(i);


                              N=N/i;


                                if (N!= 1 )


                                      System.out.print( "*" );


                                else break ;


                      }


              }


                if (N != 1 )


                      System.out.println(N);


      }



}

