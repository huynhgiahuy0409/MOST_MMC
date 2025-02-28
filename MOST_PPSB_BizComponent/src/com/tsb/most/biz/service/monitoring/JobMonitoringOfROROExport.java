package com.tsb.most.biz.service.monitoring;

import java.util.ArrayList;

import com.tsb.most.biz.dao.monitoring.IJobMonitoringOfROROExportDao;
import com.tsb.most.biz.dataitem.monitoring.JobMonitoringOfROROExportItem;
import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROExportParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class JobMonitoringOfROROExport extends MOSTBaseService implements IJobMonitoringOfROROExport{
	private IJobMonitoringOfROROExportDao jobMonitoringOfROROExportDao;
	
	public void setJobMonitoringOfROROExportDao(IJobMonitoringOfROROExportDao jobMonitoringOfROROExportDao) {
		this.jobMonitoringOfROROExportDao = jobMonitoringOfROROExportDao;
	}
	///////////////////////////////////////////////////
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfROROExportParm parm) throws BizException{
		return jobMonitoringOfROROExportDao.selectShipgNoteNoComboBoxItems(parm);
	}
	
	public DataItemList selectCargoItems(SearchJobMonitoringOfROROExportParm parm) throws BizException{
		return jobMonitoringOfROROExportDao.selectCargoItems(parm);
	}
	
	public DataItemList selectUnitItems(SearchJobMonitoringOfROROExportParm parm) throws BizException{
		return jobMonitoringOfROROExportDao.selectUnitItems(parm);
	}
	
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfROROExportParm parm) throws BizException{
		return jobMonitoringOfROROExportDao.selectUnitJobDetailItems(parm);
	}
	
	public DataItemList selectValidationForDeletingGateInJob(SearchJobMonitoringOfROROExportParm parm) throws BizException{
		return jobMonitoringOfROROExportDao.selectValidationForDeletingGateInJob(parm);
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return jobMonitoringOfROROExportDao.updateRoroJobMonitoringItem(parm);
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		for(JobMonitoringOfROROExportItem item : (ArrayList<JobMonitoringOfROROExportItem>)itemList.getCollection()) {
			if(item == null)
				return null;
			
			JobMonitoringOfROROExportItem cudItem = (JobMonitoringOfROROExportItem)item.clone();
			if("OI".equals(item.getJobPurpCd())){
				//1.In case of deleting Gate-In job (OI)
				//1.1 Update TMT_GR (remove Unit No which have same ticket no)
//				jobMonitoringOfROROExportDao.updateGoodsReceipt(parm.getTxTraceinfo(), item);
				//1.2 Delete related data from TMT_WEIGHBRIDGE (all related Unit with same ticket will be removed)
//				jobMonitoringOfROROExportDao.deleteJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
				//1.3 Delete related data from TMT_CG_ARRV_DELV (all related Unit with same ticket will be removed)
//				jobMonitoringOfROROExportDao.deleteJobMonitoringCgArrvDelv(parm.getTxTraceinfo(), item);
				//1.4 Update TCV_RORO (all related Unit with same ticket will be back with RS status)
				jobMonitoringOfROROExportDao.deleteRoroJobMonitoringItem(cudItem);
			} else if("IO".equals(item.getJobPurpCd())){
				//2. In case of deleting Gate-Out job (IO) with Truck Mode
				//2.1 Update TMT_WEIGHBIDGE (all related UNIT with same ticket will be updated)
//				jobMonitoringOfROROExportDao.updateRoroJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
				//2.2 Delete out job from TMT_CG_ARRV_DELV (by ticket)
//				jobMonitoringOfROROExportDao.deleteJobMonitoringCgArrvDelv(parm.getTxTraceinfo(), item);
				//2.3 Update TCV_RORO (by ticket)
				jobMonitoringOfROROExportDao.deleteRoroJobMonitoringItem(cudItem);
				
				//3. In case of deleting Gate-Out job (IO) with Driver Mode
				//3.1 Update TMT_WEIGHBIDGE (by Unit)
				//3.2 Delete out job from TMT_CG_ARRV_DELV (by Unit)
				//3.3 Update TCV_RORO (by Unit), it will delete HI job as well because GO job is generated automatically once confirm HI
			} else {
				if("GW".equals(item.getJobPurpCd()) || "WA".equals(item.getJobPurpCd())){
					//4. In case of deleting Yard check (WA) or HI (GW)
					//4.1 delete TCV_INV_LOG
//					jobMonitoringOfROROExportDao.deleteInvLogRoroJobMonitoring(parm.getTxTraceinfo(), item);
				}
				//4.2 Update TCV_RORO
				jobMonitoringOfROROExportDao.deleteRoroJobMonitoringItem(cudItem);
			}
		}
		
		return itemList;
	}
	
}
