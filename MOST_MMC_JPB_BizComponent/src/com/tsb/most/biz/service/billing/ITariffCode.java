package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITariffCode {
	public DataItemList selectCostCenter(SearchTariffCodeParm param) throws BizException;
	public DataItemList selectFinancialCode(SearchTariffCodeParm param) throws BizException;
	public DataItemList selectRefChild(SearchTariffCodeParm param) throws BizException;
	public DataItemList selectTariffCode(SearchTariffCodeParm param) throws BizException;
	public DataItemList selectTariffCodeDetail(SearchTariffCodeParm param) throws BizException;
	public DataItemList selectCmdtHeredityMultiSelectPopupList(SearchTariffCodeParm param) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException;
}