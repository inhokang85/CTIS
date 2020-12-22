$(function(){
    $("#wrap").on('click', function (e) {
        $(".user-depth2, .setting-depth2").fadeOut("1500");
        $(".user-layer-wrap").hide();
    });
	
    $(".layer-pop .close-btn").on("click", function(ev){
        ev.preventDefault();
        $(".layer-pop").fadeOut("500");
        return false;
    });
        
    $(".user-layer-wrap .close-btn").on("click", function(ev){
    	ev.preventDefault();
        $(".user-layer-wrap").fadeOut("1500");
        return false;
    });
    
    $("#left-menu>div>div.user-depth2.depth2 .info").on("click", function(e){
    	$('.user-depth2').toggle();
    	
        $.ajax({
            url : "/myinfo",
            type : 'POST',
            dataType: 'json',
            success : function(data) {
            	if (data.status == "success") {
            		$("#modify-ip01").val(data.myinfo.acctNm);
            		$("#modify-ip02").val(data.myinfo.acctEmail);
            		$("#modify-ip03").val(data.myinfo.acctMobile);
            		$("#modify-ip04").val(data.myinfo.acctDept);
            		$("#modify-ip05").val(data.myinfo.acctRank);
            		$("#modify-pw01").val('');
            		$("#modify-pw02").val('');
            		$("#modify-pw03").val('');
            		$(".error-msg.myinfo-error").hide();
            		$(".error-msg.pw-error").hide();
            		$("#info-modify01").prop("checked", true);
            		$(".change-myinfo .btn-next").attr("chkchg", "");
                	$(".layer-pop.my-infor-modify").fadeIn("1500");
            	}
            }
        });
    	
    });

    $("#left-menu>div>div.user-depth2.depth2 .help").on("click", function(e){
    	$('.user-depth2').toggle();
    	alarm('준비중');
    });

    $("#left-menu>ul>li:nth-child(6)>div>span.setting-report").on("click", function(e){
    	$('.setting-depth2').toggle();

    	$(".layer-pop.setting-report-pop").load("/common/report", {}, function() { 
    		$(".layer-pop.setting-report-pop").fadeIn("1500");
    	});
        return false;
    });
    
    $("#left-menu>ul>li:nth-child(6)>div>span.setting-smtp").on("click", function(e){
    	$('.setting-depth2').toggle();
    	
    	$(".layer-pop.setting-smtp-pop").load("/common/smtp", {}, function() { 
    		$(".layer-pop.setting-smtp-pop").fadeIn("1500");
    	});
        return false;
    });

    $("#left-menu>ul>li:nth-child(6)>div>span.setting-patch").on("click", function(e){
    	$('.setting-depth2').toggle();

    	$(".loading-bar span").html("템플릿 데이터를 업데이트 중입니다.");
    	$(".loading-bar").show();
        $.ajax({
            url : "/common/patch",
            type : 'POST',
            dataType: 'json',
            success : function(data) {
            	$(".loading-bar").hide();
            	if (data.status == "success") {
            		$(".setting-patch").removeClass("new");
            		alarm('새로운 템플릿 데이터가 업데이트 되었습니다.');
            	} else {
            		alarm(data.message);
            	}
            }
        });
    	
        return false;
    });

});

$(document).ready(function(){
    $(".Top_select").on("click", function (){
        $(this).children(".Top_select_view").fadeToggle("fast");
    });
});


var load_page = function(url, state, func) {
    $(".main-container").load(url, state, 
        function () {
            if (func) func();
        }
    );
    state.__url = url;

    if (url == '/dashboard' || url == '/train/result' || url == '/train/target' || url == '/train/template' || url == '/account' || url == '/train' || url == '/train/education') {
    	history.pushState(state, "", url);
    }
}

$(window).on('popstate', function(event) {
	
	if (!event.originalEvent.state) return;
	
	var url = "/dashboard";
	if (typeof event.originalEvent.state == 'string') {
		url = event.originalEvent.state; 
	} else if (typeof event.originalEvent.state == 'object') {
		url = event.originalEvent.state.__url;
	}
	
	$(".main-container").load(url, event.originalEvent.state, function() {});
	
});

function errorAlarm(s, func) {
	$(".layer-pop.alarm-wrap .txt-box").html(s);
	$(".layer-pop.alarm-wrap").show();
	$(".layer-pop.processing").hide();
	
	$(".alarm-wrap .close-btn").off('click').on("click", function () {
		if (typeof func === 'function') func();
		$(".layer-pop.alarm-wrap").hide();
		return false;
	});
	
}

function alarm(s, func) {
	$(".layer-pop.alarm-wrap .txt-box").html(s);
	$(".layer-pop.alarm-wrap").show();
	$(".layer-pop.processing").hide();
	
	$(".alarm-wrap .close-btn").off('click').on("click", function () {
		if (typeof func === 'function') func();
		$(".layer-pop.alarm-wrap").hide();
		return false;
	});

}

function confirm(s, func) {
	$(".layer-pop.confirm-wrap .txt-box").html(s);
	$(".layer-pop.confirm-wrap").show();
	$(".layer-pop.processing").hide();
	
	$(".confirm-wrap .btn-confirm").off('click').on("click", function () {
		if (typeof func === 'function') func();
		$(".layer-pop.confirm-wrap").hide();
		return false;
	});

	$(".confirm-wrap .btn-cancel").off('click').on("click", function () {
		$(".layer-pop.confirm-wrap").hide();
		return false;
	});
	
}

