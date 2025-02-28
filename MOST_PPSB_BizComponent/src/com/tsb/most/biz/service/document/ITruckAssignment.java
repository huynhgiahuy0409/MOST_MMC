package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITruckAssignment {
	 public DataItemList selectGoodReceiptItems(SearchTruckAssignmentParm parm) throws BizException;
	 public DataItemList selectSubDoNoItems(SearchTruckAssignmentParm parm) throws BizException;
	 public DataItemList selectGoodReceiptItemforAssigment(SearchTruckAssignmentParm parm) throws BizException;
	 public DataItemList selectChangeBLSNo(SearchTruckAssignmentParm parm) throws BizException;
	 public DataItemList selectTruckRegistrationItems(SearchTruckAssignmentParm parm) throws BizException;
	 public DataItemList selectDriverRegistrationItems(SearchTruckAssignmentParm parm) throws BizException;
	 public DataItemList selectTruckAssignmentItems(SearchTruckAssignmentParm parm) throws BizException;
	 public DataItemList selectFileList(SearchTruckAssignmentParm parm) throws BizException;
	 public DataItemList selectInternalMovementTicketReport(SearchTruckAssignmentParm parm) throws BizException;
	 
	 public DataItemList insertTruckAssignment(InsertItemsBizParm parm) throws BizException;
	 public DataItemList updateTruckAssignment(UpdateItemsBizParm parm) throws BizException;
	 public void deleteTruckAssignment(DeleteItemsBizParm parm) throws BizException;
	 
}
