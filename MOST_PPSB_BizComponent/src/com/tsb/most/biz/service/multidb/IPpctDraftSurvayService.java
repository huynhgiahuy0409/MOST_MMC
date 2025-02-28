package com.tsb.most.biz.service.multidb;

import java.util.List;

import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.exception.BizException;

public interface IPpctDraftSurvayService {
	public List selectDraftSurvayList(SearchShippingNoteParm parm) throws BizException;
	
}
