-- https://tonyne.jeju.onl/2016/04/14/oracle-lat-lng-distnace-query/

select  *
from    APT
where   apt_addr like :sido || '%'
and     DISTNACE_WGS84(:lat, :lng, APT_LAT, APT_LNG) < 3.0