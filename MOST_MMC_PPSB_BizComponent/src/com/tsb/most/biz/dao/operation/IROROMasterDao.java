package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchROROMasterParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IROROMasterDao {
	public boolean selectIsExistedROROMst(SearchROROMasterParm parm) throws DaoException;
	public DataItemList insertROROMasterItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateYardPlanOfRoRo(UpdateItemsBizParm insertMstParm)throws DaoException;
	public String selectJobGroupNo(SearchCargoMasterParm parm) throws DaoException;
	public boolean selectIsCargoAvDvChk(SearchCargoMasterParm parm) throws DaoException;
}