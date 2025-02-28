package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchPartnerTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IPartnerTariffRate {
	public DataItemList selectBerthList(SearchPartnerTariffRateParm parm) throws BizException;
	public DataItemList selectPartnerTariffRate(SearchPartnerTariffRateParm parm) throws BizException;
	public DataItemList selectPartnerTariffRateDetailList(SearchPartnerTariffRateParm param) throws BizException;
	
	public DataItemList insertPartnerTariffRate(InsertItemsBizParm param) throws BizException;
	public DataItemList updatePartnerTariffRate(UpdateItemsBizParm parm) throws BizException;
	public void deletePartnerTariffRate(DeleteItemsBizParm parm) throws BizException;
	public void deletePartnerTariffRateDetail(DeleteItemsBizParm parm) throws BizException;
	
}