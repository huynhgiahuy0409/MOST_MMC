package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchStevedoreTrimmingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IStevedoreTrimmingDao {
	public DataItemList selectVORDryBreakBulkForStevAndTrim(SearchStevedoreTrimmingParm parm) throws DaoException;
	public DataItemList selectVORDryBreakBulk(SearchStevedoreTrimmingParm parm) throws DaoException;
	public DataItemList selectEquipment(SearchStevedoreTrimmingParm parm) throws DaoException;
	public DataItemList selectRole(SearchStevedoreTrimmingParm parm) throws DaoException;
	public DataItemList selectShift(SearchStevedoreTrimmingParm parm) throws DaoException;
	public DataItemList selectEquipmentList(SearchStevedoreTrimmingParm parm) throws DaoException;
	public void updateVORDryBreakBulkItemsForStevAndTrim(UpdateItemsBizParm parm) throws DaoException;
	public void deleteVORDryBreakBulkItems(DeleteItemsBizParm items) throws DaoException;
	public void updateVORDryBreakBulkItemsWithShipCrew(UpdateItemsBizParm parm) throws DaoException;
 
}
