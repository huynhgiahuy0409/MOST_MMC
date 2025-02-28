package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITheListOfDamageCheckOfRORO{
	public DataItemList selectBlComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectRoRoDamageCheckItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectCargoPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectUnitPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectRoRoDmgDtlInvItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectTheDamagePartItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectTheDamageLevelItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectRoRoDmgDtlDmgItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList insertRoRoDmgItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList insertRoRoInvItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteRoRoDmgItem(DeleteItemsBizParm parm) throws BizException;
	public DataItemList updateRoRoInvItem(UpdateItemsBizParm parm) throws BizException;
	public DataItemList selectROROInventoryItems(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectFileList(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	
	public DataItemList selectRoRoDamageCheckItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectROROInventoryItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList selectRoRoDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws BizException;
	public DataItemList insertRoRoInvItemHHT(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteRoRoDmgItemHHT(DeleteItemsBizParm parm) throws BizException;
	public DataItemList updateRoRoInvItemHHT(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateItemsHHT(UpdateItemsBizParm parm) throws BizException;
	public DataItemList insertRoRoDmgItemHHT(InsertItemsBizParm parm) throws BizException;
}
