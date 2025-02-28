package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchServiceOrderSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IServiceOrderSetting {
    public DataItemList selectServiceOrderSettingList(SearchServiceOrderSettingParm parm) throws BizException;
    public DataItemList selectServiceOrderSettingDetailItem(SearchServiceOrderSettingParm parm) throws BizException;
    public void processServiceOrderSettingItem(UpdateItemsBizParm parm) throws BizException;
    
    public DataItemList insertServiceOrderConfigurationDetail(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateServiceOrderConfigurationDetail(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteServiceOrderConfigurationDetail(DeleteItemsBizParm parm) throws BizException;
	
	public DataItemList selectExtendCategoryCd(SearchServiceOrderSettingParm parm) throws BizException;
}
