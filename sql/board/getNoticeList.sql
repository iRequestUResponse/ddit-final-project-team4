select notice_seq, NOTICE_TITLE, NOTICE_DATE
from
    (select    notice_seq, NOTICE_TITLE, NOTICE_DATE, ROWNUM RN
    from      notice
    order by  notice_seq desc)