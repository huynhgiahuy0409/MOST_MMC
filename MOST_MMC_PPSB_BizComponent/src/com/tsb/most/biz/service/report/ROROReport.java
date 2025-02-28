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

import java.io.File;
import java.util.HashMap;

import com.tsb.most.biz.dao.operation.IRoRoCargoReportDao;
import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.operation.SearchRoRoCargoReportParm;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.common.util.ReportUtil;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;


public class ROROReport extends MOSTBaseService implements IROROReport {
	
	private IRoRoCargoReportDao roroCargoReportDao;
	
	public void setRoroCargoReportDao(IRoRoCargoReportDao roroCargoReportDao) {
		this.roroCargoReportDao = roroCargoReportDao;
	}

	//RORO VIN by Shift
	@Override
	public ReportItem getROROVinByShiftReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		SearchRoRoCargoReportParm searchParm = new SearchRoRoCargoReportParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setWorkingDate(parm.getParam2());
		searchParm.setShiftCd(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		searchParm.setPrintTp(parm.getParam5());
		
		itemList = roroCargoReportDao.selectRoRoVinByShiftReportItems(searchParm);
        parmMap.put("USER_ID", searchParm.getUserId());
        
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "johor_mark.gif"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "controller"+File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	//RORO Damage VIN by Shift
	@Override
	public ReportItem getRoRoDamageVinByShiftReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		SearchRoRoCargoReportParm searchParm = new SearchRoRoCargoReportParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setWorkingDate(parm.getParam2());
		searchParm.setShiftCd(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		searchParm.setPrintTp(parm.getParam5());
		
		itemList = roroCargoReportDao.selectRoRoDamageVinByShiftReportItems(searchParm);
        parmMap.put("USER_ID", searchParm.getUserId());
        
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "johor_mark.gif"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "controller"+File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
	
	//RORO VIN Damage Inventory by Shift
	@Override
	public ReportItem getInventoryPerVinAndShiftReportItems(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		SearchRoRoCargoReportParm searchParm = new SearchRoRoCargoReportParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		searchParm.setVslCallId(parm.getParam1());
		searchParm.setWorkingDate(parm.getParam2());
		searchParm.setShiftCd(parm.getParam3());
		searchParm.setUserId(parm.getParam4());
		searchParm.setPrintTp(parm.getParam5());
		
		itemList = roroCargoReportDao.selectInventoryPerVinAndShiftReportItems(searchParm);
        parmMap.put("USER_ID", searchParm.getUserId());
        
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "johor_mark.gif"; 
        parmMap.put("IMAGE_PATH", imagePath);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "controller"+File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}
}