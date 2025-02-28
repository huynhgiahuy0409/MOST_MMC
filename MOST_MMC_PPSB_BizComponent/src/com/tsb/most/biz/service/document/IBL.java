package com.tsb.most.biz.service.document;

import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IBL {
	public DataItemList selectBLList(SearchBLParm parm) throws BizException;
	public DataItemList checkBLOperation(SearchBLParm parm) throws BizException;
	public DataItemList selectContainerList(SearchBLParm parm) throws BizException;
	public DataItemList selectMfBLList(SearchBLParm parm) throws BizException;
	public DataItemList selectBLListForMf(SearchBLParm parm) throws BizException;
	public DataItemList selectBlCargoDetail(SearchBLParm parm) throws BizException;
	public DataItemList checkDO(SearchBLParm parm) throws BizException;
	public DataItemList checkTruck(SearchBLParm parm) throws BizException;
	public DataItemList checkOperation(SearchBLParm parm) throws BizException;
	public DataItemList checkGateIn(SearchBLParm parm) throws BizException;
	public DataItemList selectRoRoItems(SearchBLParm parm) throws BizException;
	public DataItemList selectPackageItems(SearchBLParm parm) throws BizException;
	public DataItemList selectSplitPackageItems(SearchBLParm parm) throws BizException;
	public DataItemList selectFileList(SearchFileUploadParm parm) throws BizException;
	public DataItemList checkBLNo(SearchBLParm parm) throws BizException;
	public DataItemList selectSplitWgtChk(SearchBLParm parm) throws BizException;
	public DataItemList selectSplitWgt(SearchBLParm parm) throws BizException;
	public DataItemList selectSplitExistChk(SearchBLParm parm) throws BizException;
	public DataItemList selectSubDoWeightList(SearchBLParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updatePackageItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList processFileInfo(UpdateItemsBizParm parm) throws BizException;
	public void deleteItems(DeleteItemsBizParm parm) throws BizException;
	public void updateConfirmDeliveryStatus(UpdateItemsBizParm parm) throws BizException;
	public void updateDoWgt(UpdateItemsBizParm parm) throws BizException;
}
