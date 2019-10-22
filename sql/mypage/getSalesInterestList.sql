select a.*, c.INTEREST_SEQ, b.PHOTO_PATH, e.APT_NAME, e.COMPLETION_DATE, e.APT_ADDR
  from APTSALES a, (select a.APTSALES_NUM, a.PHOTO_PATH
                              from APTSALESPHOTO a, APTSALES b
                             where a.APTSALES_NUM=b.APTSALES_NUM 
                               and a.PHOTO_ORDER=1) b, SALESINTEREST c, AGENT d, APT e
 where a.APTSALES_NUM=c.APTSALES_NUM
   and a.APTSALES_NUM=b.APTSALES_NUM
   and a.AGENTID=d.AGENTID
   and a.APT_SEQ=e.APT_SEQ
   and d.BLACK_STATUS='N'
   and c.USERID = :id