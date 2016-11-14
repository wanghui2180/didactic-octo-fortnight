$(function(){
	$("#submitForm").on("click",".del_box>.js_del_spn1",function(){		
		var inputval=$(this).parent().parent().parent().find('input[name=coverPic]').val();
		if(inputval!=undefined && inputval!=""){
			var ImageBaseUrl=$("#ImageBaseUrl").val();
			var imgpath=$(this).parent().find('img').attr('src').replace(ImageBaseUrl,'');
			var replace=inputval.replace(imgpath,'');
			$(this).parent().parent().parent().find('input').val(replace);
		}
		$(this).parent().remove();
	});
	
$("#myModal").on("click",".del_box>.js_del_spn2",function(){
		$(this).parent().remove();
	});
	
	
$("#submitForm").on("click",".del_box>.js_del_spn2",function(){
		var ids=$(this).parent().parent().children('input').val();	
		if(ids!=undefined && ids!=""){
		 var id=$(this).parent().attr('id'); 
		 var idsArray=new Array();
		 idsArray=ids.split(",");
		 for(var i=0;i<idsArray.length;i++){
			 if(id==idsArray[i]){
				 idsArray.splice(i,1);
			 }
		 }
		 var idsNew=idsArray.join(",");
		 $(this).parent().parent().children('input').val(''+idsNew+'');		
		}		
		 $(this).parent().remove();
		
	});
	
});
function initfabric(){
	var length=$('.relationfabirc').length;
	
	for (var i = 0; i < length; i++) {
		var skuIds=$($('.relationfabirc')[i]).find('input').val();
		
			$.ajax({
				url		:	context.contextPath +'/fabric/findskuByskuIds/' ,
				method	:	'get' ,
				data    :{skuIds:skuIds},
				success	:	showfabric(i),
				dataType:	'json',
				contentType	: 	'application/json;charset=UTF-8'
			});
			
			
		
		
	}
	
}
/**
 * 解决异步问题 修改页带出关联；商品
 * @param id 
 * @returns {Function}
 */
function showfabric(id){
	var ImageBaseUrl=$("#imgHeadPath").val();
	var callback=function( rs , staus , xmlRequest ){
		if( rs.code == 0 ){	
			var skulength=rs.data.length;
			for (var s = 0; s <skulength; s++) {
				$($('.relationfabirc')[id]).append('<div id="'+rs.data[s].skuId+'" class="col-md-2 del_box"  ><span class="js_del_spn  js_del_spn2"></span> <img  style="width:100%;height:auto; " src="'+ImageBaseUrl+rs.data[s].imagePaths[0]+'"></img><nobr><p style="text-overflow:ellipsis;overflow:hidden;" >'+rs.data[s].fabricTitle+'</p></nobr></div>');						

			}
		}		
	}
	return callback;
}



var TT = TAOTAO = {
	// 编辑器参数主趋势上传图片
	kingEditorParams1 : {
		//指定上传文件参数名称
		filePostName  : "files",
		//指定上传文件请求的url。
		uploadJson :context.contextPath +'/file/uploadimg?imgSize=1&type=1&token='+findTokenFromCookie(),
		//上传类型，分别为image、flash、media、file
		dir : "image"
	},
	//自趋势上传图片
	kingEditorParams2 : {
		//指定上传文件参数名称
		filePostName  : "files",
		//指定上传文件请求的url。
		uploadJson :context.contextPath +'/file/uploadimg?imgSize=2&type=1&token='+findTokenFromCookie(),
		//上传类型，分别为image、flash、media、file
		dir : "image"
	},
	init : function(data){
    	// 初始化图片上传组件
    	this.initPicUpload(data);
    },
	initPicUpload : function(data){
    	$(".picFileUpload").each(function(i,e){
    		var _ele = $(e);
    		//_ele.siblings("div.imgdiv").remove();
    		_ele.parent().parent().after('\
    				<div class="form-group form-group-lg"><label  class="col-sm-2 control-label"></label><div class="col-sm-6 imgdiv">\
        		</div>	\
        		</div>');
    		
  
    		// 回显图片
        	/*if(data && data.pics){
        		var imgs = data.pics.split(",");
        		for(var i in imgs){
        			if($.trim(imgs[i]).length > 0){
        				_ele.siblings(".pics").find("ul").append("<li><a href='"+imgs[i]+"' target='_blank'><img src='"+imgs[i]+"' width='80' height='50' /></a></li>");
        			}
        		}
        	}*/
        	//给“上传图片按钮”绑定click事件
        	$(e).click(function(){
        		var form = $(this).parentsUntil("form").parent("form");
        		//打开图片上传窗口
        		KindEditor.editor(TT.kingEditorParams).loadPlugin('multiimage',function(){
        			var editor = this;
        			editor.plugin.multiImageDialog({
						clickFn : function(urlList) {
							var imgArray = [];
							KindEditor.each(urlList, function(i, data) {
								imgArray.push(data.url);
								form.find(".imgdiv").append("<div class='col-md-2'><img src='"+data.url+"' width='100' height='100' /></div>");
							});
							form.find("[name=image]").val(imgArray.join(","));
							editor.hideDialog();
						}
					});
        		});
        	});
    	});
    }
}

