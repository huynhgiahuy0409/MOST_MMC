package com.tsb.most.biz.dao.multidb;


import java.util.List;

import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.exception.DaoException;

public class NbctDraftSurvayDao extends BaseDao implements INbctDraftSurvayDao {

	public List selectDrafSurvayList(SearchShippingNoteParm parm) throws DaoException{
    	try{
    		return unifiedDao.readItems("testmultiNBCT.selectDrafSurvayList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
}
