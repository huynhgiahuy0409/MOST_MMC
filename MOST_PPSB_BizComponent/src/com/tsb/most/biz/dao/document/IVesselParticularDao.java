package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchVesselParticularParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselParticularDao {
	public DataItemList selectVesselParticularList(SearchVesselParticularParm parm) throws DaoException;
	public DataItemList selectRequestVesselChangeList(SearchVesselParticularParm parm) throws DaoException;
	public DataItemList selectShaList(SearchVesselParticularParm parm) throws DaoException;
	public DataItemList selectSha(SearchVesselParticularParm parm) throws DaoException;
	public DataItemList selectShpList(SearchVesselParticularParm parm) throws DaoException;
	public DataItemList selectVesselParticularDetailItem(SearchVesselParticularParm parm) throws DaoException;
	public DataItemList vslScheduleCheck(SearchVesselParticularParm parm) throws DaoException;
	public DataItemList isCheckValidateForMQ(SearchVesselParticularParm parm) throws DaoException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList insertVesselParticularPeople(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateVesselParticularPeople(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateVesselParticularItemConfirm(UpdateItemsBizParm parm) throws DaoException;
	
	public DataItemList deleteVesselParticularItems(DeleteItemsBizParm parm) throws DaoException;
}
