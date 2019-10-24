update agent set agent_name = :n, agent_pass=:pass, agent_phone=:phone, agent_addr=:addr, document_name=:filename , document_path = 'agent/' || :path
where agentid=:id