package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.ServiceOrderItem;
import com.tsb.most.biz.parm.operation.SearchServiceOrderParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IServiceOrderDao {
    public DataItemList getServiceOrderNo(SearchServiceOrderParm parm) throws DaoException;
    public DataItemList getServiceOrderConf(SearchServiceOrderParm parm) throws DaoException;
    public DataItemList selectServiceOrderList(SearchServiceOrderParm parm) throws DaoException;
    public DataItemList selectServiceOrderItem(SearchServiceOrderParm parm) throws DaoException;
    public DataItemList getRoadBunkeringList(SearchServiceOrderParm parm) throws DaoException;

    public void insertServiceOrderItem(TxTraceInfo txTraceInfo, ServiceOrderItem item) throws DaoException;
    public void updateServiceOrderItem(TxTraceInfo txTraceInfo, ServiceOrderItem item) throws DaoException;
    public void deleteServiceOrderItem(TxTraceInfo txTraceInfo, ServiceOrderItem item) throws DaoException;
    
    public DataItemList insertServiceOrderItem(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateServiceOrderItem(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteServiceOrderItem(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList selectBLItems(SearchServiceOrderParm parm) throws DaoException;
	public DataItemList selectShippingNoteItems(SearchServiceOrderParm parm) throws DaoException;
	public DataItemList selectBLSNItems(SearchServiceOrderParm parm)throws DaoException;
}
