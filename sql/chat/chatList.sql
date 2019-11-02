select  a.*, nvl(b.cnt, 0) cnt, :id id
from    chatroom a, (select a.chatting_seq, count(a.chat_seq) cnt
                    from    (select  a.chat_seq, a.chatting_seq, b.userid, b.agentid
                            from    chat a, chatroom b
                            where   a.chatting_seq = b.chatting_seq
                            and     (b.userid = :id or b.agentid = :id)
                            ) a, (select * from readMsg where id = :id) b
                    where   a.chat_seq = b.chat_seq(+)
                    and     b.chat_seq is null
                    group by a.chatting_seq
                    ) b
where   (userid = :id or agentid = :id)
and     a.chatting_seq = b.chatting_seq(+)