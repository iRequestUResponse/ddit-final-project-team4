select  center_lat as lat, center_lng as lng
from    areaCenter
where   center_addr like '%' || :area || '%'