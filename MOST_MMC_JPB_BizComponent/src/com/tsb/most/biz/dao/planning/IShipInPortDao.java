package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.ShipInPortItem;
import com.tsb.most.biz.parm.planning.SearchShipInPortParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IShipInPortDao {
    public DataItemList selectShipInPortList(SearchShipInPortParm param)throws DaoException;
    public DataItemList selectTideInformationList(SearchShipInPortParm param)throws DaoException;
    public DataItemList getBerthLocList(SearchShipInPortParm param)throws DaoException;
    public void insertTideInformation(TxTraceInfo info, DataItemList insertList) throws DaoException;
    public void updateTideInformation(TxTraceInfo info, DataItemList updateList) throws DaoException;
    public void deleteTideInformation(TxTraceInfo info, DataItemList deleteList) throws DaoException;
    public Integer isTideInformationExisted(ShipInPortItem itm)throws DaoException;
}
