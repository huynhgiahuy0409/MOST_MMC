package com.tsb.most.biz.service.operation;


import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfGCParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITheListOfDamageCheckOfGC{
	public DataItemList selectBlComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectGCDamageCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectGCDimensionCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectCargoPopupItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectUnitPopupItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectGCDmgDtlInvItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectTheDamagePartItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectTheDamageLevelItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectGCDmgDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectGCDimensionDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList insertGCDmgItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList insertGCInvItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteGCDmgItem(DeleteItemsBizParm parm) throws BizException;
	public DataItemList deleteGCDimensionItem(DeleteItemsBizParm parm) throws BizException;
	public DataItemList updateGCInvItem(UpdateItemsBizParm parm) throws BizException;
	public DataItemList selectGCInventoryItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	
	
	public DataItemList selectGCDamageCheckItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectGCInventoryItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectGCDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList insertGCInvItemHHT(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteGCDmgItemHHT(DeleteItemsBizParm parm) throws BizException;
	public DataItemList updateGCInvItemHHT(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateItemsHHT(UpdateItemsBizParm parm) throws BizException;
	public DataItemList insertGCDmgItemHHT(InsertItemsBizParm parm) throws BizException;
	
	/* HHt */
	public DataItemList selectTblDamageCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectTblMfDocIdComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectTblBlComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectTblShipgNoteNoComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList selectTblDamageCheckDetailItems(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList insertTblDamageCheckDetailItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteTblDamageCheckList(DeleteItemsBizParm parm) throws BizException;
	public DataItemList updateTblDamageCheckDetailItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList selectTheDamageDesc(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;
	public DataItemList processDamageCheckListItem(UpdateItemsBizParm parm) throws BizException;
	public DataItemList searchDamageCheck(SearchTheListOfDamageCheckOfGCParm parm) throws BizException;

}
