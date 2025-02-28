package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IPackageDetailList {
	public DataItemList selectPackageDetailList(SearchExcelFileUploadParm parm)throws BizException;
}
