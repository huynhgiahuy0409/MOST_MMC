package com.tsb.most.biz.dao.operation;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.parm.operation.SearchVesselDelayParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public interface IVesselDelayDao {
	public DataItemList selectEqNoList(SearchVesselDelayParm parm) throws DaoException;
	public DataItemList selectHatchNoList(SearchVesselDelayParm parm) throws DaoException;
	public DataItemList selectVesselDelayList(SearchVesselDelayParm parm) throws DaoException ;
	public DataItemList selectDelayCodeList(SearchCodeMasterParm parm) throws DaoException;
    public DataItemList selectAcceptedDelayCode(SearchVesselDelayParm parm)throws DaoException;
    
    public DataItemList updateVerifiedVesselDelayItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList insertVesselDelayItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList deleteVesselDelayItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList updateVesselDelayItems(UpdateItemsBizParm parm) throws DaoException;
   

}
