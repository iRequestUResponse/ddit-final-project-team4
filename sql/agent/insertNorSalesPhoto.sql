insert into NORSALESPHOTO (
  NORPHOTO_SEQ,
  NORSALES_NUM,
  PHOTO_NAME,
  PHOTO_PATH,
  PHOTO_ORDER
)
values (
  norphoto_seq.nextval,
  :NORSALES_NUM,
  :PHOTO_NAME,
  :PHOTO_PATH,
  :PHOTO_ORDER
)