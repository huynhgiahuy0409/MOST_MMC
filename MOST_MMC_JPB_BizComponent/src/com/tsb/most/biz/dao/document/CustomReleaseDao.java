package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchCustomerCleranceParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CustomReleaseDao extends BaseDao implements ICustomReleaseDao {

	@Override
	public DataItemList getCustomsCargoReleaseList(SearchCustomerCleranceParm parm) throws DaoException {
		return unifiedDao.getItems("customRelease.selectCustomsCargoReleaseList", parm);
	}

	@Override
	public DataItemList getBlList(SearchCustomerCleranceParm parm) throws DaoException { 
		return unifiedDao.getItems("customRelease.selectBlList", parm);
	}

	@Override
	public DataItemList getShippingNoteList(SearchCustomerCleranceParm parm) throws DaoException {
		return unifiedDao.getItems("customRelease.selectShippingNoteList", parm);
	}

	@Override
	public DataItemList insertCustomsCargoReleaseItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"customRelease.insertCustomsCargoReleaseItems", insertItems);
		setVersion(insertItems);	
		return insertItems;
	}

	@Override
	public DataItemList insertNewCustomsCargoReleaseItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"customRelease.insertNewCustomsCargoReleaseItems", insertItems);
		setVersion(insertItems);	
		return insertItems;
	}

	@Override
	public boolean getCustomsCargoReleaseExistCheck(SearchCustomerCleranceParm parm) throws DaoException {
		DataItemList result = unifiedDao.getItems("customRelease.selectIsCustomsCargoReleaseExist", parm);
		String value = (String) result.getCollection().get(0);
		if(value != null && !value.equals("0")) {
			return true;
		}
		return false;
	}

}
