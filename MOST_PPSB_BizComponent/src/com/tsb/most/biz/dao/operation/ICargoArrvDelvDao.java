package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoArrvDelvDao {
	public DataItemList selectGatepassNo(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList selectArrvDelvIsCheck(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList selectGateInData(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList selectCargoArrvDelv(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList selectGateOutCheck(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList selectGateTxnNo(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList selectJobGateInOut(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList selectGateInCargoItem(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList checkMultiCargoTxn(SearchCargoArrvDelvParm parm) throws DaoException;
	
	public DataItemList insertGateIntems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateGateInItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateGateOutItems(UpdateItemsBizParm parm) throws DaoException;
	
	public DataItemList insertGOJobItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateGOJobItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateCirPrintItem(UpdateItemsBizParm parm) throws DaoException;
}