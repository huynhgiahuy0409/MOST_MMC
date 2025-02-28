package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchExportReconcileForLiquidParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IExportReconcileForLiquidDao {
    public DataItemList selectExportReconcileForLiquidList(SearchExportReconcileForLiquidParm param)throws DaoException;
    public DataItemList selectExportReconcileStatus(SearchExportReconcileForLiquidParm param) throws DaoException;
    public DataItemList selectOutwardManifestItems(SearchExportReconcileForLiquidParm param) throws DaoException;
    
    public DataItemList insertExportReconcileStatus(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateExportReconcileStatus(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateExportReconcile(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateExportReconcileInformation(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteExportReconcile(DeleteItemsBizParm parm) throws DaoException;
}
