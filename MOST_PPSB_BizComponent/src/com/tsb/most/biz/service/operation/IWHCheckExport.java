package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchWHCheckExportParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IWHCheckExport {
	
	public DataItemList selectCargoWarehouseCheckExportItems(SearchWHCheckExportParm parm) throws BizException;
	public DataItemList checkAmoutLocation(SearchWHCheckExportParm parm) throws BizException;
	public DataItemList updateCargoWarehouseCheckExportItems(UpdateItemsBizParm parm) throws BizException;
	//RORO
	public DataItemList selectWHExportForROROItems(SearchWHCheckExportParm parm) throws BizException;
	public DataItemList updateCheckExporForROROtItems(UpdateItemsBizParm parm) throws BizException;
}
