SELECT distinct SUBSTR(offerhouse_addr, INSTR(offerhouse_addr, ' ', 1, 1) + 1, 
                INSTR(offerhouse_addr, ' ', 1, 2) - INSTR(offerhouse_addr, ' ', 1, 1) - 1) gugun from offerhouse
where SUBSTR(offerhouse_addr, 1, INSTR(offerhouse_addr, ' ', 1, 1) - 1) LIKE :sido