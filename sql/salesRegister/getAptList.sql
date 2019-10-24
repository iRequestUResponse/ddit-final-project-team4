select  *
from    APT
where   apt_addr like '%' || :query || '%'