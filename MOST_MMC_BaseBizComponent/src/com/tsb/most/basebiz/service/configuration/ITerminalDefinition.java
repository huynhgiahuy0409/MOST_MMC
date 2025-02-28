package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchTerminalDefinitionParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITerminalDefinition {
	public DataItemList selectTerminalDefinition(SearchTerminalDefinitionParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
}
