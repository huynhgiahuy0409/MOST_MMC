package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchVesselScheduleRegisterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselScheduleRegisterDao {
	public DataItemList selectVesselScheduleList(SearchVesselScheduleRegisterParm parm) throws DaoException;
	public DataItemList selectVesselScheduleDetail(SearchVesselScheduleRegisterParm parm) throws DaoException;
	public DataItemList selectListOfVslSchedule(SearchVesselScheduleRegisterParm parm) throws DaoException;
	public DataItemList isDuplicateVslCallId(SearchVesselScheduleRegisterParm parm) throws DaoException;
	public DataItemList selectCallSeq(SearchVesselScheduleRegisterParm parm) throws DaoException;
	public DataItemList selectMaxDocSNO(SearchVesselScheduleRegisterParm parm) throws DaoException;
	public DataItemList insertVesselPort(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertDocSno(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertVesselSchedule(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateVesselScheduleDetail(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateVesselPort(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateVslSchlStatus(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteVesselPort(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(UpdateItemsBizParm parm) throws DaoException;
}
