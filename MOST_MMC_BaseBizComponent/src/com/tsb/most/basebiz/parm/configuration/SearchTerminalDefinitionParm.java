/**
* TerminalDefinitionParm.java
*
* Created on   : 2007-09-21
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	           REVISION    	
* 2007-09-21   Miss Nam-Sook Chang 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.parm.configuration;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author admin
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchTerminalDefinitionParm extends BaseBizParm {
    private String ptyCd;
    
    

    public String getPtyCd() {
        return ptyCd;
    }
    public void setPtyCd(String ptyCd) {
        this.ptyCd = ptyCd;
    }
}