function tinyMceEditLink(editor) {
	var fn = editor.windowManager.open;
    editor.windowManager.open = function (t, r) {
        if (t.title === "Insert link") {
        	t.body[2] = undefined;
        	t.body[6] = undefined;
            if (t.data.href.length==0) {
            	t.data.href = $("#slct_trn_type option:selected").val()==="2"?"${DOWN}$":"${LINK}$";
            }
        	fn.apply(this, [t, r]);
        } else {
        	return fn(t,r);
        }
    };
}

createTinyEditor = function(bar_code, id, type, cd, isFullPage) {
	
	var option = {
		theme: "modern",
	    selector: '#' + id,
	    branding: false,
	    language: "ko_KR",
	    menubar: false,
	    plugins: "autoresize autolink code contextmenu image advlist lists link paste table textcolor colorpicker wordcount preview codemirror fullpage",
	    toolbar: "undo redo | styleselect | fontselect | fontsizeselect | bold italic strikethrough forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify outdent indent | table link custom_image | preview " + bar_code,
	    contextmenu: "link openlink image inserttable | cell row column deletetable",
	    relative_urls : false,
	    remove_script_host : false,
	    convert_urls : false,
	    code_dialog_width: 900,
	    plugin_preview_width : "1024",
        plugin_preview_height : "600",
        font_formats:"나눔고딕=nanumgothic;굴림체=Gulim;돋움체=Dotum;바탕체=Batang;궁서체=Gungsuh;Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
        content_style: "body { font-size: 11pt; font-family: nanumgothic; }",
        external_plugins: {
            codemirror: "plugins/codemirror/plugin.js"
        },
        codemirror: {
            indentOnInit: true,
            path: 'codemirror-4.8',
            config: {
              lineNumbers: true
            },
            width: 1000,
            height: 600
        },        
	    paste_data_images: true,
		paste_postprocess: function(plugin, args) {
			var allElements = args.node.getElementsByTagName("img");
			
			$.each(allElements, function(idx, el) {
				el.id = 'imsi';
				var xhr1 = new XMLHttpRequest();
				xhr1.open('GET', el.src, true); // 비동기 방식
				xhr1.responseType = 'blob';
				xhr1.onload = function(e) {
					if (this.status == 200) {
						var myBlob = this.response;
						var myFile = new File([myBlob], new Date().getTime() + ".png", {type:"image/png"});
		    			var formData = new FormData();
						formData.append("editor-file-data", myFile);
						formData.append("type", type);
						formData.append("code", cd);
						
						var xhr2 = new XMLHttpRequest();
						xhr2.open('POST', '/common/editorImgUpload', false); // 동기 방식
						xhr2.onload = function(e) {
							if (this.status == 200) {
								tinymce.activeEditor.execCommand("mceRemoveNode", false, $(tinymce.activeEditor.dom.doc).find('#imsi').get(0));
						    	var new_editorUploadFilePath = "<img src='" + $.parseJSON(this.responseText).editorUploadFilePath + "'>";
						    	tinymce.activeEditor.execCommand("mceInsertContent", false, new_editorUploadFilePath);
						    } else {
						    	alert("이미지를 삽입할 수 없습니다.");
						    }
						};
						xhr2.send(formData);
					}
				};
				xhr1.send();
			});
		},
		setup: function(editor) {
			editor.addButton('custom_image', {
		        title: '이미지삽입',
		        icon: 'image',
		        onclick: function(e) {
		        	$(".layer-pop.tinymce-insert-image #editor-file-data").val('');
		        	$(".layer-pop.tinymce-insert-image #editfileName").val('');
					$(".layer-pop.tinymce-insert-image").fadeIn("1500");				        	
		        }
		    });
			editor.addButton('custom_code', {
		        title: '소스코드',
		        icon: 'code',
		        onclick: function(e) {
		        	editor.buttons.code.onclick();
		        }
		    });
			editor.on('init', function(args) {
				tinyMCE.activeEditor.dom.addStyle('p {margin-block-start: 0px;margin-block-end: 0px;}');
				tinyMceEditLink(editor);
	        });
			editor.on('Change', function (e) {
			});
		}
	};
	
	if (isFullPage) {
		option.plugins = "autoresize autolink code contextmenu image advlist lists link paste table textcolor colorpicker wordcount preview codemirror fullpage";
		option.toolbar = "undo redo | styleselect | fontselect | fontsizeselect | bold italic strikethrough forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify outdent indent | table link custom_image | preview " + bar_code;
		option.extended_valid_elements = 'script[language|type|src] link[ href|rel]';
	} else {
		option.plugins = "autoresize autolink code contextmenu image advlist lists link paste table textcolor colorpicker wordcount preview codemirror";
		option.toolbar = "undo redo | styleselect | fontselect | fontsizeselect | bold italic strikethrough forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify outdent indent | table link custom_image | preview " + bar_code;
	}
	
	tinymce.remove('#' + id);
	tinymce.init(option);
	
	tinymce.PluginManager.add('image', function(editor) {
	    editor.addMenuItem('image', {
	        icon: 'image',
	        text: '이미지삽입',
	        onclick: function(e) {
	        	$(".layer-pop.tinymce-insert-image #editor-file-data").val('');
	        	$(".layer-pop.tinymce-insert-image #editfileName").val('');
	        	$(".layer-pop.tinymce-insert-image").fadeIn("1500");
	        }
	    });
	});

};

$.fn.numeric = function() {
	return this.each(function() {
		$(this).keyup(function(e) {
			var s = $(this).val().replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
			$(this).val(s);
			return true;
		});
		$(this).keydown(function(e) {
			var key = e.charCode || e.keyCode || 0;
			// allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
			
			return (!e.shiftKey) && (
				key == 36 || 				//home
				key == 35 || 				//end
				key == 8 ||
				key == 9 ||
				key == 46 ||
				(key >= 37 && key <= 40) ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));
		});
	});
};


