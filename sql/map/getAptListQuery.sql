select  *
from    APT
where   apt_addr like '%' || :area || '%'
and     apt_name like '%' || nvl(:name, '') || '%'