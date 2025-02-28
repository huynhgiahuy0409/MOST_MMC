package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IRehandlingOfGCDao {
	public DataItemList selectCargoRehandlingList(SearchRehandlingOfGCParm parm) throws DaoException;
	public DataItemList selectCargoRehandlingPopupList(SearchRehandlingOfGCParm parm) throws DaoException;
	public DataItemList selectCargoRhdlBlSnCombo(SearchRehandlingOfGCParm parm) throws DaoException;
	public DataItemList selectCargoRhdlStorageSnCombo(SearchRehandlingOfGCParm parm) throws DaoException;
	public DataItemList selectCargoRhdlOpBlSnCombo(SearchRehandlingOfGCParm parm) throws DaoException;
	public DataItemList selectRhdlShippingNoteComboList(SearchRehandlingOfGCParm parm) throws DaoException;
	public DataItemList selectRhdlGrNoComboList(SearchRehandlingOfGCParm parm) throws DaoException;
	public String selectCargoRhdlGroupNo(SearchRehandlingOfGCParm parm) throws DaoException;
	
	public DataItemList insertCargoRehandlingItems(InsertItemsBizParm parm) throws DaoException;
	public void deleteCargoRehandlingItems(DeleteItemsBizParm parm) throws DaoException;
}