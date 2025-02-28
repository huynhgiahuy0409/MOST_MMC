package com.tsb.most.biz.service.document;

import java.util.List;

import com.tsb.most.biz.dao.document.ICustomReleaseDao;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.document.CheckListCustomClearanceItem;
import com.tsb.most.biz.dataitem.document.CustomerCleranceItem;
import com.tsb.most.biz.parm.document.SearchCustomerCleranceParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class CustomRelease extends MOSTBaseService implements ICustomRelease {
	private ICustomReleaseDao customReleaseDao;

	public void setCustomReleaseDao(ICustomReleaseDao customReleaseDao) {
		this.customReleaseDao = customReleaseDao;
	}

	@Override
	public DataItemList getCustomsCargoReleaseList(SearchCustomerCleranceParm parm) throws BizException {
		return customReleaseDao.getCustomsCargoReleaseList(parm);
	}

	@Override
	public DataItemList getCustomsCargoReleaseComboList(SearchCustomerCleranceParm parm) throws BizException {
		CustomerCleranceItem returnItem = new CustomerCleranceItem();
		DataItemList returnList = new DataItemList();

		returnItem.setBlList(customReleaseDao.getBlList(parm).getCollection());
		returnItem.setSnList(customReleaseDao.getShippingNoteList(parm).getCollection());
		returnList.add(returnItem);

		return returnList;
	}

	@Override
	public DataItemList processCustomsCargoReleaseCUD(InsertItemsBizParm parm) throws BizException {
		DataItemList insertItems = new DataItemList();
		DataItemList newInsertItems = new DataItemList();
		DataItemList returnList = new DataItemList();
		CheckListCustomClearanceItem item = (CheckListCustomClearanceItem) parm.getInsertItems().getCollection().get(0);
		SearchCustomerCleranceParm custParm = new SearchCustomerCleranceParm();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		custParm.setVslCd(item.getVslCd());
		custParm.setScn(item.getScn());
		custParm.setBlCbr(item.getBlCbr());
		custParm.setIeCd(item.getIeCd());
		
		boolean checkExist = customReleaseDao.getCustomsCargoReleaseExistCheck(custParm);
		if(checkExist) {
			insertItems.add(item);
			insertParm.addInsertItem(insertItems);
		} else {
			newInsertItems.add(item);
			insertParm.addInsertItem(newInsertItems);
		}
		if(insertItems.size() > 0) {
			returnList = customReleaseDao.insertCustomsCargoReleaseItems(insertParm);
		} else {
			returnList = customReleaseDao.insertNewCustomsCargoReleaseItems(insertParm);
		}
		
		return returnList;
	}

}
