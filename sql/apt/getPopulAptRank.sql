select	rank() over (order by b.cnt desc) as rank, a.*, b.cnt
from		apt a, 	(select	a.apt_seq, count(b.apt_seq) cnt
						from		APT a, aptpurchase b
						where	SUBSTR(apt_addr, 1, INSTR(apt_addr, ' ', 1, 1) - 1) like :si || '%'
						and SUBSTR(apt_addr, INSTR(apt_addr, ' ', 1, 1) + 1, INSTR(apt_addr, ' ', 1, 2) - INSTR(apt_addr, ' ', 1, 1) - 1) like :gu || '%'
						and SUBSTR(apt_addr, INSTR(apt_addr, ' ', 1, 2) + 1, INSTR(apt_addr, ' ', 1, 3) - INSTR(apt_addr, ' ', 1, 2) - 1) like :dong || '%'
						and		a.apt_seq = b.apt_seq
						group by a.apt_seq
						order by cnt desc) b
where	a.apt_seq = b.apt_seq