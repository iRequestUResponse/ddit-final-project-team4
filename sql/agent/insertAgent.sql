insert into agent (AGENTID, AGENT_PASS, AGENT_NAME, AGENT_PHONE, AGENT_ADDR, AGENT_APPR, AGENT_WITHDRAWAL, BLACK_STATUS, DOCUMENT_NAME)
values (:id, :pass, :name, :phone, :addr,'N','N','N', :filename)