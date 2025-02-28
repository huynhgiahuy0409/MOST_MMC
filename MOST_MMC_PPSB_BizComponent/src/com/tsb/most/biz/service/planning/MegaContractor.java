package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dao.planning.IMegaDao;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class MegaContractor extends MOSTBaseService implements IMegaContractor{
    private IMegaDao megaDao;

	public void setMegaDao(IMegaDao megaDao) {
		this.megaDao = megaDao;
	}

	public DataItemList selectMegaContractorList(SearchMegaParm parm) throws BizException {
        return megaDao.selectMegaContractorList(parm);
    }
}
