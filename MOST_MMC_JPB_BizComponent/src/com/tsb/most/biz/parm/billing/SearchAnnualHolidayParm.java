/**
* AnnualHolidayParm.java
*
* Created on   : Dec 5, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 5, 2007   Phan Minh Tuan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author pmtuan
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchAnnualHolidayParm extends BaseBizParm {
    private String strHlDayYmd ;
    private String strHlDayCd ;
    private String strDescr ;
    private String strVersion;
    public String getStrDescr() {
        return strDescr;
    }
    public void setStrDescr(String strDescr) {
        this.strDescr = strDescr;
    }
    public String getStrHlDayCd() {
        return strHlDayCd;
    }
    public void setStrHlDayCd(String strHlDayCd) {
        this.strHlDayCd = strHlDayCd;
    }
    public String getStrHlDayYmd() {
        return strHlDayYmd;
    }
    public void setStrHlDayYmd(String strHlDayYmd) {
        this.strHlDayYmd = strHlDayYmd;
    }
    public String getStrVersion() {
        return strVersion;
    }
    public void setStrVersion(String strVersion) {
        this.strVersion = strVersion;
    }
}
