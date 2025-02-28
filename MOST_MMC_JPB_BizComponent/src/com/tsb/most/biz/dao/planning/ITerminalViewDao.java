package com.tsb.most.biz.dao.planning;

import com.tsb.most.basebiz.parm.codes.SearchCommodityCodeParm;
import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITerminalViewDao {
	public DataItemList selectBerthInfo(SearchBerthPlanParm parm) throws DaoException;
	public DataItemList selectMasterBlList(SearchBLParm parm) throws DaoException;
	public DataItemList selectSubBlList(SearchBLParm parm) throws DaoException;
	public DataItemList selectBookingNoList(SearchShippingNoteParm parm) throws DaoException;
	public DataItemList selectShippingNoteList(SearchShippingNoteParm parm) throws DaoException;
	public DataItemList selectWhConfiguration(SearchWarehouseDefinitionParm parm) throws DaoException;
	public DataItemList selectAreaInfoList(SearchWarehouseDefinitionParm parm) throws DaoException;
	public DataItemList selectCommodityGroupCodeCombo(SearchCommodityCodeParm parm) throws DaoException;
}
