package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchRehandlingOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IRehandlingOfRORO {
	public DataItemList selectOriginalCargoItems(SearchRehandlingOfROROParm parm) throws BizException;
	public DataItemList selectRehandlingCargoItems(SearchRehandlingOfROROParm parm) throws BizException;
	public DataItemList selectDocumentComboItemList(SearchRehandlingOfROROParm parm) throws BizException;
	
	public DataItemList deleteRehandlingItem(DeleteItemsBizParm parm) throws BizException;
	
	public DataItemList selectStackedUnitItems(SearchRehandlingOfROROParm parm) throws BizException;
	public DataItemList selectRehandlingUnitItems(SearchRehandlingOfROROParm parm) throws BizException;
	
	public DataItemList insertRehandlingOfROROItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateRehandlingOfROROItems(UpdateItemsBizParm parm) throws BizException;
}
