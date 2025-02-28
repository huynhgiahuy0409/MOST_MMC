package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchRehandleOperationGCParm;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IRehandleOperationGC {
	public DataItemList selectCargoRhdlOperation(SearchRehandleOperationGCParm parm) throws BizException;
	public DataItemList selectCargoRehandlingComboList(SearchRehandlingOfGCParm parm) throws BizException;
	public DataItemList selectCargoRehandlingSnBlComboList(SearchRehandlingOfGCParm parm) throws BizException;
}