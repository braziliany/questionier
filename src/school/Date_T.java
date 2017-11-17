package school;
import java.util.*;


public class Date_T {


     public static void main(String[] args) {

            


            

            Calendar c = Calendar.getInstance();

            System.out.println(c);

            System.out.println(c.get(Calendar.YEAR) + "-" + c.get(Calendar.MONTH)

                            + "-" + c.get(Calendar.DAY_OF_MONTH));

            Calendar c2 = new GregorianCalendar( 2012 , 5 , 8 , 6 , 25 , 40 );

            System.out.println(c2.get(Calendar.YEAR) + "-" + c2.get(Calendar.MONTH)

                            + "-" + c2.get(Calendar.DAY_OF_MONTH));

                            c.add(Calendar.MONTH, 3 );

            System.out.println(c.get(Calendar.YEAR) + "-" + c.get(Calendar.MONTH)

                            + "-" + c.get(Calendar.DAY_OF_MONTH));

            System.out.println(c.after(c2));

            System.out.println(c.before(c2));

             int year = 2013 ;

             int month = 3 ;

             int day = 0 ;

            Calendar c3 = new GregorianCalendar(year, month, 1 );

             switch (month) {

             case 0 :         case 2 :         case 4 :         case 6 :        

             case 7 :         case 9 :         case 11 : day = 31 ;         break ;

             case 3 :         case 5 :         case 8 :         case 10 :

                    day = 30 ;                         break ;

             case 1 :

                     if ( new GregorianCalendar() . isLeapYear(year)) {        day = 29 ;

                    } else {day = 28 ;}         break ;

            }

             int xingqiji = c3.get(Calendar.DAY_OF_WEEK);

            System.out.println(xingqiji);

             int i = 1 ;

             for (i = 1 ; i < xingqiji; i++) 

            {

                    System.out.print( "   " );                

                    }

             for ( int j = 1 ; j <= day; j++, i++) 

            {

                    System.out.print(j);

                         if (j <= 9 ) {System.out.print( "  " );

                         

                    } else 

                    {

                            System.out.print( " " );        

                            }

                     if (i % 7 == 0 ) {        

                            System.out.println();        

                            }

            }


    }


}
