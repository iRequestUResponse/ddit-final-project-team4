select  count(1) cnt
from    APT
where   apt_name like '%' || :query || '%'