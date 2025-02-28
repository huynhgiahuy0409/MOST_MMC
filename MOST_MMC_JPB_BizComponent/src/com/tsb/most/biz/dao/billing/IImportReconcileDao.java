package com.tsb.most.biz.dao.billing;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.parm.billing.SearchImportReconcileParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IImportReconcileDao {
    public DataItemList selectImportReconcile(SearchImportReconcileParm param)throws DaoException;
    public DataItemList selectManifest(SearchImportReconcileParm param)throws DaoException;
    public DataItemList selectOutturnCertificate(SearchImportReconcileParm param) throws DaoException ;
    public DataItemList selectImportReconcileStatus(SearchImportReconcileParm param)throws DaoException;
    public Integer isDataCollected(SearchImportReconcileParm param)throws DaoException;
    public void updateImportStatus(TxTraceInfo info,DataItemList updateList) throws DaoException ;
    public void insertImportStatus(TxTraceInfo info,DataItemList addList) throws DaoException ;
    
    public void updateControllerTmtJob(TxTraceInfo info, DataItemList updateList) throws DaoException ;
    public void updateControllerTmtCgArrvDelv(TxTraceInfo info, DataItemList updateList) throws DaoException ;
    public DataItemList deleteImportReconciles(DeleteItemsBizParm parm) throws DaoException ;
    
    public DataItemList insertImportReconciles(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateImportReconciles(UpdateItemsBizParm parm)throws DaoException;
    public DataItemList updateImportReconcileForTsptTpCd(UpdateItemsBizParm parm)throws DaoException;
    
    public DataItemList importReconcilePackageTypeList(SearchCodeMasterParm param) throws DaoException;
    public DataItemList importReconcileTransportTypeList(SearchCodeMasterParm param) throws DaoException;
    public DataItemList updateImportReconcileStatus(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList insertImportReconcileStatus(InsertItemsBizParm parm) throws DaoException;
}
