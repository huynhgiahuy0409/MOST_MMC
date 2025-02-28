package com.tsb.most.biz.service.monitoring;


import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.monitoring.IDischargingDao;
import com.tsb.most.biz.dao.monitoring.ILoadingDao;
import com.tsb.most.biz.dataitem.monitoring.LoadingItem;
import com.tsb.most.biz.parm.monitoring.SearchLoadingParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class Loading extends MOSTBaseService implements ILoading {
	private ICodeMasterDao codeMasterDao;
	private ILoadingDao loadingDao;
	private IDischargingDao dischargingDao;

	public void setDischargingDao(IDischargingDao dischargingDao) {
		this.dischargingDao = dischargingDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public void setLoadingDao(ILoadingDao loadingDao) {
		this.loadingDao = loadingDao;
	}

	///////////////////////////////////////////////
	public DataItemList selectListOfLoading(SearchLoadingParm parm) throws BizException {
        return loadingDao.selectListOfLoading(parm);
    }
	
	public DataItemList selectLoadingComboList(SearchLoadingParm parm) throws BizException {
    	
    	LoadingItem returnItem = new LoadingItem();
        
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
	
	public DataItemList selectListOfLoadingForHHT(SearchLoadingParm parm) throws BizException {
		LoadingItem returnItem = new LoadingItem();
        if (parm.getSearchType().equals("SNNo")) {
            DataItemList resultList = loadingDao.selectListOfLoadingSN(parm);

            returnItem.add(resultList);
        } if (parm.getSearchType().equals("SNNoTbl")) {
            return loadingDao.selectListOfLoadingSN(parm);
        }  else {
            int iTemp = ((Integer.parseInt(parm.getCurrentPage()) - 1) * Integer
                    .parseInt(parm.getNumbPerPage())) + 1;
            parm.setFromRow(iTemp + "");
            iTemp = (Integer.parseInt(parm.getCurrentPage()) * Integer
                    .parseInt(parm.getNumbPerPage()));
            parm.setToRow(iTemp + "");

            DataItemList resultList = loadingDao.selectListOfLoading(parm);

            returnItem.add(resultList);
        }
        DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        return returnItems;
    }
	
	public DataItemList selectBookingComboItems(SearchLoadingParm parm) throws BizException {
		return loadingDao.selectBookingComboItems(parm);
    }
	
	public DataItemList selectShippingNoteComboItems(SearchLoadingParm parm) throws BizException {
		return loadingDao.selectShippingNoteComboItems(parm);
    }
	
	public DataItemList selectVesselLoadListReport(SearchLoadingParm parm) throws BizException {
		return loadingDao.selectVesselLoadListReport(parm);
    }
}