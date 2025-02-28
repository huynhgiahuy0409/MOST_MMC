package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IConfirmLoadingOfRORORehandlingDao {
    public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    public DataItemList selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    public DataItemList selectUnitItems(SearchConfirmLoadingOfROROParm parm) throws DaoException;
    
    public DataItemList updateLoadingOfRORORehandlingItems(UpdateItemsBizParm items) throws DaoException;
}
