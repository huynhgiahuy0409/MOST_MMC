/**
* GoodsReceiptItem.java
*
* Created on   : 2007-08-09
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-08-09     Mr Sunny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.document;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class GoodsReceiptItem extends DataItem {

    private String gdsRecvNo;
    private String vslCallId;//s
    private String callYear;//s
    private String callSeq;//s
    private String shipgNoteNo;//s
    private String tsptTpCd;//s
    private String lorryId;//g
    private int snWgt;//s
    private double cgWgt;//s
    private double grWgt;//g
    private double measurement;//s
    private int pkgQty;//s
    private double grMsrmt;//G
    private int grQty;//G
    private String grWgtReport;
    private String grVoltReport;
    private String grQtyReport;
    private String grBalWgtReport;
    private String pkgTpCd;//s
    private String cmdtCd;//s
    private String cmdtCdNm;
    private String snRmk;//s
    private String grRmk;//g
    private String sumitDt;
    private String estArrvDt;
    private String cbrNo;//s
    private String shipgAgnt;//s
    private String shipgAgntNm;
    private String saAddr;
    private String fwrAgnt;//s
    private String tsptr;//s COMPANY
    private String tsptrNm;
    private String shpr;//s
    private String shprNm;//s name of exporter
    private String shprAddr;//s adds of exporter
    private String sumitBy;
    private String cnsneNm;
    private String cgTpCd;//s
    private String imdg;//s
    private String unno;//s
    private String eta;
    private String etd;
    private String etb;
    private String berthLoc;
    private String whLoc;
    private String delvTpCd;
    private String delvTpNm;//add sunnykim 20090330
    
    private String vslCd;
    private String vslNm;
    private String inbVoy;
    private String outbVoy;
    private String imdgUnno;
    private String portOfDis;
    private String sumQty;
    private String sumMt;
    private String sumM3;
    private String seq;
    private String tsptCompNm;
    private String gateInDt;
    private String gateOutDt;
    private String arrvQty;
    private String grTsptTpCd;
    private String grTsptTpCdNm;
    private String userId;
    private String tsptTpCdNm;
    private String pkgTpCdNm;
    private String cgTpCdNm;
    private int no;
    private String grSumitDt;
    private String sumGrQty;
    private String sumGrMt;
    private String sumGrM3;
    private String totGrQty;
    private String totGrMt;
    private String totGrM3;
    private String cnsneAddr;
    private String fwrdSumitDt;
    private String updDt;
    private String delvTpCdNm;
    
    private String loadEndTime;
    private String pkgRecivedTime;
    private String grQty1;
    private String grMsrmt1;
    private String grWgt1;
    
    private String goStat;//Gate out state Display Laden/Empty status in Gate-Out screen. by sunny 20090625
    private double wgtWegon;
    private String releaseNo;
    private String receiveNum;
    private String jpGroup;
    private String pkgNo;
    private String snDtlWgt;
    private String snDtlQty;
    
    private String curPage;
    private String totalPage;
    private String rn;
    private String chk;
    private String lorryNo;
    private String driverId;
    
    private String driverNm;
    private String licsNo;
    private String licsExprYmd;
    private String statCD;
    
    private String depSaId;
    private String arrvSaId;
    private String storLoc;
    private String voyage;
    private String shipgNoteNoNm;
    private String mfDocId;
    private String balanceQty;
    private String releasedQty;
    private String releaseBalQty;
    private String damNo;
    
    private String eachWgt;
    private String eachVol;
    
    private String domesticChk;
    private String additionalChk;
    private String wgtChk;
    private String validDate;
    
    private String pkgDesc;
    private String pkgMt;
    private String pkgM3;
    private String width;
    private String height;
    private String length;
    private String projectCargo;
    private ArrayList<GoodsReceiptItem> pkgItems;
    
    private String paymentTpNm;
    private String lotNo;
    private String lorryRegValidDate;
    private String chassisRegValidDate;
    private String chassisNo;
    private String driverIdNo;
    private double balWgt;
    private String cmdtGroupNm;
    private String cnsne;
    
    private String isReturnToShipper;
    private String rhdlMode;
    private String rhdlNo;
    
    private String rhdQty;
    private String rhdlMt;
    private String rhdlM3;
    private String sumRhdQty;
    private String sumRhdlMt;
    private String sumRhdlM3;
    
  //Add for: Generate InvLocData (RHD GR)
    private String jobNo;
    private String locId;
    private String whLocId;
    private String whTpCd;
    private String whLocTp;
    private String markNo;
    
    private String dmt;
    private String dm3;
    private String dqty;
    private String dLrMt;
    private String dLrM3;
    private String dLrQty;
    private String dVslMt;
    private String dVslM3;
    private String dVslQty;
    private String imt;
    private String im3;
    private String iqty;
    
    private String sumDLrMt;
    private String sumDLrM3;
    private String sumDLrQty;
    private String sumDVslMt;
    private String sumDVslM3;
    private String sumDVslQty;
    private String isAssigned;
    private String rtsLocId;
    private String rtsLocNm;
    private String balWgtWhForRts;
    private String oldGrTsptTpCd;
    
    private String delivered;
  	private ArrayList<ShippingNoteItem> unitItems;
  	private String scn;
  	
  	private String vslCallYear;		//TEST
    private String vslCallSeq;		//TEST
 
	public String getVslCallYear() {		//TEST
		return vslCallYear;
	}
	public void setVslCallYear(String vslCallYear) {		//TEST
		this.vslCallYear = vslCallYear;
	}
	
    public String getVslCallSeq() {		//TEST
		return vslCallSeq;
	}
	public void setVslCallSeq(String vslCallSeq) {		//TEST
		this.vslCallSeq = vslCallSeq;
	}
    
	public String getIsReturnToShipper() {
		return isReturnToShipper;
	}
	public void setIsReturnToShipper(String isReturnToShipper) {
		this.isReturnToShipper = isReturnToShipper;
	}
	public String getRhdlMode() {
		return rhdlMode;
	}
	public void setRhdlMode(String rhdlMode) {
		this.rhdlMode = rhdlMode;
	}
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
	public String getRhdQty() {
		return rhdQty;
	}
	public void setRhdQty(String rhdQty) {
		this.rhdQty = rhdQty;
	}
	public String getRhdlMt() {
		return rhdlMt;
	}
	public void setRhdlMt(String rhdlMt) {
		this.rhdlMt = rhdlMt;
	}
	public String getRhdlM3() {
		return rhdlM3;
	}
	public void setRhdlM3(String rhdlM3) {
		this.rhdlM3 = rhdlM3;
	}
	public String getSumRhdQty() {
		return sumRhdQty;
	}
	public void setSumRhdQty(String sumRhdQty) {
		this.sumRhdQty = sumRhdQty;
	}
	public String getSumRhdlMt() {
		return sumRhdlMt;
	}
	public void setSumRhdlMt(String sumRhdlMt) {
		this.sumRhdlMt = sumRhdlMt;
	}
	public String getSumRhdlM3() {
		return sumRhdlM3;
	}
	public void setSumRhdlM3(String sumRhdlM3) {
		this.sumRhdlM3 = sumRhdlM3;
	}
	public String getVoyage() {
		return voyage;
	}
	public String getShipgNoteNoNm() {
		return shipgNoteNoNm;
	}
	public void setShipgNoteNoNm(String shipgNoteNoNm) {
		this.shipgNoteNoNm = shipgNoteNoNm;
	}
	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}
	public String getStorLoc() {
		return storLoc;
	}
	public void setStorLoc(String storLoc) {
		this.storLoc = storLoc;
	}
	public String getDepSaId() {
		return depSaId;
	}
	public void setDepSaId(String depSaId) {
		this.depSaId = depSaId;
	}
	public String getArrvSaId() {
		return arrvSaId;
	}
	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}
	public String getDriverId() {
        return driverId;
    }
    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }
    /**
     * @return Returns the tsptrNm.
     */
    public String getTsptrNm() {
        return tsptrNm;
    }
    /**
     * @param tsptrNm The tsptrNm to set.
     */
    public void setTsptrNm(String tsptrNm) {
        this.tsptrNm = tsptrNm;
    }
    /**
     * @return Returns the snDtlQty.
     */
    public String getSnDtlQty() {
        return snDtlQty;
    }
    /**
     * @param snDtlQty The snDtlQty to set.
     */
    public void setSnDtlQty(String snDtlQty) {
        this.snDtlQty = snDtlQty;
    }
    /**
     * @return Returns the snDtlWgt.
     */
    public String getSnDtlWgt() {
        return snDtlWgt;
    }
    /**
     * @param snDtlWgt The snDtlWgt to set.
     */
    public void setSnDtlWgt(String snDtlWgt) {
        this.snDtlWgt = snDtlWgt;
    }
    /**
     * @return Returns the pkgNo.
     */
    public String getPkgNo() {
        return pkgNo;
    }
    /**
     * @param pkgNo The pkgNo to set.
     */
    public void setPkgNo(String pkgNo) {
        this.pkgNo = pkgNo;
    }
    /**
     * @return Returns the jpGroup.
     */
    public String getJpGroup() {
        return jpGroup;
    }
    /**
     * @param jpGroup The jpGroup to set.
     */
    public void setJpGroup(String jpGroup) {
        this.jpGroup = jpGroup;
    }
    /**
     * @return Returns the receiveNum.
     */
    public String getReceiveNum() {
        return receiveNum;
    }
    /**
     * @param receiveNum The receiveNum to set.
     */
    public void setReceiveNum(String receiveNum) {
        this.receiveNum = receiveNum;
    }
    /**
     * @return Returns the releaseNo.
     */
    public String getReleaseNo() {
        return releaseNo;
    }
    /**
     * @param releaseNo The releaseNo to set.
     */
    public void setReleaseNo(String releaseNo) {
        this.releaseNo = releaseNo;
    }
    /**
     * @return Returns the cmdtCdNm.
     */
    public String getCmdtCdNm() {
        return cmdtCdNm;
    }
    /**
     * @param cmdtCdNm The cmdtCdNm to set.
     */
    public void setCmdtCdNm(String cmdtCdNm) {
        this.cmdtCdNm = cmdtCdNm;
    }
    /**
     * @return Returns the whLoc.
     */
    public String getWhLoc() {
        return whLoc;
    }
    /**
     * @param whLoc The whLoc to set.
     */
    public void setWhLoc(String whLoc) {
        this.whLoc = whLoc;
    }
    /**
     * @return Returns the saAddr.
     */
    public String getSaAddr() {
        return saAddr;
    }
    /**
     * @param saAddr The saAddr to set.
     */
    public void setSaAddr(String saAddr) {
        this.saAddr = saAddr;
    }
    /**
     * @return Returns the shipgAgntNm.
     */
    public String getShipgAgntNm() {
        return shipgAgntNm;
    }
    /**
     * @param shipgAgntNm The shipgAgntNm to set.
     */
    public void setShipgAgntNm(String shipgAgntNm) {
        this.shipgAgntNm = shipgAgntNm;
    }
    /**
     * @return Returns the wgtWegon.
     */
    public double getWgtWegon() {
        return wgtWegon;
    }
    /**
     * @param wgtWegon The wgtWegon to set.
     */
    public void setWgtWegon(double wgtWegon) {
        this.wgtWegon = wgtWegon;
    }
    public String getLoadEndTime() {
        return loadEndTime;
    }
    public void setLoadEndTime(String loadEndTime) {
        this.loadEndTime = loadEndTime;
    }
    public String getPkgRecivedTime() {
        return pkgRecivedTime;
    }
    public void setPkgRecivedTime(String pkgRecivedTime) {
        this.pkgRecivedTime = pkgRecivedTime;
    }
    public String getGrTsptTpCdNm() {
        return grTsptTpCdNm;
    }
    public void setGrTsptTpCdNm(String grTsptTpCdNm) {
        this.grTsptTpCdNm = grTsptTpCdNm;
    }
    private String dgStatCd;//ADD SUNNYKIM 2008,09,16 ABOUT TMT_DG - USING SELECTGR = POPUPLIST
    private String dgYn;//ADD sunnykim 20081128 DGCHK = Y,N,NULL
    
    private String spCargoChk;
    private String catgCd;
    private String catgCdNm;
    private String adCargoChk;
    
    public String getAdCargoChk() {
        return adCargoChk;
    }
    public void setAdCargoChk(String adCargoChk) {
        this.adCargoChk = adCargoChk;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    public String getCatgCdNm() {
		return catgCdNm;
	}
	public void setCatgCdNm(String catgCdNm) {
		this.catgCdNm = catgCdNm;
	}
	public String getSpCargoChk() {
        return spCargoChk;
    }
    public void setSpCargoChk(String spCargoChk) {
        this.spCargoChk = spCargoChk;
    }
    public String getUpdDt() {
        return updDt;
    }
    public void setUpdDt(String updDt) {
        this.updDt = updDt;
    }
    public String getFwrdSumitDt() {
        return fwrdSumitDt;
    }
    public void setFwrdSumitDt(String fwrdSumitDt) {
        this.fwrdSumitDt = fwrdSumitDt;
    }
    public String getCnsneAddr() {
        return cnsneAddr;
    }
    public void setCnsneAddr(String cnsneAddr) {
        this.cnsneAddr = cnsneAddr;
    }
    public String getSumGrM3() {
        return sumGrM3;
    }
    public void setSumGrM3(String sumGrM3) {
        this.sumGrM3 = sumGrM3;
    }
    public String getSumGrMt() {
        return sumGrMt;
    }
    public void setSumGrMt(String sumGrMt) {
        this.sumGrMt = sumGrMt;
    }
    public String getSumGrQty() {
        return sumGrQty;
    }
    public void setSumGrQty(String sumGrQty) {
        this.sumGrQty = sumGrQty;
    }
        public String getGrSumitDt() {
        return grSumitDt;
    }
    public void setGrSumitDt(String grSumitDt) {
        this.grSumitDt = grSumitDt;
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public String getCgTpCdNm() {
        return cgTpCdNm;
    }
    public void setCgTpCdNm(String cgTpCdNm) {
        this.cgTpCdNm = cgTpCdNm;
    }
    public String getPkgTpCdNm() {
        return pkgTpCdNm;
    }
    public void setPkgTpCdNm(String pkgTpCdNm) {
        this.pkgTpCdNm = pkgTpCdNm;
    }
    public String getTsptTpCdNm() {
        return tsptTpCdNm;
    }
    public void setTsptTpCdNm(String tsptTpCdNm) {
        this.tsptTpCdNm = tsptTpCdNm;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getGrTsptTpCd() {
        return grTsptTpCd;
    }
    public void setGrTsptTpCd(String grTsptTpCd) {
        this.grTsptTpCd = grTsptTpCd;
    }
    public String getArrvQty() {
        return arrvQty;
    }
    public void setArrvQty(String arrvQty) {
        this.arrvQty = arrvQty;
    }
    public String getGateInDt() {
        return gateInDt;
    }
    public void setGateInDt(String gateInDt) {
        this.gateInDt = gateInDt;
    }
    public String getGateOutDt() {
        return gateOutDt;
    }
    public void setGateOutDt(String gateOutDt) {
        this.gateOutDt = gateOutDt;
    }
    public String getTsptCompNm() {
        return tsptCompNm;
    }
    public void setTsptCompNm(String tsptCompNm) {
        this.tsptCompNm = tsptCompNm;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getCbrNo() {
        return cbrNo;
    }
    public void setCbrNo(String cbrNo) {
        this.cbrNo = cbrNo;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getCmdtCd() {
        return cmdtCd;
    }
    public void setCmdtCd(String cmdtCd) {
        this.cmdtCd = cmdtCd;
    }
    public String getCnsneNm() {
        return cnsneNm;
    }
    public void setCnsneNm(String cnsneNm) {
        this.cnsneNm = cnsneNm;
    }
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    public String getEstArrvDt() {
        return estArrvDt;
    }
    public void setEstArrvDt(String estArrvDt) {
        this.estArrvDt = estArrvDt;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getEtb() {
        return etb;
    }
    public void setEtb(String etb) {
        this.etb = etb;
    }
    public String getEtd() {
        return etd;
    }
    public void setEtd(String etd) {
        this.etd = etd;
    }
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    
    public String getGdsRecvNo() {
        return gdsRecvNo;
    }
    public void setGdsRecvNo(String gdsRecvNo) {
        this.gdsRecvNo = gdsRecvNo;
    }
    public String getGrRmk() {
        return grRmk;
    }
    public void setGrRmk(String grRmk) {
        this.grRmk = grRmk;
    }
    
    public String getImdg() {
        return imdg;
    }
    public void setImdg(String imdg) {
        this.imdg = imdg;
    }
    public String getImdgUnno() {
        return imdgUnno;
    }
    public void setImdgUnno(String imdgUnno) {
        this.imdgUnno = imdgUnno;
    }
    public String getInbVoy() {
        return inbVoy;
    }
    public void setInbVoy(String inbVoy) {
        this.inbVoy = inbVoy;
    }
    public String getLorryId() {
        return lorryId;
    }
    public void setLorryId(String lorryId) {
        this.lorryId = lorryId;
    }
    
    public String getOutbVoy() {
        return outbVoy;
    }
    public void setOutbVoy(String outbVoy) {
        this.outbVoy = outbVoy;
    }
    public int getPkgQty() {
        return pkgQty;
    }
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
    }
    public String getPkgTpCd() {
        return pkgTpCd;
    }
    public void setPkgTpCd(String pkgTpCd) {
        this.pkgTpCd = pkgTpCd;
    }
    public String getShipgAgnt() {
        return shipgAgnt;
    }
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
    }
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getShpr() {
        return shpr;
    }
    public void setShpr(String shpr) {
        this.shpr = shpr;
    }
    public String getShprNm() {
        return shprNm;
    }
    public void setShprNm(String shprNm) {
        this.shprNm = shprNm;
    }
    public String getShprAddr() {
        return shprAddr;
    }
    public void setShprAddr(String shprAddr) {
        this.shprAddr = shprAddr;
    }
    public String getSnRmk() {
        return snRmk;
    }
    public void setSnRmk(String snRmk) {
        this.snRmk = snRmk;
    }
    public int getSnWgt() {
        return snWgt;
    }
    public void setSnWgt(int snWgt) {
        this.snWgt = snWgt;
    }
    public String getSumitDt() {
        return sumitDt;
    }
    public void setSumitDt(String sumitDt) {
        this.sumitDt = sumitDt;
    }
    public String getTsptr() {
        return tsptr;
    }
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }
    public String getUnno() {
        return unno;
    }
    public void setUnno(String unno) {
        this.unno = unno;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getVslCd() {
        return vslCd;
    }
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    
    public String getPortOfDis() {
        return portOfDis;
    }
    public void setPortOfDis(String portOfDis) {
        this.portOfDis = portOfDis;
    }
    
    public String getSumitBy() {
        return sumitBy;
    }
    public void setSumitBy(String sumitBy) {
        this.sumitBy = sumitBy;
    }
    public String getSumM3() {
        return sumM3;
    }
    public void setSumM3(String sumM3) {
        this.sumM3 = sumM3;
    }
    public String getSumMt() {
        return sumMt;
    }
    public void setSumMt(String sumMt) {
        this.sumMt = sumMt;
    }
    public String getSumQty() {
        return sumQty;
    }
    public void setSumQty(String sumQty) {
        this.sumQty = sumQty;
    }
    public int getGrQty() {
        return grQty;
    }
    public void setGrQty(int grQty) {
        this.grQty = grQty;
    }    
    public String getSeq() {
        return seq;
    }
    public void setSeq(String seq) {
        this.seq = seq;
    }
    public double getCgWgt() {
        return cgWgt;
    }
    public void setCgWgt(double cgWgt) {
        this.cgWgt = cgWgt;
    }
    public double getGrMsrmt() {
        return grMsrmt;
    }
    public void setGrMsrmt(double grMsrmt) {
        this.grMsrmt = grMsrmt;
    }
    public double getGrWgt() {
        return grWgt;
    }
    public void setGrWgt(double grWgt) {
        this.grWgt = grWgt;
    }
    public double getMeasurement() {
        return measurement;
    }
    public void setMeasurement(double measurement) {
        this.measurement = measurement;
    }
    public String getDgStatCd() {
        return dgStatCd;
    }
    public void setDgStatCd(String dgStatCd) {
        this.dgStatCd = dgStatCd;
    }
    public String getDelvTpCdNm() {
        return delvTpCdNm;
    }
    public void setDelvTpCdNm(String delvTpCdNm) {
        this.delvTpCdNm = delvTpCdNm;
    }
    /**
     * @return Returns the dgYn.
     */
    public String getDgYn() {
        return dgYn;
    }
    /**
     * @param dgYn The dgYn to set.
     */
    public void setDgYn(String dgYn) {
        this.dgYn = dgYn;
    }
    /**
     * @return Returns the delvTpNm.
     */
    public String getDelvTpNm() {
        return delvTpNm;
    }
    /**
     * @param delvTpNm The delvTpNm to set.
     */
    public void setDelvTpNm(String delvTpNm) {
        this.delvTpNm = delvTpNm;
    }
    /**
     * @return Returns the goStat.
     */
    public String getGoStat() {
        return goStat;
    }
    /**
     * @param goStat The goStat to set.
     */
    public void setGoStat(String goStat) {
        this.goStat = goStat;
    }
    /**
     * @return Returns the totGrM3.
     */
    public String getTotGrM3() {
        return totGrM3;
    }
    /**
     * @param totGrM3 The totGrM3 to set.
     */
    public void setTotGrM3(String totGrM3) {
        this.totGrM3 = totGrM3;
    }
    /**
     * @return Returns the totGrMt.
     */
    public String getTotGrMt() {
        return totGrMt;
    }
    /**
     * @param totGrMt The totGrMt to set.
     */
    public void setTotGrMt(String totGrMt) {
        this.totGrMt = totGrMt;
    }
    /**
     * @return Returns the totGrQty.
     */
    public String getTotGrQty() {
        return totGrQty;
    }
    /**
     * @param totGrQty The totGrQty to set.
     */
    public void setTotGrQty(String totGrQty) {
        this.totGrQty = totGrQty;
    }
    public String getCurPage() {
        return curPage;
    }
    public void setCurPage(String curPage) {
        this.curPage = curPage;
    }
    public String getTotalPage() {
        return totalPage;
    }
    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }
    public String getRn() {
        return rn;
    }
    public void setRn(String rn) {
        this.rn = rn;
    }
    
    public String getChk() {
        return chk;
    }
    public void setChk(String chk) {
        this.chk = chk;
    }
    public String getGrMsrmt1() {
        return grMsrmt1;
    }
    public void setGrMsrmt1(String grMsrmt1) {
        this.grMsrmt1 = grMsrmt1;
    }
    public String getGrQty1() {
        return grQty1;
    }
    public void setGrQty1(String grQty1) {
        this.grQty1 = grQty1;
    }
    public String getGrWgt1() {
        return grWgt1;
    }
    public void setGrWgt1(String grWgt1) {
        this.grWgt1 = grWgt1;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getDriverNm() {
        return driverNm;
    }
    public void setDriverNm(String driverNm) {
        this.driverNm = driverNm;
    }
    public String getLicsExprYmd() {
        return licsExprYmd;
    }
    public void setLicsExprYmd(String licsExprYmd) {
        this.licsExprYmd = licsExprYmd;
    }
    public String getLicsNo() {
        return licsNo;
    }
    public void setLicsNo(String licsNo) {
        this.licsNo = licsNo;
    }
    public String getStatCD() {
        return statCD;
    }
    public void setStatCD(String statCD) {
        this.statCD = statCD;
    }
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getBalanceQty() {
		return balanceQty;
	}
	public void setBalanceQty(String balanceQty) {
		this.balanceQty = balanceQty;
	}
	public String getReleasedQty() {
		return releasedQty;
	}
	public void setReleasedQty(String releasedQty) {
		this.releasedQty = releasedQty;
	}
	public String getReleaseBalQty() {
		return releaseBalQty;
	}
	public void setReleaseBalQty(String releaseBalQty) {
		this.releaseBalQty = releaseBalQty;
	}
	public String getDamNo() {
		return damNo;
	}
	public void setDamNo(String damNo) {
		this.damNo = damNo;
	}
	public String getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(String eachWgt) {
		this.eachWgt = eachWgt;
	}
	public String getEachVol() {
		return eachVol;
	}
	public void setEachVol(String eachVol) {
		this.eachVol = eachVol;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getAdditionalChk() {
		return additionalChk;
	}
	public void setAdditionalChk(String additionalChk) {
		this.additionalChk = additionalChk;
	}
	public String getWgtChk() {
		return wgtChk;
	}
	public void setWgtChk(String wgtChk) {
		this.wgtChk = wgtChk;
	}
	public String getPkgDesc() {
		return pkgDesc;
	}
	public void setPkgDesc(String pkgDesc) {
		this.pkgDesc = pkgDesc;
	}
	public String getPkgMt() {
		return pkgMt;
	}
	public void setPkgMt(String pkgMt) {
		this.pkgMt = pkgMt;
	}
	public String getPkgM3() {
		return pkgM3;
	}
	public void setPkgM3(String pkgM3) {
		this.pkgM3 = pkgM3;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getProjectCargo() {
		return projectCargo;
	}
	public void setProjectCargo(String projectCargo) {
		this.projectCargo = projectCargo;
	}
	public ArrayList<GoodsReceiptItem> getPkgItems() {
		return pkgItems;
	}
	public void setPkgItems(ArrayList<GoodsReceiptItem> pkgItems) {
		this.pkgItems = pkgItems;
	}
	public String getValidDate() {
		return validDate;
	}
	public void setValidDate(String validDate) {
		this.validDate = validDate;
	}
	public String getPaymentTpNm() {
		return paymentTpNm;
	}
	public void setPaymentTpNm(String paymentTpNm) {
		this.paymentTpNm = paymentTpNm;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getLorryRegValidDate() {
		return lorryRegValidDate;
	}
	public void setLorryRegValidDate(String lorryRegValidDate) {
		this.lorryRegValidDate = lorryRegValidDate;
	}
	public String getChassisRegValidDate() {
		return chassisRegValidDate;
	}
	public void setChassisRegValidDate(String chassisRegValidDate) {
		this.chassisRegValidDate = chassisRegValidDate;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getDriverIdNo() {
		return driverIdNo;
	}
	public void setDriverIdNo(String driverIdNo) {
		this.driverIdNo = driverIdNo;
	}
	public double getBalWgt() {
		return balWgt;
	}
	public void setBalWgt(double balWgt) {
		this.balWgt = balWgt;
	}
	public String getCmdtGroupNm() {
		return cmdtGroupNm;
	}
	public void setCmdtGroupNm(String cmdtGroupNm) {
		this.cmdtGroupNm = cmdtGroupNm;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getWhLocId() {
		return whLocId;
	}
	public void setWhLocId(String whLocId) {
		this.whLocId = whLocId;
	}
	public String getWhTpCd() {
		return whTpCd;
	}
	public void setWhTpCd(String whTpCd) {
		this.whTpCd = whTpCd;
	}
	public String getWhLocTp() {
		return whLocTp;
	}
	public void setWhLocTp(String whLocTp) {
		this.whLocTp = whLocTp;
	}
	public String getMarkNo() {
		return markNo;
	}
	public void setMarkNo(String markNo) {
		this.markNo = markNo;
	}
	public String getDmt() {
		return dmt;
	}
	public void setDmt(String dmt) {
		this.dmt = dmt;
	}
	public String getDm3() {
		return dm3;
	}
	public void setDm3(String dm3) {
		this.dm3 = dm3;
	}
	public String getDqty() {
		return dqty;
	}
	public void setDqty(String dqty) {
		this.dqty = dqty;
	}
	public String getdLrMt() {
		return dLrMt;
	}
	public void setdLrMt(String dLrMt) {
		this.dLrMt = dLrMt;
	}
	public String getdLrM3() {
		return dLrM3;
	}
	public void setdLrM3(String dLrM3) {
		this.dLrM3 = dLrM3;
	}
	public String getdLrQty() {
		return dLrQty;
	}
	public void setdLrQty(String dLrQty) {
		this.dLrQty = dLrQty;
	}
	public String getdVslMt() {
		return dVslMt;
	}
	public void setdVslMt(String dVslMt) {
		this.dVslMt = dVslMt;
	}
	public String getdVslM3() {
		return dVslM3;
	}
	public void setdVslM3(String dVslM3) {
		this.dVslM3 = dVslM3;
	}
	public String getdVslQty() {
		return dVslQty;
	}
	public void setdVslQty(String dVslQty) {
		this.dVslQty = dVslQty;
	}
	public String getImt() {
		return imt;
	}
	public void setImt(String imt) {
		this.imt = imt;
	}
	public String getIm3() {
		return im3;
	}
	public void setIm3(String im3) {
		this.im3 = im3;
	}
	public String getIqty() {
		return iqty;
	}
	public void setIqty(String iqty) {
		this.iqty = iqty;
	}
	public String getGrWgtReport() {
		return grWgtReport;
	}
	public void setGrWgtReport(String grWgtReport) {
		this.grWgtReport = grWgtReport;
	}
	public String getGrVoltReport() {
		return grVoltReport;
	}
	public void setGrVoltReport(String grVoltReport) {
		this.grVoltReport = grVoltReport;
	}
	public String getGrQtyReport() {
		return grQtyReport;
	}
	public void setGrQtyReport(String grQtyReport) {
		this.grQtyReport = grQtyReport;
	}
	public String getGrBalWgtReport() {
		return grBalWgtReport;
	}
	public void setGrBalWgtReport(String grBalWgtReport) {
		this.grBalWgtReport = grBalWgtReport;
	}
	public String getSumDLrMt() {
		return sumDLrMt;
	}
	public void setSumDLrMt(String sumDLrMt) {
		this.sumDLrMt = sumDLrMt;
	}
	public String getSumDLrM3() {
		return sumDLrM3;
	}
	public void setSumDLrM3(String sumDLrM3) {
		this.sumDLrM3 = sumDLrM3;
	}
	public String getSumDLrQty() {
		return sumDLrQty;
	}
	public void setSumDLrQty(String sumDLrQty) {
		this.sumDLrQty = sumDLrQty;
	}
	public String getSumDVslMt() {
		return sumDVslMt;
	}
	public void setSumDVslMt(String sumDVslMt) {
		this.sumDVslMt = sumDVslMt;
	}
	public String getSumDVslM3() {
		return sumDVslM3;
	}
	public void setSumDVslM3(String sumDVslM3) {
		this.sumDVslM3 = sumDVslM3;
	}
	public String getSumDVslQty() {
		return sumDVslQty;
	}
	public void setSumDVslQty(String sumDVslQty) {
		this.sumDVslQty = sumDVslQty;
	}
	public String getDelivered() {
		return delivered;
	}
	public void setDelivered(String delivered) {
		this.delivered = delivered;
	}
	public ArrayList<ShippingNoteItem> getUnitItems() {
		return unitItems;
	}
	public void setUnitItems(ArrayList<ShippingNoteItem> unitItems) {
		this.unitItems = unitItems;
	}
	public String getIsAssigned() {
		return isAssigned;
	}
	public void setIsAssigned(String isAssigned) {
		this.isAssigned = isAssigned;
	}
	public String getRtsLocId() {
		return rtsLocId;
	}
	public void setRtsLocId(String rtsLocId) {
		this.rtsLocId = rtsLocId;
	}
	public String getRtsLocNm() {
		return rtsLocNm;
	}
	public void setRtsLocNm(String rtsLocNm) {
		this.rtsLocNm = rtsLocNm;
	}
	public String getBalWgtWhForRts() {
		return balWgtWhForRts;
	}
	public void setBalWgtWhForRts(String balWgtWhForRts) {
		this.balWgtWhForRts = balWgtWhForRts;
	}
	public String getOldGrTsptTpCd() {
		return oldGrTsptTpCd;
	}
	public void setOldGrTsptTpCd(String oldGrTsptTpCd) {
		this.oldGrTsptTpCd = oldGrTsptTpCd;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	
}