function addTopicImg(){
	var count=imagePicture.multigroupAssignUploadingRestrainCount('imgtopicdiv');
	if(parseInt(count)==0){
		//imgtopicdiv
		imagePicture.tripletonMarginPhotographUploadingSetStyleAndMeasure('imgtopicdiv','125','71','770','440');
	}
}

/*
function addTopicImg(){	
	var ImageBaseUrl=$("#ImageBaseUrl").val();
	//打开图片上传窗口
	KindEditor.editor(TT.kingEditorParams1).loadPlugin('multiimage',function(){
		var editor = this;
		editor.plugin.multiImageDialog({
			clickFn : function(urlList) {
				var imgArray = [];
				KindEditor.each(urlList, function(i, data) {
					imgArray.push(data.url);
					$(".imgtopicdiv").html("<div class='col-md-2 del_box'><img   src='"+ImageBaseUrl+data.url+"' style='width:100%;height:auto;' /><span class='js_del_spn js_del_spn1'><span></div>");
				});
				var imgArraylength=imgArray.length;
				$("#imgtopicinput").val(imgArray[imgArraylength-1]);
				editor.hideDialog();
			}
		});
	})
}*/

function addsubTopicImg(obj){	
	
	//childimgs_
	var count=imagePicture.multigroupAssignUploadingRestrainCount("childimgs_"+obj);
	if(count<3){
		imagePicture.tripletonMarginPhotographUploadingSetStyleAndMeasure("childimgs_"+obj,'85','151','420','750');
	}
}
/*function addsubTopicImg(obj){	
	var ImageBaseUrl=$("#ImageBaseUrl").val();
	//打开图片上传窗口
	var children=$(obj).parent().parent().next().children('div');
	KindEditor.editor(TT.kingEditorParams2).loadPlugin('multiimage',function(){
		var editor = this;
		editor.plugin.multiImageDialog({
			clickFn : function(urlList) {
				var imgArray = [];
				KindEditor.each(urlList, function(i, data) {
					if(children.children().length>3){
						children.children('div').first().remove();
					}
					children.append("<div class='col-md-2 del_box'><img   src='"+ImageBaseUrl+data.url+"' style='width:100%;height:auto; ' /><span class='js_del_spn js_del_spn1'><span></div>");
				});
				editor.hideDialog();
			}
		});
	})
}

*/
function addOrupdatetopic(id){
	var parentId=$("#"+id+"parentId").val();
	var subTopicId=$("#"+id+"subTopicId").val();
	if(parentId==null||parentId==""){
		var trendtopicVoId=$("#trendtopicVoId").val();
		$("#"+id+"parentId").val(""+trendtopicVoId+"");
			
	}
	
	//var ImageBaseUrl=$("#ImageBaseUrl").val();
	var title=$('#'+id+'id').find('input[name=title]').val();
	var textarea=$('#'+id+'id').find('textarea').val();
	var relationFabric =$('#'+id+'id').find('input[name=relationFabric]').val();

	var len=title.length;     
    for (var i  = 0;i < len;i++) {	    	
    	if(title.charCodeAt(i)>255){
    		len=len+1;
    	}
    	
    }
	if(title==""||len>40){	
		// alert("请输入标题");
		$('#'+id+'id').find('input[name=title]')[0].focus();
		$($('#'+id+'id').find('span')[0]).show();
		 return ;
	 }
	
	if(textarea==""){
		$('#'+id+'id').find('textarea').focus();
		$('#'+id+'id').find('textarea').parent().next().children().show();
		return ;
	}
	 var childImgDivStr=$('#'+id+'id').find('div[id=childimg]').attr('class');
	 var className=childImgDivStr.substring(9,childImgDivStr.length);
	 var length= picture.prototype.multigroupAssignUploadingSucceed(className);
		if(length<2){	
				 alert("请添加至少两张子内容图片！")
				 return ;
	   }
	var radios = document.getElementsByName("promotion");	
	var fabricArray=[];
	 fabricArray=relationFabric.split(',');
	 if(fabricArray.length<length){
		alert("请关联面料！（面料数至少为图片数）")
		return ;
	 }
	var imgpathArray=picture.prototype.multigroupRubberRelatively(className);//获取图片相对路径
	$('#'+id+'id').find('input[name=coverPics]').val(imgpathArray);
	if(subTopicId==null||subTopicId==""){
		$.post(context.contextPath+"/cms/planning/addTrendSubTopic",$("#"+id+"id").serialize(), function(data){			
			if(data.code == 0){	
           $("#"+id+"subTopicId").val(""+data.data+"");
				alert('添加成功');
			}else{
				
			}
		},'json');	
	}else{
		
		updatesubtopic(id);
	}
		
	
}


