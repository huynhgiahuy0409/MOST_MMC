package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchWhRentalParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IWhRentalDao {
    public DataItemList getWhRentalList(SearchWhRentalParm parm) throws DaoException;
    public DataItemList getChkDupliRentNo(SearchWhRentalParm parm) throws DaoException;
    public DataItemList getRefNo(SearchWhRentalParm parm) throws DaoException;
    public DataItemList getMaxRefNo(SearchWhRentalParm parm) throws DaoException;
    public DataItemList getWhRentalDtlList(SearchWhRentalParm parm) throws DaoException;
    public void insertWhRentalItems(DataItemList items) throws DaoException;
    public void updateWhRentalItems(DataItemList items) throws DaoException;
    public void deleteWhRentalItems(DataItemList items) throws DaoException;
    public void insertRentalDtlItems(DataItemList items) throws DaoException;
    public void deleteRentalDtlItems(DataItemList items) throws DaoException;
}
