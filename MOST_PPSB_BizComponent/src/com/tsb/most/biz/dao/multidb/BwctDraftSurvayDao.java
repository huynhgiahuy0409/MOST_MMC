package com.tsb.most.biz.dao.multidb;


import java.util.List;

import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class BwctDraftSurvayDao extends BaseDao implements IBwctDraftSurvayDao {

	public List selectDrafSurvayList(SearchShippingNoteParm parm) throws DaoException{
    	try{
    		return unifiedDao.readItems("testmultiBWCT.selectDrafSurvayList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	
}
