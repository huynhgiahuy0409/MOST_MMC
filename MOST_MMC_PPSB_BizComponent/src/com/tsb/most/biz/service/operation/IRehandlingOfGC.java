package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IRehandlingOfGC {
	public DataItemList selectCargoRehandlingList(SearchRehandlingOfGCParm parm) throws BizException;
	public DataItemList selectCargoRehandlingPopupList(SearchRehandlingOfGCParm parm) throws BizException;
	public DataItemList selectCargoRehandlingSnBlComboList(SearchRehandlingOfGCParm parm) throws BizException;
	public DataItemList selectCargoRehandlingComboList(SearchRehandlingOfGCParm parm) throws BizException;
	public DataItemList selectRhdlShippingNoteComboList(SearchRehandlingOfGCParm parm) throws BizException;
	public DataItemList selectRhdlGrNoComboList(SearchRehandlingOfGCParm parm) throws BizException;
	
	public DataItemList updateCargoRehandlingItems(UpdateItemsBizParm parm) throws BizException;
}