package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchBizConfigurationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class BizConfigurationDao extends BaseDao implements IBizConfigurationDao {
    
    public DataItemList selectBizConfigurationItems(SearchBizConfigurationParm parm) throws DaoException{
        return unifiedDao.getItemsPage ("bizConfiguration.selectBizConfigurationItems",parm);
    }
    
    public DataItemList selectDuplicateCheck(SearchBizConfigurationParm parm) throws DaoException{
        return unifiedDao.getItems ("bizConfiguration.selectDuplicateCheck",parm);
    }
    
	public DataItemList insertBizConfigurationItems(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"bizConfiguration.insertBizConfigurationItems", insertItems);
		setVersion(insertItems);			
		
		return insertItems;
	}

	public DataItemList updateBizConfigurationItems(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItems(null,"bizConfiguration.updateBizConfigurationItems", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}
}
