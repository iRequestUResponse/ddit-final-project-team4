update agent set agent_name = :name, agent_pass=:pass, agent_phone=:phone, agent_addr=:addr, document_name=:filename 
where agentid=:id