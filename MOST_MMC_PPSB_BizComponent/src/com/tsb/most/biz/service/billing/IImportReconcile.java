package com.tsb.most.biz.service.billing;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.parm.billing.SearchImportReconcileParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IImportReconcile {
	public DataItemList selectImportReconcile(SearchImportReconcileParm param) throws BizException;
	public DataItemList selectManifest(SearchImportReconcileParm param) throws BizException;
	public DataItemList selectOutturnCertificate(SearchImportReconcileParm param) throws BizException;
	public DataItemList selectImportReconcileStatus(SearchImportReconcileParm param) throws BizException;
	public DataItemList importReconcilePackageTypeList(SearchCodeMasterParm param) throws BizException;
	public DataItemList importReconcileTransportTypeList(SearchCodeMasterParm param) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
}
