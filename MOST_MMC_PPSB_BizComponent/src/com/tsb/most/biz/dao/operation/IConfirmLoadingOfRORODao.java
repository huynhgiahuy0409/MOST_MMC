package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IConfirmLoadingOfRORODao {
    public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    public DataItemList selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    public DataItemList selectDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    public DataItemList selectInDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    
    public DataItemList updateConfirmYardAndLoadingCheckForRoRo(UpdateItemsBizParm items) throws DaoException;
    
    public DataItemList selectCargoItemsHHT(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    public DataItemList selectDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    public DataItemList selectInDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws DaoException;
	public boolean selectIsROROMst(SearchCargoMasterParm parm)throws DaoException;
	public String selectGateInTimeSeq(SearchCargoLoadingParm parm)throws DaoException;
	public void insertJobItems(DataItemList items)throws DaoException;
	public void updateNextJobNoForWAJob(DataItemList items)throws DaoException;
}