function deleteOrremovepic(id){
	var subTopicId=$("#"+id+"subTopicId").val();
	if(subTopicId==null||subTopicId==""){
		
		movecontent(id);
	}else{
		deleteNewSubtopic(id);
	}
}



function deleteNewSubtopic(id){
	var subId=$("#"+id+"subTopicId").val();
   mConfirm("确定要删除该子内容吗?"  , function(){
		
		$.post("../planning/deletesubtopic",{id:subId},function (data){
			
			if(data.code == 0){
				movecontent(id);
				alert("删除成功");
			}
					
	},'json'
		)
		
	})
	
}

function movecontent(id){
$("#"+id+"child").remove();
}
function deletesubtopic(id){
mConfirm("确定要删除该子内容吗?"  , function(){
		
		$.post("../planning/deletesubtopic",{id:id},function (data){
			
			if(data.code == 0){
				movecontent(id);
				alert("删除成功");
			}
					
	},'json'
		)
		
	})
}

function preupdate(){
	 var ImageBaseUrl=$("#ImageBaseUrl").val();
	var picDiv=$('div[class=col-sm-7]');
	 var picDivLength = $('div[class=col-sm-7]').length;
	 for (var i = 0; i < picDivLength; i++) {
		 var imgpathsarray=[];
		 var input= $(picDiv[i]).children("input[name=coverPics]")
		 var imglength=$(picDiv[i]).find('img').length;
		 var imgs=$(picDiv[i]).find('img');
		 if(imglength==0){
			 alert("请添加子内容图片")
			 return ;
		 }
		 for (var j= 0; j < imglength; j++) {
			 var imgpath=$(imgs[j]).attr('src');
			 imgpath= imgpath.replace(ImageBaseUrl,"");
			 imgpathsarray.push(imgpath);
		}
		 var imgpaths=imgpathsarray.join(',');
		 input.val(''+imgpaths+'');
		}
}

function updatesubtopic(id){
	
	var title=$('#'+id+'id').find('input[name=title]').val();
	var textarea=$('#'+id+'id').find('textarea').val();
	var relationFabric =$('#'+id+'id').find('input[name=relationFabric]').val();
	
	var len=title.length;     
    for (var i  = 0;i < len;i++) {	    	
    	if(title.charCodeAt(i)>255){
    		len=len+1;
    	}
    	
    } 
	if(title==""||len>40){	
		// alert("请输入标题");
		$('#'+id+'id').find('input[name=title]')[0].focus();
		$($('#'+id+'id').find('span')[0]).show();
		 return ;
	 }	
	if(textarea==""){
		$('#'+id+'id').find('textarea').focus();
		$('#'+id+'id').find('textarea').parent().next().children().show();
		return ;
	}
	 var childImgDivStr=$('#'+id+'id').find('div[id=childimg]').attr('class');
	 var className=childImgDivStr.substring(9,childImgDivStr.length);
	 var length= picture.prototype.multigroupAssignUploadingSucceed(className);
		if(length<2){	
				 alert("请添加至少两张子内容图片！")
				 return ;
	   }
	var fabricArray=[];
	 fabricArray=relationFabric.split(',');
	 if(fabricArray.length<length){
		alert("请关联面料！（面料数至少为图片数）")
		return ;
	 }
	 
	var imgpathArray=picture.prototype.multigroupRubberRelatively(className);//获取图片相对路径
	var join=imgpathArray.join(",");
	$('#'+id+'id').find('input[name=coverPics]').val(join);
	
	var coverPics=$('#'+id+'id').find('input[name=coverPics]').val();
	var radios = document.getElementsByName("promotion");    
    
	
	
	$.post(context.contextPath+"/cms/planning/updateTrendSubTopic",$("#"+id+"id").serialize(), function(data){			
		if(data.code == 0){
			alert('修改成功');
		}
	},'json');
	
}




