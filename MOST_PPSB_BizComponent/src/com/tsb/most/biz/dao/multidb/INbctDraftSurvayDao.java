package com.tsb.most.biz.dao.multidb;

import java.util.List;

import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.exception.DaoException;

public interface INbctDraftSurvayDao {
	public List selectDrafSurvayList(SearchShippingNoteParm parm) throws DaoException;
	
}
