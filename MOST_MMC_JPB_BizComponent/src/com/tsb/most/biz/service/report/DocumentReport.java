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

import com.tsb.most.biz.dao.document.IShippingNoteDao;
import com.tsb.most.biz.dataitem.document.DeliveryOrderItem;
import com.tsb.most.biz.dataitem.document.GoodsReceiptItem;
import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.dataitem.document.TruckAssignmentItem;
import com.tsb.most.biz.dataitem.report.ReportItem;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.biz.parm.report.SearchReportParm;
import com.tsb.most.common.util.QRCodeUtil;
import com.tsb.most.common.util.ReportUtil;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;


public class DocumentReport extends MOSTBaseService implements IDocumentReport {
	
	private IShippingNoteDao shippingNoteDao;
	
	public IShippingNoteDao getShippingNoteDao() {
		return shippingNoteDao;
	}

	public void setShippingNoteDao(IShippingNoteDao shippingNoteDao) {
		this.shippingNoteDao = shippingNoteDao;
	}

	/* Preadvice by one stock - Print  */
	@Override
	public ReportItem previewShippingNote(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		SearchShippingNoteParm noteParm = new SearchShippingNoteParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		noteParm.setVslCallId(parm.getParam1());
		noteParm.setShipgNoteNo(parm.getParam2());
		noteParm.setDelvTpCd(parm.getParam3());
		noteParm.setUserId(parm.getParam4());
		noteParm.setSearchFlag(parm.getParam5());
		noteParm.setTsptTpCd(parm.getParam6());
		
		
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		DataItemList reportData = (DataItemList)serviceProviderPojo.execute("MOST.shippingNote.selectShippingNoteList",noteParm);
		
		ShippingNoteItem itm =(ShippingNoteItem) reportData.get(0);
		parmMap.put("REPORT_ID","RCS014");
		parmMap.put("SN_NO",itm.getShipgNoteNo());
		String shpr = itm.getShprNm();
        if(shpr == null) shpr = "";
        	shpr += "\n";
        if(itm.getShprAddr() != null && itm.getShprAddr().length() > 0)
            shpr += itm.getShprAddr();
        if(itm.getShprAddr2() != null && itm.getShprAddr2().length() > 0)
            shpr += "," + itm.getShprAddr2();
        if(itm.getShprAddr3() != null && itm.getShprAddr3().length() > 0)
            shpr += "," + itm.getShprAddr3();
        if(itm.getShprAddr4() != null && itm.getShprAddr4().length() > 0)
            shpr += "," + itm.getShprAddr4();
        parmMap.put("SHIPPER",shpr);
        String cnsne = itm.getCnsneNm();
        if(cnsne == null) cnsne = "";
        	cnsne += "\n";
        if(itm.getCnsneAddr() != null && itm.getCnsneAddr().length() > 0)
            cnsne += itm.getCnsneAddr();
        if(itm.getCnsneAddr2() != null && itm.getCnsneAddr2().length() > 0)
            cnsne += "," + itm.getCnsneAddr2();
        if(itm.getCnsneAddr3() != null && itm.getCnsneAddr3().length() > 0)
            cnsne += "," + itm.getCnsneAddr3();
        if(itm.getCnsneAddr4() != null && itm.getCnsneAddr4().length() > 0)
            cnsne += "," + itm.getCnsneAddr4();
        parmMap.put("CONSIGNEE",cnsne);
        String sa = itm.getSa();
        if(sa == null) sa = "";
        	sa += "\n";
        if(itm.getSaAddr1() != null && itm.getSaAddr1().length() > 0)
            sa += itm.getSaAddr1();
        parmMap.put("SA",sa);
        parmMap.put("JPB_REG_NO",itm.getJpbRefNo());
        parmMap.put("ETA",itm.getEta());
        parmMap.put("JPVC",itm.getVslCallId());
        parmMap.put("COUNTRY_ORG",itm.getOrgCntry());
        parmMap.put("COUNTRY_DEST",itm.getCntryOfDest());
        
        parmMap.put("VSL_NM","");
        parmMap.put("ARR_DT",itm.getEstArrvDt()==null?"":itm.getEstArrvDt().toString());
        parmMap.put("BERTH_LOC",itm.getBerthLoc());
        parmMap.put("WH_LOC",itm.getWhLoc());
        parmMap.put("DG_CLASS_NO",itm.getJpGroup());
        parmMap.put("MARK_NO",itm.getMarkNo());
        
        parmMap.put("QR_CODE", QRCodeUtil.generateQRCodeBufferedImage(itm.getShipgNoteNo()!=null? itm.getShipgNoteNo():" ", 150, 150));
        
        String tempUnno = itm.getUnno();
        String tempImdg = itm.getImdg();
        
        if(tempUnno != null ){
            parmMap.put("DG_CLASSIFY",itm.getUnno() + " / " + itm.getImdg());
        }else {
            parmMap.put("DG_CLASSIFY","");
        }
        
        parmMap.put("CG_TP",itm.getCgTpNm());
        parmMap.put("POD",itm.getPortOfDis());
        parmMap.put("PKG_TP",itm.getPkgTpCdNm());
        String tmp = itm.getCbrNo();
        if(tmp == null)tmp = "";
        tmp += "/";
        if(itm.getReleaseNo() != null) tmp += itm.getReleaseNo();
        parmMap.put("CBR_NO",tmp);
        parmMap.put("FINAL_DEST",itm.getFnlDest());
        parmMap.put("QUANTITY",Integer.toString(itm.getPkgQty()));
        parmMap.put("GOOD_DESCR",itm.getCmdtCdNm());
        parmMap.put("COMMODITY_CODE",itm.getCmdtCd());
        parmMap.put("GROSS_WEIGHT",Double.toString(itm.getCgWgt()));
        parmMap.put("MSRT",Double.toString(itm.getCgMsrmt()));
        parmMap.put("USER_ID", parm.getUserId());
        
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "laip_mark.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        itemList.add(itm);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "document"+File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}

	public ReportItem previewShippingNoteNonVessel(SearchReportParm parm) throws BizException {
		ReportItem reportResultItem = new ReportItem();
		
		return reportResultItem;
	}

	@Override
	public ReportItem previewGoodsReceipt(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchGoodsReceiptParm grParm = new SearchGoodsReceiptParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		grParm.setVslCallId(parm.getParam1());
		grParm.setShipgNoteNo(parm.getParam2());
		grParm.setGdsRecvNo(parm.getParam3());
		grParm.setUserId(parm.getParam4());
		
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		DataItemList reportData = (DataItemList)serviceProviderPojo.execute("MOST.goodsReceipt.selectGoodsReceiptReport",grParm);
		
		GoodsReceiptItem itm =(GoodsReceiptItem) reportData.get(0);
		parmMap.put("REPORT_ID","RCS017");
        parmMap.put("QR_CODE", QRCodeUtil.generateQRCodeBufferedImage(itm.getGdsRecvNo()!=null? itm.getGdsRecvNo():" ", 150, 150));
        parmMap.put("USER_ID", grParm.getUserId());
        
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        itemList.add(itm);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "document"+File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}

	@Override
	public ReportItem previewSubDeliveryOrderReport(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchDeliveryOrderParm sdoParm = new SearchDeliveryOrderParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		sdoParm.setVslCallId(parm.getParam1());
		sdoParm.setBlno(parm.getParam2());
		sdoParm.setSdono(parm.getParam3());
		sdoParm.setUserId(parm.getParam4());
		
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		DataItemList reportData = (DataItemList)serviceProviderPojo.execute("MOST.deliveryOrder.selectSubDeliveryOrderReport",sdoParm);
		
		DeliveryOrderItem itm =(DeliveryOrderItem) reportData.get(0);
		parmMap.put("REPORT_ID","RCS018");
        parmMap.put("QR_CODE", QRCodeUtil.generateQRCodeBufferedImage(itm.getSdono()!=null? itm.getSdono():" ", 150, 150));
        parmMap.put("USER_ID", sdoParm.getUserId());
        
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        itemList.add(itm);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "document"+File.separator+parm.getFile(); // report folder is
             JasperReport mainReport = JasperCompileManager.compileReport(reportSource);	
             
             reportResultItem.setDataItemList(itemList);
             reportResultItem.setParameterMap(parmMap);
             reportResultItem.setMainReport(mainReport);
		}catch(Exception e){
			throw new BizException(e);
		}	
        
		return reportResultItem;
	}

