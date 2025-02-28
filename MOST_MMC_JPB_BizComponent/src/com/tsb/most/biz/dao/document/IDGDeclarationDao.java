package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchDGDeclarationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDGDeclarationDao {
	public DataItemList getDGDeclarationItems(SearchDGDeclarationParm parm) throws DaoException;

	public DataItemList getSubstanceItems(SearchDGDeclarationParm parm) throws DaoException;

	public DataItemList getVesselInfoItems(SearchDGDeclarationParm parm) throws DaoException;

	public void insertDGDeclarationItems(InsertItemsBizParm item) throws DaoException;

	public void insertDGStatus(InsertItemsBizParm item) throws DaoException;

	public void updateDGDeclarationItems(UpdateItemsBizParm parm) throws DaoException;

	public void updateNewSnNoItems(UpdateItemsBizParm item) throws DaoException;

	public void deleteDGDeclarationItems(DeleteItemsBizParm parm) throws DaoException;

	public DataItemList getDGDeclarationNoList(SearchDGDeclarationParm parm) throws DaoException;

	public DataItemList getDgReport(SearchDGDeclarationParm parm) throws DaoException;

	public DataItemList getDGforUpdateCNS(SearchDGDeclarationParm parm) throws DaoException;

	public void updateCnsforDG(UpdateItemsBizParm parm) throws DaoException;
}    
