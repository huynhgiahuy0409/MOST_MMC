package com.tsb.most.biz.service.planning;

import com.tsb.most.framework.baseservice.MOSTBaseService;

import com.tsb.most.framework.exception.BizException;
import com.tsb.most.biz.dao.planning.IMegaContractorDao;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.dataitem.DataItemList;
public class MegaContractor extends MOSTBaseService implements IMegaContractor{
    private IMegaContractorDao megaContractorDao;

	public IMegaContractorDao selectMegaContractorDao() {
		return megaContractorDao;
	}

	public void setMegaContractorDao(IMegaContractorDao megaContractorDao) {
		this.megaContractorDao = megaContractorDao;
	}

	public DataItemList selectMegaContractorList(SearchMegaParm parm) throws BizException {
        return megaContractorDao.selectMegaContractorList(parm);
    }
}
