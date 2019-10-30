select CEIL(nvl(avg(apt_price), 0)) avgprice from aptpurchase
where apt_seq = :apt_seq
and build_type = '매매'
and (sysdate - apt_contractdate) <= 120