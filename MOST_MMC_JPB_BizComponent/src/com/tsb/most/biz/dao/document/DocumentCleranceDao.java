package com.tsb.most.biz.dao.document;
import com.tsb.most.biz.parm.document.SearchDocumentCleranceParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DocumentCleranceDao extends BaseDao implements IDocumentCleranceDao {
    
	public DataItemList getDocumentCleranceLists(SearchDocumentCleranceParm parm) throws DaoException {
        return unifiedDao.getItems("DocumentCleranceMap.selectDocumentClerance", parm);
    }
    
    public DataItemList getBethPlanList(SearchDocumentCleranceParm parm) throws DaoException {
    	DataItemList rtnList = null;
        if (parm.getSearchType().equals("combo")){
            rtnList = unifiedDao.getItems("DocumentCleranceMap.selectVesselTp", parm);
        } else {
            rtnList = unifiedDao.getItems("DocumentCleranceMap.selectBerthPlanList", parm);
        }
        return rtnList;
    }
}
