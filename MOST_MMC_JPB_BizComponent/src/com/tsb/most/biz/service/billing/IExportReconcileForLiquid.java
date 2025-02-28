package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchExportReconcileForLiquidParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IExportReconcileForLiquid {
	public DataItemList selectExportReconcileForLiquidList(SearchExportReconcileForLiquidParm param) throws BizException;
	public DataItemList selectExportReconcileStatus(SearchExportReconcileForLiquidParm param) throws BizException;
	public DataItemList selectOutwardManifestItems(SearchExportReconcileForLiquidParm param) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
}
