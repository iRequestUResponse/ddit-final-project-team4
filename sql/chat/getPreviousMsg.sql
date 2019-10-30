-- insert into chatroom
-- select  chatting_seq.nextval,
--         :userid,
--         :agentid,
--         sysdate
-- from    dual
-- where   not exists (    
--     select  *
--     from    chatroom
--     where   userid = :userid
--     and     agentid = :agentid
-- )

select  a.*
from    chat a, (select chatting_seq
                from    chatroom
                where   userid = :userid
                and     agentid = :agentid) b
where   a.chatting_seq = b.chatting_seq
order by a.chatting_date asc