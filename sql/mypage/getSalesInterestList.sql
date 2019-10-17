select a.aptsales_num, a.sales_title, a.sales_cont, a.area, a.pyeong, a.whole_floor, a.relevant_floor, a.dong, b.PHOTO_PATH
  from APTSALES a, (select a.PHOTO_SEQ, a.PHOTO_PATH
                              from APTSALESPHOTO a, APTSALES b
                             where a.APTSALES_NUM=b.APTSALES_NUM 
                               and a.PHOTO_ORDER=1) b, SALESINTEREST c
 where a.APTSALES_NUM=c.APTSALES_NUM
   and c.USERID = :id