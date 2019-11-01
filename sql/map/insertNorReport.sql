INSERT INTO REPORT(
  REPORT_SEQ, 
  NORSALES_NUM, 
  USERID, 
  REPORT_REASON, 
  REPORT_CONT, 
  REPORT_DATE, 
  PROCESSING_STATUS
)
VALUES(
  report_seq.nextval, 
  :num, 
  :id, 
  :rea, 
  :cont, 
  SYSDATE, 
  'N'
)