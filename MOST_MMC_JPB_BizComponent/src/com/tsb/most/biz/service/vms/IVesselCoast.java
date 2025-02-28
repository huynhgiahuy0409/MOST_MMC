/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.plus.biz.service.common.IAuthentication.java
* CREATE ON : 2017. 05. 31.
* CLASS DESCRIPTION :
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2017. 05. 31.  LUIS			             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.biz.service.vms;

import com.tsb.most.basebiz.parm.vms.VesselParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVesselCoast{
	public DataItemList selectVesselList(VesselParm pParm) throws BizException;
	public DataItemList selectVesselRouteCodeList(VesselParm pParm) throws BizException;
	public DataItemList selectVesselKindList(VesselParm pParm) throws BizException;
//	public DataItemList selectPortList(VesselParm pParm) throws BizException;
	public DataItemList selectVesselMovements(VesselParm pParm) throws BizException;
	public DataItemList selectVesselImage(VesselParm pParm) throws BizException;
	public DataItemList insertVesselImage(InsertItemsBizParm parm)throws BizException;
	public DataItemList updateVesselImage(UpdateItemsBizParm parm)throws BizException;
	public DataItemList deleteVesselImage(DeleteItemsBizParm parm)throws BizException;
	public DataItemList updateVesselGps(UpdateItemsBizParm parm)throws BizException;
	
}