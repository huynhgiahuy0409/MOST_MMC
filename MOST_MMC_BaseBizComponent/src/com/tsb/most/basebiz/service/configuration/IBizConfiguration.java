package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchBizConfigurationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IBizConfiguration {
	public DataItemList selectBizConfigurationItems(SearchBizConfigurationParm parm) throws BizException;
	public DataItemList selectDuplicateCheck(SearchBizConfigurationParm parm) throws BizException;
	
	public DataItemList insertBizConfigurationItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateBizConfigurationItems(UpdateItemsBizParm parm) throws BizException;
}
