package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchImportReconcileForLiquidParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IImportReconcileForLiquid {
	public DataItemList selectImportReconcileForLiquidList(SearchImportReconcileForLiquidParm param) throws BizException;
	public DataItemList selectImportReconcileStatus(SearchImportReconcileForLiquidParm param) throws BizException;
	public DataItemList selectInwardManifestItems(SearchImportReconcileForLiquidParm param) throws BizException;
	public DataItemList selectOutturnCertificateItems(SearchImportReconcileForLiquidParm param) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
}
