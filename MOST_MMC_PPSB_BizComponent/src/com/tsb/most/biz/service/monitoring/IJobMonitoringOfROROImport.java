package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROImportParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IJobMonitoringOfROROImport {	
	public DataItemList selectBlItems(SearchJobMonitoringOfROROImportParm parm) throws BizException;
	public DataItemList selectUnitItems(SearchJobMonitoringOfROROImportParm parm) throws BizException;
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfROROImportParm parm) throws BizException;
	public DataItemList selectJobMonitoringOfROROImportList(SearchJobMonitoringOfROROImportParm parm) throws BizException;
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
}
