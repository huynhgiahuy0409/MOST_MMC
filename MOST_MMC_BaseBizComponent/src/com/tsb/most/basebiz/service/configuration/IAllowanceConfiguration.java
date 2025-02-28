package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchAllowanceConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IAllowanceConfiguration {
	public DataItemList getAllowanceConfigurationItems(SearchAllowanceConfigurationParm parm) throws BizException;

	public DataItemList getStaffItem(SearchAllowanceConfigurationParm parm) throws BizException;

	public DataItemList deleteItem(DeleteItemsBizParm parm) throws BizException;

	public DataItemList insertItem(InsertItemsBizParm parm) throws BizException;

	public DataItemList updateItem(UpdateItemsBizParm parm) throws BizException;
}
