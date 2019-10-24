select notice_seq, NOTICE_TITLE, NOTICE_DATE
from
    (select    notice_seq, NOTICE_TITLE, NOTICE_DATE, ROWNUM RN
    from      notice
    where     notice_type = 1
    order by  notice_seq desc)
/*where RN between (:p - 1) * :s + 1 and :p * :s*/
