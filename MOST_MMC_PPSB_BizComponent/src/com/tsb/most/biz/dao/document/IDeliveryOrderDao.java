package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.dataitem.document.BLItem;
import com.tsb.most.biz.dataitem.document.DeliveryOrderItem;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
import com.tsb.most.biz.parm.document.SearchManifestParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IDeliveryOrderDao {
    public DataItemList selectDeliveryOrder(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList getWhCheckDataForIndirect(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList getApronCheckDataForIndirect(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList selectSubDeliveryOrder(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList selectCargoMasterList(SearchCargoMasterParm parm) throws DaoException;
    public DataItemList selectDeliveryOrderNo(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList selectSubDoNoItems(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList subDoNoDuplicateChk(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList selectPackageItems(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList selectDeliveryOrderWgtCheck(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList selectSubDeliveryOrderReport(SearchDeliveryOrderParm parm) throws DaoException;
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertSubDeliveryOrderItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateSubDeliveryOrderItems(UpdateItemsBizParm parm) throws DaoException;
    public void updatePackageItems(DataItem item) throws DaoException;
    public DeliveryOrderItem updateBLItems(DeliveryOrderItem parm) throws DaoException;
    public void updateCargoMaster(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;
    public void updateDeliveryOrderAck(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;
    public DataItemList updateDeliveryOrderAdditionalChk(UpdateItemsBizParm parm) throws DaoException;
    public void deleteDeliveryOrderItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;
    public void deleteItems(DeleteItemsBizParm parm) throws DaoException;
    public void deleteAllSubDeliveryOrderItems(DeleteItemsBizParm parm) throws DaoException;
    public void deleteSubDeliveryOrderItems(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList deletePackageItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList selectDeliveryOrderBLComboList(SearchDeliveryOrderParm parm) throws DaoException;
    public DataItemList selectManifestComboList(SearchManifestParm parm)throws DaoException;
    public DataItemList getDeliveryOrderBLComboList(SearchDeliveryOrderParm parm) throws DaoException ;
	public void insertRoRoItems(DataItem item) throws DaoException;
	public boolean selectIsROROMst(SearchCargoMasterParm mstParm)throws DaoException ;
	public void updateRoRoItems(DataItem item) throws DaoException;
	
}