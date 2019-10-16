select count(1) as cnt
from
(select userid as id
from users

union

select agentid as id
from agent)
where id = :id