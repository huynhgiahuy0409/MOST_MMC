package com.tsb.most.basebiz.dao.configuration;


import com.tsb.most.basebiz.parm.configuration.SearchServiceOrderSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IServiceOrderSettingDao {

    public DataItemList selectServiceOrderSettingList(SearchServiceOrderSettingParm parm) throws DaoException;
    public DataItemList selectServiceOrderSettingDetail(SearchServiceOrderSettingParm parm)throws DaoException;
    public int insertServiceOrderSettingDetail(TxTraceInfo txTraceInfo, DataItem item)throws DaoException;
    public void updateServiceOrderSettingDetail(TxTraceInfo txTraceInfo, DataItem item)throws DaoException;
    public int deleteServiceOrderSettingDetail(TxTraceInfo txTraceInfo, DataItem item)throws DaoException;

    public DataItemList insertServiceOrderConfigurationDetail(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateServiceOrderConfigurationDetail(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteServiceOrderConfigurationDetail(DeleteItemsBizParm parm) throws DaoException;
	
	public DataItemList selectExtendCategoryCd(SearchServiceOrderSettingParm parm) throws DaoException;
	
}
