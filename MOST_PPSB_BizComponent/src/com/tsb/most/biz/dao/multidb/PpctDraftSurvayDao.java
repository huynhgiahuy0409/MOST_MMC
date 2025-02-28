package com.tsb.most.biz.dao.multidb;


import java.util.List;

import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.exception.DaoException;

public class PpctDraftSurvayDao extends BaseDao implements IPpctDraftSurvayDao {

	public List selectDrafSurvayList(SearchShippingNoteParm parm) throws DaoException{
    	try{
    		return unifiedDao.readItems("testmultiPPCT.selectDrafSurvayList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	
	
}
