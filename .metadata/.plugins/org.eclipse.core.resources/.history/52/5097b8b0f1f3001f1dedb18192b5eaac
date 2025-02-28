package com.tsb.most.biz.service.planning;

import java.util.ArrayList;

import com.tsb.most.biz.dao.planning.IRosterConfigurationMonthlyDao;
import com.tsb.most.biz.dataitem.planning.RosterConfigurationMonthlyItem;
import com.tsb.most.biz.parm.planning.SearchRosterConfigurationMonthlyParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.data.util.StringSplit;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RosterConfigurationMonthly extends MOSTBaseService implements IRosterConfigurationMonthly {
	private IRosterConfigurationMonthlyDao rosterConfigurationMonthlyDao;
	
	public void setRosterConfigurationMonthlyDao(IRosterConfigurationMonthlyDao rosterConfigurationMonthlyDao) {
		this.rosterConfigurationMonthlyDao = rosterConfigurationMonthlyDao;
	}

	public DataItemList selectShiftVesselOperation(SearchRosterConfigurationMonthlyParm parm) throws BizException {
		RosterConfigurationMonthlyItem returnItem = new RosterConfigurationMonthlyItem();
		DataItemList returnItems = new DataItemList();
		
		ArrayList<RosterConfigurationMonthlyItem> list = (ArrayList<RosterConfigurationMonthlyItem>) rosterConfigurationMonthlyDao.selectShiftVesselOperation(parm).getCollection();
		RosterConfigurationMonthlyItem item = new RosterConfigurationMonthlyItem();
		
		item.setShftId("DOSHFT");
		item.setTitle("D.OFF");
		item.setId(String.valueOf(list.size() + 1));
		list.add(item);
		
		returnItems.setCollection(list);

		return returnItems;
	}
	
	public DataItemList selectRosterMonthlyData(SearchRosterConfigurationMonthlyParm parm) throws BizException {
		ArrayList<RosterConfigurationMonthlyItem> shftList = (ArrayList<RosterConfigurationMonthlyItem>) rosterConfigurationMonthlyDao.selectShiftVesselOperation(parm).getCollection();
		RosterConfigurationMonthlyItem item = new RosterConfigurationMonthlyItem();
		
		item.setShftId("DOSHFT");
		item.setTitle("D.OFF");
		item.setId(String.valueOf(shftList.size() + 1));
		shftList.add(item);

		ArrayList<RosterConfigurationMonthlyItem> list = (ArrayList<RosterConfigurationMonthlyItem>) rosterConfigurationMonthlyDao.selectRosterMonthlyData(parm).getCollection();

		for (int i = list.size(); i > 0; i--) {
			RosterConfigurationMonthlyItem sItem = list.get(i-1);
			RosterConfigurationMonthlyItem shftItem = (RosterConfigurationMonthlyItem) shftList.get(Integer.parseInt(parm.getCalendar())-1);
			
			if (sItem.getCalendarId().equals(shftItem.getShftId())) {
				if (shftItem.getId().equals("1")) {
					sItem.setColor("#F44336");
				} else if (shftItem.getId().equals("2")) {
					sItem.setColor("#3F51B5");
				} else if (shftItem.getId().equals("3")) {
					sItem.setColor("#4CAF50");
				} else if (shftItem.getId().equals("4")) {
					sItem.setColor("#FF9800");
				}
			} else {
				list.remove(sItem);
			}
		}
		
		DataItemList returnItems = new DataItemList();
		returnItems.setCollection(list);

		return returnItems;
	}
	
	public DataItemList selectShiftGroupDefList(SearchRosterConfigurationMonthlyParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		
		returnList = rosterConfigurationMonthlyDao.selectGroupDef(parm);
		
		return returnList;
	}
	
	public DataItemList selectShiftDefList(SearchRosterConfigurationMonthlyParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		
		returnList = rosterConfigurationMonthlyDao.selectShiftDef(parm);
		
		return returnList;
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		RosterConfigurationMonthlyItem delDataItem = new RosterConfigurationMonthlyItem();
		
		DataItemList returnList = parm.getInsertItems();
		RosterConfigurationMonthlyItem item = (RosterConfigurationMonthlyItem)returnList.get(0);
		
		delDataItem.setRstrYmd(item.getRstrYmd());
		delDataItem.setRsnCd(item.getRsnCd());
		delDataItem.setShftDivCd(item.getShftTpCd());
		
		String doshft = "";
		
		if (!item.getShftGrpCd().equals("")) {
			String[] sftGrpCds;
			sftGrpCds = item.getShftGrpCd().split("&");
			
			for (int i = 0; i < sftGrpCds.length; i++) {
				String shfId = sftGrpCds[i].substring(0, 6);
				doshft = shfId;
				ArrayList arrIndices = StringSplit.getArray(sftGrpCds[i].substring(6));
				
				for (int j = 0; j < arrIndices.size(); j++) {
					RosterConfigurationMonthlyItem insDataItem = new RosterConfigurationMonthlyItem();

					insDataItem.setRstrYmd(item.getRstrYmd());
					insDataItem.setShftId(shfId);
					insDataItem.setUserId(item.getUserId());
					insDataItem.setShftGrpCd(arrIndices.get(j).toString());
					insDataItem.setRsnCd(item.getRsnCd());
					
					insertItems.addInsertItem(insDataItem);
				}
			}
		}
		
		deleteItems.addDeleteItem(delDataItem);
		
		rosterConfigurationMonthlyDao.deleteRosterSetupMonthlyItem(deleteItems);
		
		if (doshft.equals("DOSHFT")) {
			item.setShftId("DOSHFT");
			
			rosterConfigurationMonthlyDao.deleteRosterSetupMonthlyItem(deleteItems);
		}
		
		if ((insertItems != null) && (insertItems.getInsertItems() != null)  && (insertItems.getInsertItems().size() > 0) ) {
			return rosterConfigurationMonthlyDao.insertRosterSetupMonthyItems(insertItems);
		}else {
			return new DataItemList() ;
		}
	}
}