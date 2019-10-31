select  avg(apt_lat) as lat, avg(apt_lng) as lng
from    APT
where   apt_addr like '%' || :area || '%'
and     apt_name like '%' || nvl(:name, '') || '%'