package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchGateOperationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IGateOperationDao {
	public DataItemList selectCargoArrivalDelivery(SearchGateOperationParm parm) throws DaoException;
	public DataItemList selectGrInfo(SearchGateOperationParm parm) throws DaoException;
	public DataItemList selectBlDoInfo(SearchGateOperationParm parm) throws DaoException;
	public DataItemList selectCargoLorryGateIn(SearchGateOperationParm parm) throws DaoException;
	public DataItemList selectCargoLorryGateOut(SearchGateOperationParm parm) throws DaoException;
	public DataItemList selectCargoGateInCheck(SearchGateOperationParm parm) throws DaoException;
	public DataItemList selectCargoGateOutCheck(SearchGateOperationParm parm) throws DaoException;
	public DataItemList selectGateTxnNo(SearchGateOperationParm parm) throws DaoException;
	public DataItemList selectJobGateInOut(SearchGateOperationParm parm) throws DaoException;
	
	public DataItemList insertCargoGateInItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertGOJobItems(InsertItemsBizParm parm) throws DaoException;
	
	public DataItemList updateCargoGateInItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateCargoGateOutItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateGOJobItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList selectROROGateInItems(SearchGateOperationParm parm)throws DaoException;
	public DataItemList updateGIROROItems(UpdateItemsBizParm parm)throws DaoException;
	
	public DataItemList selectQRTruckAssigedDetail(SearchGateOperationParm parm)throws DaoException;//QR Detail
	public DataItemList selectGCGateInItems(SearchGateOperationParm parm)throws DaoException;//QR scan
	public DataItemList selectGCGateOutItems(SearchGateOperationParm parm)throws DaoException;//QR scan
    public DataItemList updateCirPrintItem(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList selectROROGateOutItems(SearchGateOperationParm parm) throws DaoException;
	public DataItemList updateROROGateoutItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateROROArrvDelvItems(UpdateItemsBizParm parm) throws DaoException;

}