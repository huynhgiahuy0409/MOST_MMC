package com.tsb.most.biz.service.codes;

import com.tsb.most.biz.parm.codes.SearchBerthBittListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IBerthBittList {
	public DataItemList selectBerthBittList(SearchBerthBittListParm parm) throws BizException;
	public DataItemList insertBerthBittList(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateBerthBittList(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteBerthBittList(DeleteItemsBizParm parm) throws BizException;
	public DataItemList selectBerthLocList(SearchBerthBittListParm parm)throws BizException;
	public DataItemList selectDuplicateBerthBitt(SearchBerthBittListParm parm)throws BizException;
}
