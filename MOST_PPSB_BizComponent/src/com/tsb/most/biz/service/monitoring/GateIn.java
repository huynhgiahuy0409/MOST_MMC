package com.tsb.most.biz.service.monitoring;


import com.tsb.most.biz.dao.monitoring.IGateInDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.monitoring.GateInItem;
import com.tsb.most.biz.parm.monitoring.SearchGateInParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class GateIn extends MOSTBaseService implements IGateIn {
	private IGateInDao gateInDao;
	private ICargoMasterDao cargoMasterDao;

	public void setGateInDao(IGateInDao gateInDao) {
		this.gateInDao = gateInDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	///////////////////////////////////////////////
	public DataItemList selectListOfGateIn(SearchGateInParm parm) throws BizException {
        return gateInDao.selectListOfGateIn(parm);
    }

	public DataItemList selectListOfGateInBlComboList(SearchGateInParm parm) throws BizException {
    	GateInItem returnItem = new GateInItem();
        SearchCargoMasterParm cgParm = new SearchCargoMasterParm();
        cgParm.setVslCallId(parm.getVslCallId());

    	returnItem.setSnList(cargoMasterDao.selectShippingNoteComboList(cgParm).getCollection());
        returnItem.setBlList(cargoMasterDao.selectBLComboList(cgParm).getCollection());

        DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        return returnItems;
    }
}