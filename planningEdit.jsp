<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% 
response.setHeader("Cache-Control","no-store"); 
response.setHeader("Pragrma","no-cache"); 
response.setDateHeader("Expires",0); 
String fkUrl = com.uliaow.commons.config.property.SystemProperties.getProperty( "uliaow.upload.url" , "") ; //请求
%> 

<%@include file="/WEB-INF/common/common.jsp"%>
<link href="${ctx}/static/plugins/kindeditor-4.1.10/themes/default/default.css" type="text/css" rel="stylesheet">
<link href="${ctx}/static/plugins/admin-framework/css/jquery/pagination.css" type="text/css" rel="stylesheet">
<link href="${ctx}/static/plugins/admin-framework/css/jquery/reset.css" type="text/css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="${ctx}/static/plugins/admin-framework/css/swiper/swiper.min.css">
<style>
	.del_box{
		position: relative;
	}
	.del_box>span.js_del_spn{
		display: block;
		width: 20px;
		height: 20px;
		padding: 5px;
		position: absolute;
		right: -5px;
		top: -10px;
		z-index:10;
		cursor:pointer;
		background: url(${ctx}/static/project/images/del-icon.png) no-repeat;
		background-position: center;
		background-size: 22px;
	}
</style>
  <script src = '${ctx}/static/project/js/common/ajaxfileupload.js' ></script>
   <script id="oss" value="<%=fkUrl%>"   src = '${ctx}/static/project/js/common/commonUi.js' ></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/static/plugins/kindeditor-4.1.10/kindeditor.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/static/plugins/kindeditor-4.1.10/lang/zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/static/project/js/cms/planning.js"></script>
<script type="text/javascript" src="${ctx}/static/plugins/jquery/jquery.pagination.js"></script>
	
	<div class="container-fluid">
	<section id="widget-grid" >
	<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
			id="notice-message-widget"></article>
	<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
			id="notice-message-widget">
			
			<div class="jarviswidget "  >
			<header style="background:#18b055;"><h2 ><strong>编辑趋势</strong></h2></header>
			</div>
			</article>
