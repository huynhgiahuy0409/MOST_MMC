package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchTerminalDefinitionParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TerminalDefinitionDao extends BaseDao implements ITerminalDefinitionDao{

    public DataItemList selectTerminalDefinition(SearchTerminalDefinitionParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("terminalDefinition.selectTerminalDefinition", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		setNewVersion(updateItems);
    		unifiedDao.updateItemsWithTimeCheck(null,"terminalDefinition.updateTerminalDefinition", updateItems);
    		setVersion(updateItems);
    		return updateItems;
    		
    	}catch (Exception e) {
			e.printStackTrace();
			throw new DaoException(e);
		}
    }
}
