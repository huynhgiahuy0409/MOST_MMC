package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.dao.operation.IConfirmLoadingOfRORORehandlingDao;
import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ConfirmLoadingOfRORORehandling implements IConfirmLoadingOfRORORehandling {
	private IConfirmLoadingOfRORORehandlingDao confirmLoadingOfRORORehandlingDao;

	public void setConfirmLoadingOfRORORehandlingDao(IConfirmLoadingOfRORORehandlingDao confirmLoadingOfRORORehandlingDao) {
		this.confirmLoadingOfRORORehandlingDao = confirmLoadingOfRORORehandlingDao;
	}
	
	public DataItemList selectUnitItems(SearchConfirmLoadingOfROROParm parm) throws BizException{
		return confirmLoadingOfRORORehandlingDao.selectUnitItems(parm);    
	}
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws BizException{
		return confirmLoadingOfRORORehandlingDao.selectShipgNoteNoComboBoxItems(parm);
	}
	
	public DataItemList selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws BizException{
		return confirmLoadingOfRORORehandlingDao.selectCargoItems(parm);
	}
	
	public DataItemList updateLoadingOfRORORehandlingItems(UpdateItemsBizParm parm) throws BizException {
		return confirmLoadingOfRORORehandlingDao.updateLoadingOfRORORehandlingItems(parm);
	}
}
