package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.dao.billing.IAnnualHolidayDao;
import com.tsb.most.biz.dao.billing.IDefineHolidayCodeDao;
import com.tsb.most.biz.parm.billing.SearchAnnualHolidayParm;
import com.tsb.most.biz.parm.billing.SearchDefineHolidayCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class AnnualHoliday extends MOSTBaseService implements IAnnualHoliday{

	private IAnnualHolidayDao annualHolidayDao;
	private IDefineHolidayCodeDao defineHolidayCodeDao;

	public void setAnnualHolidayDao(IAnnualHolidayDao annualHolidayDao) {
		this.annualHolidayDao = annualHolidayDao;
	}
	
	public DataItemList selectAnnualHoliday(SearchAnnualHolidayParm parm) throws BizException {
        return annualHolidayDao.selectAnnualHoliday(parm);
    }

	public void setDefineHolidayCodeDao(IDefineHolidayCodeDao defineHolidayCodeDao) {
		this.defineHolidayCodeDao = defineHolidayCodeDao;
	}

	public DataItemList selectDefineHolidayCodeList(SearchDefineHolidayCodeParm parm) throws BizException {
        return defineHolidayCodeDao.selectDefineHolidayCodeList(parm);
    }
    
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return annualHolidayDao.insertItems(parm);
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return annualHolidayDao.updateItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return annualHolidayDao.deleteItems(parm);
	}
	
}