</section>
		
	<div id="submitForm"class="form-horizontal"  >	
	<form id="trendTopicForm" >
	<div  >
		<div class="form-group form-group-lg">
		    <label class="col-sm-2 control-label required" ><strong>趋势标题:</strong></label>
		  	<div class="col-sm-4">
		  	<input id="trendtopicVoId" type="hidden" value="${trendTopicVo.id}" name="id"/>
		  	<input type="hidden" value="${trendTopicVo.status}" name="status"/>
		    	<input   onchange="validateinput(this)"type="text" class="form-control" name="title" value="${trendTopicVo.title}"placeholder="趋势标题" ></input>
		  	</div>	
		  	<label class=" control-label" >最大支持36个字符(18个汉字)</label>
		  		<span id ="titlespan"style="color: red;" hidden="true" ><br>请输入合法标题!</span> 
	    </div>
	    
	    <div class="form-group form-group-lg">
	   		<label class="col-sm-2 control-label required" ><strong>趋势类别:</strong></label>
	   		<div class="col-sm-4 " >
	   		<input type="hidden" id="categoryIdInput" value="${trendTopicVo.categoryId}"/>
	   			<select id="planningType" class="form-control" name="categoryId" >
	   			  
	   			</select>
	   		</div>
	    </div>
		<div class="form-group form-group-lg">		
			<label  class="col-sm-2 control-label required"><strong>趋势题图:</strong></label>	
			<div  class="col-sm-2">	
			<button type="button" class="btn btn-success  glyphicon glyphicon-plus  " onclick="addTopicImg()">添加图片</button>	 
			</div>
			<label class=" control-label" >图片张数仅为一张  ，多次上传则保留最后一次上传的图片 ， 图片尺寸：770*440，图片格式：jpg、jpeg</label>  
		</div>	
		
		<div class="form-group form-group-lg">
		<label  class="col-sm-2 control-label"></label>
		<div class="col-sm-8 imgtopicdiv">
			 <%-- <div class='col-md-2 del_box'><img src='${trendTopicVo.coverPic}'  style="width:100%;height:auto; " /><span class='js_del_spn js_del_spn1'><span></div>  --%>
		</div>
		 <input  id="imgtopicinput" type="hidden" name="coverPic" value="${trendTopicVo.coverPic}"/>	
       </div>
       
	    <div class="form-group form-group-lg">
	    <label class="col-sm-2 control-label required" ><strong>是否推荐:</strong></label>
	    <input id="radioValue" type="hidden" value="${trendTopicVo.promotion}"></input>
	   		<label class="radio-inline ">	
  				<input id="promotion1" type="radio" name="promotion"  value="1"> 是
			</label>
			<label class="radio-inline">
 			 	<input id="promotion2" type="radio" name="promotion" checked="checked"  value="0"> 否
			</label>
	   </div>
	    <div class="form-group form-group-lg">
	   <label class="col-sm-2 control-label required" ><strong>趋势内容:</strong></label>
	   <div class="col-sm-6 "> 
	   		<textarea id="planning"  onchange="validateinput(this)" class="form-control" name="content" >${trendTopicVo.content}</textarea>
	  </div> 
		 <div class="col-sm-2 " ><span  style="color: red;" hidden="true" ><br>请输入趋势内容!</span></div>
	   </div>
	   
	   <div class="form-group form-group-lg">		
			<label  class="col-sm-2 control-label"></label>	
			<div class="col-sm-5"></div>
			<div class="col-sm-1">
		  	<button  type="button" class="btn btn-primary  glyphicon glyphicon-save pull-right " onclick="saveTrendTopic()">保存</button>
		  	</div>
			
		</div>	
		
	   </div> 
	   </form>
	<div id="childcontent">
	
	<div>
	<form>
	<input type="hidden" name="parentId"/>
	<input type="hidden" name="id"/>
	<hr>
		<div class="form-group form-group-lg">
		    <label class="col-sm-2 control-label required" ><font color="red">*</font><strong>趋势子标题:</strong></label>
		  	<div class="col-sm-4">
		  	
		    	<input type="text" onchange="validateinput(this)" class="form-control" placeholder="趋势子标题"  name="title">
		  	</div>	
		  	<label class=" control-label" >最大支持40个字符(20个汉字)</label>
		  	<span  style="color: red;" hidden="true" ><br>请输入合法趋势子标题!</span>  
	    </div>
		<div class="form-group form-group-lg">
		
			<label  class="col-sm-2 control-label"><font color="red">*</font><strong>子内容图片:</strong></label>
			<div class="col-sm-2">
			<button type="button" class="btn btn-success  glyphicon glyphicon-plus " >添加图片</button>
			</div>
			<label class=" control-label" >当趋势为推荐状态，首个子内容必须上传3张图片 ；图片尺寸：420*750，图片格式：jpg、jpeg</label>  
		</div>	
		<div class="form-group form-group-lg">
			<label  class="col-sm-2 control-label"></label>
			<div  id="childimg"  class="col-sm-7 childimgs_">
			<input name="coverPics" type="hidden" /> 
			</div> 	
			 
		</div>	
		
		<div class="form-group form-group-lg">
	  	 <label class="col-sm-2 control-label" ><font color="red">*</font><strong>趋势子内容:</strong></label>
	 		 <div class="col-sm-6 "> 
	   		<textarea id="childplan" onchange="validateinput(this)" name="content" class="form-control"></textarea>
	   		 </div>
			<div class="col-sm-2 " >
			<span  style="color: red;" hidden="true" ><br>请输入子趋势内容!</span></div>
	   		
	   </div>
	   
	   <div class="form-group form-group-lg">
	     <label class="col-sm-2 control-label" ><font color="red">*</font><strong>关联面料:</strong></label>
			<div class="col-sm-2">
			<button type="button"  onclick="selectdiv(this)"  data-toggle="modal" data-target="#myModal" class="btn btn-primary  glyphicon glyphicon-plus ">关联面料</button>
			</div>			
	   </div>
	   <div class="form-group form-group-lg">
	     <label class="col-sm-2 control-label" ><strong></strong></label>
	     <div class="col-sm-6">
		     <div class="row">
		     <input type="hidden"  name="relationFabric" />
		     
		     </div>  
	     </div>	   
	   </div> 
	   <div class="form-group form-group-lg">
	     <label class="col-sm-2 control-label" ><strong></strong></label>
	     <div class="col-sm-2"></div>
	     <div class="col-sm-2">
		  	<button  type="button" class="btn btn-primary  glyphicon glyphicon-save pull-right " >保存</button>
		  	</div>
		   <div class="col-sm-1">
		  	<button  type="button" class="btn btn-primary  glyphicon glyphicon-remove pull-right" >删除</button>
		  	</div>	
		  	<div class="col-sm-1">
		  	<button  type="button" class="btn btn-primary  glyphicon glyphicon-off  pull-right" >收起</button>
		  	</div>	
	     </div>
	      </form>
	      </div>
	      
	    <div hidden="true">
	     <hr>
	     <div class="form-group form-group-lg">
	     <label class="col-sm-2 control-label" ><strong>子内容:</strong></label>
	     
		      
		  	<div class="col-sm-4">
		    	<input type="text" disabled="disabled" class="form-control" placeholder="趋势子标题" name="" />	    	
		  	</div> 
		  	<div class="col-sm-1">
		  	<button id="expandbutton" type="button" class="btn btn-primary  glyphicon glyphicon-open " >展开</button>
		  	</div>
		  	
		  	</div> 
		   
	   </div>   
	  
	   
	    
	</div>	
	
	
	<c:forEach items="${trendTopicVo.subTopics }" var="subTopic" varStatus="vs">
	<div id="${subTopic.id}child">
	<hr>
	<div id="${subTopic.id}" >
		<div class="form-group form-group-lg">
	     <label class="col-sm-2 control-label" ><strong>子内容:</strong></label>
	     
		      
		  	<div class="col-sm-4">
		    	<input type="text" disabled="disabled" class="form-control" placeholder="趋势子标题"  value="${ subTopic.title}"/>	    	
		  	</div> 
		  	<div class="col-sm-1">
		  	<button  type="button" class="btn btn-primary  glyphicon glyphicon-open " onclick="expand(${subTopic.id})">展开</button>
		  	</div>
		  	
		  	    
	   </div>   
	</div>
	
	<div id="${subTopic.id}s" class="showcontrol">
	<form  id="${subTopic.id}id">
	<hr>
		<div class="form-group form-group-lg">
		    <label class="col-sm-2 control-label required" for="exampleInputEmail2"><strong>趋势子标题:</strong></label>
		  	<div class="col-sm-4">
		  		<input type="hidden" value="${ subTopic.id}" name="id"/>
		  		<input type="hidden" value="${subTopic.parentId} " name="parentId"/>
		  		<input type="hidden" value="${ subTopic.status}" name="status">
		  		<input type="hidden" value="${ subTopic.isFabricRelation}" name="isFabricRelation">
		    	<input id="${subTopic.id}title"  onchange="validateinput(this)" type="text" class="form-control" placeholder="趋势子标题"  name="title" value="${subTopic.title}">
		  	</div>	
		  	<label class=" control-label" >最大支持40个字符(20个汉字)</label>  
		  	<span  style="color: red;" hidden="true" ><br>请输入合法趋势子标题!</span> 
	    </div>
		<div class="form-group form-group-lg">
		
			<label  class="col-sm-2 control-label required"><strong>子内容图片:</strong></label>
			<div class="col-sm-2">
			<button type="button" class="btn btn-success  glyphicon glyphicon-plus " onclick="addsubTopicImg(${vs.index });">添加图片</button>
			</div>
			<label class=" control-label" >当趋势为推荐状态，首个子内容必须上传3张图片 ；图片尺寸：420*750，图片格式：jpg、jpeg</label>  
		</div>	
		<div class="form-group form-group-lg">
			<label  class="col-sm-2 control-label"></label>s
			<div  id="childimg" class="col-sm-7 childimgs_${vs.index }">
			<input name="coverPics" type="hidden" />
		 
			<c:forEach items="${subTopic.coverPic }" var="info" >		
			<%-- <div class='col-md-2 del_box'><img  src='${ImageBaseUrl}${info}' style="width:100%;height:auto; "/><span class='js_del_spn js_del_spn1'><span></div>
			 --%>
			<script type="text/javascript">
			imagePicture.showPhotographUploadingSetStyleAndMeasure('childimgs_${vs.index }','${info}','85','151','420','750');
			</script>
			</c:forEach>
			</div> 	
			 
		</div>	
		
		<div class="form-group form-group-lg">
	  	 <label class="col-sm-2 control-label required" ><strong>趋势子内容:</strong></label>
			<div class="col-sm-6 " >
	   		<textarea id="childplan"  onchange="validateinput(this)" name="content" class="form-control">${subTopic.content }</textarea>
	   		</div>
	     <div class="col-sm-2 " ><span  style="color: red;" hidden="true" ><br>请输入趋势子内容!</span></div>
	   </div>
	   
	   <div class="form-group form-group-lg">
	     <label class="col-sm-2 control-label required" ><strong>关联面料:</strong></label>
	     
			<div class="col-sm-2">
			<button type="button"  onclick="selectdiv(this)"  data-toggle="modal" data-target="#myModal" class="btn btn-primary  glyphicon glyphicon-plus ">关联面料</button>
			</div>			
	   </div>
	   <div class="form-group form-group-lg">
	     <label class="col-sm-2 control-label" ><strong></strong></label>
	     <div class="col-sm-6">
		     <div id="${subTopic.relationFabric}fabric" class="row relationfabirc">
		     <input  type="hidden"  name="relationFabric"  value="${subTopic.relationFabric}"/>
		     
		     </div>  
	     </div>	   
	   </div>   
	     <div class="form-group form-group-lg">
	     <label class="col-sm-2 control-label" ><strong></strong></label>
	     <div class="col-sm-3"></div>
	     <div class="col-sm-1">
		  	<button  type="button" class="btn btn-primary  glyphicon glyphicon-save pull-right" onclick="updatesubtopic(${subTopic.id})">保存</button>
		  	</div>
		   <div class="col-sm-1">
		  	<button  type="button" class="btn btn-primary  glyphicon glyphicon-remove pull-right " onclick="deletesubtopic(${subTopic.id})">删除</button>
		  	</div>	
		  	<div class="col-sm-1">
		  	<button  type="button" class="btn btn-primary  glyphicon glyphicon-off  pull-right" onclick=" contenthide(${subTopic.id})">收起</button>
		  	</div>	
	     </div>
	  </form>
	</div>	
	</div>
	</c:forEach>
	
	
	</div>
	
	
	<form  class="form-horizontal" >
	<hr>
	<input id="imgHeadPath"type="hidden" value="${imgHeadPath}"/>
	<input id="ImageBaseUrl"type="hidden" value="${ImageBaseUrl}"/>	
	<input  id="variable2" type="hidden"/>
	   <div class="form-group form-group-lg">
	    	<label class="col-sm-2 control-label" ></label>
		   <div class="col-sm-2">
		   <button type="button" onclick="addchildcontent()" class="btn btn-success  glyphicon glyphicon-plus ">添加子内容</button>
		   </div>
		    <div class="col-sm-4">
		   <button type="button" onclick="returnToList()"  class="btn btn-primary  glyphicon glyphicon-list pull-right">返回列表</button>
		   </div>
		   
	   </div>
	   
	  
	  
	  </form>