function saveTrendTopic(){
	//var ImageBaseUrl=$("#ImageBaseUrl").val();
	 var title= $("input[name=title]").val();
	 var planning=$("#planning").val();
	 var length= picture.prototype.multigroupAssignUploadingSucceed("imgtopicdiv");
	 if (length<1){
		 alert("请上传趋势题图！");
		 return;
	 }
	 var imgtopicinput=$("#imgtopicinput").val(picture.prototype.multigroupRubberRelatively("imgtopicdiv"));//将题图地址放入input中
	 var len=title.length;     
	    for (var i  = 0;i < len;i++) {	    	
	    	if(title.charCodeAt(i)>255){
	    		len=len+1;
	    	}
	    	
	    } 
	 
	 if(title==""||len>36){	
			// alert("请输入标题");
			 $("input[name=title]")[0].focus();
			$("#titlespan").show();
			 return ;
		 }
	if(planning==""||planning==undefined){
		$("#planning")[0].focus();
		$("#planning").parent().parent().find('span').show();
		return ;
	}
	
	
    /*var key="/app/"
	var index = imgtopicinput.indexOf(key);
	if(index>1){
		var result = imgtopicinput.substr(index + 5,imgtopicinput.length);
		$("#imgtopicinput").val(result);
		
	}*/
	
	
	 $.post(context.contextPath+"/cms/planning/updateTrendTopic",$("#trendTopicForm").serialize(), function(data){			
			if(data.code == 0){
				alert('修改成功');
			}
		},'json');
}

function expand(id){
	$("#"+id+"").hide();
	$("#"+id+"s").show();
}

function contenthide(id){
	
    var input=$("#"+id+"")[0].getElementsByTagName("input")[0];
    var idtitle=id+"title";
    var any=$("#"+idtitle+"").val();
    if(any==""||any==undefined){
    any =$("#"+id+"s").find('input[name=title]').val();
    }
    if(any==""||any==undefined){
        any =$("#"+id+"s").find('input[self=title]').val();    	
    }
    if(any==""||any==undefined){
    	any="";
    }
    $(input).val(""+any+"")
	$("#"+id+"").show();	
	$("#"+id+"s").hide();
}


function radioChecked(){
	var radiovalue=$("#radioValue").val();
	if(radiovalue==1){
		$("#promotion1").attr("checked","checked");
		$("#promotion2").removeAttr("checked");
	}
}


function returnToList(){
	mConfirm("确定?"  , function(){
		self.location=context.contextPath+"/cms/planning/list";
		//window.location.href="";
	})
}

function activebutton(obj){
	var disabled=$(obj).parent().parent().next().children('button').attr('disabled');	
	if(disabled=="disabled"){
		
		$(obj).parent().parent().next().children('button').removeAttr('disabled');
	}
	
}
function disactivebutton(obj){
	var disabled=$(obj).parent().parent().next().children('button').attr('disabled');
	if(disabled!="disabled"){
		
		$(obj).parent().parent().next().children('button').attr('disabled','disabled');
	}
}


