package com.tsb.most.biz.service.planning;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.configuration.IWhConfigurationDao;
import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.biz.dao.planning.IWhRentalDao;
import com.tsb.most.biz.dataitem.planning.WhRentalItem;
import com.tsb.most.biz.parm.planning.SearchWhRentalParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class WhRental extends MOSTBaseService implements IWhRental{
	
	private IWhRentalDao whRentalDao;
	private IWhConfigurationDao whConfigurationDao;
	
	public void setWhRentalDao(IWhRentalDao whRentalDao) {
		this.whRentalDao = whRentalDao;
	}
	
	public void setWhConfigurationDao(IWhConfigurationDao whConfigurationDao) {
		this.whConfigurationDao = whConfigurationDao;
	}
	
	@Override
	public DataItemList getWhRentalDetailList(SearchWhRentalParm parm) throws BizException {
		return whRentalDao.getWhRentalDtlList(parm);
	}
	
	@Override
	public DataItemList getWhRentalList(SearchWhRentalParm parm) throws BizException {
		DataItemList response = new DataItemList();
		WhRentalItem result = new WhRentalItem();
		
		DataItemList whRentalList = whRentalDao.getWhRentalList(parm);
		DataItemList whRentalDetailList = whRentalDao.getWhRentalDtlList(parm);
		
		if(whRentalList.getCollection().size() > 0) {
			result.setRentalList(whRentalList);
		}
		
		if(whRentalDetailList.getCollection().size() > 0) {
			result.setRentalDetailList(whRentalDetailList);
		}
		
		response.getCollection().add(result);
		
		return response;
	}
	
	@Override
	public DataItemList getWhRentalGridList(SearchWhRentalParm parm) throws BizException {
		return whRentalDao.getWhRentalList(parm);
	}
	
	@Override
	public DataItemList processWhRentalItems(InsertItemsBizParm item) throws BizException {
		
		DataItemList insertItemsFromParm = item.getInsertItems();
		
		int rstCnt = 0;
		
		WhRentalItem whRentalItem = (WhRentalItem) insertItemsFromParm.get(0);
			
		InsertItemsBizParm insertItem = new InsertItemsBizParm();
		
		WhRentalItem returnItem = new WhRentalItem();
		
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();
		DataItemList rentDtlLOItems = new DataItemList();
		DataItemList rentDtlVSCMItems = new DataItemList();
		DataItemList rentDtlDeleteLOItems = new DataItemList();
		DataItemList rentDtlDeleteVSCMItems = new DataItemList();
		
		ArrayList<WhRentalItem> lst = whRentalItem.getListDetail();
//		for (int i = 0; i < items.size(); i++) {
//			WhRentalItem item = (WhRentalItem) items.get(0);
		
//			if (item.getInsertType() != null && item.getInsertType().equals("detail")) {
		if(lst != null) {	
			if(lst.size() > 0) {
				for (int i = 0; i < lst.size(); i++) {
					WhRentalItem itemCol = (WhRentalItem)lst.get(i);
					
					if (itemCol.getItemDivCd() != null && itemCol.getItemDivCd().equals("LO") && itemCol.getLocIdNames() != null
							&& !itemCol.getLocIdNames().equals("")) {
						String rentLocNames = itemCol.getLocIdNames();
						if (rentLocNames != null && !rentLocNames.equals("")) {
							String plNmSplit[] = rentLocNames.split(",");
							if (plNmSplit != null) {
								WhRentalItem itemArea = null;
								for (int j = 0; j < plNmSplit.length; j++) {
									itemArea = new WhRentalItem();
									itemArea.setConttNo(whRentalItem.getConttNo());
									itemArea.setRefNo(whRentalItem.getRefNo()); // New
									itemArea.setItemDivCd("LO");
									itemArea.setCdVal(plNmSplit[j]);
									itemArea.setCrud(DAOProcessType.INSERT);
									itemArea.setUserId("SYSTEM");
									rentDtlLOItems.add(itemArea);
								}
							}
						}
					} else if (itemCol.getItemDivCd().equals("VS") || itemCol.getItemDivCd().equals("CM")){
						itemCol.setRefNo(whRentalItem.getRefNo()); // New
						itemCol.setUserId(whRentalItem.getUserId());
						rentDtlVSCMItems.add(itemCol);
					}
				}
			}
		}
				
//			} else {
				if (whRentalItem.getWorkingStatus() != null && !whRentalItem.getWorkingStatus().equals(DAOProcessType.QUERY)) {
					if (whRentalItem.getWorkingStatus().equals(DAOProcessType.INSERT)) {
						insertItems.add(whRentalItem);
					} 
					else if (whRentalItem.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
						updateItems.add(whRentalItem);
					} 
					else if (whRentalItem.getWorkingStatus().equals(DAOProcessType.DELETE)) {
						deleteItems.add(whRentalItem);
					}
				}
//			}
//		}

		if (insertItems.size() > 0) {
			whRentalDao.insertWhRentalItems(insertItems);
			if (insertItems.size() == 1) { // WH Rental Detail
//				WhRentalItem rtnItem = (WhRentalItem) items.get(0);
				SearchWhRentalParm rtnParm = new SearchWhRentalParm();
				rtnParm.setConttNo(whRentalItem.getConttNo());
				DataItemList list = whRentalDao.getRefNo(rtnParm);
				if (list.size() == 1) { // have inserted
					returnItem.add(list);
				}
			}
		}

		if (updateItems.size() > 0) {
			whRentalDao.updateWhRentalItems(updateItems);
		}

		if (deleteItems.size() > 0) {
			WhRentalItem test = (WhRentalItem) deleteItems.get(0);
			test.setItemDivCd("ALL");
			whRentalDao.deleteRentalDtlItems(deleteItems);
			whRentalDao.deleteWhRentalItems(deleteItems);
		}

		if (rentDtlVSCMItems.size() > 0) {
			rentDtlDeleteVSCMItems.add(rentDtlVSCMItems.get(0));
			whRentalDao.deleteRentalDtlItems(rentDtlDeleteVSCMItems);
			whRentalDao.insertRentalDtlItems(rentDtlVSCMItems);
		} else {
			WhRentalItem deleteParam = new WhRentalItem();
			deleteParam.setConttNo(whRentalItem.getConttNo());
			rentDtlDeleteVSCMItems.add(deleteParam);
			
			whRentalDao.deleteRentalDtlItems(rentDtlDeleteVSCMItems);
		}
		
		if (rentDtlLOItems.size() > 0) {
			rentDtlDeleteLOItems.add(rentDtlLOItems.get(0));
			whRentalDao.deleteRentalDtlItems(rentDtlDeleteLOItems);
			whRentalDao.insertRentalDtlItems(rentDtlLOItems);
		}
		return insertItemsFromParm;
	}
	
	@Override
	public DataItemList getChkDupliRentNo(SearchWhRentalParm parm) throws BizException {
		WhRentalItem returnItem = new WhRentalItem();
		DataItemList list = whRentalDao.getChkDupliRentNo(parm);
		DataItemList listRef = whRentalDao.getMaxRefNo(parm);

		WhRentalItem refItem = (WhRentalItem) listRef.get(0);
		WhRentalItem countItem = (WhRentalItem) list.get(0);
		DataItemList items = new DataItemList();
		countItem.setRefNo(refItem.getRefNo());
		returnItem.setRefList(list);
		returnItem.setRefChkList(listRef);
		items.add(returnItem);
		return items;
	}
	
	@Override
	public DataItemList getWhConfigurationList(SearchWhConfigurationParm parm) throws BizException {
		return whConfigurationDao.getWhConfigurationList(parm);
	}
}
