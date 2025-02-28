package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchCountryCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CountryCodeDao extends BaseDao implements ICountryCodeDao {
	
	@Override
	public DataItemList selectCountryCodes(SearchCountryCodeParm parm) throws DaoException{
		return unifiedDao.getItemsPage("countryCode.selectContryCode",parm);
	}
	
	@Override
	public DataItemList countryCodeDuplicateCheck(SearchCountryCodeParm parm) throws DaoException{
		return unifiedDao.getItems("countryCode.countryCodeDuplicateCheck",parm);
	}
	
	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"countryCode.insertContryCodeItem", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
	}
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"countryCode.updateContryCodeItem", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}
	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"countryCode.deleteContryCodeItem", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
}
