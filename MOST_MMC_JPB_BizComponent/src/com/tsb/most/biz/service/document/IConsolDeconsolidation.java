package com.tsb.most.biz.service.document;

import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.parm.document.SearchConsolDeconsolidationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IConsolDeconsolidation {
	public DataItemList selectCargoStatusCombo(SearchConsolDeconsolidationParm parm) throws BizException;
	public DataItemList selectConsolDeconsolidationList(SearchConsolDeconsolidationParm parm) throws BizException;
	public DataItemList updateGetInStatusForSnBl(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateGetOutStatusForSnBl(InsertItemsBizParm parm) throws BizException;
}
