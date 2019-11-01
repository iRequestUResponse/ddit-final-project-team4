insert into SALESINTEREST(
  INTEREST_SEQ, 
  USERID, 
  NORSALES_NUM, 
  INTEREST_CALL
)
values(
  interest_seq.nextval, 
  :id, 
  :num, 
  'N'
)