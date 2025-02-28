package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchDefineHolidayCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class DefineHolidayCodeDao extends BaseDao implements IDefineHolidayCodeDao {

    public DataItemList selectDefineHolidayCodeList(SearchDefineHolidayCodeParm parm) throws DaoException {
        return unifiedDao.getItemsPage("defineHolidayCode.selectDefineHolidayCodeList", parm);
    }

    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"defineHolidayCode.insertItems", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
    }

    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);	
		
		unifiedDao.updateItems(null,"defineHolidayCode.updateItems", updateItems);
		
		setVersion(updateItems);			
		
		return updateItems;
    }

    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItems(null,"defineHolidayCode.deleteItems", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
    }
    
}
