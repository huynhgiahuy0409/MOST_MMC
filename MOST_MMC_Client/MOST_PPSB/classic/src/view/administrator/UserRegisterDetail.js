Ext.define('MOST.view.administrator.UserRegisterDetail', {
	extend: 'Ext.panel.Panel',
	
	alias: 'widget.app-userregisterdetail',
	
	requires: [],
	
	width:1040,
	height:465,
	
	layout: {
		type: 'vbox',
		align: 'stretch',
	},
	
	
	listeners:{
		afterrender: 'onDetailLoad'
	},

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DETAIL_AUTH_GRID_REF_NAME: 'refUserAuthGrid',  // Main Grid Name 
	DETAIL_AUTH_STORE_NAME: 'userAuthList',            // Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	initComponent: function() {
		var me = this;

		var rowAuthEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 2,
			clicksToEdit: 2,
			pluginId: 'userAuthGrpEditor',
			autoCancel: false,
			errorsText: 'Warning',
			listeners:{
				cancelEdit: 'onCancelEdit',
				validateEdit: function(editor, context){
					
				},
				edit:'onEdit'
			}
		});

		Ext.apply(this, {
			
			items: [
				{
					xtype: 'form',
					margin: '5 5 0 5',
					items:[
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items:[
								{
									xtype: 'fieldset',
									title: 'User Information',
									height: 205,
									layout:{
										type: 'hbox',
										align: 'stretch'
									},
									defaults:{
										labelAlign: 'right'
									},
									items:[
										{
											xtype: 'container',
											flex: 1.5,
											layout: 'vbox',
											items:[
												{
			            				        	xtype: 'image',
			            				        	reference: 'refImageUploadPreview',
			            				            shrink: true,
			            				            width: '100%',
			            				            height: '80%',
			            				            bind: {
			            				            	src: '{imgData}'
			            				            }
			            				        },{
			            				        	xtype: 'container',
			    						        	layout: 'hbox',
			    						        	margin: '5 0 0 0',
			    						        	defaults:{
			    										labelAlign: 'right'
			    									},
			    									items:[
			    										{
				        						            xtype: 'filefield',
				        						            buttonOnly: true,
				        						            width: 80,
				        						            buttonText: ViewUtil.getLabel('upload'),
				        						            accept: [
				        						                'image/png',
				        						                'image/jpeg'
				        						            ],
				        						            listeners: {
				        						            	change:'onUploadImage'
				        						            }
				    									},{
				    										xtype:'button',
				    										text: ViewUtil.getLabel('remove'),
				    										width: 60,
				    										reference:'refBtnRemove',
				    										listeners:{
				    											click:'onImageRemove'
				    										}
				    									}
				    								]
			            				        }
			            				    ]
										},{
								        	xtype: 'container',
								        	layout: 'vbox',
								        	flex: 8,
								        	defaults:{
												labelAlign: 'right'
											},
											items:[
												{   //row 1
										        	xtype: 'container',
													layout: 'hbox',
													defaults:{
														labelAlign: 'right',
														flex: 1
													},
													items:[
														{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('userRegId'),
															reference:'refTxtUserId',
															name: 'regUserId',
															padding: '0 5 5 0',
															width: 220,
															bind: '{theDetail.regUserId}',
															allowBlank: false,
															maskRe: /[a-zA-Z0-9]/,
															enforceMaxLength: true,
														    maxLength : 10,
															fieldStyle: 'text-transform : uppercase',
															listeners:{
																focusleave: 'onTxtUserIdFocusLeave',
															}
														},{
															xtype:'button',
															text: ViewUtil.getLabel('check'),
															reference:'refBtnCheckUserId',
															listeners:{
																click:'onCheckUserId'
															}
														},{
															xtype: 'textfield',
															reference: 'refTxtPassword',
															id:'txtPassword',
															fieldLabel: ViewUtil.getLabel('password'),
															padding: '0 5 5 5',
															minLength: 5,
															bind: '{theDetail.password}',
															inputType: 'password',
															allowBlank: false,
															listeners:{
																render : function(c) {
																	new Ext.ToolTip({
													                    target : c.getEl(),
																		html: 'Please input at least 5 characters of PASSWORD'
													                });
																}
															}
														},{
															xtype: 'combobox',
															fieldLabel: ViewUtil.getLabel('confirmed'),
															name: 'expire',
															padding: '0 5 5 0',
															displayField: 'scdNm',
														    valueField: 'scd',
														    value: false,
														    emptyText:'Select',
														    queryMode:'local',
														    bind:{
																store: '{confirmCombo}',
																value: '{theDetail.useYn}'
															},
															allowBlank: false
														}
													]
												},{ //row 2
										        	xtype: 'container',
													layout: 'hbox',
													defaults:{
														labelAlign: 'right'
													},
													items:[
														{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('userName'),
															name: 'userName',
															padding: '0 5 5 0',
															bind: '{theDetail.engNm}',
															allowBlank: false
														},{
															xtype: 'combobox',
															fieldLabel: ViewUtil.getLabel('department'),
															reference:'refCboDepartment',
															name: 'deptCd',
															displayField: 'deptNm',
														    valueField: 'deptCd',
															padding: '0 5 5 0',
															emptyText: 'Select...',
															queryMode:'local',
															bind:{
																store: '{departmentCombo}',
																value: '{theDetail.deptCd}'
															}
														},{ //partner - auto complete
															xtype: 'textfield',
															reference:'txtPtnrCd',
															fieldLabel: ViewUtil.getLabel('partnerCode'),
															bind:'{theDetail.ptnrCd}',
															allowBlank:false,
															editable:false,
															triggers: {
											                    someField: {
											                        cls: 'fa-search',
											                        scope: 'controller',
											                        handler: 'openPartnerCdTypePopup'
											                    }
											                },
											                listeners:{
										                		change: function(){
										                			var me = this;
										                			me.setValue(this.getValue().toUpperCase());
										                		},
										                	}
														}
													]
												},{ //row 3
										        	xtype: 'container',
													layout: 'hbox',
													defaults:{
														labelAlign: 'right'
													},
													items:[
														{
															xtype: 'combobox',
															fieldLabel: ViewUtil.getLabel('userType'),
															name: 'userType',
															displayField: 'scdNm',
														    valueField: 'scd',
															padding: '0 5 5 0',
															emptyText: 'Select...',
															queryMode:'local',
															reference:'refCboUserType',
															bind:{
																store: '{userTypeCombo}',
																value: '{theDetail.regUserType}'
															},
															listeners:{
																select: 'onCboUserTypeSelect'
															},
															allowBlank: false
														},{
															xtype: 'textfield',
															maskRe: /[0-9.]/,
															fieldLabel: ViewUtil.getLabel('mobileNo'),
															reference:'refTxtMobileNo',
															name: 'businessTel',
															bind: '{theDetail.mobileNo}',
															hideTrigger: true,
															padding: '0 5 5 0'
														},{
															xtype: 'textfield',
															fieldLabel: ViewUtil.getLabel('email'),
															name: 'email',
															padding: '0 5 5 0',
															bind: '{theDetail.emailAddr}',
															vtype: 'email'
														}
													]
												},{ //row 4
										        	xtype: 'container',
													layout: 'hbox',
													padding: '0 5 5 0',
													defaults:{
														labelAlign: 'right'
													},
													items:[
														{
															xtype:'textfield',
															width: 835,
															reference:'refTxtAddress',
															fieldLabel: ViewUtil.getLabel('addr'),
															bind:'{theDetail.addr}'
														}
													]
												},{ //row 5
										        	xtype: 'container',
													layout: 'hbox',
													padding: '0 5 5 0',
													defaults:{
														labelAlign: 'right'
													},
													items:[
														{
															xtype:'textfield',
															labelAlign: 'right',
															width: 835,
														    fieldLabel: ViewUtil.getLabel('rmk'),
														    bind:'{theDetail.rmk}'
														}
													]
												},{ //row 6
										        	xtype: 'container',
													layout: 'hbox',
													hidden: true,
													defaults:{
														labelAlign: 'right'
													},
													items:[
														{
															xtype:'textfield',
															fieldLabel: ViewUtil.getLabel('updDt'),
															readOnly:true,
															bind:'{theDetail.updDt}'
														},{
															xtype:'textfield',
															margin:'0 0 0 5',
															fieldLabel: ViewUtil.getLabel('modifier'),
															readOnly:true,
															bind:'{theDetail.updBy}'
														}
													]
												}
											]
								        }
									]
								},{
									layout:'hbox',
									defaults:{
										margin:'0 0 0 0'
									},
									items:[
										{
											layout: 'hbox',
											xtype:'fieldset',
											title: ViewUtil.getLabel('partnerType'),
											height: 200,
											flex: 1,
											margin: '-5 5 0 0',
											items:[
												{
													xtype: 'checkboxgroup',
													margin:'5 0 0 0',
													reference:'refChkGrpPtnrTypes',
													columns: 3,
													flex:1,
											        vertical: false,
											        items: [
											            { boxLabel: ViewUtil.getLabel('shippingLine'),disabled:false, reference:'refChkSHP', flex:1, name: 'rb', inputValue: 'SHP' },
											            { boxLabel: ViewUtil.getLabel('shippingAgent'), disabled:false, reference:'refChkSHA', name: 'rb', inputValue: 'SHA'},
											            { boxLabel: ViewUtil.getLabel('trucker'),disabled:false, reference:'refChkTRK', name: 'rb', inputValue: 'TRK' },
											            { boxLabel: ViewUtil.getLabel('fowarder'),disabled:false, reference:'refChkFWD', name: 'rb', inputValue: 'FWD' },
											            { boxLabel: ViewUtil.getLabel('shipperConsignee'),disabled:false, reference:'refChkCNS', name: 'rb', inputValue: 'CNS' },
											            { boxLabel: ViewUtil.getLabel('tally'), disabled:false, reference:'refChkTLY', name: 'rb', inputValue: 'TLY' },
											            { boxLabel: ViewUtil.getLabel('contractor'), disabled:false, reference:'refChkCTT', name: 'rb', inputValue: 'CTT' }
											        ]
												}
											]
										},{
											xtype: 'fieldset',
									    	margin: '-5 0 5 0',
									    	title: 'Group ID',
											layout: {
												type: 'vbox',
												align: 'stretch'
											},
											flex:1,
											items:[
											    {
											    	xtype: 'container',
													margin: '0 0 0 0',
													layout: {
								                    	type: 'hbox',
								    	                pack: 'end'
								                    },
													items:[
														{
															xtype: 'button',
															text: 'Add',
															reference: 'refsAddRow',
															listeners: {
																click: 'onAddAuthRow'
															}
														},{
															xtype: 'button',
															text: 'Remove',
															reference: 'refsRemoveRow',
															margin: '0 0 0 5',
															listeners: {
																click: 'onRemoveAuthRow'
															}
														}
													]
												},{
													xtype: 'tsb-datagrid',
													style: {borderColor: '#AAA', borderStyle: 'solid', borderWidth: 'thin'},
													itemId: 'authGrid',
													name: 'userAuthGrp',
													margin:'5 0 0 0',
													title:'Group ID',
													usePagingToolbar : false,
													reference: me.DETAIL_AUTH_GRID_REF_NAME,
													layout: {
														type: 'fit'
													},
													bind: {
														store: '{' + me.DETAIL_AUTH_STORE_NAME + '}'
													},
													height: 130,
													autoScroll: true,
													hidden: false,
													listeners: {
														rowdblclick: 'onGroupDbClick'
													},
													plugins: [rowAuthEditing],
													columns: {
														defaults: {
										            		style : 'text-align:center',
										            		align: 'center'
										            	},
										            	items: GridUtil.getGridColumns('UserDetailGroup')
													}
												}
											]
										},
									]
								}
							]
						}
					]
				}
			]
		});
		
		this.callParent();
	}
});