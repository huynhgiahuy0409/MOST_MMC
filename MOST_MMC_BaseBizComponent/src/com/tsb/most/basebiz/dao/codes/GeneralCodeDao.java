package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchGeneralCodeParm;
import com.tsb.most.framework.bizparm.BaseBizParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class GeneralCodeDao extends BaseDao implements IGeneralCodeDao{
	@Override
	public DataItemList selectCodesList(SearchGeneralCodeParm parm) throws DaoException{
		return unifiedDao.getItemsPage("generalCode.selectCodesList",parm);
	}
	
	@Override
	public DataItemList selectCode(SearchGeneralCodeParm parm) throws DaoException{
		return unifiedDao.getItems("generalCode.selectCode",parm);
	}
	
	public DataItemList selectCodeMasterLargeCode(SearchGeneralCodeParm parm) throws DaoException{
		return unifiedDao.getItems("generalCode.selectCodeMasterLargeCode",parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"generalCode.insertGeneralCodeItem", insertItems);
		setVersion(insertItems);			
		
		return insertItems;
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"generalCode.updateGeneralCodeItem", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"generalCode.deleteGeneralCodeItem", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}

	@Override
	public DataItemList selectCodeInUse(BaseBizParm parm) throws DaoException {
	    return unifiedDao.getItems("generalCode.selectCodeInUse",parm);
	}
}
