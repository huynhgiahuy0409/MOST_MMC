package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchTerminalDefinitionParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITerminalDefinitionDao {
    public DataItemList selectTerminalDefinition(SearchTerminalDefinitionParm parm) throws DaoException ;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
}    
