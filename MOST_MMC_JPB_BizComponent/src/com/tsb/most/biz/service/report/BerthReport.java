package com.tsb.most.biz.service.report;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.tsb.most.biz.dao.planning.IBerthPlanDao;
import com.tsb.most.biz.dao.planning.IShipInPortDao;
import com.tsb.most.biz.dao.planning.IVesselScheduleDao;
import com.tsb.most.biz.dataitem.common.PackageItem;
import com.tsb.most.biz.dataitem.planning.BerthInfoItem;
import com.tsb.most.biz.dataitem.planning.BerthMaintenanceItem;
import com.tsb.most.biz.dataitem.planning.BerthPlanItem;
import com.tsb.most.biz.dataitem.planning.ShipInPortItem;
import com.tsb.most.biz.dataitem.planning.VesselScheduleItem;
import com.tsb.most.biz.parm.common.PackageParm;
import com.tsb.most.biz.parm.operation.SearchVORDryBreakBulkParm;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.biz.parm.planning.SearchShipInPortParm;
import com.tsb.most.biz.parm.planning.SearchVesselScheduleParm;
import com.tsb.most.biz.service.report.ReportGenerator;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;


public class BerthReport extends MOSTBaseService implements IBerthReport{
	private IBerthPlanDao berthPlanDao;
	private IVesselScheduleDao vesselScheduleDao;
	private IShipInPortDao shipInPortDao;
	
	public void setBerthPlanDao(IBerthPlanDao berthPlanDao){
    	this.berthPlanDao = berthPlanDao;
    }
	
	public void setVesselScheduleDao(IVesselScheduleDao vesselScheduleDao) {
		this.vesselScheduleDao = vesselScheduleDao;
	}
	
	public void setShipInPortDao(IShipInPortDao shipInPortDao) {
		this.shipInPortDao = shipInPortDao;
	}
	
	public DataItemList printBayPlan(PackageParm parm) throws BizException {
		//for temporary
		return generatePlanningReport(parm, false,null,null,null,null,null,null,null);
	}
	
	private DataItemList generatePlanningReport(PackageParm parm, boolean bPackagePrint
			,List<BerthInfoItem> berthList
			,List<BerthPlanItem> berthPlanList
			,List<BerthPlanItem> berthNextPlanList
			,List<BerthPlanItem> vesselScheduleDataList
			,List<VesselScheduleItem> vesselScheduleList
			,List<ShipInPortItem> tideInformationList
			,List<BerthMaintenanceItem> berthBittList
											) throws BizException {
		
		ReportGenerator bayPlanReport = new ReportGenerator();
		try {
			SearchBerthPlanParm berthParm = new SearchBerthPlanParm();
			SearchVesselScheduleParm vslParm = new SearchVesselScheduleParm();
			SearchShipInPortParm tideParm = new SearchShipInPortParm();
			SearchShippingNoteParm shippingNoteParm = new SearchShippingNoteParm();
			SearchDeliveryOrderParm deliveryOrderParm = new SearchDeliveryOrderParm();
			SearchVORDryBreakBulkParm equiomentSettingParm = new SearchVORDryBreakBulkParm();
			SearchMegaParm megaParm = new SearchMegaParm();
			
			
			berthParm.setEtaFrom(parm.getEtaFrom());
			berthParm.setEtaTo(parm.getEtaTo());
			berthParm.setViewType(parm.getBerthType());			
			berthParm.setSearchType(parm.getSearchType());
			
			//Berth List
			List berthInfoList = new ArrayList();
			berthInfoList = berthPlanDao.selectBerthInfoListReport(berthParm).getCollection();
			
			//Berth Bitt List
			berthBittList = berthPlanDao.selectBittListReport(berthParm).getCollection();
	        
			//Schedule List
			List berthPlanInfoList = new ArrayList();
	        berthPlanInfoList = berthPlanDao.selectBerthPlanReportList(berthParm).getCollection();
	        

	        List berthNextPlanInfoList = new ArrayList();
	        berthNextPlanInfoList = berthPlanDao.selectNextBerthPlanList(berthParm).getCollection();
	        
	        //Schedule Info List
	        RestResponse vesselScheduleInfoList = new RestResponse();
	        berthList = berthInfoList;
	        berthPlanList = berthPlanInfoList;
	        berthNextPlanList = berthNextPlanInfoList;
	        List vesselScheduleDataInfoList = new ArrayList();
	        List totalScheduleData = new ArrayList();
	        List totalShippingNoteData = new ArrayList();
	        List totalDelivertyOrderData = new ArrayList();
	        List totalEquipmentSettingData = new ArrayList();
	        List totalMegaData = new ArrayList();
	        
	        RestResponse vesselDatas = new RestResponse();
	        for(int i = 0 ; i< berthPlanList.size();i++) {
		        vslParm.setVslCallId(berthPlanList.get(i).getVslCallId());
		        List list =  berthPlanDao.selectVesselScheduleData(vslParm).getCollection();
		        vesselScheduleDataInfoList.add(list);
	        }
	        vesselDatas.setData(vesselScheduleDataInfoList);
	        vesselScheduleDataList = vesselDatas.getData();
	        
	        for(int i = 0 ; i< berthPlanList.size();i++) {
        		vslParm.setJpvcNo(berthPlanList.get(i).getJpvcNo());
	        	List list = vesselScheduleDao.selectVesselScheduleDetail(vslParm).getCollection();
	        	totalScheduleData.add(list.get(0));
	        }
        	vesselScheduleInfoList.setData(totalScheduleData);
	        vesselScheduleList = vesselScheduleInfoList.getData();
	         
	        //Tide List
	        List tideInformationInfoList = new ArrayList();
	    	int fromYear =  Integer.parseInt(new SimpleDateFormat("yyyy").format(parm.getEtaFrom()));
			int fromMonth =  Integer.parseInt(new SimpleDateFormat("MM").format(parm.getEtaFrom()));
			int fromDate =  Integer.parseInt(new SimpleDateFormat("dd").format(parm.getEtaFrom()));
			
			int toYear =  Integer.parseInt(new SimpleDateFormat("yyyy").format(parm.getEtaTo()));
			int toMonth =  Integer.parseInt(new SimpleDateFormat("MM").format(parm.getEtaTo()));
			int toDate =  Integer.parseInt(new SimpleDateFormat("dd").format(parm.getEtaTo()));
			String dateFrom = fromDate+"/"+fromMonth+"/"+fromYear;
			String dateTo = toDate+"/"+toMonth+"/"+toYear;
	        tideParm.setDateFm(dateFrom);
	        tideParm.setDateTo(dateTo);
	    	DataItemList tideInfo = shipInPortDao.selectTideInformationList(tideParm);
	    	tideInformationInfoList  = tideInfo.getCollection();
	    	tideInformationList = tideInformationInfoList;
 
	    	PackageItem resultItem = bayPlanReport.onPrintBayPlan(	parm,
	    															berthList,
	    															berthPlanList,
	    															berthNextPlanList,
	    															vesselScheduleDataList,
	    															vesselScheduleList,
	    															tideInformationList,
	    															berthBittList
	    															);
	    	DataItemList resultList = new DataItemList();
			resultList.add(resultItem);
			return resultList;
		} catch (BizException e) {
			throw new BizException(e);
		}
	}
}
