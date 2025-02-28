package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchDataGatheringParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDataGatheringDao{
    public DataItemList selectDataGathering(SearchDataGatheringParm parm) throws DaoException;
    public DataItemList selectDataGatheringDetail(SearchDataGatheringParm parm) throws DaoException;
    public DataItemList selectGatheredData(SearchDataGatheringParm parm) throws DaoException;
	public DataItemList selectVesselInformation(SearchDataGatheringParm parm) throws DaoException;
	public DataItemList selectCargoInformation(SearchDataGatheringParm parm) throws DaoException;
	public DataItemList selectCargoSumInformation(SearchDataGatheringParm parm) throws DaoException;
	public DataItemList selectEquipmentInformation(SearchDataGatheringParm parm) throws DaoException;
	public DataItemList selectPayerData(SearchDataGatheringParm parm) throws DaoException;
	public DataItemList selectValidVslSchedule(SearchDataGatheringParm parm) throws DaoException;
	
	public DataItemList applyDataGatheringDetail(UpdateItemsBizParm parm) throws DaoException;
	
    public void applyGatheredDelete(DeleteItemsBizParm parm) throws DaoException;
    public void applyGatheredDeleteDetail(DeleteItemsBizParm parm) throws DaoException;
    
    
}