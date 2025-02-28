package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IGeneralCargoLoadingList {
	public DataItemList selectGeneralCargoLoadinglist(SearchExcelFileUploadParm parm)throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
}
