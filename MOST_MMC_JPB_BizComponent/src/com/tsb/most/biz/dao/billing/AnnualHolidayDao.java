package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchAnnualHolidayParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class AnnualHolidayDao extends BaseDao implements IAnnualHolidayDao {

    public DataItemList selectAnnualHoliday(SearchAnnualHolidayParm parm) throws DaoException {
        return unifiedDao.getItems("annualHoliday.selectAnnualHoliday", parm);
    }

    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"annualHoliday.insertItems", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
    }

    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);	
		
		unifiedDao.updateItems(null,"annualHoliday.updateItems", updateItems);
		
		setVersion(updateItems);			
		
		return updateItems;
    }

    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItems(null,"annualHoliday.deleteItems", deleteItems);
		
		setVersion(deleteItems);
		
		return deleteItems;
    }
   
}