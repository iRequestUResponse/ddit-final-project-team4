select max(apt_price) maxprice, min(apt_price) minprice 
from aptpurchase
where apt_seq = :apt_seq
and build_type = '매매'
and (sysdate - apt_contractdate) <= 180