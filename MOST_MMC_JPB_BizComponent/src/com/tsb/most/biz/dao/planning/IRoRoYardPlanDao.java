package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchRoRoYardPlanParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IRoRoYardPlanDao {
    public DataItemList selectRoRoYardPlanCargoList(SearchRoRoYardPlanParm parm) throws DaoException;
    public DataItemList selectRoRoYardPlanUnitList(SearchRoRoYardPlanParm parm) throws DaoException;
    public DataItemList selectRoRoYardPlanList(SearchRoRoYardPlanParm parm) throws DaoException;
    
    public DataItemList updateYardPlanOfRoRo(UpdateItemsBizParm items) throws DaoException;
    public DataItemList deleteYardPlanOfRoRo(UpdateItemsBizParm items) throws DaoException;
	public DataItemList selectUnitsFromBLList(SearchRoRoYardPlanParm parm) throws DaoException;
	public DataItemList selectUnitsFromBLListByMode(SearchRoRoYardPlanParm parm) throws DaoException;
	public DataItemList selectRoRoYardPlanUnitWHCheckImportList(SearchRoRoYardPlanParm parm)throws DaoException;
	public DataItemList selectRoRoYardPlanUnitHandlingOutList(SearchRoRoYardPlanParm parm)throws DaoException;
}