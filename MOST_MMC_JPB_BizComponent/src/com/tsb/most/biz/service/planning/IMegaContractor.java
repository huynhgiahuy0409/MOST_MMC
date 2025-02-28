package com.tsb.most.biz.service.planning;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IMegaContractor {

	public DataItemList getMegaContractorList(SearchMegaParm parm) throws BizException;
	
	public DataItemList selectFileList(SearchFileUploadParm parm) throws BizException;
	
	public DataItemList updateItem(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList denyMegaOperItem(UpdateItemsBizParm parm) throws BizException;
}