function addchildcontent(){
	
	var as=childcontent;
	var bs=$("<div>"+as+"</div>");
	var arr=bs[0].getElementsByTagName("input");
	var elementById=bs[0].getElementsByTagName("button");
	var imgDIV=bs.find("div[id=childimg]");
	//imgDIV=bs[0].getElementById("");
	var elength=elementById.length;
	imgDIV.attr('class','col-sm-7 childimgs_'+(divid+1000));//图片框class加上编号
	$(elementById[elength-1]).attr("onclick","expand("+divid+")")
	$(elementById[elength-2]).attr("onclick","contenthide("+divid+")")
	$(elementById[elength-3]).attr("onclick","deleteOrremovepic("+divid+")")
	$(elementById[elength-4]).attr("onclick","addOrupdatetopic("+divid+")")
	$(elementById[0]).attr("onclick","addsubTopicImg("+(divid+1000)+")")
	$(bs.children("div")[0]).attr("id",""+divid+"s")
	$(bs.children("div")[1]).attr("id",""+divid+"")
	bs.children('div').children('form').children("input[name=parentId]").attr("id",""+divid+"parentId")
	bs.children('div').children('form').children("input[name=id]").attr("id",""+divid+"subTopicId")
	
	var form = bs[0].getElementsByTagName("form")[0];
	$(form).attr("id",""+divid+"id")
	$('#submitForm').append('<div id="'+divid+'child">'+bs.html()+'<div>');
	
	
	/*var last=$('form:first').children('div').last();
	var textarea=last.find('textarea');
	var	itemAddEditor = TAOTAO.createEditor(textarea);
	itemAddEditors.push(itemAddEditor);*/
	divid=divid+1;
}

function addChildcontents(){
	
	var as=childcontent;
	var bs=$("<div>"+as+"</div>");
	var arr=bs[0].getElementsByTagName("input");
	var elementById=bs[0].getElementsByTagName("button");
	var elength=elementById.length;
	var imgDIV=bs.find("div[id=childimg]");
	imgDIV.attr('class','col-sm-7 childimgs_'+(divid+1000));//图片框class加上编号
	$(elementById[elength-1]).attr("onclick","expand("+divid+")")
	$(elementById[elength-2]).attr("onclick","contenthide("+divid+")")
	$(elementById[elength-3]).attr("onclick","movecontent("+divid+")")
	$(elementById[0]).attr("onclick","addsubTopicImg("+(divid+1000)+")")
	$(bs.children("div")[0]).attr("id",""+divid+"s")
	$(bs.children("div")[1]).attr("id",""+divid+"")
	var form = bs[0].getElementsByTagName("form")[0];
	$(form).attr("id",""+divid+"id")
	
	
	var textarea=bs[0].getElementsByTagName("textarea");
	$(textarea).attr("name","TrendSubTopicVo["+divid+"].content");
	for(var a=0;a<arr.length;a++){
		
		 var prename=$(arr[a]).attr('name');
		 var newname=prename.replace("index",""+divid+"");
		 $(arr[a]).attr('name',newname);
	};
	$('#submitForm').append('<div id="'+divid+'child">'+bs.html()+'<div>');
	
	
	/*var last=$('form:first').children('div').last();
	var textarea=last.find('textarea');
	var	itemAddEditor = TAOTAO.createEditor(textarea);
	itemAddEditors.push(itemAddEditor);*/
	divid=divid+1;
}




(function(win) {
	var postDT = {
		parseDT : function(sSource, aoData, fnCallback) {
			$("[name^='s_']").each(function() {
				var name = $(this).attr("name");
				var value = $(this).val();
				aoData.push({
					"name" : name,
					"value" : value
				});
			});
			$.ajax({
				url : sSource,
				type : "post",
				async : true,
				data : aoData,
				success : function( rs , status , xmlRequest ){
					if( rs.code == 0 ){
						
						fnCallback(rs);
					}else{
						fnCallback({});
						msgAlert( false , rs.message , 5000 ) ;
					}
				},
				dataType : "json",
			});
		}
	};
	win.util = postDT;
})(window);

