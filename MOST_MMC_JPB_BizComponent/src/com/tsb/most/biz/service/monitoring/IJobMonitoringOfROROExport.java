package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROExportParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IJobMonitoringOfROROExport {
	public DataItemList selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfROROExportParm parm) throws BizException;
	public DataItemList selectCargoItems(SearchJobMonitoringOfROROExportParm parm) throws BizException;
	public DataItemList selectUnitItems(SearchJobMonitoringOfROROExportParm parm) throws BizException;
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfROROExportParm parm) throws BizException;
	public DataItemList selectValidationForDeletingGateInJob(SearchJobMonitoringOfROROExportParm parm) throws BizException;
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
}
