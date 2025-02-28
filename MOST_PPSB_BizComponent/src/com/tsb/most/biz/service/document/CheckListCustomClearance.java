package com.tsb.most.biz.service.document;

import com.tsb.most.biz.dao.document.ICheckListCustomClearanceDao;
import com.tsb.most.biz.parm.document.SearchCheckListCustomClearanceParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CheckListCustomClearance extends MOSTBaseService implements ICheckListCustomClearance {
	private ICheckListCustomClearanceDao checkListCustomClearanceDao;
	
	public void setCheckListCustomClearanceDao(ICheckListCustomClearanceDao checkListCustomClearanceDao) {
		this.checkListCustomClearanceDao = checkListCustomClearanceDao;
	}

	@Override
	public DataItemList selectCustomClearanceList(SearchCheckListCustomClearanceParm parm) throws BizException {
		DataItemList customList= new DataItemList();
		
		if(parm.getSearchType().equals("lorryList")) {
			customList = checkListCustomClearanceDao.selectCustomCleranceForExport(parm);
		}else if(parm.getSearchType().equals("lorryList2")) {
			customList = checkListCustomClearanceDao.selectCustomCleranceForImport(parm);
		}else if(parm.getSearchType().equals("lorryList3")) {
			customList = checkListCustomClearanceDao.selectCustomerCleranceListsForTranshipment(parm);
		}
		
		return customList;
	}
}
