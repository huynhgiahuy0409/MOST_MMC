package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.ContainerProcessParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IContainer{
	public IDataItem selectContainerProcessList(ContainerProcessParm parm)throws BizException;
	public IDataItem insertContainerProcessItems(InsertItemsBizParm parm)throws BizException;
	public IDataItem updateContainerProcessItems(UpdateItemsBizParm parm)throws BizException;
	public IDataItem deleteContainerProcessItems(DeleteItemsBizParm parm)throws BizException;
	
}
