package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchCustomsCargoReleaseControlParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface ICustomsCargoReleaseControlDao {

	public DataItemList selectCustomsCargoReleaseList(SearchCustomsCargoReleaseControlParm parm) throws DaoException;

	public DataItemList selectMasterBlItems(SearchCustomsCargoReleaseControlParm parm) throws DaoException;

	public DataItemList selectBookingNoItems(SearchCustomsCargoReleaseControlParm parm) throws DaoException;

	public DataItemList selectCustomsCargoReleaseHistory(SearchCustomsCargoReleaseControlParm parm) throws DaoException;

	public void insertCustomsCargoReleaseItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;

	public void insertNewCustomsCargoReleaseItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;

	public DataItemList selectDocNoInfo(SearchCustomsCargoReleaseControlParm parm) throws DaoException;

	public DataItemList selectBlSnItems(SearchCustomsCargoReleaseControlParm parm) throws DaoException;

	public DataItemList insertCustomsItems(InsertItemsBizParm parm) throws DaoException;

	public DataItemList updateCustomsItems(UpdateItemsBizParm parm) throws DaoException;

	public DataItemList deleteCustomsItems(DeleteItemsBizParm parm) throws DaoException;

	public DataItemList selectCargoNoInfo(SearchCustomsCargoReleaseControlParm parm) throws DaoException;
}
