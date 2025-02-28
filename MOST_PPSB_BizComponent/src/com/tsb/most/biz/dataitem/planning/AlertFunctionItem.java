/**
* AlertFunctionItem.java
*
* Created on   : 2009-02-20
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2009-02-20     kisik jung 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import com.tsb.most.framework.dataitem.DataItem;

public class AlertFunctionItem extends DataItem {

    private String property;
    private String cnt;
    private String od;
    
    
    
    /**
     * @return Returns the od.
     */
    public String getOd() {
        return od;
    }
    /**
     * @param od The od to set.
     */
    public void setOd(String od) {
        this.od = od;
    }
    /**
     * @return Returns the cnt.
     */
    public String getCnt() {
        return cnt;
    }
    /**
     * @param cnt The cnt to set.
     */
    public void setCnt(String cnt) {
        this.cnt = cnt;
    }
    /**
     * @return Returns the property.
     */
    public String getProperty() {
        return property;
    }
    /**
     * @param property The property to set.
     */
    public void setProperty(String property) {
        this.property = property;
    }
}
