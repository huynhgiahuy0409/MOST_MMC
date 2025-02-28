package com.tsb.most.biz.service.billing;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.billing.IForeignExchangeRateDao;
import com.tsb.most.biz.dataitem.billing.ForeignExchangeRateItem;
import com.tsb.most.biz.parm.billing.SearchForeignExchangeRateParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ForeignExchangeRate extends MOSTBaseService implements IForeignExchangeRate {

	private IForeignExchangeRateDao foreignExchangeRateDao;

	public void setForeignExchangeRateDao(IForeignExchangeRateDao foreignExchangeRateDao) {
		this.foreignExchangeRateDao = foreignExchangeRateDao;
	}

	public DataItemList selectCurrencyIndex(SearchForeignExchangeRateParm parm) throws BizException {
		return foreignExchangeRateDao.selectCurrencyIndex(parm);
	}

	public DataItemList selectCurrencyList(SearchForeignExchangeRateParm parm) throws BizException {
		return foreignExchangeRateDao.selectCurrency(parm);
	}

	public DataItemList selectDupliateData(SearchForeignExchangeRateParm parm) throws BizException {
		return foreignExchangeRateDao.selectDupliateData(parm);
	}

	public DataItemList selectCurrencyMaster(SearchForeignExchangeRateParm parm) throws BizException {
		return foreignExchangeRateDao.selectCurrencyMaster(parm);
	}

	public DataItemList hasOverlapCurrencyIndex(SearchForeignExchangeRateParm parm) throws BizException {
		return foreignExchangeRateDao.hasOverlapCurrencyIndex(parm);
	}

	public DataItemList selectCurrencyComboList(SearchForeignExchangeRateParm parm) throws BizException {
		DataItemList list = new DataItemList();

		list.add(foreignExchangeRateDao.selectCurrency(parm).getCollection());
		list.add(foreignExchangeRateDao.selectCurrencyIndex(parm).getCollection());

		return list;
	}

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return foreignExchangeRateDao.insertItems(parm);
	}

	public DataItemList updateItems(UpdateItemsBizParm param) throws BizException {
		DataItemList masterItem = param.getUpdateItems();
		DataItemList updateItemList = new DataItemList();
		UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
		
		for (int i = 0; i < masterItem.size(); i++) {
			ForeignExchangeRateItem item = (ForeignExchangeRateItem) masterItem.get(i);
			updateItemList.add(item);
			if (item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
				updateItemList.add(item);
			}
		}

		if (updateItemList.size() > 0) {
			updateItms.addUpdateItem(updateItemList);
			foreignExchangeRateDao.updateItems(updateItms);
		}

		return param.getUpdateItems();
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return foreignExchangeRateDao.deleteItems(parm);
	}
}
