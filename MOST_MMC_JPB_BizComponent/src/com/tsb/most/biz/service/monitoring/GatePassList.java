package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IGatePassListDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoMasterItem;
import com.tsb.most.biz.parm.monitoring.SearchGatePassImportParm;
import com.tsb.most.biz.parm.monitoring.SearchGatePassListParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class GatePassList extends MOSTBaseService implements IGatePassList{
	private IGatePassListDao gatePassListDao;
	private ICargoMasterDao cargoMasterDao;
	
	public void setGatePassListDao(IGatePassListDao gatePassListDao) {
		this.gatePassListDao = gatePassListDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}
	
	////////////////////////////////////////////////////

	public DataItemList selectCargoMasterComboList(SearchCargoMasterParm parm) throws BizException {
		CargoMasterItem returnItem = new CargoMasterItem();
		DataItemList itemList = new DataItemList();

//		SearchShippingNoteParm snParm = new SearchShippingNoteParm();
//		SearchDeliveryOrderParm deParm = new SearchDeliveryOrderParm();
//		snParm.setSearchType(parm.getSearchType());
//		snParm.setVslCallId(parm.getVslCallId());
//		snParm.setArrvDtFm(parm.getArrvDtFm());
//		snParm.setOpType(parm.getOpType());
//		snParm.setArrvDtTo(parm.getArrvDtTo());
//		snParm.setPtnrCd(parm.getPtnrCode());
//		deParm.setSearchType(parm.getSearchType());
//		deParm.setVslCallId(parm.getVslCallId());
//		deParm.setAuthority(parm.getUserType());
//		deParm.setPtnrType(parm.getAuthority());
//		deParm.setPtnrcd(parm.getPtnrCode());

		returnItem.setSnList(cargoMasterDao.selectShippingNoteComboList(parm).getCollection());
		returnItem.setBlList(cargoMasterDao.selectBLComboList(parm).getCollection());

		itemList.add(returnItem);
		return itemList;
	}
	
    // CargoGatePass
    public DataItemList selectCargoGatePassList(SearchGatePassListParm parm) throws BizException {
    	return gatePassListDao.selectCargoGatePassList(parm);
    }
    
    //GP Detail
    public DataItemList selectGatePassImportList(SearchGatePassImportParm parm) throws BizException {
    	return gatePassListDao.selectGatePassImportList(parm);
    }
}