function callback(data){
	var imgHeadPath=$("#imgHeadPath").val();
	$("#fbriclist").html("");
	var dataLength= data.data.aaData.length;
	
	for(var i=0;i<dataLength;i++){		
		var fabrictitle= data.data.aaData[i].fabricTitle;
		if(fabrictitle==undefined){
			fabrictitle="";
		}
		if( i % 6 == 0 && i > 0  ){
			$("#fbriclist").append("<div class='row'>") ;
		}
		$("#fbriclist").append("  <div class='col-sm-2' style='border:solid 1px white ;'>" +
				"  <div  onclick='addToList(this);' name='"+fabrictitle+"'" +
				"  price='"+data.data.aaData[i].samplePrice+"'   ids='"+data.data.aaData[i].skuId+"'" +
						"img='"+imgHeadPath+data.data.aaData[i].imagePaths[0]+"'" +
						"> <img class='destye' src=' "+imgHeadPath+data.data.aaData[i].imagePaths[0]+"' style='width:100%;height:auto;'  alt=''/> </div>	" +		
				"  " +
				" <p >"+fabrictitle+"</p> " +
				" <p '>￥"+data.data.aaData[i].samplePrice+"/米</p> </div></div>")					
		}
		if( i % 6 == 0&& i > 0  ){
			$("#fbriclist").append("</div>") ;
		}

	var title=parseInt((data.data.iTotalDisplayRecords+data.data.iDisplayLength-1)/data.data.iDisplayLength) ;	
	 $("#variable2").attr("total",title);
	
}


function postSerach(){	
    serach(null);	
	setTimeout(function(){initpage();},800);	
}


function serach(currentpage){
	if(currentpage==null){
		currentpage=1;
	}
	var pagesize=12;
	var param = [] ;
	var pagestart=pagesize*(currentpage-1);
	param.push({"name":'iDisplayStart' ,"value": pagestart }) ;
	param.push({"name":'iDisplayLength' ,"value": pagesize } ) ;
	param.push({"name":'s_status' ,"value": 4 } ) ;
	param.push({"name":'s_spuStatus' ,"value": 1 } ) ;
	
	util.parseDT(context.contextPath + '/fabric/sku/queryList', param , callback);
	
	
}


function initpage(){
	//alert($("#variable2").attr('total'));
    $("#Pagination").pagination($("#variable2").attr('total'),{num_edge_entries:2,callback:selectcallback});
		
}

function selectcallback(id,jq){
	serach(id+1);
}

/**
 * 添加商品到已选中列表中
 */
function addToList(obj){
	var path=$(obj).attr('img');
	var id=$(obj).attr('ids');
    var name=$(obj).attr('name');
    
    //判断选中列表中的商品与当前选中的商品是否重复
    var length=$("#selectedfabric").children('div').length;
    if(length>0){
		for(var i=0;i<length;i++){
			ith=i+1
			  var attrid=$("#selectedfabric div:nth-child("+ith+")").attr('id');
			  if(id==attrid){
				  return;
			  }
		  }
    }
    //判断当前子内容的关联商品与当前选中的商品是否重复
    var length1=$("#isselected").children('div').length;
    if(length1>0){
		for(var i=0;i<length1;i++){
			ith=i+2
			  var attrid=$("#isselected div:nth-child("+ith+")").attr('id');
			  if(id==attrid){
				  return;
			  }
		  }
    }
    
	$("#selectedfabric").append('<div id="'+id+'" class="col-md-2 del_box"  ><span class="js_del_spn  js_del_spn2"></span><img  style="width:100%;height:auto; " src="'+path+'"></img><nobr><p style="text-overflow:ellipsis;overflow:hidden;" >'+name+'</p></nobr></div>');
   
}

/**
 * 添加商品到子内容中
 */
function addTodiv(){
	
	var ids=$("#isselected > input").val();
	var children=$("#selectedfabric").children('div');
	for(var i=0;i<children.length;i++){
		var id=$(children[i]).attr('id');
		if(ids==""||ids==null){
			ids=id;
		}else{
		ids=ids+","+id;
		}
		
		//$(children[i]).attr('onclick','cancelfabricAndId(this)');	
		
	}
	var html=$("#selectedfabric").html();
	$("#isselected").append(html);
	$("#isselected > input").val(''+ids+'');
	$("#selectedfabric").html('');
	$("#myModal").modal('hide');
	
}




