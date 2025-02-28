package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchExportReconcileParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IExportReconcileDao {
    public DataItemList selectExportReconcileList(SearchExportReconcileParm param)throws DaoException;
    public DataItemList selectOutwardManifestList(SearchExportReconcileParm param)throws DaoException;
    public DataItemList selectExportReconcileStatus(SearchExportReconcileParm param)throws DaoException;
    public Integer isDataCollected(SearchExportReconcileParm param)throws DaoException;
    public void updateExportReconcileForPackageTypeCd(TxTraceInfo info,DataItemList updateList) throws DaoException ;
    public void insertExportStatus(TxTraceInfo info,DataItemList addList) throws DaoException ;
    
    public DataItemList updateExportReconcileForTsptTpCd(UpdateItemsBizParm parm) throws DaoException;
    public void updateControllerTmtJob(TxTraceInfo info, DataItemList updateList) throws DaoException ;
    public void updateControllerTmtCgArrvDelv(TxTraceInfo info, DataItemList updateList) throws DaoException ;
    public void clearExportReconcile(TxTraceInfo info,DataItemList updateList) throws DaoException ;
    
    public DataItemList updateExportReconciles(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList insertExportReconcileStatus(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateExportStatus(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteExportReconciles(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList insertExportReconciles(InsertItemsBizParm parm) throws DaoException;
}
