package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingInOfROROParm;
import com.tsb.most.biz.parm.operation.SearchROROMasterParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IConfirmHandlingInOfRORODao {
    public DataItemList selectBookingNoComboBoxItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException;
    public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException;
    public DataItemList selectCargoItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException;
    public DataItemList selectGateInItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException;
    public DataItemList selectHandlingInItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException;
    
    public DataItemList updateConfirmHandlingInOfRoRo(UpdateItemsBizParm items) throws DaoException;
    public DataItemList insertUnitCorrectionOfRoRo(InsertItemsBizParm items) throws DaoException;
	public String selectJobGroupNo(SearchROROMasterParm parm)throws DaoException;
	public String selectGateInTimeSeq(SearchConfirmHandlingInOfROROParm parm)throws DaoException;
	public void updateCgHIAmtItems(DataItemList items) throws DaoException;
	public void insertHIJobItems(DataItemList items) throws DaoException;
	public DataItemList selectGatepassNo(SearchCargoArrvDelvParm parm) throws DaoException;
	public void updateHIGPArrvDelvItems(DataItemList items) throws DaoException;
	public void insertHIArrvDelvItems(DataItemList items) throws DaoException;
	public void updateHIArrvDelvItems(DataItemList items) throws DaoException;
	public void insertHIGeneralGateIn(DataItemList items) throws DaoException;
	public void updateHIGateInTime(DataItemList items) throws DaoException;
	public void updateHIGateInLorry(DataItemList items) throws DaoException;
	public void updateHIOnlyLorry(DataItemList items) throws DaoException;
	public boolean selectIsCargoAvDvChk(SearchROROMasterParm parm) throws DaoException;
	public DataItemList selectROROUnitItems(SearchConfirmHandlingInOfROROParm searchParm) throws DaoException;
	public void insertJobDtlItemsOfRoRo(DataItemList items) throws DaoException;
    
	//public DataItemList updateGateOperations(UpdateItemsBizParm items) throws DaoException;
	
}
