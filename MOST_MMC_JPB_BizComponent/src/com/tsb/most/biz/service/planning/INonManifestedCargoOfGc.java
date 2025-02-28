package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchNonManifestedCargoOfGcParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface INonManifestedCargoOfGc {
	public DataItemList selectNonManifestedCargoOfGcList(SearchNonManifestedCargoOfGcParm parm) throws BizException;
	public DataItemList selectSnItems(SearchNonManifestedCargoOfGcParm parm) throws BizException;
	public DataItemList selectBlItems(SearchNonManifestedCargoOfGcParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException;
	public DataItemList selectOrgBlComboBoxItem(SearchNonManifestedCargoOfGcParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException;
	public DataItemList insertNonManifestRegister(InsertItemsBizParm parm)throws BizException;
	public DataItemList deleteValidation(SearchNonManifestedCargoOfGcParm parm)throws BizException;
	public DataItemList selectShiftInfor(SearchNonManifestedCargoOfGcParm parm) throws BizException;
}
