package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfRORORehandlingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IJobMonitoringOfRORORehandling {
	public DataItemList selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfRORORehandlingParm parm) throws BizException;
	public DataItemList selectCargoItems(SearchJobMonitoringOfRORORehandlingParm parm) throws BizException;
	public DataItemList selectUnitItems(SearchJobMonitoringOfRORORehandlingParm parm) throws BizException;
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfRORORehandlingParm parm) throws BizException;
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
}

