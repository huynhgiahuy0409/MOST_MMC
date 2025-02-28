package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchVORDryBreakBulkParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVORDryBreakBulk {
	public DataItemList selectVORDryBreakBulk(SearchVORDryBreakBulkParm parm) throws BizException;
	public DataItemList selectVORList(SearchVORDryBreakBulkParm parm) throws BizException;
	public DataItemList selectHandlingList(SearchVORDryBreakBulkParm parm) throws BizException;
	public DataItemList selectVesselInformation(SearchVORDryBreakBulkParm parm) throws BizException;
	public DataItemList isOverlappedWithFinitePeriodHHT(SearchVORDryBreakBulkParm parm) throws BizException;
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList verifyItems(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList selectHandlingServicePDFReportList(SearchVORDryBreakBulkParm parm) throws BizException;
	public DataItemList selectOpeJobList(SearchVORDryBreakBulkParm parm) throws BizException;
}
