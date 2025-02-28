package com.tsb.most.biz.service.monitoring;


import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.monitoring.IDischargingDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.monitoring.DischargingItem;
import com.tsb.most.biz.parm.monitoring.SearchDischargingParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class Discharging extends MOSTBaseService implements IDischarging {
	private ICodeMasterDao codeMasterDao;
	private ICargoMasterDao cargoMasterDao;
	private IDischargingDao dischargingDao;
	
	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	public void setDischargingDao(IDischargingDao dischargingDao) {
		this.dischargingDao = dischargingDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	///////////////////////////////////////////////
	public DataItemList selectListOfDischarging(SearchDischargingParm parm) throws BizException {
        return dischargingDao.selectListOfDischarging(parm);
    }
	
	public DataItemList selectModeOfOpr(SearchDischargingParm parm) throws BizException {
    	
    	DischargingItem returnItem = new DischargingItem();
        
    	// delivery mode
        returnItem.setOprList(dischargingDao.selectModeOfOpr().getCollection());

        // shift
        //SearchCargoMasterParm shfParm = new SearchCargoMasterParm();
        //returnItem.setShiftList(cargoMasterDao.selectShift(shfParm).getCollection());

        // hatch
        SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
        partyCode.setLcd(CodeConstant.LCD_MOST);
        partyCode.setMcd(CodeConstant.MCD_MT_HTC);
        returnItem.setHatchNoList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

        DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        
        return returnItems;
    }
	
	public DataItemList selectImportManifestComboList(SearchDischargingParm parm) throws BizException {
		return dischargingDao.selectImportManifestComboList(parm);
    }
	
	public DataItemList selectImportBLComboList(SearchDischargingParm parm) throws BizException {
		return dischargingDao.selectImportBLComboList(parm);
    }
	
	public DataItemList selectNumbPage(SearchDischargingParm parm) throws BizException {
        return dischargingDao.selectNumbPage(parm);
    }
	
	public DataItemList selectVesselDischargeListReport(SearchDischargingParm parm) throws BizException {
        return dischargingDao.selectVesselDischargeListReport(parm);
    }
}