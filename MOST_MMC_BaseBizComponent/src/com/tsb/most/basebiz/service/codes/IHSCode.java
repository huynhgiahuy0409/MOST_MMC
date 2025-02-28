package com.tsb.most.basebiz.service.codes;

import com.tsb.most.basebiz.parm.codes.SearchHSCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IHSCode {
	public DataItemList selectHSCodeList(SearchHSCodeParm parm) throws BizException;
	public DataItemList duplicationHSCodeCheck(SearchHSCodeParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList selectHsCodePopup(SearchHSCodeParm parm) throws BizException;
}
	