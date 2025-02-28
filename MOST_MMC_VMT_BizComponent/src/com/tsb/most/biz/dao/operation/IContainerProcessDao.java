package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.ContainerProcessParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IContainerProcessDao {
    public DataItemList selectContainerProcessList(ContainerProcessParm parm) throws DaoException ;
    public DataItemList selectEquipmentComboList(ContainerProcessParm parm) throws DaoException ;
    public DataItemList insertContainerProcessItems(DataItemList items) throws DaoException;
    public DataItemList updateContainerProcessItems(DataItemList items) throws DaoException;
    public DataItemList deleteContainerProcessItems(DataItemList items) throws DaoException;
}
