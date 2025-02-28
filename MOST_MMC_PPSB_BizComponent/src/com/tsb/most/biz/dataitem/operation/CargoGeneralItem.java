package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoGeneralItem extends DataItem {

    private String BLANK ="";
    private String vslCallId=BLANK;
    private String shipgNoteNo=BLANK;
    private String blNo=BLANK;//
    private String gdsRecvNo=BLANK;
    private String cbrNo=BLANK;
    private String shipgAgnt=BLANK;
    private String fwrAgnt=BLANK;
    private String shprNm=BLANK;
    private String cnsne=BLANK;
    private String cgTpCd=BLANK;
    private String delvTpCd=BLANK;
    private String imdg=BLANK;
    private String unno=BLANK;
    private String pol=BLANK;
    private String pod=BLANK;
    private String fnd=BLANK;
    private String pkgTpCd=BLANK;
    private String cmdtCd=BLANK;
    private String gatePassNo=BLANK;
    private String catgCd=BLANK;
    private boolean isIndicatorTy;  
    private String shpCng=BLANK;
    private String markNo=BLANK;
    private String delvOrder=BLANK;
    private String cargo=BLANK;
    private String tsptTpCd;

    private List cargoGeneralList;
    private List summaryList;
    private List categoryList;
    private List modeOfOprList;
    private List deliveryList;
    private List cargoTypeList;
    private List packageTypeList;
    private List shiftDtList;
    
    private String scn;

    private String eqFacNo;
    private String mfDocId;
    private String vslCd;
    private String cgNo;
    private String eqStDt;
    private Double loadingRate;
    
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}

	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}

	public String getEqFacNo() {
		return eqFacNo;
	}
	public void setEqFacNo(String eqFacNo) {
		this.eqFacNo = eqFacNo;
	}

    /**
    * Function set a shipgNoteNo value
    * @param shipgNoteNo. 
    * @return void.
    */        
    public void setShipgNoteNo(String shipgNoteNo)
    {
        this.shipgNoteNo       = shipgNoteNo;
    }

    /**
    * Return a shipgNoteNo Value
    * @param void. 
    * @return String.
    */  
    public String getShipgNoteNo()
    {
        return shipgNoteNo;
    }

    /**
    * Function set a blNo value
    * @param blNo. 
    * @return void.
    */        
    public void setBlNo(String blNo)
    {
        this.blNo       = blNo;
    }

    /**
    * Return a blNo Value
    * @param void. 
    * @return String.
    */  
    public String getBlNo()
    {
        return blNo;
    }

    /**
    * Function set a gdsRecvNo value
    * @param gdsRecvNo. 
    * @return void.
    */        
    public void setGdsRecvNo(String gdsRecvNo)
    {
        this.gdsRecvNo       = gdsRecvNo;
    }

    /**
    * Return a gdsRecvNo Value
    * @param void. 
    * @return String.
    */  
    public String getGdsRecvNo()
    {
        return gdsRecvNo;
    }

    /**
    * Function set a cbrNo value
    * @param cbrNo. 
    * @return void.
    */        
    public void setCbrNo(String cbrNo)
    {
        this.cbrNo       = cbrNo;
    }

    /**
    * Return a cbrNo Value
    * @param void. 
    * @return String.
    */  
    public String getCbrNo()
    {
        return cbrNo;
    }

    /**
    * Function set a shipgAgnt value
    * @param shipgAgnt. 
    * @return void.
    */        
    public void setShipgAgnt(String shipgAgnt)
    {
        this.shipgAgnt       = shipgAgnt;
    }

    /**
    * Return a shipgAgnt Value
    * @param void. 
    * @return String.
    */  
    public String getShipgAgnt()
    {
        return shipgAgnt;
    }

    /**
    * Function set a fwrAgnt value
    * @param fwrAgnt. 
    * @return void.
    */        
    public void setFwrAgnt(String fwrAgnt)
    {
        this.fwrAgnt       = fwrAgnt;
    }

    /**
    * Return a fwrAgnt Value
    * @param void. 
    * @return String.
    */  
    public String getFwrAgnt()
    {
        return fwrAgnt;
    }

    /**
    * Function set a shprNm value
    * @param shprNm. 
    * @return void.
    */        
    public void setShprNm(String shprNm)
    {
        this.shprNm       = shprNm;
    }

    /**
    * Return a shprNm Value
    * @param void. 
    * @return String.
    */  
    public String getShprNm()
    {
        return shprNm;
    }

    /**
    * Function set a cnsne value
    * @param cnsne. 
    * @return void.
    */        
    public void setCnsne(String cnsne)
    {
        this.cnsne       = cnsne;
    }

    /**
    * Return a cnsne Value
    * @param void. 
    * @return String.
    */  
    public String getCnsne()
    {
        return cnsne;
    }

    /**
    * Function set a cgTpCd value
    * @param cgTpCd. 
    * @return void.
    */        
    public void setCgTpCd(String cgTpCd)
    {
        this.cgTpCd       = cgTpCd;
    }

    /**
    * Return a cgTpCd Value
    * @param void. 
    * @return String.
    */  
    public String getCgTpCd()
    {
        return cgTpCd;
    }

    /**
    * Function set a delvTpCd value
    * @param delvTpCd. 
    * @return void.
    */        
    public void setDelvTpCd(String delvTpCd)
    {
        this.delvTpCd       = delvTpCd;
    }

    /**
    * Return a delvTpCd Value
    * @param void. 
    * @return String.
    */  
    public String getDelvTpCd()
    {
        return delvTpCd;
    }

    /**
    * Function set a imdg value
    * @param imdg. 
    * @return void.
    */        
    public void setImdg(String imdg)
    {
        this.imdg       = imdg;
    }

    /**
    * Return a imdg Value
    * @param void. 
    * @return String.
    */  
    public String getImdg()
    {
        return imdg;
    }

    /**
    * Function set a unno value
    * @param unno. 
    * @return void.
    */        
    public void setUnno(String unno)
    {
        this.unno       = unno;
    }

    /**
    * Return a unno Value
    * @param void. 
    * @return String.
    */  
    public String getUnno()
    {
        return unno;
    }
    
    /**
    * Function set a pkgTpCd value
    * @param pkgTpCd. 
    * @return void.
    */        
    public void setPkgTpCd(String pkgTpCd)
    {
        this.pkgTpCd       = pkgTpCd;
    }

    /**
    * Return a pkgTpCd Value
    * @param void. 
    * @return String.
    */  
    public String getPkgTpCd()
    {
        return pkgTpCd;
    }

    /**
    * Function set a cmdtCd value
    * @param cmdtCd. 
    * @return void.
    */        
    public void setCmdtCd(String cmdtCd)
    {
        this.cmdtCd       = cmdtCd;
    }

    /**
    * Return a cmdtCd Value
    * @param void. 
    * @return String.
    */  
    public String getCmdtCd()
    {
        return cmdtCd;
    }

    /**
    * Function set a gatePassNo value
    * @param gatePassNo. 
    * @return void.
    */        
    public void setGatePassNo(String gatePassNo)
    {
        this.gatePassNo       = gatePassNo;
    }

    /**
    * Return a gatePassNo Value
    * @param void. 
    * @return String.
    */  
    public String getGatePassNo()
    {
        return gatePassNo;
    }

    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    
    public boolean getIsIndicatorTy() {
        return isIndicatorTy;
    }
    public void setIsIndicatorTy(boolean isIndicatorTy) {
        this.isIndicatorTy = isIndicatorTy;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    
    public String getShpCng() {
        return shpCng;
    }
    public void setShpCng(String shpCng) {
        this.shpCng = shpCng;
    }
    public String getFnd() {
        return fnd;
    }
    public void setFnd(String fnd) {
        this.fnd = fnd;
    }
    public String getPod() {
        return pod;
    }
    public void setPod(String pod) {
        this.pod = pod;
    }
    
    public String getMarkNo() {
        return markNo;
    }
    public void setMarkNo(String markNo) {
        this.markNo = markNo;
    }
    public String getPol() {
        return pol;
    }
    public void setPol(String pol) {
        this.pol = pol;
    }
    public String getCargo() {
        return cargo;
    }
    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    public String getDelvOrder() {
        return delvOrder;
    }
    public void setDelvOrder(String delvOrder) {
        this.delvOrder = delvOrder;
    }

    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }

	public List getCargoGeneralList() {
		return cargoGeneralList;
	}

	public void setCargoGeneralList(List cargoGeneralList) {
		this.cargoGeneralList = cargoGeneralList;
	}

	public List getSummaryList() {
		return summaryList;
	}

	public void setSummaryList(List summaryList) {
		this.summaryList = summaryList;
	}

	public List getCategoryList() {
		return categoryList;
	}

	public void setCategoryList(List categoryList) {
		this.categoryList = categoryList;
	}

	public List getModeOfOprList() {
		return modeOfOprList;
	}

	public void setModeOfOprList(List modeOfOprList) {
		this.modeOfOprList = modeOfOprList;
	}

	public List getDeliveryList() {
		return deliveryList;
	}

	public void setDeliveryList(List deliveryList) {
		this.deliveryList = deliveryList;
	}

	public List getCargoTypeList() {
		return cargoTypeList;
	}

	public void setCargoTypeList(List cargoTypeList) {
		this.cargoTypeList = cargoTypeList;
	}

	public List getPackageTypeList() {
		return packageTypeList;
	}

	public void setPackageTypeList(List packageTypeList) {
		this.packageTypeList = packageTypeList;
	}

	public List getShiftDtList() {
		return shiftDtList;
	}

	public void setShiftDtList(List shiftDtList) {
		this.shiftDtList = shiftDtList;
	}
	public String getEqStDt() {
		return eqStDt;
	}
	public void setEqStDt(String eqStDt) {
		this.eqStDt = eqStDt;
	}
	public Double getLoadingRate() {
		return loadingRate;
	}
	public void setLoadingRate(Double loadingRate) {
		this.loadingRate = loadingRate;
	}
}
