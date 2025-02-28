package com.tsb.most.basebiz.service.administrator;

import com.tsb.most.basebiz.parm.administrator.SearchMenuRegisterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IMenuRegister {
	public DataItemList selectMenuList(SearchMenuRegisterParm parm) throws BizException;
	public DataItemList selectMenu(SearchMenuRegisterParm parm) throws BizException;
	public DataItemList selectProgramInfoList(SearchMenuRegisterParm parm) throws BizException;
	public DataItemList insertMenuList(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertProgramInfoList(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateMenuList(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateProgramInfoList(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteMenuList(DeleteItemsBizParm parm) throws BizException;
	public DataItemList deleteProgramInfoList(DeleteItemsBizParm parm) throws BizException;
}
