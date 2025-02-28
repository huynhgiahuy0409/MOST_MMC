package com.tsb.most.biz.service.monitoring;


import java.util.ArrayList;

import com.tsb.most.biz.dao.monitoring.ICargoJobDao;
import com.tsb.most.biz.dao.monitoring.IHandlingInOutListDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoJobItem;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class HandlingInOutList extends MOSTBaseService implements IHandlingInOutList {
	private IHandlingInOutListDao handlingInOutListDao;
	private ICargoMasterDao cargoMasterDao;
	private ICargoJobDao cargoJobDao;

	public void setHandlingInOutListDao(IHandlingInOutListDao handlingInOutListDao) {
		this.handlingInOutListDao = handlingInOutListDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	public void setCargoJobDao(ICargoJobDao cargoJobDao) {
		this.cargoJobDao = cargoJobDao;
	}

	///////////////////////////////////////////////
	public DataItemList selectCargoHIList(SearchCargoHandlingInParm parm) throws BizException {
        return handlingInOutListDao.selectCargoHIList(parm);
    }

	public DataItemList selectCargoHOList(SearchCargoHandlingOutParm parm) throws BizException {
        return handlingInOutListDao.selectCargoHOList(parm);
    }
	
	public DataItemList selectWHComboList(SearchCargoMasterParm parm) throws BizException {
        return cargoMasterDao.selectWHComboList(parm);
    }
	
	public DataItemList selectWhSnBlComboList(SearchCargoJobParm parm)  throws BizException {
        CargoJobItem returnItem = new CargoJobItem();
        
        ArrayList<CargoJobItem> whList = (ArrayList<CargoJobItem>)cargoJobDao.selectCargoJobWhLocCombo(parm).getCollection();
        ArrayList<CargoJobItem> snlist = (ArrayList<CargoJobItem>)cargoJobDao.selectCargoJobSnCombo(parm).getCollection();
        ArrayList<CargoJobItem> blist = (ArrayList<CargoJobItem>)cargoJobDao.selectCargoJobBLCombo(parm).getCollection();

        returnItem.setWhLocCombo(whList);
        returnItem.setShipgNoteCombo(snlist);
        returnItem.setBlCombo(blist);
        
        DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);

        return returnItems;
    }
}