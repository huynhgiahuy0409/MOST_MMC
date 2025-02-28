package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.dao.configuration.ITerminalDefinitionDao;
import com.tsb.most.basebiz.parm.configuration.SearchTerminalDefinitionParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TerminalDefinition extends MOSTBaseService implements ITerminalDefinition{
    private ITerminalDefinitionDao terminalDefinitionDao;
	
	public void setTerminalDefinitionDao(ITerminalDefinitionDao terminalDefinitionDao) {
		this.terminalDefinitionDao = terminalDefinitionDao;
	}
	
    public DataItemList selectTerminalDefinition(SearchTerminalDefinitionParm parm) throws BizException {
    	return terminalDefinitionDao.selectTerminalDefinition(parm);
    }
    
    public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
	     return terminalDefinitionDao.updateItems(parm);
    }
}
