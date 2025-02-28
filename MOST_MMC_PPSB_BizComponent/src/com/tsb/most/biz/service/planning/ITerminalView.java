package com.tsb.most.biz.service.planning;

import com.tsb.most.basebiz.parm.combobox.SearchComboBoxServiceParm;
import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITerminalView{
	public DataItemList selectBerthInfo(SearchBerthPlanParm parm) throws BizException;
	public DataItemList selectMasterBlList(SearchBLParm parm) throws BizException;
	public DataItemList selectSubBlList(SearchBLParm parm) throws BizException;
	public DataItemList selectBookingNoList(SearchShippingNoteParm parm) throws BizException;
	public DataItemList selectShippingNoteList(SearchShippingNoteParm parm) throws BizException;
	public DataItemList selectWhConfiguration(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList selectAreaInfoList(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList selectCommodityGroupCodeCombo(SearchComboBoxServiceParm parm) throws BizException;
}
