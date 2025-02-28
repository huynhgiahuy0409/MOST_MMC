/**
*
* CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF TOTAL SOFT BANK 
* LTD
*
* Copyright (C) 1988-2010 TOTAL SOFT BANK LTD. All Rights
* Reserved. Use of this source code is subject to the terms of 
* the applicable license agreement.
*
* The copyright notice(s) in this source code does not indicate 
* the actual or intended publication of this source code.
*
* Created on   : 2013. 4. 22.
* CVS revision : $Revision: 1.1 $ 
*
* ====================================
* CHANGE REVISION
* ====================================
* DATE           AUTHOR           REVISION
* 2014. 1. 20.   Anna 1.0    First release.
* ====================================
* CLASS DESCRIPTION
* Export Report  
* ====================================
*/

package com.tsb.most.biz.service.report;

import java.util.List;
import java.io.File;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

import com.tsb.most.biz.dao.monitoring.IDailyOperationsReportDao;
import com.tsb.most.biz.dao.monitoring.IDischargingDao;
import com.tsb.most.biz.dao.monitoring.IGatePassListDao;
import com.tsb.most.biz.dao.monitoring.ILoadingDao;
import com.tsb.most.biz.dao.operation.IVORDryBreakBulkDao;
import com.tsb.most.biz.dataitem.document.TruckAssignmentItem;
import com.tsb.most.biz.dataitem.monitoring.DailyOperationsReportItem;
import com.tsb.most.biz.dataitem.monitoring.DischargingItem;
import com.tsb.most.biz.dataitem.report.CargoInterchangeReceiptItem;
import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.biz.parm.monitoring.SearchDailyOperationsReportParm;
import com.tsb.most.biz.parm.monitoring.SearchDischargingParm;
import com.tsb.most.biz.parm.monitoring.SearchGatePassImportParm;
import com.tsb.most.biz.parm.monitoring.SearchLoadingParm;
import com.tsb.most.biz.parm.operation.SearchVORDryBreakBulkParm;
import com.tsb.most.biz.parm.report.SearchCargoInterchangeReceiptParm;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.common.util.QRCodeUtil;
import com.tsb.most.common.util.ReportUtil;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;


public class MonitoringReport extends MOSTBaseService implements IMonitoringReport {
	private IGatePassListDao gatePassListDao;
	private IVORDryBreakBulkDao vorDryBreakBulkDao;
	private IDischargingDao dischargingDao;
	private ILoadingDao loadingDao;
	private IDailyOperationsReportDao dailyOperationsReportDao;
	
	public void setGatePassListDao(IGatePassListDao gatePassListDao) {
		this.gatePassListDao = gatePassListDao;
	}

	public void setVorDryBreakBulkDao(IVORDryBreakBulkDao vorDryBreakBulkDao) {
		this.vorDryBreakBulkDao = vorDryBreakBulkDao;
	}
	
	public void setDischargingDao(IDischargingDao dischargingDao) {
		this.dischargingDao = dischargingDao;
	}

	public void setLoadingDao(ILoadingDao loadingDao) {
		this.loadingDao = loadingDao;
	}

	public void setDailyOperationsReportDao(IDailyOperationsReportDao dailyOperationsReportDao) {
		this.dailyOperationsReportDao = dailyOperationsReportDao;
	}

	//GatePass Detail Report
	@Override
	public ReportItem getGatePassDetailReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		SearchGatePassImportParm searchParm = new SearchGatePassImportParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		String saveDirPath = AppContextPropertyLoader.properties.getProperty("file.pdf.path");
		File folder = new File(saveDirPath);
		
		if(!folder.exists()) {
			try {
				folder.mkdir();
			} catch (Exception e){
				e.getStackTrace();
			}
		}
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setUserId(parm.getParam2());
		
		itemList = gatePassListDao.selectGatePassImportList(searchParm);
		
