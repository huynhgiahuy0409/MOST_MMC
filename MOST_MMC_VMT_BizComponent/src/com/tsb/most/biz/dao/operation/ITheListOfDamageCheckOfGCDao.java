package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.TheListOfDamageCheckOfGCItem;
import com.tsb.most.biz.parm.operation.SearchTheListOfDamageCheckOfGCParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITheListOfDamageCheckOfGCDao {
	public DataItemList selectBlComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException ;
	public DataItemList selectCategoryComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectShipgNoteNoComboBoxItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException ;
	public DataItemList selectGCDamageCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException ;
	public DataItemList selectGCDimensionCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException ;
	public DataItemList selectCargoPopupItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectUnitPopupItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectGCDmgDtlInvItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectTheDamagePartItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectTheDamageLevelItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectGCDmgDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectGCDimensionDtlDmgItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList updateCheckTimeItem(UpdateItemsBizParm items) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm items) throws DaoException;
	public DataItemList insertGCDmgItem(InsertItemsBizParm items) throws DaoException;
	public DataItemList deleteGCDmgItem(DeleteItemsBizParm items) throws DaoException;
	public DataItemList deleteGCDimensionItem(DeleteItemsBizParm items) throws DaoException;
	public DataItemList updateGCInvItem(UpdateItemsBizParm items) throws DaoException ;
	public DataItemList selectGCInventoryItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	
	public DataItemList selectGCDamageCheckItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException ;
	public DataItemList selectBlComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectShipgNoteNoComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectUnitPopupItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectBrandComboBoxItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectGCInventoryItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectGCDmgDtlInvItemsHHT(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList insertGCDmgItemHHT(InsertItemsBizParm items) throws DaoException;
	public DataItemList deleteGCDmgItemHHT(DeleteItemsBizParm items) throws DaoException;
	public DataItemList updateGCInvItemHHT(UpdateItemsBizParm items) throws DaoException;
	public DataItemList updateCheckTimeItemHHT(UpdateItemsBizParm items) throws DaoException;
	
	/* HHT */
	public DataItemList selectTblDamageCheckItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectTblMfDocId(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectTblBLComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectTblShipgNoteNoComboItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectTblDamageCheckDetailItems(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList insertTblDamageCheckDetailItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList deleteTblDamageCheckList(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList deleteTblDamageCheckDetailItems(DeleteItemsBizParm parm) throws DaoException;
	public DataItemList updateTblDamageCheckDetailItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList selectTheDamageDesc(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public DataItemList selectJobNoDamageCheck(TheListOfDamageCheckOfGCItem parm) throws DaoException;
	public DataItemList selectUniqueJobNoDamageCheck(SearchTheListOfDamageCheckOfGCParm parm) throws DaoException;
	public void insertDamageCheck(DataItemList items) throws DaoException;
	public void deleteUploadFiles(DeleteItemsBizParm parm) throws DaoException;
	public void updateDamageCheck(DataItemList items) throws DaoException;
	public void deleteDamageCheck(DataItemList items) throws DaoException;
	public DataItemList searchDamageCheck(SearchTheListOfDamageCheckOfGCParm parm);
}

