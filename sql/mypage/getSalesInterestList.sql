select a.aptsales_num, a.sales_title, a.sales_cont, a.pyeong, a.whole_floor, a.relevant_floor, a.dong, b.PHOTO_PATH, d.BLACK_STATUS, e.APT_NAME
  from APTSALES a, (select a.APTSALES_NUM, a.PHOTO_PATH
                              from APTSALESPHOTO a, APTSALES b
                             where a.APTSALES_NUM=b.APTSALES_NUM 
                               and a.PHOTO_ORDER=1) b, SALESINTEREST c, AGENT d, APT e
 where a.APTSALES_NUM=c.APTSALES_NUM
   and a.APTSALES_NUM=b.APTSALES_NUM
   and a.AGENTID=d.AGENTID
   and a.APT_SEQ=e.APT_SEQ
   and c.USERID = :id