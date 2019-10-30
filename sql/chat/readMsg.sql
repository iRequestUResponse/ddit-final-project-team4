insert into readmsg (chat_seq, id)
select  chat_seq, :id
from    chat
where   chatting_seq = (select  chatting_seq
                        from    chat
                        where   chat_seq = :chat_seq)
and     chat_seq <= :chat_seq
and     chat_seq not in (select chat_seq from readmsg where id = :id)
order by 1 asc