</div>


<!-- 查询 模框-->
<div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
 
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">选择面料</h4>
      </div>
      <div class="modal-body">          
       <fieldset>
			<legend>面料基本信息</legend>
					<div   id="searchcase">
					<div class="row">
						<div class="col-md-2">
			      			<label class='required'>商品一级分类：</label> <br>
			      			<select class="form-control" id="categoryId" name="s_categoryId" >
							
							</select>
							<!-- <input type="text" class="form-control" placeholder="商品大类"  name="categoryId" id="categoryId" > -->
		      			</div>
			      		<div class="col-md-2">
			      			<label class='required'>二级分类：</label><span role = 'message' for='classificationId'></span><br> 
							<!-- <input type="text" class="form-control" placeholder="一级品类"  name="classificationId" id="classificationId"> -->
							<select class="form-control" id="classificationId" name="s_classificationId">
							
							</select>
			      		</div>
			      		<div class="col-md-2">
			      			<label class='required'>三级分类：</label><span role = 'message' for='subClassificationId'></span><br>
							<!-- <input type="text" class="form-control" placeholder="二级品类"  name="subClassificationId" id="subClassificationId"> -->
	                        <select class="form-control" id="subClassificationId" name="s_subClassificationId">
							
							</select>
			      		</div>
			      		
					
			      		<div class="col-md-2">
						是否精品：<span role = 'message' for='isBoutique' ></span><br>
						<select class="form-control" name='s_isBoutique' id="isBoutique">
							<option value=''selected="selected">全部</option>
							<option value='0'>非精品</option>
							<option value='1'>精品</option>					
						</select>
						
					</div>
			      		
			      		<div class="col-md-3" >
								面料编号：<br>
							<input type="text" name="s_skuNo" class="form-control" placeholder="面料编号">
						</div>
			      	</div>
			      	<div class="row">
					<div class="col-md-2">
						适用人群：<br>
						<select class="form-control" name='s_suitableCrowdId' >
							<option value=''selected="selected">全部</option>
							<option value='121'>男装</option>
							<option value='122'>女装</option>
							<option value='123'>童装</option>
							<option value='124'>通用</option>
						</select>
						
					</div>
					<div class="col-md-2">
						适用款式：<br>
						<select class="form-control" name='s_suitableStyle' >
							<option value=''selected="selected">全部</option>
							<option value='71'>夹克   		</option>
							<option value='72'>棉衣/羽绒服   </option>
                        	<option value='73'>衬衫       </option>
							<option value='74'>T恤       </option>
							<option value='75'>卫衣       </option>
							<option value='76'>套装       </option>
							<option value='77'>亲子装      </option>
                        	<option value='78'>情侣装      </option>
							<option value='79'>风衣       </option>
							<option value='80'>斗篷/披肩    </option>
							<option value='81'>大衣       </option>
							<option value='82'>套衫       </option>
                        	<option value='83'>吊带       </option>
							<option value='84'>抹胸       </option>
							<option value='85'>背心       </option>
							<option value='86'>长裤       </option>
							<option value='87'>西装       </option>
                        	<option value='88'>短裤       </option>
							<option value='89'>连衣裤      </option>
							<option value='90'>背带裤      </option>
                        	<option value='91'>半身裙      </option>
							<option value='92'>连衣裙      </option>
							<option value='93'>背带裙      </option>
							<option value='364'>其他      </option>				
						</select>
						
					</div>
					<div class="col-md-2">
						印花：<br>
						<select class="form-control" name='s_pringtingStyleId' >
							<option value=''selected="selected">全部</option>
							<option value='94'>民俗部落</option>
							<option value='95'>植物图案</option>
							<option value='96'>几何图案</option>
							<option value='97'>色彩拼贴</option>
							<option value='98'>动物图案</option>
							<option value='99'>风景图案</option>
							<option value='100'>科技数码</option>
							<option value='101'>条纹图案</option>
							<option value='102'>文字图案</option>
							<option value='103'>迷彩</option>
							<option value='104'>扎染/渐变</option>
							<option value='105'>佩斯利</option>
							<option value='106'>人物图案</option>
							<option value='107'>圆点花纹</option>
							<option value='108'>夏威夷图案</option>
							<option value='109'>其他</option>					
						</select>	
					</div>
					<div class="col-md-2">
						色系：<br>
						<select class="form-control" name='s_colorSeriesId'>
							<option value=''selected="selected">全部</option>
							<option value='110'>红色 </option>
							<option value='111'>橙色 </option>
							<option value='112'>黄色 </option>
							<option value='113'>绿色 </option>
							<option value='114'>蓝色 </option>
							<option value='115'>紫色 </option>
							<option value='116'>无彩色</option>
							<option value='451'>玫红</option>
							<option value='452'>黑色</option>
							<option value='453'>白色</option>
							<option value='454'>米色</option>
							<option value='455'>灰色</option>
							<option value='456'>驼色</option>
							<option value='457'>粉色</option>
							<option value='458'>藏青</option>					
						</select>	
					</div>	
					<div class="col-md-2"></div>
					<div class="col-md-2">
							<br>
							<a href="javascript:void(0)" class="btn btn-primary glyphicon glyphicon-search" type="button" onclick="postSerach();" >查询</a>
			      	</div>
			      	</div>
			      	</div>
			      	</fieldset>
			      	 <fieldset>
						 <legend>已选中商品</legend>
						<div class="row">
			            <div  class="col-md-10">
			            <div   id="selectedfabric" class="row"></div>
			            </div>
						<div class="col-md-2">
							<br>
							<a href="javascript:void(0)" class="btn btn-success glyphicon glyphicon-plus" type="button" onclick="addTodiv();" >关联</a>
						
			      	</div>
			      	</div>
			 
					 
					 </fieldset>
					 
			      	
					 <fieldset>
						 <legend>商品列表</legend>
			 
						 <div id="fbriclist">
					
						 </div>
						 <div style="clear: both">
						 </div>
						 
						 <div  class="pages" >
					        <div  style="margin-left: 160px;"id="Pagination">
					        </div>              
   						 </div>
						 
						
   						 
						 <div id="variable" hidden="true"></div>
						
					 
					 </fieldset>
					
			 </div>	      	      
       
      </div>
     
    </div>
  </div>

<script type="text/javascript">
    var childcontent=$("#childcontent").html(); 
    var contentList =$("#contentList").html();
	var divid=0;
	$(function(){
		loadSelCategory() ;
		postSerach();
		$("#childcontent").remove();
	    $("#contentList").remove();
	    initPlanningType();
	    radioChecked();
	    $(".showcontrol").hide();
	    initfabric();
	    var toptrendpic=$("#imgtopicinput").val();
	    imagePicture.showPhotographUploadingSetStyleAndMeasure('imgtopicdiv',toptrendpic,'125','71','770','440');
		});	
	   
	    
	    
	    
	
	
</script>

