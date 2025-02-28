package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.dao.operation.IConfirmHandlingOutOfRORORehandlingDao;
import com.tsb.most.biz.dataitem.operation.ConfirmHandlingOutOfROROItem;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ConfirmHandlingOutOfRORORehandling implements IConfirmHandlingOutOfRORORehandling{
	private IConfirmHandlingOutOfRORORehandlingDao confirmHandlingOutOfRORORehandlingDao;

	public void setConfirmHandlingOutOfRORORehandlingDao( IConfirmHandlingOutOfRORORehandlingDao confirmHandlingOutOfRORORehandlingDao) {
		this.confirmHandlingOutOfRORORehandlingDao = confirmHandlingOutOfRORORehandlingDao;
	}

	///////////////////////////////////////////////////////////////
	public DataItemList selectHandlingOutComboItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		ConfirmHandlingOutOfROROItem returnItem = new ConfirmHandlingOutOfROROItem();

        returnItem.setDriverItems(confirmHandlingOutOfRORORehandlingDao.selectDriverWithoutTruckComboBoxItems(parm).getCollection());
        returnItem.setDriverWithTruckItems(confirmHandlingOutOfRORORehandlingDao.selectDriverComboBoxItems(parm).getCollection());
        returnItem.setTruckItems(confirmHandlingOutOfRORORehandlingDao.selectTruckComboBoxItems(parm).getCollection());
       
  		DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        return returnItems;      
	}

	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORORehandlingDao.selectShipgNoteNoComboBoxItems(parm);
        return list;
	}
	
	public DataItemList selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORORehandlingDao.selectCargoItems(parm);
        return list;
	}
	
	public DataItemList selectUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORORehandlingDao.selectUnitItems(parm);
        return list;
	}
	
	public DataItemList updateHandlingOutUnitItems(UpdateItemsBizParm parm) throws BizException {
		return confirmHandlingOutOfRORORehandlingDao.updateHandlingOutUnitItems(parm);
	}
	
	public DataItemList deleteHandlingOutUnitItems(UpdateItemsBizParm parm) throws BizException {
		return confirmHandlingOutOfRORORehandlingDao.deleteHandlingOutUnitItems(parm);
	}
}
