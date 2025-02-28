/**
* CodeMasterListItem.java
*
* Created on   : 2007-10-16
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-10-16   Mr Luis Lee	1.0          First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import java.io.Serializable;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author LuisLee
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchVesselWorkPlanParm  extends BaseBizParm implements Serializable {
	private String vslCallId;

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	
}
