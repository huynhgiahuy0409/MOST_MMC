package com.tsb.most.biz.service.document;

import com.tsb.most.biz.dao.document.IDocumentCleranceDao;
import com.tsb.most.biz.parm.document.SearchDocumentCleranceParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DocumentationClearanceStatus extends MOSTBaseService implements IDocumentationClearanceStatus{
	private IDocumentCleranceDao documentCleranceDao;
	
	public void setDocumentCleranceDao(IDocumentCleranceDao documentCleranceDao) {
		this.documentCleranceDao = documentCleranceDao;
	}
     
    public DataItemList getDocumentCleranceLists(SearchDocumentCleranceParm parm) throws BizException{
        DataItemList DocumentList = documentCleranceDao.getDocumentCleranceLists(parm);
        
        return DocumentList;
    }
    
    public DataItemList getBethPlanList(SearchDocumentCleranceParm parm) throws BizException{
    	DataItemList vesselBerthingList = documentCleranceDao.getBethPlanList(parm);
        
        return vesselBerthingList;
    }
}