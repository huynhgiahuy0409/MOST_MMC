package com.tsb.most.biz.dataitem.document;

import com.tsb.most.framework.dataitem.DataItem;

public class ValidationCodeItem extends DataItem {

    private String divCd;
    private String divNm;
    private String cd;
    private String cdNm;
    private String tyCd;
    private String lcd;//MT/ TZ
    private String ref1;
    private String ref2;
    private String ref3;
    private String ref4;
    private String ref5;
    
    private String isValidated;
    
    /**
     * @return Returns the isValidated.
     */
    public String getIsValidated() {
        return isValidated;
    }
    /**
     * @param isValidated The isValidated to set.
     */
    public void setIsValidated(String isValidated) {
        this.isValidated = isValidated;
    }
    /**
     * @return Returns the ref1.
     */
    public String getRef1() {
        return ref1;
    }
    /**
     * @param ref1 The ref1 to set.
     */
    public void setRef1(String ref1) {
        this.ref1 = ref1;
    }
    /**
     * @return Returns the ref2.
     */
    public String getRef2() {
        return ref2;
    }
    /**
     * @param ref2 The ref2 to set.
     */
    public void setRef2(String ref2) {
        this.ref2 = ref2;
    }
    /**
     * @return Returns the ref3.
     */
    public String getRef3() {
        return ref3;
    }
    /**
     * @param ref3 The ref3 to set.
     */
    public void setRef3(String ref3) {
        this.ref3 = ref3;
    }
    /**
     * @return Returns the ref4.
     */
    public String getRef4() {
        return ref4;
    }
    /**
     * @param ref4 The ref4 to set.
     */
    public void setRef4(String ref4) {
        this.ref4 = ref4;
    }
    /**
     * @return Returns the ref5.
     */
    public String getRef5() {
        return ref5;
    }
    /**
     * @param ref5 The ref5 to set.
     */
    public void setRef5(String ref5) {
        this.ref5 = ref5;
    }
    /**
    * Function set a divCd value
    * @param divCd. 
    * @return void.
    */        
    public void setDivCd(String divCd)
    {
        this.divCd       = divCd;
    }

    /**
    * Return a divCd Value
    * @param void. 
    * @return String.
    */  
    public String getDivCd()
    {
        return divCd;
    }

    /**
    * Function set a divNm value
    * @param divNm. 
    * @return void.
    */        
    public void setDivNm(String divNm)
    {
        this.divNm       = divNm;
    }

    /**
    * Return a divNm Value
    * @param void. 
    * @return String.
    */  
    public String getDivNm()
    {
        return divNm;
    }

    /**
    * Function set a cd value
    * @param cd. 
    * @return void.
    */        
    public void setCd(String cd)
    {
        this.cd       = cd;
    }

    /**
    * Return a cd Value
    * @param void. 
    * @return String.
    */  
    public String getCd()
    {
        return cd;
    }

    /**
    * Function set a cdNm value
    * @param cdNm. 
    * @return void.
    */        
    public void setCdNm(String cdNm)
    {
        this.cdNm       = cdNm;
    }

    /**
    * Return a cdNm Value
    * @param void. 
    * @return String.
    */  
    public String getCdNm()
    {
        return cdNm;
    }

    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }

    public String getLcd() {
        return lcd;
    }
    public void setLcd(String lcd) {
        this.lcd = lcd;
    }
}
