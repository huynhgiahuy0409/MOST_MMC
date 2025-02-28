package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IWhConfigurationDao {
    public DataItemList selectHOInvLocs(SearchWhConfigurationParm parm) throws DaoException;
    public DataItemList selectInvLocs(SearchWhConfigurationParm parm) throws DaoException;
    public DataItemList selectDmgInvLocs(SearchWhConfigurationParm parm) throws DaoException;
    public DataItemList selectSprInvLocs(SearchWhConfigurationParm parm) throws DaoException;
    public DataItemList getInvLocs(SearchWhConfigurationParm parm) throws DaoException;
    public DataItemList getDmgInvLocs(SearchWhConfigurationParm parm) throws DaoException;
    public DataItemList getSprInvLocs(SearchWhConfigurationParm parm) throws DaoException;
    public DataItemList getWhConfigurationList(SearchWhConfigurationParm parm) throws DaoException;
}
