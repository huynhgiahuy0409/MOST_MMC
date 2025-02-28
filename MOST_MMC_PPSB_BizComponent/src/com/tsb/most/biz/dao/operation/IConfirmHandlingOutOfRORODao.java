package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IConfirmHandlingOutOfRORODao {
    public DataItemList selectBlComboItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectDriverComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectDriverWithoutTruckComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectTruckComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectUnitComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectDoItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectHandlingOutUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    
    public DataItemList updateConfirmHandlingOutOfRoRo(UpdateItemsBizParm items) throws DaoException;
    public DataItemList deleteConfirmHandlingOutOfRoRo(UpdateItemsBizParm items) throws DaoException;
    
    
    public DataItemList selectDoItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
	public DataItemList selectHandlingOutUnitItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
	public DataItemList updateGateTransactionsHHT(UpdateItemsBizParm insertItems) throws DaoException;
    public DataItemList updateHandlingOutUnitItemsHHT(UpdateItemsBizParm items) throws DaoException;
    public DataItemList deleteHandlingOutUnitItemsHHT(UpdateItemsBizParm items) throws DaoException;
    
	public void insertGateTransactions(DataItemList itemList) throws DaoException;
	public DataItemList selectDriverWithoutTruckComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
	public DataItemList selectTruckComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
	public DataItemList selectDriverComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
	public String selectJobGroupNo(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsCargoMstHOStDt(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsCargoAvDvChk(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsROROMst(SearchCargoMasterParm parm) throws DaoException;
	public DataItemList insertCargoHOJobItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertCargoHOArrvDelvItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList selectGatepassNo(SearchCargoArrvDelvParm parm) throws DaoException;
	public DataItemList updateCargoHOArrvDelvItems(UpdateItemsBizParm parm) throws DaoException;
	
}
