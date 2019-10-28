select a.*, b.cnt
from apt a,
(SELECT a.apt_seq, count(b.apt_seq) cnt from apt a, aptpurchase b
where a.apt_addr Like SUBSTR(:addr, 1, INSTR(:addr, ' ', 1, 2) - 1) || '%'
and b.apt_seq = a.apt_seq
group by a.apt_seq) b
where a.apt_seq = b.apt_seq
order by cnt desc