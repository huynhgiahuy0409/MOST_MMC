package com.tsb.most.biz.service.planning;

import java.util.ArrayList;

import com.tsb.most.biz.dao.planning.IRosterConfigurationMonthlyDao;
import com.tsb.most.biz.dataitem.planning.RosterConfigurationOthersItem;
import com.tsb.most.biz.parm.planning.SearchRosterConfigurationMonthlyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.data.util.StringSplit;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RosterConfigurationOthers extends MOSTBaseService implements IRosterConfigurationOthers{
	private IRosterConfigurationMonthlyDao rosterConfigurationMonthlyDao;
	
	public void setRosterConfigurationMonthlyDao(IRosterConfigurationMonthlyDao rosterConfigurationMonthlyDao) {
		this.rosterConfigurationMonthlyDao = rosterConfigurationMonthlyDao;
	}

	public DataItemList selectRosterSetupWHList(SearchRosterConfigurationMonthlyParm parm) throws BizException {
		return rosterConfigurationMonthlyDao.selectRosterSetupWHList(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		DataItemList listInsterItems = new DataItemList();
		InsertItemsBizParm insParm = new InsertItemsBizParm();
		RosterConfigurationOthersItem item = (RosterConfigurationOthersItem)parm.getInsertItems().getCollection().get(0);
		
		for(RosterConfigurationOthersItem searchItem : item.getItems()) {
			ArrayList arrIndices = StringSplit.getArray(searchItem.getDeliUpdateCd());
			
			for (int j = 0; j < arrIndices.size(); j++) {
				RosterConfigurationOthersItem insDataItem = new RosterConfigurationOthersItem();
				
				insDataItem.setRstrYmd(searchItem.getStartDate());
				insDataItem.setEmpId(searchItem.getEmpId());
				insDataItem.setUserId(searchItem.getUserId());
				insDataItem.setSeq(Integer.parseInt(String.valueOf(arrIndices.get(j))));
				
				Class classSearchItem = searchItem.getClass();
				String strCdMethodName = "getCdDate" + String.valueOf(insDataItem.getSeq());
				String strShiftCd;
				
				try {
					strShiftCd = classSearchItem.getDeclaredMethod(strCdMethodName, null).invoke(searchItem, null).toString();
					strCdMethodName = "getCdTpDate" + String.valueOf(insDataItem.getSeq());
					String strShiftTp = classSearchItem.getDeclaredMethod(strCdMethodName, null).invoke(searchItem, null).toString();
					
					if ("".equals(strShiftTp)) {
						insDataItem.setShftId(strShiftCd);
					} else {
						insDataItem.setShftId(strShiftTp);
						insDataItem.setRsnCd(strShiftCd);
					}
					listInsterItems.add(insDataItem);
				}catch (Exception e) {
					e.printStackTrace();
				}
			}
			
			ArrayList arrDeleteIndices = StringSplit.getArray(searchItem.getDeliDeleteCd());
			
			for (int j = 0; j < arrDeleteIndices.size(); j++) {
				RosterConfigurationOthersItem delDataItem = new RosterConfigurationOthersItem();

				delDataItem.setRstrYmd(searchItem.getStartDate());
				delDataItem.setEmpId(searchItem.getEmpId());
				delDataItem.setShftId("");
				delDataItem.setUserId(searchItem.getUserId());
				delDataItem.setSeq(Integer.parseInt(String.valueOf(arrDeleteIndices.get(j))));
				deleteItems.addDeleteItem(delDataItem);
			}
		}
		
		rosterConfigurationMonthlyDao.deleteRosterSetupWHItems(deleteItems);
		rosterConfigurationMonthlyDao.deleteDayoffSetupWHItems(deleteItems);

		insParm.setInsertItems(listInsterItems);
		
		return rosterConfigurationMonthlyDao.insertRosterSetupWHItems(insParm);
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return null;
	}
	
	public DataItemList deleleItems(DeleteItemsBizParm parm) throws BizException {
		return null;
	}
}