/*function GetUnique(inputArray)
{
    var outputArray = [];
     
    for (var i = 0; i < inputArray.length; i++)
    {
        if ((jQuery.inArray(inputArray[i], outputArray)) == -1)
        {
            outputArray.push(inputArray[i]);
        }
    }
    
    return outputArray;
}*/
function initPlanningType(){
	$.ajaxInvoke({
		url		:	context.contextPath +'/basedata/queryListByType' ,
		method	:	'get' ,
		data	:	{type:'22'},
		success	:	function( rs , staus , xmlRequest ){
			if( rs && rs.code == 0 ){
				var length = rs.data.length;
				for (var int = 0; int <length; int++) {
					$("#planningType").append('<option value="'+rs.data[int].dictionaryId+'">'+rs.data[int].dictionaryName+'</option>')
				}
			var categoryId=$("#categoryIdInput").val();	
			if(categoryId!=null){
				var optionlength = $("#planningType option").length;
				for (var i = 0; i < optionlength; i++) {
					var optionId=$($("#planningType option")[i]).val();
					if(categoryId==optionId){
						$($("#planningType option")[i]).attr("selected","selected");
					}
					
				}
			}
				return ;
			}
		},
		dataType:	'json',
		contentType	: 	'application/json;charset=UTF-8'
	});
}


 function selectdiv(obj){
	 $("#isselected").removeAttr('id');
	 var div=$(obj).parent().parent().next().children('div[class=col-sm-6]');
	 div.children().attr('id','isselected');
	
}
 
 function cancelfabric(id){	 
	 $("#"+id+"").remove();
	 	 
 }
 
 function cancelfabricAndId(obj){
	 var id=$(obj).attr('id');
	 var ids=$(obj).parent().children('input').val();
	 var idsArray=new Array();
	 idsArray=ids.split(",");
	 for(var i=0;i<idsArray.length;i++){
		 if(id==idsArray[i]){
			 idsArray.splice(i,1);
		 }
	 }
	 var idsNew=idsArray.join(",");
	 $(obj).parent().children('input').val(''+idsNew+'');
	 $(obj).remove();	 
 }
 
 
 function validateinput(obj){
	 var val=$(obj).val();
	 if(val!=""||val!=undefined){
		 $(obj).parent().parent().find('span').hide();
	 }
 }
 
 

 
 
 function preSubmit(data){ 
	var ImageBaseUrl=$("#ImageBaseUrl").val();
	 var title= $("input[name=title]").val();
	 var length= picture.prototype.multigroupAssignUploadingSucceed("imgtopicdiv");
	 if (length<1){
		 alert("请上传趋势题图！");
		 return;
	 }
	 var imgtopicinput=$("#imgtopicinput").val(picture.prototype.multigroupRubberRelatively("imgtopicdiv"));//将题图地址放入input中
	 var textarealength =$("textarea").length;
	 var relationFabric =$(".relationFabric").length;
	 var subtitlelength =$(".subtitle").length;
	 
	 
	 
    var len=title.length;     
    for (var i  = 0;i < len;i++) {	    	
    	if(title.charCodeAt(i)>255){
    		len=len+1;
    	}
    	
    } 
    if(len > 36)  {
    	 $("input[name=title]")[0].focus();
    	 $("#titlespan").show();
    	  return ;
    }
    
	 
	 if(title==""){	
		// alert("请输入标题");
		 $("input[name=title]")[0].focus();
		$("#titlespan").show();
		 return ;
	 }
	 for (var i = 0; i < subtitlelength; i++) {
		var val= $($(".subtitle")[i]).val();
		var sublen=val.length;     
	    for (var j  = 0;j < sublen;j++) {	    	
	    	if(val.charCodeAt(j)>255){
	    		sublen=sublen+1;
	    	}  	
	    } 	
		 if(val==""||val==undefined||sublen>40){
			 $(".subtitle")[i].focus();
			 $($(".subtitle")[i]).parent().parent().find('span').show();
			 return ;
		 }
		
	}
	 
	 for (var i = 0; i < textarealength; i++) {
		 var text =$($("textarea")[i]).val();
		 if(text==""||text==undefined){
			 $("textarea")[i].focus();
			$( $("textarea")[i]).parent().parent().find('span').show();
			 return ;
		 }
		
	}
	 
	 
	 //将图片的地址拼接，并放入input中做提交准备
	 var picDiv=$('div[id=childimg]');
	 var picDivLength =$('div[id=childimg]').length;
	 if(picDivLength==0){
		alert("请添加子趋势");
		return; 
	 }
	 for (var i = 0; i < picDivLength; i++) {
		 var imgpathsarray=[];
		 var input= $(picDiv[i]).children("input[name^='TrendSubTopicVo']")
		 //var imglength=$(picDiv[i]).find('img').length;
		// var imgs=$(picDiv[i]).find('img');
		// for (var j= 0; j < imglength; j++) {
		//	 var imgpath=$(imgs[j]).attr('src');
		//	 imgpath= imgpath.replace(ImageBaseUrl,"");
			// imgpathsarray.push(imgpath);
		//}var childImgDivStr=$('#'+id+'id').find('div[id=childimg]').attr('class');
		 var childImgDivStr=$(picDiv[i]).attr('class');
		 var className=childImgDivStr.substring(9,childImgDivStr.length);
		 var imglength= picture.prototype.multigroupAssignUploadingSucceed(className);
		 var imgpathsarray=picture.prototype.multigroupRubberRelatively(className);
		 
		 var imgpaths=imgpathsarray.join(',');
		 //alert(imgpaths)
		 input.val(''+imgpaths+'');
		 if(i==0){
			 var radios = document.getElementsByName("promotion"); 
			 for(var j=0;j<radios.length;j++)  
			    {   
			        
			        if(radios[j].checked)  
			        {  
			            
			           var diovalue=radios[j].value; 
			           if(diovalue==1){
			        	   if(imglength<3){
			      			 alert("推荐趋势首个子内容必须上传三张图片！")
			      			 return ;
			      		 }	   
			           }else{
			        	   if(imglength<2){
				      			 alert("请添加至少两张子内容图片！")
				      			 return ;
			                }
			           }   
			        }  
			   } 
			 
			
			 
		 }else{
			 if(imglength<2){
				 alert("请添加至少两张子内容图片！");
	  			 return ;
			 }
  			
        }
		    
		 var fabricArray=[];
		 var fabric =$($(".relationFabric")[i]).val();
		 fabricArray=fabric.split(',');
		 if(fabricArray.length<imglength){
			alert("请关联面料！（面料数至少为图片数）")
			return ;
		 }
	}
	  
	 if(data==1){
		 $("#sbNopub").attr("disabled","disabled");
	 }if(data==2){
		 $("#sbAndpub").attr("disabled","disabled");
	 }
	if(data!=0){
	 $.post(context.contextPath+"/cms/planning/save",$("#submitForm").serialize(), function(data){			
			if(data.code == 0){
				alert('操作成功！2秒后跳转到列表');
				setTimeout(function(){self.location=context.contextPath+"/cms/planning/list";},2000);
			}else{
				
				alert(""+data.code+","+data.message+"");
			}
		},'json');
	 }else{
		 $("#submitForm").submit();
	 }
	 
 }
 
 function submitNopublish(){
	 $("#status").val(0);
	 preSubmit(1)
 }
 function submitAndpublish(){
	 $("#status").val(1);
	 preSubmit(2)
 }
 function preView(){
	 preSubmit(0); 
 }

 
 
 function findChildData( val , parent ){
 	var rs = [] ;
 	for( child in parent ){
 		if( parent[child].parentId == val ){
 			rs.push( parent[child] ) ;
 		}
 	}
 	return rs ;
 }

 function loadSelCategory(){
 	$.ajaxInvoke({
 		url		:	context.contextPath + '/basedata/queryList' ,
 		method	:	'post' ,
 		data	:	$.toJSON({a:''}) ,
 		success	:	function( rs , staus , xmlRequest ){
 			if( rs && rs.code == 0 ){
 				var fields = {
 					field	:	'categoryId' ,
 					next	:	{
 						field	:	'classificationId' ,
 						next	:	{
 							field	:	'subClassificationId'
 						}
 					}
 				};
 				initCategory( fields , rs.data['CLASSIFICATION'] , '0' ) ;
 				return ;
 			}
 		},
 		dataType:	'json',
 		contentType	: 	'application/json;charset=UTF-8'
 	});
 }

 function initCategory( fields , data , val ){
 	var category = $("#"+fields.field) ;
 	if( val == '' ){
 		val = '-1' ;
 	}
 	initSelField( fields.field , data , val ) ;
 	if( !fields.next ){
 		return ;
 	}
 	category.unbind('change').bind('change',function(){
 		initCategory( fields.next , data , category.val() ) ;
 	});
 	return initCategory( fields.next , data , category.val() ) ;
 }

 function initSelField( field , desc , parent ){
 	var sel = $('#'+field) ;
 	sel.empty() ;
 	sel.append("<option value=''>请选择</option>") ;
 	var data = findChildData( parent , desc ) ;
 	for( key in data ){
 		sel.append("<option value='"+data[key].dictionaryId+"'>"+data[key].dictionaryName+"</option>") ;
 	}
 }

