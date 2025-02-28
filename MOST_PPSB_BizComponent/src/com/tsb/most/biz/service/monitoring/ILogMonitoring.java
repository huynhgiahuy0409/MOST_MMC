package com.tsb.most.biz.service.monitoring;

import java.io.IOException;

import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.parm.operation.SearchDamageDimensionCheck;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ILogMonitoring {
	public DataItemList selectListFileMOST(SearchDamageDimensionCheck parm)throws BizException;
	public DataItemList selectListFileWB(SearchDamageDimensionCheck parm)throws BizException;
	public DataItemList selectListFileHG(SearchDamageDimensionCheck parm)throws BizException;
	public DataItemList selectFileDownLoadMOST(SearchFileUploadParm parm) throws BizException, IOException;
	public DataItemList selectFileDownLoadWB(SearchFileUploadParm parm) throws BizException, IOException;
	public DataItemList selectFileDownLoadHG(SearchFileUploadParm parm) throws BizException, IOException;
}
