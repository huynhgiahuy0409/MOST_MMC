package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IConfirmHandlingOutOfRORORehandlingDao {
    public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectDriverComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectDriverWithoutTruckComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectTruckComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    public DataItemList selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException; 
    public DataItemList selectUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException;
    
    public DataItemList updateHandlingOutUnitItems(UpdateItemsBizParm items) throws DaoException;
    public DataItemList deleteHandlingOutUnitItems(UpdateItemsBizParm items) throws DaoException;
}
