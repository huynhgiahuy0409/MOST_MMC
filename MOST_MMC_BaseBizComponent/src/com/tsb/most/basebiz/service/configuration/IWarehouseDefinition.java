package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

import javafx.scene.chart.PieChart.Data;

public interface IWarehouseDefinition {
	public DataItemList selectWarehouseDefinitionList(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList selectChkDupliLocId(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList selectOverlap(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList checkBayRowDesign(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList selectHHTWhViewList(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList selectWhViewList(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList selectAreaInfoList(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList selectSulphurConfigurationList(SearchWarehouseDefinitionParm parm) throws BizException;
	public DataItemList updateSulphurItems(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public void updateUnusedCells(UpdateItemsBizParm parm) throws BizException;
	public void deleteItems(DeleteItemsBizParm parm) throws BizException;
}
