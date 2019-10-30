-- https://tonyne.jeju.onl/2016/04/14/oracle-lat-lng-distnace-query/

-- select  *
-- from    APT
-- where   apt_addr like :sido || '%'
-- and     DISTNACE_WGS84(:lat, :lng, APT_LAT, APT_LNG) < 3.0

select a.*, b.maxprice, b.minprice
from
		(
		select  *
		from    APT
		where   apt_addr like :sido || '%'
		and     DISTNACE_WGS84(:lat, :lng, APT_LAT, APT_LNG) < 3.0
		) a,
		(
		select max(apt_price) maxprice, min(apt_price) minprice, apt_seq
		from aptpurchase
		where  build_type = '매매'
		and (sysdate - apt_contractdate) <= 180
		group by apt_seq
		) b
where	a.apt_seq = b.apt_seq