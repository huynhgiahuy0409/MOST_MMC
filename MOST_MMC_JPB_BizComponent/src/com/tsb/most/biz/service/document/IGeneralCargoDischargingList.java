package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.biz.parm.document.SearchGeneralCargoDischargingListParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IGeneralCargoDischargingList {
	public DataItemList selectGeneralCargoDischarginglist(SearchExcelFileUploadParm parm)throws BizException;
	public DataItemList selectBLList(SearchGeneralCargoDischargingListParm parm) throws BizException;
	public DataItemList selectMFList(SearchGeneralCargoDischargingListParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException;
}
