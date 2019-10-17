select addr, name
from
    (select  regexp_substr(apt_addr, '\S+ \S+ \S+', 1, 1) addr,
            apt_name name,
            DISTNACE_WGS84(:lat, :lng, APT_LAT, APT_LNG) dist
    from    APT
    where   apt_name like '%' || :query || '%'
    order by dist asc)
where rownum <= :n