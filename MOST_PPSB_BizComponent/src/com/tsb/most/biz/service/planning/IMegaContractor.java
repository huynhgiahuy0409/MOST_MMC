package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dataitem.planning.MegaItem;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IMegaContractor {
    public IDataItem selectMegaContractorList(SearchMegaParm parm) throws BizException;
}
