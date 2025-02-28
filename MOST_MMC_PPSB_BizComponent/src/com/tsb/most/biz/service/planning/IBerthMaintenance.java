package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchBerthMaintenanceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IBerthMaintenance{
	public DataItemList selectBerthMaintenanceList(SearchBerthMaintenanceParm parm) throws BizException;
	public DataItemList selectBerthLocList(SearchBerthMaintenanceParm parm)throws BizException;
	public DataItemList selectBittList(SearchBerthMaintenanceParm parm)throws BizException;
	public DataItemList selectStoppageReasonList(SearchBerthMaintenanceParm parm)throws BizException;
	public DataItemList selectDuplicateBerthNoAndStartTime(SearchBerthMaintenanceParm parm)throws BizException;
	public DataItemList insertBerthMaintenanceList(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateBerthMaintenanceList(UpdateItemsBizParm parm)throws BizException;
	public void deleteBerthMaintenanceList(DeleteItemsBizParm parm) throws BizException;
}