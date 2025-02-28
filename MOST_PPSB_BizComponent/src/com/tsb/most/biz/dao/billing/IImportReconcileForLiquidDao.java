package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchImportReconcileForLiquidParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IImportReconcileForLiquidDao {
    public DataItemList selectImportReconcileForLiquidList(SearchImportReconcileForLiquidParm param)throws DaoException;
    public DataItemList selectImportReconcileStatus(SearchImportReconcileForLiquidParm param) throws DaoException;
    public DataItemList selectInwardManifestItems(SearchImportReconcileForLiquidParm param) throws DaoException;
    public DataItemList selectOutturnCertificateItems(SearchImportReconcileForLiquidParm param) throws DaoException;
    
    public DataItemList insertImportReconcileStatus(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateImportReconcileStatus(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateImportReconcile(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateImportReconcileInformation(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteImportReconcile(DeleteItemsBizParm parm) throws DaoException;
}
