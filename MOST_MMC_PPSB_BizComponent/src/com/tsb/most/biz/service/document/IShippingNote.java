package com.tsb.most.biz.service.document;

import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IShippingNote {
	public DataItemList selectShippingNoteList(SearchShippingNoteParm parm) throws BizException;
	public DataItemList selectShippingNoteDtlList(SearchShippingNoteParm parm) throws BizException;
	public DataItemList selectValidationCode(SearchShippingNoteParm parm) throws BizException;
	public DataItemList selectFileList(SearchFileUploadParm parm) throws BizException;
	public DataItemList selectRoRoItems(SearchShippingNoteParm parm) throws BizException;
	public DataItemList selectPackageItems(SearchShippingNoteParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updatePackageItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList processFileInfo(UpdateItemsBizParm parm) throws BizException;
	public void deleteItems(DeleteItemsBizParm parm) throws BizException;
	public void updateShippingNoteAckItems(UpdateItemsBizParm parm) throws BizException;
	public void updConfirmLoadingStt(UpdateItemsBizParm parm) throws BizException;
}
