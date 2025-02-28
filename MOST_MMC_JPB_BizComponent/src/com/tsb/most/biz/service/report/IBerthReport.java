package com.tsb.most.biz.service.report;

import com.tsb.most.biz.parm.common.PackageParm;
import com.tsb.most.framework.dataitem.DataItemList;

public interface IBerthReport {

	public DataItemList printBayPlan(PackageParm vesselParm) throws com.tsb.most.framework.exception.BizException;

}
