package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.dao.billing.IDefineHolidayCodeDao;
import com.tsb.most.biz.parm.billing.SearchDefineHolidayCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DefineHolidayCode extends MOSTBaseService implements IDefineHolidayCode{
	private IDefineHolidayCodeDao defineHolidayCodeDao;
	
    public void setDefineHolidayCodeDao(IDefineHolidayCodeDao defineHolidayCodeDao) {
		this.defineHolidayCodeDao = defineHolidayCodeDao;
	}

	public DataItemList selectDefineHolidayCodeList(SearchDefineHolidayCodeParm parm) throws BizException {
        return defineHolidayCodeDao.selectDefineHolidayCodeList(parm);
    }
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return defineHolidayCodeDao.insertItems(parm);
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return defineHolidayCodeDao.updateItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return defineHolidayCodeDao.deleteItems(parm);
	}
}