	public ReportItem previewInternalMovementTicket(SearchReportParm parm) throws BizException {
		// TODO Auto-generated method stub
		ReportItem reportResultItem = new ReportItem();
		SearchTruckAssignmentParm asgnParm = new SearchTruckAssignmentParm();
		DataItemList itemList = new DataItemList();
		
		HashMap parmMap = new HashMap();
		
		asgnParm.setVslCallId(parm.getParam1());
		asgnParm.setSeq(parm.getParam2());
		asgnParm.setBlNo(parm.getParam3());
		asgnParm.setShipgNoteNo(parm.getParam4());
		asgnParm.setGrNo(parm.getParam5());
		asgnParm.setSubDoNo(parm.getParam6());
		asgnParm.setGateNo(parm.getParam7());
		asgnParm.setScaleNo(parm.getParam8());
		asgnParm.setUserId(parm.getParam9());
		asgnParm.setTruckMode(parm.getParam10());
		
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		DataItemList reportData = (DataItemList)serviceProviderPojo.execute("MOST.truckAssignment.selectInternalMovementTicketReport",asgnParm);
		
		TruckAssignmentItem itm =(TruckAssignmentItem) reportData.get(0);
		parmMap.put("REPORT_ID","RCS019");
        parmMap.put("QR_CODE", QRCodeUtil.generateQRCodeBufferedImage(itm.getQrNo()!=null? itm.getQrNo():" ", 150, 150));
        parmMap.put("USER_ID", asgnParm.getUserId());
        
        String imagePath =  ReportUtil.getReportPath()  +  File.separator +  "LOGO_NEW_LAIP.png"; 
        parmMap.put("IMAGE_PATH", imagePath);
        itemList.add(itm);
        
        try{
        	 String reportSource = ReportUtil.getReportPath() +  File.separator + "document"+File.separator+parm.getFile(); // report folder is
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