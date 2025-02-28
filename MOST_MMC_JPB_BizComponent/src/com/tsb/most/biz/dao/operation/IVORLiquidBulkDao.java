package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVORLiquidBulkParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVORLiquidBulkDao {
	public DataItemList selectBerthAndOperationItems(SearchVORLiquidBulkParm parm) throws DaoException;
	public DataItemList selectVORSummaryItems(SearchVORLiquidBulkParm parm) throws DaoException;
	public DataItemList selectVORDelaySummaryItems(SearchVORLiquidBulkParm parm) throws DaoException;
	public DataItemList selectVORLiquidBulkCgOprType(SearchVORLiquidBulkParm parm) throws DaoException;
	
	public DataItemList selectConfirmationSlipDetailItem(SearchVORLiquidBulkParm parm) throws DaoException;
	public DataItemList selectVORLiquidCargo(SearchVORLiquidBulkParm parm) throws DaoException;
	
	public DataItemList insertVORLiquidCargoItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateVORLiquidHoseLines(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateAtwAtc4LqVsl(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateVORLiquidCargoItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteVORLiquidCargoItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteVORLiquidItems(DeleteItemsBizParm parm) throws DaoException;
	
	public DataItemList insertVORLiquidDelayItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateVORLiquidDelayItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteVORLiquidDelayItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList selectTankerTimeItems(SearchVORLiquidBulkParm parm) throws DaoException;
	//////////////////////////////////////////////
}
