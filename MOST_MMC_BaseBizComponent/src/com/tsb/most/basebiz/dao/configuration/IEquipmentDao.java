package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchEquipmentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IEquipmentDao {
    public DataItemList selectEquipmentList(SearchEquipmentParm parm) throws DaoException ;
    public DataItemList selectCapaList(SearchEquipmentParm parm) throws DaoException ;
    public DataItemList selectLocList(SearchEquipmentParm parm) throws DaoException;
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
}    
