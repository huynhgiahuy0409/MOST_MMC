package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchCustomsCargoReleaseControlParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICustomsCargoReleaseControl {
	public DataItemList selectCustomsCargoReleaseList(SearchCustomsCargoReleaseControlParm parm) throws BizException;

	public DataItemList selectMasterBlItems(SearchCustomsCargoReleaseControlParm parm) throws BizException;

	public DataItemList selectBookingNoItems(SearchCustomsCargoReleaseControlParm parm) throws BizException;

	public DataItemList selectDocNoInfo(SearchCustomsCargoReleaseControlParm parm) throws BizException;

	public DataItemList selectBlSnItems(SearchCustomsCargoReleaseControlParm parm) throws BizException;

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;

	DataItemList selectCargoNoInfo(SearchCustomsCargoReleaseControlParm parm) throws BizException;
}
