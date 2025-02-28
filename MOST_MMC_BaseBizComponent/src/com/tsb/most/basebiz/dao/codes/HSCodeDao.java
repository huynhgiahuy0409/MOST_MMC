package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchHSCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class HSCodeDao extends BaseDao implements IHSCodeDao{
	
	@Override
	public DataItemList selectHSCodeList(SearchHSCodeParm parm) throws DaoException{
		return unifiedDao.getItems("hsCode.selectHSCodeList",parm);
	}
	
//	@Override
//	public DataItemList selectCode(SearchGeneralCodeParm parm) throws DaoException{
//		return unifiedDao.getItems("generalCode.selectCode",parm);
//	}
//	
//	public DataItemList selectCodeMasterLargeCode(SearchGeneralCodeParm parm) throws DaoException{
//		return unifiedDao.getItems("generalCode.selectCodeMasterLargeCode",parm);
//	}
//	
	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
		
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);
		
		unifiedDao.insertItems(null, "hsCode.insertItems", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
		
		DataItemList updateItems = parm.getUpdateItems();
		
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null, "hsCode.updateItems", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null, "hsCode.deleteItems", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
//
//	@Override
//	public DataItemList selectCodeInUse(BaseBizParm parm) throws DaoException {
//	    return unifiedDao.getItems("generalCode.selectCodeInUse",parm);
//	}
	
	@Override
	public DataItemList duplicationHSCodeCheck(SearchHSCodeParm parm) throws DaoException {
		return unifiedDao.getItems("hsCode.duplicationHSCodeCheck", parm);
	}
	
	@Override
	public DataItemList selectHsCodePopup(SearchHSCodeParm parm) throws DaoException {
		return unifiedDao.getItems("hsCode.selectHsCodePopup", parm);
	}
}
