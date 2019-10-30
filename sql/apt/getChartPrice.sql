select ROUND(nvl(avg(apt_price), 0)) as avgprice, to_char(apt_contractdate, 'YYYY-MM') as mon
from aptpurchase a, apt b
where apt_contractdate >= '2018-01-01' 
and apt_contractdate < '2019-09-23'
and a.apt_seq = b.apt_seq
and b.apt_seq = :apt_seq
and a.build_type = '매매'
group by to_char(apt_contractdate, 'YYYY-MM')
order by 2