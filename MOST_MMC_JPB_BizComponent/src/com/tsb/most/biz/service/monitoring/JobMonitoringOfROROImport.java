package com.tsb.most.biz.service.monitoring;

import java.util.ArrayList;

import com.tsb.most.biz.dao.monitoring.IJobMonitoringOfROROImportDao;
import com.tsb.most.biz.dataitem.monitoring.JobMonitoringOfROROImportItem;
import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROImportParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class JobMonitoringOfROROImport extends MOSTBaseService implements IJobMonitoringOfROROImport{
	private IJobMonitoringOfROROImportDao jobMonitoringOfROROImportDao;
	
	public void setJobMonitoringOfROROImportDao(IJobMonitoringOfROROImportDao jobMonitoringOfROROImportDao) {
		this.jobMonitoringOfROROImportDao = jobMonitoringOfROROImportDao;
	}
	///////////////////////////////////////////////////

	public DataItemList selectJobMonitoringOfROROImportList(SearchJobMonitoringOfROROImportParm parm) throws BizException{
		return jobMonitoringOfROROImportDao.selectBlItems(parm);
	}
	
	public DataItemList selectBlItems(SearchJobMonitoringOfROROImportParm parm) throws BizException{
		return jobMonitoringOfROROImportDao.selectBlItems(parm);
	}
	
	public DataItemList selectUnitItems(SearchJobMonitoringOfROROImportParm parm) throws BizException{
		return jobMonitoringOfROROImportDao.selectUnitItems(parm);
	}
	
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfROROImportParm parm) throws BizException{
		return jobMonitoringOfROROImportDao.selectUnitJobDetailItems(parm);
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
    	for(JobMonitoringOfROROImportItem item : (ArrayList<JobMonitoringOfROROImportItem>)itemList.getCollection()) {
    		if(item == null)
				return null;
    		
    		JobMonitoringOfROROImportItem cudItem = (JobMonitoringOfROROImportItem)item.clone();
    		//1.0 RORO Car/van
			if("RCV".equals(item.getCgTpCd())){
                if("IO".equals(item.getJobPurpCd())){
                    //Update Gate-Out job
                    jobMonitoringOfROROImportDao.updateRoroJobMonitoringItem(cudItem);
//                    jobMonitoringOfROROImportDao.updateRoroJobMonitoringWeightBridge(cudItem);
                } else if("OI".equals(item.getJobPurpCd())){
                    //Update Gate-In job
                    jobMonitoringOfROROImportDao.updateRoroJobMonitoringItem(cudItem);
//                    jobMonitoringOfROROImportDao.updateRoroJobMonitoringWeightBridge(cudItem);
                } else{
                    //Update Handling-Out Job
                    jobMonitoringOfROROImportDao.updateRoroJobMonitoringItem(cudItem);
                }
			}
			
			//2.0 RORO MAFI
			else if("RMA".equals(item.getCgTpCd())){
                if("AW".equals(item.getJobPurpCd()) || "VA".equals(item.getJobPurpCd())){
                    jobMonitoringOfROROImportDao.updateRoroJobMonitoringItem(cudItem);
                }
			}
			
			//3.0 RORO MACHINARY
			else if("RMC".equals(item.getCgTpCd())){
                if("AW".equals(item.getJobPurpCd())){
                    //UPDATE Handling-In Job
                    jobMonitoringOfROROImportDao.updateRoroJobMonitoringItem(cudItem);
                    
                    //UPDATE TO GENERATED IN GENERAL PROCESS
                    jobMonitoringOfROROImportDao.updateRmcCargoMasterItems(cudItem);
                    jobMonitoringOfROROImportDao.updateRmcJobItems(cudItem);
                    jobMonitoringOfROROImportDao.updateRmcInvLocationItems(cudItem);
                } else if("VA".equals(item.getJobPurpCd())){
                    //UPDATE Discharging Job
                    jobMonitoringOfROROImportDao.updateRoroJobMonitoringItem(cudItem);
                } 
			}
    	}
    	
    	return itemList;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		for(JobMonitoringOfROROImportItem item : (ArrayList<JobMonitoringOfROROImportItem>)itemList.getCollection()) {
			if(item == null)
				return null;
			
			JobMonitoringOfROROImportItem cudItem = (JobMonitoringOfROROImportItem)item.clone();
			if("RCV".equals(item.getCgTpCd())){
				if("IO".equals(item.getJobPurpCd())){
					//1.0 In case of Truck Mode
					if(!"".equals(item.getTruckNo())){
						//1.1 Removing G-O information of all VINs which belong to same ticket (TCV_RORO)
						jobMonitoringOfROROImportDao.deleteRoroJobMonitoringItem(cudItem);
						//1.2 Deleting all WB data with same ticket and Vin No is different from selected VIN (TMT_WEIGHBRIDGE and TMT_CG_ARRV_DELV)
//						jobMonitoringOfROROImportDao.deleteJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
//						jobMonitoringOfROROImportDao.deleteJobMonitoringCgArrvDelv(cudItem);
						//1.3 Update WB data of selected VIN
//						jobMonitoringOfROROImportDao.updateRoroJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
//						jobMonitoringOfROROImportDao.updateJobMonitoringCgArrvDelv(cudItem);
					} else {
						//2.0 In case of Driver Mode
						//2.1 Removing G-O information of all VINs which belong to same ticket (TCV_RORO)
						jobMonitoringOfROROImportDao.deleteRoroJobMonitoringItem(cudItem);
						//2.2 Update WB data of all VINs which same ticket
//						jobMonitoringOfROROImportDao.updateRoroJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
						
						//2.3 delete out job (TMT_CG_ARRV_DELV)
//						jobMonitoringOfROROImportDao.deleteJobMonitoringCgArrvDelv(cudItem);
						//2.3 update in job (TMT_CG_ARRV_DELV)
//						jobMonitoringOfROROImportDao.updateJobMonitoringCgArrvDelv(cudItem);
					}
				} else if("WG".equals(item.getJobPurpCd())){
					//In case of Truck Mode, Last Unit No
//					SearchJobMonitoringOfROROImportParm rrParm = new SearchJobMonitoringOfROROImportParm();
//					rrParm.setGateTicketNo(item.getGateTicketNo());
//					int vinCnt = jobMonitoringOfROROImportDao.getUnitQtyByGateTicketNo(rrParm);
//					if(vinCnt == 1 && !"".equals(item.getTruckNo())){
//						//Last Unit of Gate Ticket
//						item.setLastVinOfGateTicketYn("Y");
//						
////						jobMonitoringOfROROImportDao.updateRoroJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
//						jobMonitoringOfROROImportDao.updateJobMonitoringCgArrvDelv(cudItem);
////						jobMonitoringOfROROImportDao.deleteInvLogRoroJobMonitoring(parm.getTxTraceinfo(), item);
//						jobMonitoringOfROROImportDao.updateRoroJobMonitoringItem(cudItem);
//					} else {
						//Delete Handling-Out Job
//						jobMonitoringOfROROImportDao.deleteJobMonitoringWeightBridge(parm.getTxTraceinfo(), item);
//						jobMonitoringOfROROImportDao.deleteJobMonitoringCgArrvDelv(cudItem);
//						jobMonitoringOfROROImportDao.deleteInvLogRoroJobMonitoring(parm.getTxTraceinfo(), item);
						jobMonitoringOfROROImportDao.deleteRoroJobMonitoringItem(cudItem);
//					}
				} else if("AW".equals(item.getJobPurpCd())){
					//Delete Handling-In Job
//					jobMonitoringOfROROImportDao.deleteInvLogRoroJobMonitoring(parm.getTxTraceinfo(), item);
					jobMonitoringOfROROImportDao.deleteRoroJobMonitoringItem(cudItem);
				} else if("VA".equals(item.getJobPurpCd())){
					//Delete Discharging Job
					jobMonitoringOfROROImportDao.deleteRoroJobMonitoringItem(cudItem);
				} else if("OI".equals(item.getJobPurpCd())){
					//Delete Gate-In job
					jobMonitoringOfROROImportDao.deleteRoroJobMonitoringItem(cudItem);
				}
			}
			
			//2.0 RORO MAFI
			else if("RMA".equals(item.getCgTpCd())){
				//1.2 Delete case
				if("AW".equals(item.getJobPurpCd())){
					//Delete Handling-In Job
//					jobMonitoringOfROROImportDao.deleteInvLogRoroJobMonitoring(parm.getTxTraceinfo(), item);
					jobMonitoringOfROROImportDao.deleteRoroJobMonitoringItem(cudItem);
				} else if("VA".equals(item.getJobPurpCd())){
					//Delete Discharging Job
					jobMonitoringOfROROImportDao.deleteRoroJobMonitoringItem(cudItem);
				} 
				
			}
		}
		
		return itemList;
	}
}
