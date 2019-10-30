select a.chat_seq, a.chatting_seq, a.userid, a.agentid
from    (select  a.chat_seq, a.chatting_seq, b.userid, b.agentid
        from    chat a, chatroom b
        where   a.chatting_seq = b.chatting_seq
        and     (b.userid = :id
        or      b.agentid = :id)
        ) a, (select * from readMsg where id = :id) b
where   a.chat_seq = b.chat_seq(+)
and     b.chat_seq is null