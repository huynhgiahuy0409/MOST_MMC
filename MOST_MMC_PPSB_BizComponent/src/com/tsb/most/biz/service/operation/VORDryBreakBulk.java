package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.IVORDryBreakBulkDao;
import com.tsb.most.biz.dataitem.operation.VORDryBreakBulkItem;
import com.tsb.most.biz.parm.operation.SearchVORDryBreakBulkParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class VORDryBreakBulk extends MOSTBaseService implements IVORDryBreakBulk{

	private IVORDryBreakBulkDao vorDryBreakBulkDao;
	private ICodeMasterDao codeMasterDao;

    public void setVorDryBreakBulkDao(IVORDryBreakBulkDao vorDryBreakBulkDao) {
		this.vorDryBreakBulkDao = vorDryBreakBulkDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
	
	///////////////////////////////////////////////////////////////////////////

	public DataItemList selectVORDryBreakBulk(SearchVORDryBreakBulkParm parm) throws BizException {
    	DataItemList returnItems = new DataItemList();
    	
        VORDryBreakBulkItem returnItem = new VORDryBreakBulkItem();

        if (parm.getSearchType().equals("info")) {
            ArrayList<VORDryBreakBulkItem> vesselInfoList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectVesselInfomation(parm).getCollection();
            ArrayList<VORDryBreakBulkItem> vorList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectVORList(parm).getCollection();
            ArrayList<VORDryBreakBulkItem> handlingList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectHandlingList(parm).getCollection();
            ArrayList<VORDryBreakBulkItem> shiftingList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectShiftingList(parm).getCollection();
            ArrayList<VORDryBreakBulkItem> bankingList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectBankingList(parm).getCollection();
            
            ArrayList<VORDryBreakBulkItem> reportOprList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectHandlingServicePDFReportList(parm).getCollection();
            ArrayList<VORDryBreakBulkItem> reportFrom1List = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectROROCForm1ReprotList(parm).getCollection();
            ArrayList<VORDryBreakBulkItem> reportFrom2List = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectROROCForm2ReprotList(parm).getCollection();

            returnItem.setReportOprSrv(reportOprList);
            returnItem.setReportForm1(reportFrom1List);
            returnItem.setReportForm2(reportFrom2List);
            
            returnItem.setVesselInfoList(vesselInfoList);
            returnItem.setListVOR(vorList);
            returnItem.setHandlingList(handlingList);
            returnItem.setShiftingList(shiftingList);
            returnItem.setBankingList(bankingList);;
            
            returnItems.add(returnItem);
            return returnItems;
            
        } else if (parm.getSearchType().equals("combo")) {
            List shiftedLocList = vorDryBreakBulkDao.selectShiftedLocList(parm).getCollection();
            returnItem.add(shiftedLocList);

            SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
            ArrayList arrService = new ArrayList();
            Object[] parmObj;

            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_SFTRSN);
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_DBLBNKDIV);
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

            returnItems.add(returnItem);
        }

        return returnItems;

    }
    
    public DataItemList selectVesselInformation(SearchVORDryBreakBulkParm parm) throws BizException {
    	VORDryBreakBulkItem returnItem = new VORDryBreakBulkItem();
        List rsDRList = new ArrayList();
        VORDryBreakBulkItem drItem = new VORDryBreakBulkItem();
        VORDryBreakBulkItem tmpDRItem;
        DataItemList returnItems = new DataItemList();
        RestResponse response = new RestResponse();

        List dailyRosterRptList;
        List handlingSumList;

        String strWharf = "";
        String strHatch = "";
        String strYard = "";
        String strBG = "";
        String strLL = "";
        String strCU = "";
        String strSuper = "";
        String strOperClerk = "";
        String strConven = "";
        
        ArrayList<VORDryBreakBulkItem> rsDRList2 = new ArrayList<VORDryBreakBulkItem>();
        ArrayList<VORDryBreakBulkItem> infoList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectVesselInfomation(parm).getCollection();
        ArrayList<VORDryBreakBulkItem> detailHandingList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectDetailOfHandingRpt(parm).getCollection();
        dailyRosterRptList = vorDryBreakBulkDao.selectDailyRosterRpt(parm).getCollection();
        ArrayList<VORDryBreakBulkItem> drStevedore = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectDRStevedoreList(parm).getCollection();
        ArrayList<VORDryBreakBulkItem> drTrimming = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectDRTrimmingList(parm).getCollection();
        ArrayList<VORDryBreakBulkItem> equipmentsFAC = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectEquipmentsRptFAC(parm).getCollection();
        handlingSumList = vorDryBreakBulkDao.selectHandlingSum(parm).getCollection();
        String opeDate = parm.getWorkYmd();
        boolean checkWYmd =  "".equalsIgnoreCase(parm.getWorkYmd());
        if (parm.getWorkYmd() != null) {
        	if(!checkWYmd) {
        		parm.setHlDayYmd(opeDate.substring(0, 2));
                parm.setHlMonthYmd(opeDate.substring(3, 5));
        	}
            
        }
        ArrayList<VORDryBreakBulkItem> holidayList = (ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectHoliday(parm).getCollection();

        if (dailyRosterRptList.size() > 0) {
            List divList = (List) dailyRosterRptList;

            for (int j = 0; j < divList.size(); j++) {
                tmpDRItem = (VORDryBreakBulkItem) divList.get(j);

                if ("SD".equals(tmpDRItem.getDivCd())) {
                    if ("OS".equals(tmpDRItem.getRoleCd())) { // Operation
                        // Supervisor
                        if ("".equals(strSuper)) {
                            strSuper = tmpDRItem.getDriverId();
                        } else {
                            strSuper += "," + tmpDRItem.getDriverId();
                        }
                    } else if ("OC".equals(tmpDRItem.getRoleCd())) {// Operation
                        // Assitant
                        if ("".equals(strOperClerk)) {
                            strOperClerk = tmpDRItem.getDriverId();
                        } else {
                            strOperClerk += "," + tmpDRItem.getDriverId();
                        }
                    }
                } else if ("PC".equals(tmpDRItem.getDivCd())) {
                    if ("BG".equals(tmpDRItem.getRoleCd())) {
                        if ("".equals(strBG)) {
                            strBG = tmpDRItem.getDriverId();
                        } else {
                            strBG += "," + tmpDRItem.getDriverId();
                        }
                    } else if ("LL".equals(tmpDRItem.getRoleCd())) {
                        if ("".equals(strLL)) {
                            strLL = tmpDRItem.getDriverId();
                        } else {
                            strLL += "," + tmpDRItem.getDriverId();
                        }
                    } else if ("CU".equals(tmpDRItem.getRoleCd())) {
                        if ("".equals(strCU)) {
                            strCU = tmpDRItem.getDriverId();
                        } else {
                            strCU += "," + tmpDRItem.getDriverId();
                        }
                    } else if ("SH".equals(tmpDRItem.getRoleCd())) {
                        if ("".equals(strConven)) {
                            strConven = tmpDRItem.getDriverId();
                        } else {
                            strConven += "," + tmpDRItem.getDriverId();
                        }
                    }
                } else if ("FL".equals(tmpDRItem.getDivCd())) {
                    if ("WRF".equals(tmpDRItem.getWorkLoc())) {
                        if ("".equals(strWharf)) {
                            strWharf = tmpDRItem.getDriverId();
                        } else {
                            strWharf += "," + tmpDRItem.getDriverId();
                        }
                    } else if ("HTC".equals(tmpDRItem.getWorkLoc())) {
                        if ("".equals(strHatch)) {
                            strHatch = tmpDRItem.getDriverId();
                        } else {
                            strHatch += "," + tmpDRItem.getDriverId();
                        }
                    } else if ("WHO".equals(tmpDRItem.getWorkLoc())) {
                        if ("".equals(strYard)) {
                            strYard = tmpDRItem.getDriverId();
                        } else {
                            strYard += "," + tmpDRItem.getDriverId();
                        }
                    }
                }
            }

            drItem.setSupervisor(strSuper);
            drItem.setOperClerk(strOperClerk);
            drItem.setConventional(strConven);
            drItem.setBg(strBG);
            drItem.setLl(strLL);
            drItem.setCu(strCU);
            drItem.setWharf(strWharf);
            drItem.setHatch(strHatch);
            drItem.setYard(strYard);
            
            drItem.setSteveComp("");
            drItem.setTrimmingComp("");
            
            parm.setCgTpCd("BBK");
            VORDryBreakBulkItem steveComp = (VORDryBreakBulkItem)vorDryBreakBulkDao.selectComp(parm);
            parm.setCgTpCd("DBK");
            VORDryBreakBulkItem trimmingComp = (VORDryBreakBulkItem)vorDryBreakBulkDao.selectComp(parm);

            
            if (steveComp != null) {
                drItem.setSteveComp(steveComp.getWorkComp());
            }
            if (trimmingComp != null) {
                drItem.setTrimmingComp(trimmingComp.getWorkComp());
            }
        }

        rsDRList.add(drItem);
        
        rsDRList2.add(drItem);

        returnItem.setVesselInformation(infoList);
        returnItem.setVesselInfo(infoList);
        returnItem.add(rsDRList);
        returnItem.setVesselInformation(rsDRList2);
        
        returnItem.setStevedoreList(drStevedore);
        returnItem.setTrimmingList(drTrimming);
        returnItem.setFacility(equipmentsFAC);
        
        returnItem.setDetailHandling(detailHandingList);
        returnItem.setRemarkList((ArrayList<VORDryBreakBulkItem>)vorDryBreakBulkDao.selectRemark(parm).getCollection());
        returnItem.setHandlingSumList((ArrayList<VORDryBreakBulkItem>)handlingSumList);
        returnItem.setHolidayList(holidayList);
        
		returnItems.add(returnItem);
        return returnItems;
    }
    
    public DataItemList isOverlappedWithFinitePeriodHHT(SearchVORDryBreakBulkParm parm) throws BizException {
        return vorDryBreakBulkDao.isOverlappedWithFinitePeriodHHT(parm);
    }
    
    public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
    	DataItemList items = parm.getUpdateItems();
    	UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
    	VORDryBreakBulkItem masterItem = (VORDryBreakBulkItem)items.get(0);
    	ArrayList lst = masterItem.getItems();
    	if(lst.size() > 0) {
    		for (int i = 0; i < lst.size(); i++) {
    			VORDryBreakBulkItem item = (VORDryBreakBulkItem) lst.get(i);
                ArrayList listVOR = item.getListVOR();
                for(int j = 0; j < listVOR.size(); j++) {
                	VORDryBreakBulkItem itemVOR = (VORDryBreakBulkItem) listVOR.get(j);
                	updateItems.addUpdateItem(itemVOR);
                }
    		}
    	}
    	
    	if (updateItems.getUpdateItems().size() > 0) {
    		vorDryBreakBulkDao.updateListVORItems(updateItems);
    	}
    	
    	return items;
    }
    
    public DataItemList verifyItems(UpdateItemsBizParm parm) throws BizException {
    	DataItemList items = parm.getUpdateItems();
    	UpdateItemsBizParm verifyItems = new UpdateItemsBizParm();
    	VORDryBreakBulkItem masterItem = (VORDryBreakBulkItem)items.get(0);
    	ArrayList lst = masterItem.getItems();
    	if(lst.size() > 0) {
    		for (int i = 0; i < lst.size(); i++) {
    			VORDryBreakBulkItem item = (VORDryBreakBulkItem) lst.get(i);
				verifyItems.addUpdateItem(item);
    		}
    	}
    	
    	if (verifyItems.getUpdateItems().size() > 0) {
    		vorDryBreakBulkDao.updateListVORVerifyItems(verifyItems);
    	}
    	
    	return items;
    }
    
    public DataItemList selectVORList(SearchVORDryBreakBulkParm parm) throws BizException {
    	DataItemList returnItems = new DataItemList();
        return  returnItems = vorDryBreakBulkDao.selectVORList(parm);
    }
    
    public DataItemList selectHandlingList(SearchVORDryBreakBulkParm parm) throws BizException {
    	DataItemList returnItems = new DataItemList();
        return returnItems = vorDryBreakBulkDao.selectHandlingList(parm);
    }
    
    public DataItemList selectHandlingServicePDFReportList(SearchVORDryBreakBulkParm parm) throws BizException {
        return vorDryBreakBulkDao.selectHandlingServicePDFReportList(parm);
    }
    
    public DataItemList selectOpeJobList(SearchVORDryBreakBulkParm parm) throws BizException {
        return vorDryBreakBulkDao.selectOpeJobList(parm);
    }
}
