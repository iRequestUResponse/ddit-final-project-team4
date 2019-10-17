select  distinct regexp_substr(apt_addr, '\S+ \S+ ', 1, 1) || :query area
from    APT
where   apt_addr like '%' || :query || '%'