package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchBizConfigurationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IBizConfigurationDao {
    public DataItemList selectBizConfigurationItems(SearchBizConfigurationParm parm) throws DaoException ;
    public DataItemList selectDuplicateCheck(SearchBizConfigurationParm parm) throws DaoException;
    
    public DataItemList insertBizConfigurationItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateBizConfigurationItems(UpdateItemsBizParm parm) throws DaoException;
}    
