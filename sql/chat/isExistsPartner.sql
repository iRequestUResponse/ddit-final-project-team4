select sum(cnt) cnt
from (select  count(1) cnt
      from    users
      where   userid = :partner

      union

      select  count(1) cnt
      from    agent
      where   agentid = :partner
      )