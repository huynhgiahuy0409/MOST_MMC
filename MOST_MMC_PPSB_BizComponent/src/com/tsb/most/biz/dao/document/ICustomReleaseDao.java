package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchCustomerCleranceParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICustomReleaseDao {
	public DataItemList getCustomsCargoReleaseList(SearchCustomerCleranceParm parm) throws DaoException;

	public DataItemList getBlList(SearchCustomerCleranceParm parm) throws DaoException;
	
	public DataItemList getShippingNoteList(SearchCustomerCleranceParm parm) throws DaoException;
	
	public DataItemList insertCustomsCargoReleaseItems(InsertItemsBizParm parm) throws DaoException;
	
	public DataItemList insertNewCustomsCargoReleaseItems(InsertItemsBizParm parm) throws DaoException;
	
	public boolean getCustomsCargoReleaseExistCheck(SearchCustomerCleranceParm parm) throws DaoException;
}
