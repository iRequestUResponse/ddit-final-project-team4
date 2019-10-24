select a.OFFERHOUSE_SEQ, a.USERID, a.OFFERHOUSE_ADDR, a.OFFERHOUSE_ADDR2, a.OFFERHOUSE_AREA, 
        a.OFFERHOUSE_PYEONG, a.OFFERHOUSE_DELETE, a.OFFERHOUSE_STATUS, b.OFFERPHOTO_PATH
  from OFFERHOUSE a, OFFERPHOTO b
 where a.OFFERHOUSE_SEQ=b.OFFERHOUSE_SEQ
   and a.USERID=:id
   and b.OFFERPHOTO_ORDER=1
   and a.OFFERHOUSE_DELETE = 'N'