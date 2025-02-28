package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.ILorryListDao;
import com.tsb.most.biz.dataitem.monitoring.LorryListItem;
import com.tsb.most.biz.parm.monitoring.LorryListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class LorryList extends MOSTBaseService implements ILorryList {
	private ILorryListDao lorryListDao;

	public ILorryListDao getLorryListDao() {
		return lorryListDao;
	}

	public void setLorryListDao(ILorryListDao lorryListDao) {
		this.lorryListDao = lorryListDao;
	}

	@Override
	public IDataItem selectLorryList(LorryListParm parm) throws BizException {
		LorryListItem returnItem = new LorryListItem();
		if (parm.getSearchType().equals("lorryList")) {
			if (parm.getPtnrCd() == null && parm.getLORRYNO() == null && parm.getDRIVER() == null
					&& parm.getLICSNO() == null) {
				parm.setChkParm("2");
			} else {
				parm.setChkParm("1");
			}

			IDataItem lorryList = lorryListDao.selectLorryListItems(parm);

			return lorryList;

		}
		return returnItem;
	}

}
