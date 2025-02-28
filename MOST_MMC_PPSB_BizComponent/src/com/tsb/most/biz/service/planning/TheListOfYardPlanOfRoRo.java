package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dao.planning.ITheListOfYardPlanOfRoRoDao;
import com.tsb.most.biz.parm.planning.SearchTheListOfYardPlanOfRoRoParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TheListOfYardPlanOfRoRo extends MOSTBaseService implements ITheListOfYardPlanOfRoRo{

	private ITheListOfYardPlanOfRoRoDao theListOfYardPlanOfRoRoDao;

	public void setTheListOfYardPlanOfRoRoDao(ITheListOfYardPlanOfRoRoDao theListOfYardPlanOfRoRoDao) {
		this.theListOfYardPlanOfRoRoDao = theListOfYardPlanOfRoRoDao;
	}

	public DataItemList selectTheListOfYardPlanOfROROItems(SearchTheListOfYardPlanOfRoRoParm parm) throws BizException {
        DataItemList list = theListOfYardPlanOfRoRoDao.selectTheListOfYardPlanOfROROItems(parm);
        
        return list;
    }
}
