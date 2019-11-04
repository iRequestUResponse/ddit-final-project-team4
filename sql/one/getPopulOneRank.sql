select a.*, b.black_status
from
(
select	a.*, b.photo_name, b.photo_path
from
		(select a.*, rank() over (order by view_cnt desc) as rank
		from norsales a, (select norsales_num , count(norsales_num) cnt
								from norsales
								where SUBSTR(address, 1, INSTR(address, ' ', 1, 1) - 1) like :si || '%'
								and SUBSTR(address, INSTR(address, ' ', 1, 1) + 1, INSTR(address, ' ', 1, 2) - INSTR(address, ' ', 1, 1) - 1) like :gu || '%'
								and SUBSTR(address, INSTR(address, ' ', 1, 2) + 1, INSTR(address, ' ', 1, 3) - INSTR(address, ' ', 1, 2) - 1) like :dong || '%'
								group by norsales_num
								order by cnt desc) b
		where	a.norsales_num = b.norsales_num
		and a.sales_status = 'Y') a,
		(select	*
		from		norsalesphoto
		where	photo_ORDER = 1
		) b
where	a.norsales_num = b.norsales_num(+)
) a,
agent b
where a.agentid = b.agentid
and b.black_status = 'N'