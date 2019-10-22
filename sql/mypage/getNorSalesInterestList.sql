select a.*, c.INTEREST_SEQ, b.PHOTO_PATH
  from NORSALES a, (select a.NORSALES_NUM, a.PHOTO_PATH
                              from NORSALESPHOTO a, NORSALES b
                             where a.NORSALES_NUM=b.NORSALES_NUM 
                               and a.PHOTO_ORDER=1) b, SALESINTEREST c, AGENT d
 where a.NORSALES_NUM=c.NORSALES_NUM
   and a.NORSALES_NUM=b.NORSALES_NUM
   and a.AGENTID=d.AGENTID
   and d.BLACK_STATUS='N'
   and c.USERID = :id