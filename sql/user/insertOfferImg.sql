insert into offerphoto (OFFERPHOTO_SEQ, OFFERHOUSE_SEQ, OFFERPHOTO_NAME, OFFERPHOTO_PATH, OFFERPHOTO_ORDER)
values (offerphoto_seq.nextval, :offerNum, :filename, :path, :photoOrder)