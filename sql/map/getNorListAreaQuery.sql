select  *
from    areaCenter
where   center_addr like '%' || :query || '%'
order by 1