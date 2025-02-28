package com.tsb.most.basebiz.dao.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchMenuRegisterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IMenuRegisterDao {
	public DataItemList selectMenuList(SearchMenuRegisterParm parm) throws DaoException;
	public DataItemList selectMenu(SearchMenuRegisterParm parm) throws DaoException;
	public DataItemList selectProgramInfoList(SearchMenuRegisterParm parm) throws DaoException;
	public DataItemList insertMenuList(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertProgramInfoList(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateMenuList(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateProgramInfoList(UpdateItemsBizParm  parm) throws DaoException;
	public DataItemList deleteMenuList(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteProgramInfoList(DeleteItemsBizParm parm) throws DaoException;
}
