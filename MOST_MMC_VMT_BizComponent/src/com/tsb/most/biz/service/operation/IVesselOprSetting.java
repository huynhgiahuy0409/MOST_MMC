package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IVesselOprSetting {
	public DataItemList selectVesselOprSettingList(SearchVesselOprSettingParm parm) throws BizException;

	public DataItemList selectVesselOprSettingCommonCd(SearchVesselOprSettingParm parm) throws BizException;

	public DataItemList selectOverlappedWithFinitePeriod(SearchVesselOprSettingParm parm) throws BizException;

	public DataItemList insertVesselOprSetting(InsertItemsBizParm parm) throws BizException;

	public DataItemList updateVesselOprSetting(UpdateItemsBizParm parm) throws BizException;

	public void deleteVesselOprSetting(DeleteItemsBizParm parm) throws BizException;
	
	public DataItemList selectVORDryBreakBulk(SearchVesselOprSettingParm parm) throws BizException;
	
	public void processVORDryBreakBulkForStevAndTrimCUD(UpdateItemsBizParm parm)throws BizException ;

	public IDataItem selectDelayPenaltyReportList(SearchVesselOprSettingParm parm) throws BizException;

	public DataItemList insertDelayPenaltyReportList(InsertItemsBizParm parm) throws BizException;
	
	public DataItemList updateDelayPenaltyReportList(UpdateItemsBizParm parm) throws BizException;
	
	public void deleteDelayPenaltyReportList(DeleteItemsBizParm parm) throws BizException;
}