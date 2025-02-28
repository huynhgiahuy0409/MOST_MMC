package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchEquipmentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IEquipment {
	public DataItemList selectEquipmentGridList(SearchEquipmentParm parm) throws BizException;
	public DataItemList selectChkDupliEqFacCd(SearchEquipmentParm parm) throws BizException;
	public DataItemList selectEquipmentComboList(SearchEquipmentParm parm) throws BizException;
	public DataItemList selectEquipmentCapaComboList(SearchEquipmentParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException;
}
