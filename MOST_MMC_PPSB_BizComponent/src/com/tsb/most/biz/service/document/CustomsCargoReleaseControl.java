package com.tsb.most.biz.service.document;

import com.tsb.most.biz.dao.document.ICustomsCargoReleaseControlDao;
import com.tsb.most.biz.parm.document.SearchCustomsCargoReleaseControlParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CustomsCargoReleaseControl extends MOSTBaseService implements ICustomsCargoReleaseControl {
	private ICustomsCargoReleaseControlDao customsCargoReleaseControlDao;

	public void setCustomsCargoReleaseControlDao(ICustomsCargoReleaseControlDao customsCargoReleaseControlDao) {
		this.customsCargoReleaseControlDao = customsCargoReleaseControlDao;
	}

	public DataItemList selectCustomsCargoReleaseList(SearchCustomsCargoReleaseControlParm parm) throws BizException{
		return customsCargoReleaseControlDao.selectCustomsCargoReleaseList(parm);
    }
	
	public DataItemList selectMasterBlItems(SearchCustomsCargoReleaseControlParm parm) throws BizException{
		return customsCargoReleaseControlDao.selectMasterBlItems(parm);
    }
	
	public DataItemList selectBookingNoItems(SearchCustomsCargoReleaseControlParm parm) throws BizException{
		return customsCargoReleaseControlDao.selectBookingNoItems(parm);
    }
	
	public DataItemList selectDocNoInfo(SearchCustomsCargoReleaseControlParm parm) throws BizException{
		return customsCargoReleaseControlDao.selectDocNoInfo(parm);
    } 
	
	public DataItemList selectBlSnItems(SearchCustomsCargoReleaseControlParm parm) throws BizException{
		return customsCargoReleaseControlDao.selectBlSnItems(parm);
    }
	
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException{
		return customsCargoReleaseControlDao.insertCustomsItems(parm);
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException{
		return customsCargoReleaseControlDao.updateCustomsItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException{
		return customsCargoReleaseControlDao.deleteCustomsItems(parm);
	}
	
	@Override
	public DataItemList selectCargoNoInfo(SearchCustomsCargoReleaseControlParm parm) throws BizException{
		return customsCargoReleaseControlDao.selectCargoNoInfo(parm);
    }
}
