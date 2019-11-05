select round(nvl(avg(price), 0),-4)/10000 cnt from aptsales
where apt_seq = :apt_seq
and sales_type = '매매'
and (sysdate - reg_date) <= 30