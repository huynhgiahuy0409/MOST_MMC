package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IGateOutDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.monitoring.GateOutItem;
import com.tsb.most.biz.parm.monitoring.SearchGateOutParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.report.SearchCargoInterchangeReceiptParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class GateOut extends MOSTBaseService implements IGateOut {
	private IGateOutDao gateOutDao;
	private ICargoMasterDao cargoMasterDao;

	public void setGateOutDao(IGateOutDao gateOutDao) {
		this.gateOutDao = gateOutDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	///////////////////////////////////////////////
	public DataItemList selectListOfGateOut(SearchGateOutParm parm) throws BizException {
        return gateOutDao.selectListOfGateOut(parm);
    }

	public DataItemList selectListOfGateOutBlComboList(SearchGateOutParm parm) throws BizException {
    	GateOutItem returnItem = new GateOutItem();
        SearchCargoMasterParm cgParm = new SearchCargoMasterParm();
        cgParm.setVslCallId(parm.getVslCallId());

    	returnItem.setSnList(cargoMasterDao.selectShippingNoteComboList(cgParm).getCollection());
        returnItem.setBlList(cargoMasterDao.selectBLComboList(cgParm).getCollection());

        DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        return returnItems;
    }
	
	//CIR
	public DataItemList selectCargoInterchangeReceiptReport(SearchCargoInterchangeReceiptParm parm) throws BizException {
        return gateOutDao.selectCargoInterchangeReceiptReport(parm);
    }
}