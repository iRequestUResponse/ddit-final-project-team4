insert into APTSALESPHOTO (
  APTPHOTO_SEQ,
  APTSALES_NUM,
  PHOTO_NAME,
  PHOTO_PATH,
  PHOTO_ORDER
)
values (
  aptphoto_seq.nextval,
  :APTSALES_NUM,
  :PHOTO_NAME,
  :PHOTO_PATH,
  :PHOTO_ORDER
)