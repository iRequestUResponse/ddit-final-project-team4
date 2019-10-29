select a.*, b.cnt, SUBSTR(a.apt_addr, INSTR(a.apt_addr, ' ', 1, 2) + 1, INSTR(a.apt_addr, ' ', 1, 2) - INSTR(a.apt_addr, ' ', 1, 1)) dong, rank() over (order by cnt desc) as rank
from apt a,
(SELECT a.apt_seq, count(b.apt_seq) cnt from apt a, aptpurchase b
where a.apt_addr Like SUBSTR(:addr, 1, INSTR(:addr, ' ', 1, 3) - 1) || '%'
and b.apt_seq = a.apt_seq
group by a.apt_seq) b
where a.apt_seq = b.apt_seq
order by cnt desc