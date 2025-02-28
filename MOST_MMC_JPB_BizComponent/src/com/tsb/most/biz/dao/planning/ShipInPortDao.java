package com.tsb.most.biz.dao.planning;

import java.util.Iterator;
import java.util.List;

import com.tsb.most.biz.dataitem.planning.ShipInPortItem;
import com.tsb.most.biz.parm.planning.SearchShipInPortParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class ShipInPortDao extends BaseDao implements IShipInPortDao {

    public DataItemList selectShipInPortList(SearchShipInPortParm param) throws DaoException {
        return unifiedDao.getItemsPage("ShipInPort.selectShipInPortList",param);
    }

    public DataItemList selectTideInformationList(SearchShipInPortParm param) throws DaoException {
        return unifiedDao.getItemsPage("ShipInPort.selectTideInformationList",param);
    }

    public void insertTideInformation(TxTraceInfo info, DataItemList insertList)  throws DaoException{
        unifiedDao.insertItems(info,"ShipInPort.insertTideInformation",insertList);
    }

    public void updateTideInformation(TxTraceInfo info, DataItemList updateList)  throws DaoException{
        unifiedDao.updateItems(info,"ShipInPort.updateTideInformation",updateList);
    }

    public void deleteTideInformation(TxTraceInfo info, DataItemList deleteList) throws DaoException {
        unifiedDao.deleteItems(info,"ShipInPort.deleteTideInformation",deleteList);
    }
    public Integer isTideInformationExisted(ShipInPortItem itm) throws DaoException {
    	//TODO
    	//Need to change return type and parm
        //return (Integer) unifiedDao.selectItem("ShipInPort.isTideInformationExist",itm);
    	return 0;
    }
    public DataItemList getBerthLocList(SearchShipInPortParm param) throws DaoException {
        return unifiedDao.getItems("ShipInPort.selectBerthLoc",param);
    }

    private String getNextVessels(SearchShipInPortParm param) throws DaoException {
        List nextVslList = (List) unifiedDao.getItems("ShipInPort.selectNextVesselList",param);
        String nextVslStr = "";
        for(Iterator it = nextVslList.iterator();it.hasNext();){
            ShipInPortItem itm = (ShipInPortItem)it.next();
            String vslNm = itm.getNextVsl();
            if(vslNm == null) vslNm = itm.getJpvc();
            if(nextVslStr.length()==0)
                nextVslStr = itm.getVslNm();
            else nextVslStr = nextVslStr + ", " +itm.getVslNm();
        }
        return nextVslStr;
    }

}