		parmMap.put("USER_ID", searchParm.getUserId());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "laip_mark.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	//CIR
	public ReportItem selectCargoInterchangeReceiptReport(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchCargoInterchangeReceiptParm cirParm = new SearchCargoInterchangeReceiptParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		cirParm.setVslCallId(parm.getParam1());
		cirParm.setLorryNo(parm.getParam2());
		cirParm.setGateTxnNo(parm.getParam3());
		cirParm.setSdoNo(parm.getParam4());
		cirParm.setGrNo(parm.getParam5());
		cirParm.setUserId(parm.getParam6());
		cirParm.setUserName(parm.getParam7());
		
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		DataItemList reportData = (DataItemList)serviceProviderPojo.execute("MOST.gateOut.selectCargoInterchangeReceiptReport",cirParm);
		
		CargoInterchangeReceiptItem itm =(CargoInterchangeReceiptItem) reportData.get(0);
		parmMap.put("REPORT_ID","RMT002");
        parmMap.put("USER_ID", cirParm.getUserId());
        
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        itemList.add(itm);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring"+File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	// VORDryBreak
	public ReportItem selectHandlingServicePDFReportList(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchVORDryBreakBulkParm searchParm = new SearchVORDryBreakBulkParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setRemark(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		
		itemList = vorDryBreakBulkDao.selectHandlingServicePDFReportList(searchParm);

		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("USER_ID", searchParm.getUserId());
        parmMap.put("PRINTER", searchParm.getUserId());
        parmMap.put("REMARK", parm.getParam3());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	// VORDryBreak
	public ReportItem selectROROCForm1Reprot(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchVORDryBreakBulkParm searchParm = new SearchVORDryBreakBulkParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setRemark(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		
		itemList = vorDryBreakBulkDao.selectROROCForm1ReprotList(searchParm);
		
		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("USER_ID", searchParm.getUserId());
        parmMap.put("PRINTER", searchParm.getUserId());
        parmMap.put("REMARK", parm.getParam3());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	// VORDryBreak
	public ReportItem selectROROCForm2Reprot(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchVORDryBreakBulkParm searchParm = new SearchVORDryBreakBulkParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setRemark(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		searchParm.setBargeNo(parm.getParam5());
		
		itemList = vorDryBreakBulkDao.selectROROCForm2ReprotList(searchParm);
		
		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("USER_ID", searchParm.getUserId());
        parmMap.put("PRINTER", searchParm.getUserId());
        parmMap.put("REMARK", parm.getParam3());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	
	/**
	 *  VesselDischargeReport.jrxml
	 */
	public ReportItem selectVesselDischargeListReport(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchDischargingParm searchParm = new SearchDischargingParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setMfDocId(parm.getParam2());
		searchParm.setBlNo(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		
		itemList = dischargingDao.selectVesselDischargeListReport(searchParm);

		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("USER_ID", searchParm.getUserId());
        parmMap.put("PRINTER", searchParm.getUserId());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	/**
	 *  VesselLoadReport.jrxml
	 */
	public ReportItem selectVesselLoadListReport(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchLoadingParm searchParm = new SearchLoadingParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setMfDocId(parm.getParam2());
		searchParm.setUserId(parm.getParam4());
		
		itemList = loadingDao.selectVesselLoadListReport(searchParm);
		
		
		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("USER_ID", searchParm.getUserId());
        parmMap.put("PRINTER", searchParm.getUserId());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	
	/**
	 *  PortDepartureReport.jrxml
	 */
	public ReportItem selectPortDepartureReport(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchVORDryBreakBulkParm searchParm = new SearchVORDryBreakBulkParm();
		DataItemList itemList = new DataItemList();
		
		ByteBuffer buffer = StandardCharsets.UTF_8.encode(parm.getParam3()); 

		String utf8EncodedString = StandardCharsets.UTF_8.decode(buffer).toString();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setUserId(parm.getParam4());
		
		itemList = vorDryBreakBulkDao.selectPortDepartureReport(searchParm);

		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("USER_ID", searchParm.getUserId());
        parmMap.put("PRINTER", searchParm.getUserId());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        parmMap.put("REMARK", parm.getParam3());
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	/**
	 *  CertificateofShortlandedOverlandedCargo.jrxml
	 */
	public ReportItem selectCertOfShrtLandedOvLandedCargoReport(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchDischargingParm searchParm = new SearchDischargingParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		
		if(parm.getParam2() != null && !parm.getParam2().equals("")) {
			searchParm.setMfDocId(parm.getParam2());
		}
		
		searchParm.setBlNo(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		
		itemList = dischargingDao.selectCertOfShrtLandedOvLandedCargoReport(searchParm);

		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("USER_ID", searchParm.getUserId());
        parmMap.put("PRINTER", searchParm.getUserId());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        parmMap.put("REMARK", parm.getParam5());
        
        try{
			String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator+parm.getFile(); // report folder is
			JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
			double manifestWgt = 0.0;		// (Total cargo weight on cargo manifest/Ton)
			double actualWgt = 0.0;			// Total actual handling cargo weight/Ton)
			double shrLndOvrLndWgtTo = 0.0;	// (Shortlanded/Overlanded Cargo Weight/Ton)
			double shrLndOvrLnd = 0.0;		// (Shortlanded/Overlanded Cargo)
			
         	if(itemList != null && itemList.size() > 0) {
				for(int i = 0; i<itemList.size(); i++){
					
					DischargingItem cgItem = (DischargingItem)itemList.get(i);
					
					if(cgItem.getActualWgt() != null && !cgItem.getActualWgt().equals("")) {
						actualWgt += Double.parseDouble(cgItem.getActualWgt());
					}
					if(cgItem.getManifestWgt() != null && !cgItem.getManifestWgt().equals("")) {
						manifestWgt += Double.parseDouble(cgItem.getManifestWgt());
					}
					if(cgItem.getShrLndOvrLndWgtTon2() != null && !cgItem.getShrLndOvrLndWgtTon2().equals("")) {
						shrLndOvrLndWgtTo += Double.parseDouble(cgItem.getShrLndOvrLndWgtTon2());
					}
					if(cgItem.getShrLndOvrLnd() != null && !cgItem.getShrLndOvrLnd().equals("")) {
						shrLndOvrLnd += Double.parseDouble(cgItem.getShrLndOvrLnd());
					}
				}
         	}

         	parmMap.put("MANF_WGT", String.format("%,.3f",manifestWgt));
         	parmMap.put("ACTUAL_WGT", String.format("%,.3f",actualWgt));
         	parmMap.put("SHRTLENDED_WGT_TON", String.format("%,.3f", actualWgt - manifestWgt));
         	parmMap.put("SHRTLENDED_WGT", String.format("%,.3f",(((actualWgt - manifestWgt)/manifestWgt) * 100)));
         	
			reportResultItem.setDataItemList(itemList);
			reportResultItem.setParameterMap(parmMap);
			reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	/**
	 * DailyOperationsReport.jrxml
	 */
	public ReportItem selectDailyOperationsReport(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchDailyOperationsReportParm searchParm = new SearchDailyOperationsReportParm();
		DataItemList itemList = new DataItemList();
		
		ByteBuffer buffer = StandardCharsets.UTF_8.encode(parm.getParam3()); 

		String utf8EncodedString = StandardCharsets.UTF_8.decode(buffer).toString();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setFromDate(parm.getParam2());
		searchParm.setToDate(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		
		itemList = dailyOperationsReportDao.selectDailyOperationsReport(searchParm);
		List vesselRepairList = dailyOperationsReportDao.selectVesselOperationsDelayReport(searchParm);
		
		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("USER_ID", searchParm.getUserId());
        parmMap.put("PRINTER", searchParm.getUserId());
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        parmMap.put("FROM_DATE", parm.getParam2());
        parmMap.put("TO_DATE", parm.getParam3());
        parmMap.put("REMARK", parm.getParam5());
        
        try{
			String reportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator+parm.getFile(); // report folder is
			JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
			
			double docWgt = 0.0;
			
			if(itemList != null && itemList.size() > 0) {
				for(int i = 0; i<itemList.size(); i++){
					DailyOperationsReportItem item = new DailyOperationsReportItem();
					
					if(item.getDocWgt() != null && !item.getDocWgt().equals("")) {
						docWgt += Double.parseDouble(item.getDocWgt());
					}
					
				}
			}
			
			parmMap.put("VESSEL_DELAY_ITEM_LIST", vesselRepairList);
			String subReportSource = ReportUtil.getReportPath() +  File.separator + "monitoring" + File.separator + "vesselmonitoring" +File.separator + "DailyOperationsReportRepair.jrxml";
			JasperReport subReport = JasperCompileManager.compileReport(subReportSource);
			parmMap.put("VESSEL_DELAY_REPAIR_DATA", subReport);
 			
			reportResultItem.setDataItemList(itemList);
			reportResultItem.setParameterMap(parmMap);
			reportResultItem.setMainReport(mainReport);
			
			
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
}