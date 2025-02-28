package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.ITheListOfUnitNoCorrectionDao;
import com.tsb.most.biz.parm.monitoring.SearchTheListOfUnitNoCorrectionParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TheListOfUnitNoCorrection implements ITheListOfUnitNoCorrection{
	private ITheListOfUnitNoCorrectionDao theListOfUnitNoCorrectionDao;

	public void setTheListOfUnitNoCorrectionDao(ITheListOfUnitNoCorrectionDao theListOfUnitNoCorrectionDao) {
		this.theListOfUnitNoCorrectionDao = theListOfUnitNoCorrectionDao;
	}
	//////////////////////////////////////////////////////////////////////////

	public DataItemList selectCorrectionUnitNoItems(SearchTheListOfUnitNoCorrectionParm parm) throws BizException{
		DataItemList list = theListOfUnitNoCorrectionDao.selectCorrectionUnitNoItems(parm);
        return list;
	}
	
}
