package com.tsb.most.biz.service.monitoring;

import java.util.ArrayList;

import com.tsb.most.biz.dao.monitoring.IJobMonitoringOfRORORehandlingDao;
import com.tsb.most.biz.dataitem.monitoring.JobMonitoringOfRORORehandlingItem;
import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfRORORehandlingParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class JobMonitoringOfRORORehandling extends MOSTBaseService implements IJobMonitoringOfRORORehandling{
	private IJobMonitoringOfRORORehandlingDao jobMonitoringOfRORORehandlingDao;
	
	public void setJobMonitoringOfRORORehandlingDao(IJobMonitoringOfRORORehandlingDao jobMonitoringOfRORORehandlingDao) {
		this.jobMonitoringOfRORORehandlingDao = jobMonitoringOfRORORehandlingDao;
	}
	/////////////////////////////////////////////////////
	public DataItemList selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfRORORehandlingParm parm) throws BizException{
		return jobMonitoringOfRORORehandlingDao.selectShipgNoteNoComboBoxItems(parm);
	}
	
	public DataItemList selectCargoItems(SearchJobMonitoringOfRORORehandlingParm parm) throws BizException{
		return jobMonitoringOfRORORehandlingDao.selectCargoItems(parm);
	}
	
	public DataItemList selectUnitItems(SearchJobMonitoringOfRORORehandlingParm parm) throws BizException{
		return jobMonitoringOfRORORehandlingDao.selectUnitItems(parm);
	}
	
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfRORORehandlingParm parm) throws BizException{
		return jobMonitoringOfRORORehandlingDao.selectUnitJobDetailItems(parm);
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return jobMonitoringOfRORORehandlingDao.updateRoroJobMonitoringItem(parm);
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		for(JobMonitoringOfRORORehandlingItem item : (ArrayList<JobMonitoringOfRORORehandlingItem>)itemList.getCollection()) {
			if(item == null)
				return null;
			
			JobMonitoringOfRORORehandlingItem cudItem = (JobMonitoringOfRORORehandlingItem)item.clone();
			if("IO".equals(item.getJobPurpCd())){
				//1.0 In case of Truck Mode
				if(!"".equals(item.getTruckNo())){
					//1.1 Removing G-O information of all VINs which belong to same ticket (TCV_RORO)
					jobMonitoringOfRORORehandlingDao.deleteRoroJobMonitoringItem(cudItem);
					//1.2 Deleting all WB data with same ticket and Vin No is different from selected VIN (TMT_WEIGHBRIDGE)
//					jobMonitoringOfRORORehandlingDao.deleteJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
					//1.3 Update WB data of selected VIN
//					jobMonitoringOfRORORehandlingDao.updateRoroJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
				} else {
					//2.0 In case of Driver Mode
					//2.1 Removing G-O information of all VINs which belong to same ticket (TCV_RORO)
					jobMonitoringOfRORORehandlingDao.deleteRoroJobMonitoringItem(cudItem);
					//2.2 Update WB data of all VINs which same ticket
//					jobMonitoringOfRORORehandlingDao.updateRoroJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
				}
			} else if("WG".equals(item.getJobPurpCd())){
				//In case of Truck Mode, Last Unit No
//				RoroJobMonitoringParm rrParm = new RoroJobMonitoringParm();
//				rrParm.setGateTicketNo(item.getGateTicketNo());
//				int vinCnt = roroJobMonitoringDao.getUnitQtyByGateTicketNo(rrParm);
//				if(vinCnt == 1 && !"".equals(item.getTruckNo())){
//					//Last Unit of Gate Ticket
//					item.setLastVinOfGateTicketYn("Y");
					
//					jobMonitoringOfRORORehandlingDao.updateRoroJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
//					jobMonitoringOfRORORehandlingDao.deleteInvLogRoroJobMonitoring(parm.getTxTraceinfo(), item);
					jobMonitoringOfRORORehandlingDao.deleteRoroJobMonitoringItem(cudItem);
//				} else {
//					//Delete Handling-Out Job
//					//jobMonitoringOfRORORehandlingDao.deleteJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
////					jobMonitoringOfRORORehandlingDao.deleteInvLogRoroJobMonitoring(parm.getTxTraceinfo(), item);
//					jobMonitoringOfRORORehandlingDao.updateRoroJobMonitoringItem(parm.getTxTraceinfo(), item);
//				
//					//09/12
////					if("".equals(item.getTruckNo())){
////						jobMonitoringOfRORORehandlingDao.deleteJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
////					}
//				}
			} else if("OI".equals(item.getJobPurpCd())){
				//Delete Gate-In job
				jobMonitoringOfRORORehandlingDao.deleteRoroJobMonitoringItem(cudItem);
			} else {
//				if("GW".equals(item.getJobPurpCd()) || "WA".equals(item.getJobPurpCd())){
//					//4. In case of deleting Yard check (WA) or HI (GW)
//					//4.1 delete TCV_INV_LOG
////					jobMonitoringOfRORORehandlingDao.deleteInvLogRoroJobMonitoring(parm.getTxTraceinfo(), item);
//				}
				//4.2 Update TCV_RORO
				jobMonitoringOfRORORehandlingDao.deleteRoroJobMonitoringItem(cudItem);
			}
		}
		
		return itemList;
	}
}
