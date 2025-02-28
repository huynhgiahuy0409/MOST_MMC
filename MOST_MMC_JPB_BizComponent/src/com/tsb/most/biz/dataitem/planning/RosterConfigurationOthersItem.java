/**
* RosterSetupWHItemItem.java
*
* Created on   : 2007-11-14
* Target OS	: Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE		   AUTHOR	  	   REVISION		
* 2007-11-14 Mr Tonny Kim 1.0	First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

/**
* use RosterSetupWHItemItem Class as parameters to CUD 
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class RosterConfigurationOthersItem extends DataItem {

	private String engNm;
	private String empId;
	private String role;
	private String shftIndex;
	private String startDate;
	private String cdDate1;
	private String cdDate2;
	private String cdDate3;
	private String cdDate4;
	private String cdDate5;
	private String cdDate6;
	private String cdDate7;
	private String cdDate8;
	private String cdDate9;
	private String cdDate10;
	private String cdDate11;
	private String cdDate12;
	private String cdDate13;
	private String cdDate14;
	private String cdDate15;
	private String cdDate16;
	private String cdDate17;
	private String cdDate18;
	private String cdDate19;
	private String cdDate20;
	private String cdDate21;
	private String cdDate22;
	private String cdDate23;
	private String cdDate24;
	private String cdDate25;
	private String cdDate26;
	private String cdDate27;
	private String cdDate28;
	private String cdDate29;
	private String cdDate30;
	private String cdDate31;
	private String cdDate32;
	private String cdDate33;
	private String cdDate34;
	private String cdDate35;
	private String cdNmDate1;
	private String cdNmDate2;
	private String cdNmDate3;
	private String cdNmDate4;
	private String cdNmDate5;
	private String cdNmDate6;
	private String cdNmDate7;
	private String cdNmDate8;
	private String cdNmDate9;
	private String cdNmDate10;
	private String cdNmDate11;
	private String cdNmDate12;
	private String cdNmDate13;
	private String cdNmDate14;
	private String cdNmDate15;
	private String cdNmDate16;
	private String cdNmDate17;
	private String cdNmDate18;
	private String cdNmDate19;
	private String cdNmDate20;
	private String cdNmDate21;
	private String cdNmDate22;
	private String cdNmDate23;
	private String cdNmDate24;
	private String cdNmDate25;
	private String cdNmDate26;
	private String cdNmDate27;
	private String cdNmDate28;
	private String cdNmDate29;
	private String cdNmDate30;
	private String cdNmDate31;
	private String cdNmDate32;
	private String cdNmDate33;
	private String cdNmDate34;
	private String cdNmDate35;
	private String cdTpDate1;
	private String cdTpDate2;
	private String cdTpDate3;
	private String cdTpDate4;
	private String cdTpDate5;
	private String cdTpDate6;
	private String cdTpDate7;
	private String cdTpDate8;
	private String cdTpDate9;
	private String cdTpDate10;
	private String cdTpDate11;
	private String cdTpDate12;
	private String cdTpDate13;
	private String cdTpDate14;
	private String cdTpDate15;
	private String cdTpDate16;
	private String cdTpDate17;
	private String cdTpDate18;
	private String cdTpDate19;
	private String cdTpDate20;
	private String cdTpDate21;
	private String cdTpDate22;
	private String cdTpDate23;
	private String cdTpDate24;
	private String cdTpDate25;
	private String cdTpDate26;
	private String cdTpDate27;
	private String cdTpDate28;
	private String cdTpDate29;
	private String cdTpDate30;
	private String cdTpDate31;
	private String cdTpDate32;
	private String cdTpDate33;
	private String cdTpDate34;
	private String cdTpDate35;
	private String cdColor1;
	private String cdColor2;
	private String cdColor3;
	private String cdColor4;
	private String cdColor5;
	private String cdColor6;
	private String cdColor7;
	private String cdColor8;
	private String cdColor9;
	private String cdColor10;
	private String cdColor11;
	private String cdColor12;
	private String cdColor13;
	private String cdColor14;
	private String cdColor15;
	private String cdColor16;
	private String cdColor17;
	private String cdColor18;
	private String cdColor19;
	private String cdColor20;
	private String cdColor21;
	private String cdColor22;
	private String cdColor23;
	private String cdColor24;
	private String cdColor25;
	private String cdColor26;
	private String cdColor27;
	private String cdColor28;
	private String cdColor29;
	private String cdColor30;
	private String cdColor31;
	private String cdColor32;
	private String cdColor33;
	private String cdColor34;
	private String cdColor35;
	private String rstrYmd;
	private String deliUpdateCd;
	private String deliDeleteCd;
	private String statCdNm;
	private String workLocCdNm;
	private ArrayList<RosterConfigurationOthersItem> items;
	
    private String shftId;
    private String shftGrpCd;
    private int seq;
    private String rsnCd;
    private String shftDivCd;
	
    //staff management
	private String tuserId;
	private String tuserNm;
	private String grdCd;
	private String grdCdNm;
	private String statCd;
	private String proleCd;
	private String proleCdNm;
	private String roleCd;
	private String roleCdNm;
	private String workLocCd;
	private String conttDiv;
	private String conttDivNm;
	private String unitDiv;
	private String costCentCd;
	private String costCentNm;
	private String shftGroupNm;
	private String shftGroupCd;
	private String useYn;
	private String no;
	private String remark;
	private String chgItemYn;
	private String email;
    private String hiddenEmpId;
	
    //Shift Type
    private String shftTpCd;
    private String shftTpCdNm;
    private String rate;
    private String updDt;
    private String updBy;
    
    private List<Object> roleCodeList;
    private List<Object> workingLocCodeList;
    private List<Object> staffGradeCodeList;
    private List<Object> contractDivisionList;
    private List<Object> costCenterList;
    private List<Object> reasonCombo;
    private List<Object> unavailableLogForStaffList;
    private List<Object> internalStaffCombo;
    private List<Object> shiftTypeInfoCombo;
    
    public ArrayList<RosterConfigurationOthersItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<RosterConfigurationOthersItem> items) {
		this.items = items;
	}
	/**
     * @return Returns the cdColor1.
     */
    public String getCdColor1() {
        return cdColor1;
    }
    /**
     * @param cdColor1 The cdColor1 to set.
     */
    public void setCdColor1(String cdColor1) {
        this.cdColor1 = cdColor1;
    }
    /**
     * @return Returns the cdColor10.
     */
    public String getCdColor10() {
        return cdColor10;
    }
    /**
     * @param cdColor10 The cdColor10 to set.
     */
    public void setCdColor10(String cdColor10) {
        this.cdColor10 = cdColor10;
    }
    /**
     * @return Returns the cdColor11.
     */
    public String getCdColor11() {
        return cdColor11;
    }
    /**
     * @param cdColor11 The cdColor11 to set.
     */
    public void setCdColor11(String cdColor11) {
        this.cdColor11 = cdColor11;
    }
    /**
     * @return Returns the cdColor12.
     */
    public String getCdColor12() {
        return cdColor12;
    }
    /**
     * @param cdColor12 The cdColor12 to set.
     */
    public void setCdColor12(String cdColor12) {
        this.cdColor12 = cdColor12;
    }
    /**
     * @return Returns the cdColor13.
     */
    public String getCdColor13() {
        return cdColor13;
    }
    /**
     * @param cdColor13 The cdColor13 to set.
     */
    public void setCdColor13(String cdColor13) {
        this.cdColor13 = cdColor13;
    }
    /**
     * @return Returns the cdColor14.
     */
    public String getCdColor14() {
        return cdColor14;
    }
    /**
     * @param cdColor14 The cdColor14 to set.
     */
    public void setCdColor14(String cdColor14) {
        this.cdColor14 = cdColor14;
    }
    /**
     * @return Returns the cdColor15.
     */
    public String getCdColor15() {
        return cdColor15;
    }
    /**
     * @param cdColor15 The cdColor15 to set.
     */
    public void setCdColor15(String cdColor15) {
        this.cdColor15 = cdColor15;
    }
    /**
     * @return Returns the cdColor16.
     */
    public String getCdColor16() {
        return cdColor16;
    }
    /**
     * @param cdColor16 The cdColor16 to set.
     */
    public void setCdColor16(String cdColor16) {
        this.cdColor16 = cdColor16;
    }
    /**
     * @return Returns the cdColor17.
     */
    public String getCdColor17() {
        return cdColor17;
    }
    /**
     * @param cdColor17 The cdColor17 to set.
     */
    public void setCdColor17(String cdColor17) {
        this.cdColor17 = cdColor17;
    }
    /**
     * @return Returns the cdColor18.
     */
    public String getCdColor18() {
        return cdColor18;
    }
    /**
     * @param cdColor18 The cdColor18 to set.
     */
    public void setCdColor18(String cdColor18) {
        this.cdColor18 = cdColor18;
    }
    /**
     * @return Returns the cdColor19.
     */
    public String getCdColor19() {
        return cdColor19;
    }
    /**
     * @param cdColor19 The cdColor19 to set.
     */
    public void setCdColor19(String cdColor19) {
        this.cdColor19 = cdColor19;
    }
    /**
     * @return Returns the cdColor2.
     */
    public String getCdColor2() {
        return cdColor2;
    }
    /**
     * @param cdColor2 The cdColor2 to set.
     */
    public void setCdColor2(String cdColor2) {
        this.cdColor2 = cdColor2;
    }
    /**
     * @return Returns the cdColor20.
     */
    public String getCdColor20() {
        return cdColor20;
    }
    /**
     * @param cdColor20 The cdColor20 to set.
     */
    public void setCdColor20(String cdColor20) {
        this.cdColor20 = cdColor20;
    }
    /**
     * @return Returns the cdColor21.
     */
    public String getCdColor21() {
        return cdColor21;
    }
    /**
     * @param cdColor21 The cdColor21 to set.
     */
    public void setCdColor21(String cdColor21) {
        this.cdColor21 = cdColor21;
    }
    /**
     * @return Returns the cdColor22.
     */
    public String getCdColor22() {
        return cdColor22;
    }
    /**
     * @param cdColor22 The cdColor22 to set.
     */
    public void setCdColor22(String cdColor22) {
        this.cdColor22 = cdColor22;
    }
    /**
     * @return Returns the cdColor23.
     */
    public String getCdColor23() {
        return cdColor23;
    }
    /**
     * @param cdColor23 The cdColor23 to set.
     */
    public void setCdColor23(String cdColor23) {
        this.cdColor23 = cdColor23;
    }
    /**
     * @return Returns the cdColor24.
     */
    public String getCdColor24() {
        return cdColor24;
    }
    /**
     * @param cdColor24 The cdColor24 to set.
     */
    public void setCdColor24(String cdColor24) {
        this.cdColor24 = cdColor24;
    }
    /**
     * @return Returns the cdColor25.
     */
    public String getCdColor25() {
        return cdColor25;
    }
    /**
     * @param cdColor25 The cdColor25 to set.
     */
    public void setCdColor25(String cdColor25) {
        this.cdColor25 = cdColor25;
    }
    /**
     * @return Returns the cdColor26.
     */
    public String getCdColor26() {
        return cdColor26;
    }
    /**
     * @param cdColor26 The cdColor26 to set.
     */
    public void setCdColor26(String cdColor26) {
        this.cdColor26 = cdColor26;
    }
    /**
     * @return Returns the cdColor27.
     */
    public String getCdColor27() {
        return cdColor27;
    }
    /**
     * @param cdColor27 The cdColor27 to set.
     */
    public void setCdColor27(String cdColor27) {
        this.cdColor27 = cdColor27;
    }
    /**
     * @return Returns the cdColor28.
     */
    public String getCdColor28() {
        return cdColor28;
    }
    /**
     * @param cdColor28 The cdColor28 to set.
     */
    public void setCdColor28(String cdColor28) {
        this.cdColor28 = cdColor28;
    }
    /**
     * @return Returns the cdColor3.
     */
    public String getCdColor3() {
        return cdColor3;
    }
    /**
     * @param cdColor3 The cdColor3 to set.
     */
    public void setCdColor3(String cdColor3) {
        this.cdColor3 = cdColor3;
    }
    /**
     * @return Returns the cdColor4.
     */
    public String getCdColor4() {
        return cdColor4;
    }
    /**
     * @param cdColor4 The cdColor4 to set.
     */
    public void setCdColor4(String cdColor4) {
        this.cdColor4 = cdColor4;
    }
    /**
     * @return Returns the cdColor5.
     */
    public String getCdColor5() {
        return cdColor5;
    }
    /**
     * @param cdColor5 The cdColor5 to set.
     */
    public void setCdColor5(String cdColor5) {
        this.cdColor5 = cdColor5;
    }
    /**
     * @return Returns the cdColor6.
     */
    public String getCdColor6() {
        return cdColor6;
    }
    /**
     * @param cdColor6 The cdColor6 to set.
     */
    public void setCdColor6(String cdColor6) {
        this.cdColor6 = cdColor6;
    }
    /**
     * @return Returns the cdColor7.
     */
    public String getCdColor7() {
        return cdColor7;
    }
    /**
     * @param cdColor7 The cdColor7 to set.
     */
    public void setCdColor7(String cdColor7) {
        this.cdColor7 = cdColor7;
    }
    /**
     * @return Returns the cdColor8.
     */
    public String getCdColor8() {
        return cdColor8;
    }
    /**
     * @param cdColor8 The cdColor8 to set.
     */
    public void setCdColor8(String cdColor8) {
        this.cdColor8 = cdColor8;
    }
    /**
     * @return Returns the cdColor9.
     */
    public String getCdColor9() {
        return cdColor9;
    }
    /**
     * @param cdColor9 The cdColor9 to set.
     */
    public void setCdColor9(String cdColor9) {
        this.cdColor9 = cdColor9;
    }
	/**
	 * @return Returns the cdDate1.
	 */
	public String getCdDate1() {
		return cdDate1;
	}
	/**
	 * @param cdDate1 The cdDate1 to set.
	 */
	public void setCdDate1(String cdDate1) {
		this.cdDate1 = cdDate1;
	}
	/**
	 * @return Returns the cdDate10.
	 */
	public String getCdDate10() {
		return cdDate10;
	}
	/**
	 * @param cdDate10 The cdDate10 to set.
	 */
	public void setCdDate10(String cdDate10) {
		this.cdDate10 = cdDate10;
	}
	/**
	 * @return Returns the cdDate11.
	 */
	public String getCdDate11() {
		return cdDate11;
	}
	/**
	 * @param cdDate11 The cdDate11 to set.
	 */
	public void setCdDate11(String cdDate11) {
		this.cdDate11 = cdDate11;
	}
	/**
	 * @return Returns the cdDate12.
	 */
	public String getCdDate12() {
		return cdDate12;
	}
	/**
	 * @param cdDate12 The cdDate12 to set.
	 */
	public void setCdDate12(String cdDate12) {
		this.cdDate12 = cdDate12;
	}
	/**
	 * @return Returns the cdDate13.
	 */
	public String getCdDate13() {
		return cdDate13;
	}
	/**
	 * @param cdDate13 The cdDate13 to set.
	 */
	public void setCdDate13(String cdDate13) {
		this.cdDate13 = cdDate13;
	}
	/**
	 * @return Returns the cdDate14.
	 */
	public String getCdDate14() {
		return cdDate14;
	}
	/**
	 * @param cdDate14 The cdDate14 to set.
	 */
	public void setCdDate14(String cdDate14) {
		this.cdDate14 = cdDate14;
	}
	/**
	 * @return Returns the cdDate15.
	 */
	public String getCdDate15() {
		return cdDate15;
	}
	/**
	 * @param cdDate15 The cdDate15 to set.
	 */
	public void setCdDate15(String cdDate15) {
		this.cdDate15 = cdDate15;
	}
	/**
	 * @return Returns the cdDate16.
	 */
	public String getCdDate16() {
		return cdDate16;
	}
	/**
	 * @param cdDate16 The cdDate16 to set.
	 */
	public void setCdDate16(String cdDate16) {
		this.cdDate16 = cdDate16;
	}
	/**
	 * @return Returns the cdDate17.
	 */
	public String getCdDate17() {
		return cdDate17;
	}
	/**
	 * @param cdDate17 The cdDate17 to set.
	 */
	public void setCdDate17(String cdDate17) {
		this.cdDate17 = cdDate17;
	}
	/**
	 * @return Returns the cdDate18.
	 */
	public String getCdDate18() {
		return cdDate18;
	}
	/**
	 * @param cdDate18 The cdDate18 to set.
	 */
	public void setCdDate18(String cdDate18) {
		this.cdDate18 = cdDate18;
	}
	/**
	 * @return Returns the cdDate19.
	 */
	public String getCdDate19() {
		return cdDate19;
	}
	/**
	 * @param cdDate19 The cdDate19 to set.
	 */
	public void setCdDate19(String cdDate19) {
		this.cdDate19 = cdDate19;
	}
	/**
	 * @return Returns the cdDate2.
	 */
	public String getCdDate2() {
		return cdDate2;
	}
	/**
	 * @param cdDate2 The cdDate2 to set.
	 */
	public void setCdDate2(String cdDate2) {
		this.cdDate2 = cdDate2;
	}
	/**
	 * @return Returns the cdDate20.
	 */
	public String getCdDate20() {
		return cdDate20;
	}
	/**
	 * @param cdDate20 The cdDate20 to set.
	 */
	public void setCdDate20(String cdDate20) {
		this.cdDate20 = cdDate20;
	}
	/**
	 * @return Returns the cdDate21.
	 */
	public String getCdDate21() {
		return cdDate21;
	}
	/**
	 * @param cdDate21 The cdDate21 to set.
	 */
	public void setCdDate21(String cdDate21) {
		this.cdDate21 = cdDate21;
	}
	/**
	 * @return Returns the cdDate22.
	 */
	public String getCdDate22() {
		return cdDate22;
	}
	/**
	 * @param cdDate22 The cdDate22 to set.
	 */
	public void setCdDate22(String cdDate22) {
		this.cdDate22 = cdDate22;
	}
	/**
	 * @return Returns the cdDate23.
	 */
	public String getCdDate23() {
		return cdDate23;
	}
	/**
	 * @param cdDate23 The cdDate23 to set.
	 */
	public void setCdDate23(String cdDate23) {
		this.cdDate23 = cdDate23;
	}
	/**
	 * @return Returns the cdDate24.
	 */
	public String getCdDate24() {
		return cdDate24;
	}
	/**
	 * @param cdDate24 The cdDate24 to set.
	 */
	public void setCdDate24(String cdDate24) {
		this.cdDate24 = cdDate24;
	}
	/**
	 * @return Returns the cdDate25.
	 */
	public String getCdDate25() {
		return cdDate25;
	}
	/**
	 * @param cdDate25 The cdDate25 to set.
	 */
	public void setCdDate25(String cdDate25) {
		this.cdDate25 = cdDate25;
	}
	/**
	 * @return Returns the cdDate26.
	 */
	public String getCdDate26() {
		return cdDate26;
	}
	/**
	 * @param cdDate26 The cdDate26 to set.
	 */
	public void setCdDate26(String cdDate26) {
		this.cdDate26 = cdDate26;
	}
	/**
	 * @return Returns the cdDate27.
	 */
	public String getCdDate27() {
		return cdDate27;
	}
	/**
	 * @param cdDate27 The cdDate27 to set.
	 */
	public void setCdDate27(String cdDate27) {
		this.cdDate27 = cdDate27;
	}
	/**
	 * @return Returns the cdDate28.
	 */
	public String getCdDate28() {
		return cdDate28;
	}
	/**
	 * @param cdDate28 The cdDate28 to set.
	 */
	public void setCdDate28(String cdDate28) {
		this.cdDate28 = cdDate28;
	}
	/**
	 * @return Returns the cdDate3.
	 */
	public String getCdDate3() {
		return cdDate3;
	}
	/**
	 * @param cdDate3 The cdDate3 to set.
	 */
	public void setCdDate3(String cdDate3) {
		this.cdDate3 = cdDate3;
	}
	/**
	 * @return Returns the cdDate4.
	 */
	public String getCdDate4() {
		return cdDate4;
	}
	/**
	 * @param cdDate4 The cdDate4 to set.
	 */
	public void setCdDate4(String cdDate4) {
		this.cdDate4 = cdDate4;
	}
	/**
	 * @return Returns the cdDate5.
	 */
	public String getCdDate5() {
		return cdDate5;
	}
	/**
	 * @param cdDate5 The cdDate5 to set.
	 */
	public void setCdDate5(String cdDate5) {
		this.cdDate5 = cdDate5;
	}
	/**
	 * @return Returns the cdDate6.
	 */
	public String getCdDate6() {
		return cdDate6;
	}
	/**
	 * @param cdDate6 The cdDate6 to set.
	 */
	public void setCdDate6(String cdDate6) {
		this.cdDate6 = cdDate6;
	}
	/**
	 * @return Returns the cdDate7.
	 */
	public String getCdDate7() {
		return cdDate7;
	}
	/**
	 * @param cdDate7 The cdDate7 to set.
	 */
	public void setCdDate7(String cdDate7) {
		this.cdDate7 = cdDate7;
	}
	/**
	 * @return Returns the cdDate8.
	 */
	public String getCdDate8() {
		return cdDate8;
	}
	/**
	 * @param cdDate8 The cdDate8 to set.
	 */
	public void setCdDate8(String cdDate8) {
		this.cdDate8 = cdDate8;
	}
	/**
	 * @return Returns the cdDate9.
	 */
	public String getCdDate9() {
		return cdDate9;
	}
	/**
	 * @param cdDate9 The cdDate9 to set.
	 */
	public void setCdDate9(String cdDate9) {
		this.cdDate9 = cdDate9;
	}
	/**
	 * @return Returns the cdNmDate1.
	 */
	public String getCdNmDate1() {
		return cdNmDate1;
	}
	/**
	 * @param cdNmDate1 The cdNmDate1 to set.
	 */
	public void setCdNmDate1(String cdNmDate1) {
		this.cdNmDate1 = cdNmDate1;
	}
	/**
	 * @return Returns the cdNmDate10.
	 */
	public String getCdNmDate10() {
		return cdNmDate10;
	}
	/**
	 * @param cdNmDate10 The cdNmDate10 to set.
	 */
	public void setCdNmDate10(String cdNmDate10) {
		this.cdNmDate10 = cdNmDate10;
	}
	/**
	 * @return Returns the cdNmDate11.
	 */
	public String getCdNmDate11() {
		return cdNmDate11;
	}
	/**
	 * @param cdNmDate11 The cdNmDate11 to set.
	 */
	public void setCdNmDate11(String cdNmDate11) {
		this.cdNmDate11 = cdNmDate11;
	}
	/**
	 * @return Returns the cdNmDate12.
	 */
	public String getCdNmDate12() {
		return cdNmDate12;
	}
	/**
	 * @param cdNmDate12 The cdNmDate12 to set.
	 */
	public void setCdNmDate12(String cdNmDate12) {
		this.cdNmDate12 = cdNmDate12;
	}
	/**
	 * @return Returns the cdNmDate13.
	 */
	public String getCdNmDate13() {
		return cdNmDate13;
	}
	/**
	 * @param cdNmDate13 The cdNmDate13 to set.
	 */
	public void setCdNmDate13(String cdNmDate13) {
		this.cdNmDate13 = cdNmDate13;
	}
	/**
	 * @return Returns the cdNmDate14.
	 */
	public String getCdNmDate14() {
		return cdNmDate14;
	}
	/**
	 * @param cdNmDate14 The cdNmDate14 to set.
	 */
	public void setCdNmDate14(String cdNmDate14) {
		this.cdNmDate14 = cdNmDate14;
	}
	/**
	 * @return Returns the cdNmDate15.
	 */
	public String getCdNmDate15() {
		return cdNmDate15;
	}
	/**
	 * @param cdNmDate15 The cdNmDate15 to set.
	 */
	public void setCdNmDate15(String cdNmDate15) {
		this.cdNmDate15 = cdNmDate15;
	}
	/**
	 * @return Returns the cdNmDate16.
	 */
	public String getCdNmDate16() {
		return cdNmDate16;
	}
	/**
	 * @param cdNmDate16 The cdNmDate16 to set.
	 */
	public void setCdNmDate16(String cdNmDate16) {
		this.cdNmDate16 = cdNmDate16;
	}
	/**
	 * @return Returns the cdNmDate17.
	 */
	public String getCdNmDate17() {
		return cdNmDate17;
	}
	/**
	 * @param cdNmDate17 The cdNmDate17 to set.
	 */
	public void setCdNmDate17(String cdNmDate17) {
		this.cdNmDate17 = cdNmDate17;
	}
	/**
	 * @return Returns the cdNmDate18.
	 */
	public String getCdNmDate18() {
		return cdNmDate18;
	}
	/**
	 * @param cdNmDate18 The cdNmDate18 to set.
	 */
	public void setCdNmDate18(String cdNmDate18) {
		this.cdNmDate18 = cdNmDate18;
	}
	/**
	 * @return Returns the cdNmDate19.
	 */
	public String getCdNmDate19() {
		return cdNmDate19;
	}
	/**
	 * @param cdNmDate19 The cdNmDate19 to set.
	 */
	public void setCdNmDate19(String cdNmDate19) {
		this.cdNmDate19 = cdNmDate19;
	}
	/**
	 * @return Returns the cdNmDate2.
	 */
	public String getCdNmDate2() {
		return cdNmDate2;
	}
	/**
	 * @param cdNmDate2 The cdNmDate2 to set.
	 */
	public void setCdNmDate2(String cdNmDate2) {
		this.cdNmDate2 = cdNmDate2;
	}
	/**
	 * @return Returns the cdNmDate20.
	 */
	public String getCdNmDate20() {
		return cdNmDate20;
	}
	/**
	 * @param cdNmDate20 The cdNmDate20 to set.
	 */
	public void setCdNmDate20(String cdNmDate20) {
		this.cdNmDate20 = cdNmDate20;
	}
	/**
	 * @return Returns the cdNmDate21.
	 */
	public String getCdNmDate21() {
		return cdNmDate21;
	}
	/**
	 * @param cdNmDate21 The cdNmDate21 to set.
	 */
	public void setCdNmDate21(String cdNmDate21) {
		this.cdNmDate21 = cdNmDate21;
	}
	/**
	 * @return Returns the cdNmDate22.
	 */
	public String getCdNmDate22() {
		return cdNmDate22;
	}
	/**
	 * @param cdNmDate22 The cdNmDate22 to set.
	 */
	public void setCdNmDate22(String cdNmDate22) {
		this.cdNmDate22 = cdNmDate22;
	}
	/**
	 * @return Returns the cdNmDate23.
	 */
	public String getCdNmDate23() {
		return cdNmDate23;
	}
	/**
	 * @param cdNmDate23 The cdNmDate23 to set.
	 */
	public void setCdNmDate23(String cdNmDate23) {
		this.cdNmDate23 = cdNmDate23;
	}
	/**
	 * @return Returns the cdNmDate24.
	 */
	public String getCdNmDate24() {
		return cdNmDate24;
	}
	/**
	 * @param cdNmDate24 The cdNmDate24 to set.
	 */
	public void setCdNmDate24(String cdNmDate24) {
		this.cdNmDate24 = cdNmDate24;
	}
	/**
	 * @return Returns the cdNmDate25.
	 */
	public String getCdNmDate25() {
		return cdNmDate25;
	}
	/**
	 * @param cdNmDate25 The cdNmDate25 to set.
	 */
	public void setCdNmDate25(String cdNmDate25) {
		this.cdNmDate25 = cdNmDate25;
	}
	/**
	 * @return Returns the cdNmDate26.
	 */
	public String getCdNmDate26() {
		return cdNmDate26;
	}
	/**
	 * @param cdNmDate26 The cdNmDate26 to set.
	 */
	public void setCdNmDate26(String cdNmDate26) {
		this.cdNmDate26 = cdNmDate26;
	}
	/**
	 * @return Returns the cdNmDate27.
	 */
	public String getCdNmDate27() {
		return cdNmDate27;
	}
	/**
	 * @param cdNmDate27 The cdNmDate27 to set.
	 */
	public void setCdNmDate27(String cdNmDate27) {
		this.cdNmDate27 = cdNmDate27;
	}
	/**
	 * @return Returns the cdNmDate28.
	 */
	public String getCdNmDate28() {
		return cdNmDate28;
	}
	/**
	 * @param cdNmDate28 The cdNmDate28 to set.
	 */
	public void setCdNmDate28(String cdNmDate28) {
		this.cdNmDate28 = cdNmDate28;
	}
	/**
	 * @return Returns the cdNmDate3.
	 */
	public String getCdNmDate3() {
		return cdNmDate3;
	}
	/**
	 * @param cdNmDate3 The cdNmDate3 to set.
	 */
	public void setCdNmDate3(String cdNmDate3) {
		this.cdNmDate3 = cdNmDate3;
	}
	/**
	 * @return Returns the cdNmDate4.
	 */
	public String getCdNmDate4() {
		return cdNmDate4;
	}
	/**
	 * @param cdNmDate4 The cdNmDate4 to set.
	 */
	public void setCdNmDate4(String cdNmDate4) {
		this.cdNmDate4 = cdNmDate4;
	}
	/**
	 * @return Returns the cdNmDate5.
	 */
	public String getCdNmDate5() {
		return cdNmDate5;
	}
	/**
	 * @param cdNmDate5 The cdNmDate5 to set.
	 */
	public void setCdNmDate5(String cdNmDate5) {
		this.cdNmDate5 = cdNmDate5;
	}
	/**
	 * @return Returns the cdNmDate6.
	 */
	public String getCdNmDate6() {
		return cdNmDate6;
	}
	/**
	 * @param cdNmDate6 The cdNmDate6 to set.
	 */
	public void setCdNmDate6(String cdNmDate6) {
		this.cdNmDate6 = cdNmDate6;
	}
	/**
	 * @return Returns the cdNmDate7.
	 */
	public String getCdNmDate7() {
		return cdNmDate7;
	}
	/**
	 * @param cdNmDate7 The cdNmDate7 to set.
	 */
	public void setCdNmDate7(String cdNmDate7) {
		this.cdNmDate7 = cdNmDate7;
	}
	/**
	 * @return Returns the cdNmDate8.
	 */
	public String getCdNmDate8() {
		return cdNmDate8;
	}
	/**
	 * @param cdNmDate8 The cdNmDate8 to set.
	 */
	public void setCdNmDate8(String cdNmDate8) {
		this.cdNmDate8 = cdNmDate8;
	}
	/**
	 * @return Returns the cdNmDate9.
	 */
	public String getCdNmDate9() {
		return cdNmDate9;
	}
	/**
	 * @param cdNmDate9 The cdNmDate9 to set.
	 */
	public void setCdNmDate9(String cdNmDate9) {
		this.cdNmDate9 = cdNmDate9;
	}
	/**
	 * @return Returns the cdTpDate1.
	 */
	public String getCdTpDate1() {
		return cdTpDate1;
	}
	/**
	 * @param cdTpDate1 The cdTpDate1 to set.
	 */
	public void setCdTpDate1(String cdTpDate1) {
		this.cdTpDate1 = cdTpDate1;
	}
	/**
	 * @return Returns the cdTpDate10.
	 */
	public String getCdTpDate10() {
		return cdTpDate10;
	}
	/**
	 * @param cdTpDate10 The cdTpDate10 to set.
	 */
	public void setCdTpDate10(String cdTpDate10) {
		this.cdTpDate10 = cdTpDate10;
	}
	/**
	 * @return Returns the cdTpDate11.
	 */
	public String getCdTpDate11() {
		return cdTpDate11;
	}
	/**
	 * @param cdTpDate11 The cdTpDate11 to set.
	 */
	public void setCdTpDate11(String cdTpDate11) {
		this.cdTpDate11 = cdTpDate11;
	}
	/**
	 * @return Returns the cdTpDate12.
	 */
	public String getCdTpDate12() {
		return cdTpDate12;
	}
	/**
	 * @param cdTpDate12 The cdTpDate12 to set.
	 */
	public void setCdTpDate12(String cdTpDate12) {
		this.cdTpDate12 = cdTpDate12;
	}
	/**
	 * @return Returns the cdTpDate13.
	 */
	public String getCdTpDate13() {
		return cdTpDate13;
	}
	/**
	 * @param cdTpDate13 The cdTpDate13 to set.
	 */
	public void setCdTpDate13(String cdTpDate13) {
		this.cdTpDate13 = cdTpDate13;
	}
	/**
	 * @return Returns the cdTpDate14.
	 */
	public String getCdTpDate14() {
		return cdTpDate14;
	}
	/**
	 * @param cdTpDate14 The cdTpDate14 to set.
	 */
	public void setCdTpDate14(String cdTpDate14) {
		this.cdTpDate14 = cdTpDate14;
	}
	/**
	 * @return Returns the cdTpDate15.
	 */
	public String getCdTpDate15() {
		return cdTpDate15;
	}
	/**
	 * @param cdTpDate15 The cdTpDate15 to set.
	 */
	public void setCdTpDate15(String cdTpDate15) {
		this.cdTpDate15 = cdTpDate15;
	}
	/**
	 * @return Returns the cdTpDate16.
	 */
	public String getCdTpDate16() {
		return cdTpDate16;
	}
	/**
	 * @param cdTpDate16 The cdTpDate16 to set.
	 */
	public void setCdTpDate16(String cdTpDate16) {
		this.cdTpDate16 = cdTpDate16;
	}
	/**
	 * @return Returns the cdTpDate17.
	 */
	public String getCdTpDate17() {
		return cdTpDate17;
	}
	/**
	 * @param cdTpDate17 The cdTpDate17 to set.
	 */
	public void setCdTpDate17(String cdTpDate17) {
		this.cdTpDate17 = cdTpDate17;
	}
	/**
	 * @return Returns the cdTpDate18.
	 */
	public String getCdTpDate18() {
		return cdTpDate18;
	}
	/**
	 * @param cdTpDate18 The cdTpDate18 to set.
	 */
	public void setCdTpDate18(String cdTpDate18) {
		this.cdTpDate18 = cdTpDate18;
	}
	/**
	 * @return Returns the cdTpDate19.
	 */
	public String getCdTpDate19() {
		return cdTpDate19;
	}
	/**
	 * @param cdTpDate19 The cdTpDate19 to set.
	 */
	public void setCdTpDate19(String cdTpDate19) {
		this.cdTpDate19 = cdTpDate19;
	}
	/**
	 * @return Returns the cdTpDate2.
	 */
	public String getCdTpDate2() {
		return cdTpDate2;
	}
	/**
	 * @param cdTpDate2 The cdTpDate2 to set.
	 */
	public void setCdTpDate2(String cdTpDate2) {
		this.cdTpDate2 = cdTpDate2;
	}
	/**
	 * @return Returns the cdTpDate20.
	 */
	public String getCdTpDate20() {
		return cdTpDate20;
	}
	/**
	 * @param cdTpDate20 The cdTpDate20 to set.
	 */
	public void setCdTpDate20(String cdTpDate20) {
		this.cdTpDate20 = cdTpDate20;
	}
	/**
	 * @return Returns the cdTpDate21.
	 */
	public String getCdTpDate21() {
		return cdTpDate21;
	}
	/**
	 * @param cdTpDate21 The cdTpDate21 to set.
	 */
	public void setCdTpDate21(String cdTpDate21) {
		this.cdTpDate21 = cdTpDate21;
	}
	/**
	 * @return Returns the cdTpDate22.
	 */
	public String getCdTpDate22() {
		return cdTpDate22;
	}
	/**
	 * @param cdTpDate22 The cdTpDate22 to set.
	 */
	public void setCdTpDate22(String cdTpDate22) {
		this.cdTpDate22 = cdTpDate22;
	}
	/**
	 * @return Returns the cdTpDate23.
	 */
	public String getCdTpDate23() {
		return cdTpDate23;
	}
	/**
	 * @param cdTpDate23 The cdTpDate23 to set.
	 */
	public void setCdTpDate23(String cdTpDate23) {
		this.cdTpDate23 = cdTpDate23;
	}
	/**
	 * @return Returns the cdTpDate24.
	 */
	public String getCdTpDate24() {
		return cdTpDate24;
	}
	/**
	 * @param cdTpDate24 The cdTpDate24 to set.
	 */
	public void setCdTpDate24(String cdTpDate24) {
		this.cdTpDate24 = cdTpDate24;
	}
	/**
	 * @return Returns the cdTpDate25.
	 */
	public String getCdTpDate25() {
		return cdTpDate25;
	}
	/**
	 * @param cdTpDate25 The cdTpDate25 to set.
	 */
	public void setCdTpDate25(String cdTpDate25) {
		this.cdTpDate25 = cdTpDate25;
	}
	/**
	 * @return Returns the cdTpDate26.
	 */
	public String getCdTpDate26() {
		return cdTpDate26;
	}
	/**
	 * @param cdTpDate26 The cdTpDate26 to set.
	 */
	public void setCdTpDate26(String cdTpDate26) {
		this.cdTpDate26 = cdTpDate26;
	}
	/**
	 * @return Returns the cdTpDate27.
	 */
	public String getCdTpDate27() {
		return cdTpDate27;
	}
	/**
	 * @param cdTpDate27 The cdTpDate27 to set.
	 */
	public void setCdTpDate27(String cdTpDate27) {
		this.cdTpDate27 = cdTpDate27;
	}
	/**
	 * @return Returns the cdTpDate28.
	 */
	public String getCdTpDate28() {
		return cdTpDate28;
	}
	/**
	 * @param cdTpDate28 The cdTpDate28 to set.
	 */
	public void setCdTpDate28(String cdTpDate28) {
		this.cdTpDate28 = cdTpDate28;
	}
	/**
	 * @return Returns the cdTpDate3.
	 */
	public String getCdTpDate3() {
		return cdTpDate3;
	}
	/**
	 * @param cdTpDate3 The cdTpDate3 to set.
	 */
	public void setCdTpDate3(String cdTpDate3) {
		this.cdTpDate3 = cdTpDate3;
	}
	/**
	 * @return Returns the cdTpDate4.
	 */
	public String getCdTpDate4() {
		return cdTpDate4;
	}
	/**
	 * @param cdTpDate4 The cdTpDate4 to set.
	 */
	public void setCdTpDate4(String cdTpDate4) {
		this.cdTpDate4 = cdTpDate4;
	}
	/**
	 * @return Returns the cdTpDate5.
	 */
	public String getCdTpDate5() {
		return cdTpDate5;
	}
	/**
	 * @param cdTpDate5 The cdTpDate5 to set.
	 */
	public void setCdTpDate5(String cdTpDate5) {
		this.cdTpDate5 = cdTpDate5;
	}
	/**
	 * @return Returns the cdTpDate6.
	 */
	public String getCdTpDate6() {
		return cdTpDate6;
	}
	/**
	 * @param cdTpDate6 The cdTpDate6 to set.
	 */
	public void setCdTpDate6(String cdTpDate6) {
		this.cdTpDate6 = cdTpDate6;
	}
	/**
	 * @return Returns the cdTpDate7.
	 */
	public String getCdTpDate7() {
		return cdTpDate7;
	}
	/**
	 * @param cdTpDate7 The cdTpDate7 to set.
	 */
	public void setCdTpDate7(String cdTpDate7) {
		this.cdTpDate7 = cdTpDate7;
	}
	/**
	 * @return Returns the cdTpDate8.
	 */
	public String getCdTpDate8() {
		return cdTpDate8;
	}
	/**
	 * @param cdTpDate8 The cdTpDate8 to set.
	 */
	public void setCdTpDate8(String cdTpDate8) {
		this.cdTpDate8 = cdTpDate8;
	}
	/**
	 * @return Returns the cdTpDate9.
	 */
	public String getCdTpDate9() {
		return cdTpDate9;
	}
	/**
	 * @param cdTpDate9 The cdTpDate9 to set.
	 */
	public void setCdTpDate9(String cdTpDate9) {
		this.cdTpDate9 = cdTpDate9;
	}
	/**
	 * @return Returns the deliDeleteCd.
	 */
	public String getDeliDeleteCd() {
		return deliDeleteCd;
	}
	/**
	 * @param deliDeleteCd The deliDeleteCd to set.
	 */
	public void setDeliDeleteCd(String deliDeleteCd) {
		this.deliDeleteCd = deliDeleteCd;
	}
	/**
	 * @return Returns the deliUpdateCd.
	 */
	public String getDeliUpdateCd() {
		return deliUpdateCd;
	}
	/**
	 * @param deliUpdateCd The deliUpdateCd to set.
	 */
	public void setDeliUpdateCd(String deliUpdateCd) {
		this.deliUpdateCd = deliUpdateCd;
	}
	/**
	 * @return Returns the empId.
	 */
	public String getEmpId() {
		return empId;
	}
	/**
	 * @param empId The empId to set.
	 */
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	/**
	 * @return Returns the engNm.
	 */
	public String getEngNm() {
		return engNm;
	}
	/**
	 * @param engNm The engNm to set.
	 */
	public void setEngNm(String engNm) {
		this.engNm = engNm;
	}
	/**
	 * @return Returns the rstrYmd.
	 */
	public String getRstrYmd() {
		return rstrYmd;
	}
	/**
	 * @param rstrYmd The rstrYmd to set.
	 */
	public void setRstrYmd(String rstrYmd) {
		this.rstrYmd = rstrYmd;
	}
	/**
	 * @return Returns the startDate.
	 */
	public String getStartDate() {
		return startDate;
	}
	/**
	 * @param startDate The startDate to set.
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	/**
	 * @return Returns the statCdNm.
	 */
	public String getStatCdNm() {
		return statCdNm;
	}
	/**
	 * @param statCdNm The statCdNm to set.
	 */
	public void setStatCdNm(String statCdNm) {
		this.statCdNm = statCdNm;
	}
	/**
	 * @return Returns the workLocCdNm.
	 */
	public String getWorkLocCdNm() {
		return workLocCdNm;
	}
	/**
	 * @param workLocCdNm The workLocCdNm to set.
	 */
	public void setWorkLocCdNm(String workLocCdNm) {
		this.workLocCdNm = workLocCdNm;
	}
    /**
     * @return Returns the role.
     */
    public String getRole() {
        return role;
    }
    /**
     * @param role The role to set.
     */
    public void setRole(String role) {
        this.role = role;
    }
    /**
     * @return Returns the shftIndex.
     */
    public String getShftIndex() {
        return shftIndex;
    }
    /**
     * @param shftIndex The shftIndex to set.
     */
    public void setShftIndex(String shftIndex) {
        this.shftIndex = shftIndex;
    }
	public String getCdDate29() {
		return cdDate29;
	}
	public void setCdDate29(String cdDate29) {
		this.cdDate29 = cdDate29;
	}
	public String getCdDate30() {
		return cdDate30;
	}
	public void setCdDate30(String cdDate30) {
		this.cdDate30 = cdDate30;
	}
	public String getCdDate31() {
		return cdDate31;
	}
	public void setCdDate31(String cdDate31) {
		this.cdDate31 = cdDate31;
	}
	public String getCdDate32() {
		return cdDate32;
	}
	public void setCdDate32(String cdDate32) {
		this.cdDate32 = cdDate32;
	}
	public String getCdDate33() {
		return cdDate33;
	}
	public void setCdDate33(String cdDate33) {
		this.cdDate33 = cdDate33;
	}
	public String getCdDate34() {
		return cdDate34;
	}
	public void setCdDate34(String cdDate34) {
		this.cdDate34 = cdDate34;
	}
	public String getCdDate35() {
		return cdDate35;
	}
	public void setCdDate35(String cdDate35) {
		this.cdDate35 = cdDate35;
	}
	public String getCdNmDate29() {
		return cdNmDate29;
	}
	public void setCdNmDate29(String cdNmDate29) {
		this.cdNmDate29 = cdNmDate29;
	}
	public String getCdNmDate30() {
		return cdNmDate30;
	}
	public void setCdNmDate30(String cdNmDate30) {
		this.cdNmDate30 = cdNmDate30;
	}
	public String getCdNmDate31() {
		return cdNmDate31;
	}
	public void setCdNmDate31(String cdNmDate31) {
		this.cdNmDate31 = cdNmDate31;
	}
	public String getCdNmDate32() {
		return cdNmDate32;
	}
	public void setCdNmDate32(String cdNmDate32) {
		this.cdNmDate32 = cdNmDate32;
	}
	public String getCdNmDate33() {
		return cdNmDate33;
	}
	public void setCdNmDate33(String cdNmDate33) {
		this.cdNmDate33 = cdNmDate33;
	}
	public String getCdNmDate34() {
		return cdNmDate34;
	}
	public void setCdNmDate34(String cdNmDate34) {
		this.cdNmDate34 = cdNmDate34;
	}
	public String getCdNmDate35() {
		return cdNmDate35;
	}
	public void setCdNmDate35(String cdNmDate35) {
		this.cdNmDate35 = cdNmDate35;
	}
	public String getCdTpDate29() {
		return cdTpDate29;
	}
	public void setCdTpDate29(String cdTpDate29) {
		this.cdTpDate29 = cdTpDate29;
	}
	public String getCdTpDate30() {
		return cdTpDate30;
	}
	public void setCdTpDate30(String cdTpDate30) {
		this.cdTpDate30 = cdTpDate30;
	}
	public String getCdTpDate31() {
		return cdTpDate31;
	}
	public void setCdTpDate31(String cdTpDate31) {
		this.cdTpDate31 = cdTpDate31;
	}
	public String getCdTpDate32() {
		return cdTpDate32;
	}
	public void setCdTpDate32(String cdTpDate32) {
		this.cdTpDate32 = cdTpDate32;
	}
	public String getCdTpDate33() {
		return cdTpDate33;
	}
	public void setCdTpDate33(String cdTpDate33) {
		this.cdTpDate33 = cdTpDate33;
	}
	public String getCdTpDate34() {
		return cdTpDate34;
	}
	public void setCdTpDate34(String cdTpDate34) {
		this.cdTpDate34 = cdTpDate34;
	}
	public String getCdTpDate35() {
		return cdTpDate35;
	}
	public void setCdTpDate35(String cdTpDate35) {
		this.cdTpDate35 = cdTpDate35;
	}
	public String getCdColor29() {
		return cdColor29;
	}
	public void setCdColor29(String cdColor29) {
		this.cdColor29 = cdColor29;
	}
	public String getCdColor30() {
		return cdColor30;
	}
	public void setCdColor30(String cdColor30) {
		this.cdColor30 = cdColor30;
	}
	public String getCdColor31() {
		return cdColor31;
	}
	public void setCdColor31(String cdColor31) {
		this.cdColor31 = cdColor31;
	}
	public String getCdColor32() {
		return cdColor32;
	}
	public void setCdColor32(String cdColor32) {
		this.cdColor32 = cdColor32;
	}
	public String getCdColor33() {
		return cdColor33;
	}
	public void setCdColor33(String cdColor33) {
		this.cdColor33 = cdColor33;
	}
	public String getCdColor34() {
		return cdColor34;
	}
	public void setCdColor34(String cdColor34) {
		this.cdColor34 = cdColor34;
	}
	public String getCdColor35() {
		return cdColor35;
	}
	public void setCdColor35(String cdColor35) {
		this.cdColor35 = cdColor35;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getShftGrpCd() {
		return shftGrpCd;
	}
	public void setShftGrpCd(String shftGrpCd) {
		this.shftGrpCd = shftGrpCd;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getRsnCd() {
		return rsnCd;
	}
	public void setRsnCd(String rsnCd) {
		this.rsnCd = rsnCd;
	}
	public String getShftDivCd() {
		return shftDivCd;
	}
	public void setShftDivCd(String shftDivCd) {
		this.shftDivCd = shftDivCd;
	}
	public String getTuserId() {
		return tuserId;
	}
	public void setTuserId(String tuserId) {
		this.tuserId = tuserId;
	}
	public String getTuserNm() {
		return tuserNm;
	}
	public void setTuserNm(String tuserNm) {
		this.tuserNm = tuserNm;
	}
	public String getGrdCd() {
		return grdCd;
	}
	public void setGrdCd(String grdCd) {
		this.grdCd = grdCd;
	}
	public String getGrdCdNm() {
		return grdCdNm;
	}
	public void setGrdCdNm(String grdCdNm) {
		this.grdCdNm = grdCdNm;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getProleCd() {
		return proleCd;
	}
	public void setProleCd(String proleCd) {
		this.proleCd = proleCd;
	}
	public String getProleCdNm() {
		return proleCdNm;
	}
	public void setProleCdNm(String proleCdNm) {
		this.proleCdNm = proleCdNm;
	}
	public String getRoleCd() {
		return roleCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public String getRoleCdNm() {
		return roleCdNm;
	}
	public void setRoleCdNm(String roleCdNm) {
		this.roleCdNm = roleCdNm;
	}
	public String getWorkLocCd() {
		return workLocCd;
	}
	public void setWorkLocCd(String workLocCd) {
		this.workLocCd = workLocCd;
	}
	public String getConttDiv() {
		return conttDiv;
	}
	public void setConttDiv(String conttDiv) {
		this.conttDiv = conttDiv;
	}
	public String getConttDivNm() {
		return conttDivNm;
	}
	public void setConttDivNm(String conttDivNm) {
		this.conttDivNm = conttDivNm;
	}
	public String getUnitDiv() {
		return unitDiv;
	}
	public void setUnitDiv(String unitDiv) {
		this.unitDiv = unitDiv;
	}
	public String getCostCentCd() {
		return costCentCd;
	}
	public void setCostCentCd(String costCentCd) {
		this.costCentCd = costCentCd;
	}
	public String getCostCentNm() {
		return costCentNm;
	}
	public void setCostCentNm(String costCentNm) {
		this.costCentNm = costCentNm;
	}
	public String getShftGroupNm() {
		return shftGroupNm;
	}
	public void setShftGroupNm(String shftGroupNm) {
		this.shftGroupNm = shftGroupNm;
	}
	public String getShftGroupCd() {
		return shftGroupCd;
	}
	public void setShftGroupCd(String shftGroupCd) {
		this.shftGroupCd = shftGroupCd;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getChgItemYn() {
		return chgItemYn;
	}
	public void setChgItemYn(String chgItemYn) {
		this.chgItemYn = chgItemYn;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getHiddenEmpId() {
		return hiddenEmpId;
	}
	public void setHiddenEmpId(String hiddenEmpId) {
		this.hiddenEmpId = hiddenEmpId;
	}
	public String getShftTpCd() {
		return shftTpCd;
	}
	public void setShftTpCd(String shftTpCd) {
		this.shftTpCd = shftTpCd;
	}
	public String getShftTpCdNm() {
		return shftTpCdNm;
	}
	public void setShftTpCdNm(String shftTpCdNm) {
		this.shftTpCdNm = shftTpCdNm;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getUpdDt() {
		return updDt;
	}
	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
	public String getUpdBy() {
		return updBy;
	}
	public void setUpdBy(String updBy) {
		this.updBy = updBy;
	}
	public List<Object> getRoleCodeList() {
		return roleCodeList;
	}
	public void setRoleCodeList(List<Object> roleCodeList) {
		this.roleCodeList = roleCodeList;
	}
	public List<Object> getWorkingLocCodeList() {
		return workingLocCodeList;
	}
	public void setWorkingLocCodeList(List<Object> workingLocCodeList) {
		this.workingLocCodeList = workingLocCodeList;
	}
	public List<Object> getStaffGradeCodeList() {
		return staffGradeCodeList;
	}
	public void setStaffGradeCodeList(List<Object> staffGradeCodeList) {
		this.staffGradeCodeList = staffGradeCodeList;
	}
	public List<Object> getContractDivisionList() {
		return contractDivisionList;
	}
	public void setContractDivisionList(List<Object> contractDivisionList) {
		this.contractDivisionList = contractDivisionList;
	}
	public List<Object> getCostCenterList() {
		return costCenterList;
	}
	public void setCostCenterList(List<Object> costCenterList) {
		this.costCenterList = costCenterList;
	}
	public List<Object> getReasonCombo() {
		return reasonCombo;
	}
	public void setReasonCombo(List<Object> reasonCombo) {
		this.reasonCombo = reasonCombo;
	}
	public List<Object> getUnavailableLogForStaffList() {
		return unavailableLogForStaffList;
	}
	public void setUnavailableLogForStaffList(List<Object> unavailableLogForStaffList) {
		this.unavailableLogForStaffList = unavailableLogForStaffList;
	}
	public List<Object> getInternalStaffCombo() {
		return internalStaffCombo;
	}
	public void setInternalStaffCombo(List<Object> internalStaffCombo) {
		this.internalStaffCombo = internalStaffCombo;
	}
	public List<Object> getShiftTypeInfoCombo() {
		return shiftTypeInfoCombo;
	}
	public void setShiftTypeInfoCombo(List<Object> shiftTypeInfoCombo) {
		this.shiftTypeInfoCombo = shiftTypeInfoCombo;
	}
}