package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.ProofSheetItem;
import com.tsb.most.biz.parm.billing.SearchProofSheetParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IProofSheetDao{
	public DataItemList selectCostCenterCombo(SearchProofSheetParm parm) throws DaoException;
	public DataItemList selectProofSheetList(SearchProofSheetParm parm) throws DaoException;
    public DataItemList selectExchangeData(SearchProofSheetParm parm) throws DaoException;
    public DataItemList selectCostCenterData(SearchProofSheetParm parm) throws DaoException;
    public DataItemList selectPartnerRates(SearchProofSheetParm parm) throws DaoException;
    public DataItemList selectComboBoxIvPrefix(SearchProofSheetParm parm) throws DaoException;
    public DataItemList selectSsrList(ProofSheetItem item) throws DaoException;
    
    public DataItemList updateStatusDataGathering(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateGatheredData(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateSsrStatus(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateSsrDetail(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateServiceOrderPayer(UpdateItemsBizParm parm) throws DaoException;
}
