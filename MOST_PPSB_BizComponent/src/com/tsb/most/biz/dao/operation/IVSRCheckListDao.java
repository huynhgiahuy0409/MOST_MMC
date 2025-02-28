package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.VSRCheckListItem;
import com.tsb.most.biz.parm.operation.SearchVSRCheckListParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVSRCheckListDao {
    public DataItemList selectVSRCheckList(SearchVSRCheckListParm parm) throws DaoException;
    public DataItemList selectVSRCheckListDetail(SearchVSRCheckListParm parm) throws DaoException;
    public DataItemList selectMegaEQList(SearchVSRCheckListParm parm) throws DaoException;
    public DataItemList selectMegaNoList(SearchVSRCheckListParm parm) throws DaoException;
    public DataItemList selectDeployEQList(SearchVSRCheckListParm parm)throws DaoException;
    public DataItemList selectVOperationDeployEQList(SearchVSRCheckListParm parm) throws DaoException;
    public DataItemList selectEmpIdList(SearchVSRCheckListParm parm)throws DaoException;
    public DataItemList selectPayerList(SearchVSRCheckListParm parm) throws DaoException;
    public DataItemList selectRefNoCombo(SearchVSRCheckListParm parm) throws DaoException;
    public DataItemList selectCheckVSRListHHT(SearchVSRCheckListParm parm) throws DaoException;
    public DataItemList selectWorkingArea(SearchVSRCheckListParm parm) throws DaoException;
    public Integer selectIsItemInUsed(VSRCheckListItem item) throws DaoException;
    
    public void insertItem(DataItemList items) throws DaoException;
    public void updateItems(DataItemList items) throws DaoException;
    public void deleteDatagathering(DataItem item) throws DaoException;
    public void deleteItems(DataItemList items) throws DaoException;
    public void updateVerifyStatusItems(DataItemList items) throws DaoException;
}
