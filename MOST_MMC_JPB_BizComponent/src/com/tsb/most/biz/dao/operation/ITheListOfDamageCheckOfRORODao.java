package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITheListOfDamageCheckOfRORODao {
	public DataItemList selectBlComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException ;
	public DataItemList selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException ;
	public DataItemList selectRoRoDamageCheckItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException ;
	public DataItemList selectCargoPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectUnitPopupItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectRoRoDmgDtlInvItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectTheDamagePartItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectTheDamageLevelItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectRoRoDmgDtlDmgItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList updateCheckTimeItem(UpdateItemsBizParm items) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm items) throws DaoException;
	public DataItemList insertRoRoDmgItem(InsertItemsBizParm items) throws DaoException;
	public DataItemList deleteRoRoDmgItem(DeleteItemsBizParm items) throws DaoException;
	public DataItemList updateRoRoInvItem(UpdateItemsBizParm items) throws DaoException ;
	public DataItemList selectROROInventoryItems(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	
	public DataItemList selectRoRoDamageCheckItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException ;
	public DataItemList selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectROROInventoryItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList selectRoRoDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfROROParm parm) throws DaoException;
	public DataItemList insertRoRoDmgItemHHT(InsertItemsBizParm items) throws DaoException;
	public DataItemList deleteRoRoDmgItemHHT(DeleteItemsBizParm items) throws DaoException;
	public DataItemList updateRoRoInvItemHHT(UpdateItemsBizParm items) throws DaoException;
	public DataItemList insertRoRoInvItemHHT(InsertItemsBizParm items) throws DaoException;
	public DataItemList updateCheckTimeItemHHT(UpdateItemsBizParm items) throws DaoException;
}
