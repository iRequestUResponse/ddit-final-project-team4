select a.*, b.PHOTO_PATH
  from APTSALES a, (select a.APTSALES_NUM, a.PHOTO_PATH
                              from APTSALESPHOTO a, APTSALES b
                             where a.APTSALES_NUM=b.APTSALES_NUM 
                               and a.PHOTO_ORDER=1) b, AGENT c
 where a.APTSALES_NUM=b.APTSALES_NUM
   and a.AGENTID=c.AGENTID
   and a.APT_SEQ=:seq
   and c.BLACK_STATUS='N'