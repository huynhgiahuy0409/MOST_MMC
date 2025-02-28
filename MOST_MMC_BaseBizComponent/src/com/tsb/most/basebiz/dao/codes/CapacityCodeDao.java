package com.tsb.most.basebiz.dao.codes;


import com.tsb.most.basebiz.parm.codes.SearchCapacityCodeParm;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CapacityCodeDao extends BaseDao implements ICapacityCodeDao{

	public DataItemList getCodeMasterList(SearchCodeMasterParm param) throws DaoException {
    	return unifiedDao.getItemsPage("capacityCode.getCodeMasterList",param);
    }
	
    public DataItemList selectCapacityCodeList(SearchCapacityCodeParm param) throws DaoException {
    	return unifiedDao.getItemsPage("capacityCode.selectCapacityCodeList",param);
    }

	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"capacityCode.insertCapacityCode", insertItems);
		setVersion(insertItems);			
		
		return insertItems;
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"capacityCode.updateCapacityCode", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"capacityCode.deleteCapacityCode", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
		
	}
}