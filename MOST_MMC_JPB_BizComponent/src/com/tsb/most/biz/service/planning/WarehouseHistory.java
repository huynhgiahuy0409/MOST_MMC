package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.planning.IWarehouseHistoryDao;
import com.tsb.most.biz.dataitem.operation.WHReconciliationItem;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.planning.SearchWarehouseHistoryParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class WarehouseHistory extends MOSTBaseService implements IWarehouseHistory {
	private IWarehouseHistoryDao warehouseHistoryDao;
	
	public void setWarehouseHistoryDao(IWarehouseHistoryDao warehouseHistoryDao) {
		this.warehouseHistoryDao = warehouseHistoryDao;
	}

	public DataItemList selectCargoJobHistoryList(SearchWarehouseHistoryParm parm) throws BizException {
		return warehouseHistoryDao.selectCargoJobHistoryList(parm);
	}
	
	public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws BizException {
		WHReconciliationItem returnItem = new WHReconciliationItem();
		Object[] parmObj;
		SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
		SearchWarehouseHistoryParm whLocCode = new SearchWarehouseHistoryParm();
		RestResponse response = new RestResponse();

		List list = null;
		DataItemList returnList = new DataItemList();
		
		if (parm.getSearchType().equals("whrecncombolist")) {
			partyCode.setLcd(CodeConstant.LCD_MOST);
			partyCode.setMcd(CodeConstant.MCD_MT_CATGTP);
			partyCode.setScdUse(CommonConstants.Y);
			parmObj = new Object[] { partyCode };
//			list = this.callWebservice("CommonCodeBean", "getCodeMasterList", parmObj);
			returnItem.add(list);
		} else if (parm.getSearchType().equals("jobhistorycombolist")) {
			partyCode.setLcd(CodeConstant.LCD_MOST);
			partyCode.setMcd(CodeConstant.MCD_MT_CATGTP);
			partyCode.setScdUse(CommonConstants.Y);
			parmObj = new Object[] { partyCode };
//			list = this.callWebservice("CommonCodeBean", "getCodeMasterList", parmObj);
			returnItem.add(list);

			partyCode.setLcd(CodeConstant.LCD_MOST);
			partyCode.setMcd(CodeConstant.MCD_MT_CGCOCD);
			partyCode.setScdUse(CommonConstants.Y);
			parmObj = new Object[] { partyCode };
//			list = this.callWebservice("CommonCodeBean", "getCodeMasterList", parmObj);
			returnItem.add(list);
		} else if (parm.getSearchType().equals("whrecnlist")) {
			returnList = warehouseHistoryDao.selectWHRecnList(parm);
		} else if (parm.getSearchType().equals("whrecnDoclist")) {
			parm.setDivCd("BL");
			returnItem.setBlList((ArrayList<WHReconciliationItem>) warehouseHistoryDao.selectWHRecnDocList(parm).getCollection());

			parm.setDivCd("SN");
			returnItem.setSnList((ArrayList<WHReconciliationItem>) warehouseHistoryDao.selectWHRecnDocList(parm).getCollection());

			parm.setDivCd("GR");
			returnItem.setGrList((ArrayList<WHReconciliationItem>) warehouseHistoryDao.selectWHRecnDocList(parm).getCollection());
			
			returnList.add(returnItem);
		} else {
			partyCode.setLcd(CodeConstant.LCD_MOST);
			partyCode.setMcd(CodeConstant.MCD_MT_CGCOCD);
			partyCode.setScdUse(CommonConstants.Y);
			parmObj = new Object[] { partyCode };
//			list = this.callWebservice("CommonCodeBean", "getCodeMasterList", parmObj);

			ArrayList<WHReconciliationItem> detailList = (ArrayList<WHReconciliationItem>) warehouseHistoryDao.selectWHRecnDtl(parm).getCollection();
			returnItem.setDetailList(detailList);

			returnList.add(returnItem);
		}
		
		return returnList;
	}
}