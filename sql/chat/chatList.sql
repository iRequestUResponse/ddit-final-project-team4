select  *
from    chatroom
where   (userid = :id or agentid = :id)