-- https://tonyne.jeju.onl/2016/04/14/oracle-lat-lng-distnace-query/

-- select  *
-- from    APT
-- where   apt_addr like :sido || '%'
-- and     DISTNACE_WGS84(:lat, :lng, APT_LAT, APT_LNG) < 3.0

select  a.*,
        b.*
from    APT a,
    (select  a.apt_seq,
            b.build_type,
            round(avg(b.apt_area)) apt_area,
            round(avg(b.apt_price)) apt_price,
            round(avg(b.apt_deposit)) apt_deposit
    from    APT a, (select * from aptpurchase where build_type = :build_type) b
    where   a.apt_seq = b.apt_seq(+)
    and     a.apt_addr like :sido || '%'
    and     DISTNACE_WGS84(:lat, :lng, a.APT_LAT, a.APT_LNG) < 3.0
    group by a.apt_seq, b.build_type
    order by a.apt_seq) b
where a.apt_seq = b.apt_seq