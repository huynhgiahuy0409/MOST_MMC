package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchCustomerCleranceParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICustomRelease {
	public DataItemList getCustomsCargoReleaseList(SearchCustomerCleranceParm parm) throws BizException;

	public DataItemList getCustomsCargoReleaseComboList(SearchCustomerCleranceParm parm) throws BizException;

	public DataItemList processCustomsCargoReleaseCUD(InsertItemsBizParm parm) throws BizException;
}
