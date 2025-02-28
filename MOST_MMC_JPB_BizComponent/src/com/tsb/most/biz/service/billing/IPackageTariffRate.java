package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchPackageTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IPackageTariffRate {
	public DataItemList selectBerthList(SearchPackageTariffRateParm parm) throws BizException;

	public DataItemList selectPackageTariffRate(SearchPackageTariffRateParm parm) throws BizException;
	//sMantis
	public DataItemList selectPackageTariffRateDetailList(SearchPackageTariffRateParm param) throws BizException;

	public DataItemList cudPackageTariffRates(InsertItemsBizParm param) throws BizException;

	public DataItemList updatePartnerTariffRate(UpdateItemsBizParm parm) throws BizException;

	public void deletePackageTariffRate(DeleteItemsBizParm parm) throws BizException;

	public void deletePackageTariffRateDetail(DeleteItemsBizParm parm) throws BizException;

}