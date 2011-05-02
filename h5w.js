﻿/***************************************************/
/******** Author: Krzysztof Bednarczyk *************/
/******** License: LGPL                *************/
/******** http://bordeux.NET           *************/
/******** Part of XVweb project        *************/
/******** xvweb.googlecode.com         *************/
/***************************************************/
(function($) {
$.fn.extend({
	h5w : function(options, val) {
		if(options == "destroy"){
			$(this).trigger('h5w.destroy');
			return this;
		};
		if(options == "getContent"){
			return $(this).find(".h5w-content").html();
		};
		var options = jQuery.extend({
			onStart: function(teadasd) {
							return true;
						},
			onChange: function() {
							return false;
						},
			onUseButtons: function() {
							return false;
						},
			onIconClick : function(icon){
				
				
			},
			onLoad : function(icon){
				
				
			},
			onTextarea : function(text){
			
				return text;
			},
			onVisual : function(text){
			
				return text;
			},
			content : "",
			functions : {
			
			}
			

		}, options);

		var functions = jQuery.extend({
italic: function(main, icon) {

				document.execCommand('italic',null,false);
				return true;
			},
bold: function(main, icon) {;
				document.execCommand('formatBlock',null, "<span style='font-weight:bold;'>");
				//document.execCommand('bold',null,false);
				return true;
			},
underline: function(main, icon) {;
				document.execCommand('underline',null,false);
				return true;
			},
strike: function(main, icon) {;
				document.execCommand('strikeThrough',null,false);
				return true;
			},	
subscript: function(main, icon) {;
				document.execCommand('subscript',null,false);
				return true;
			},
superscript: function(main, icon) {;
				document.execCommand('superscript',null,false);
				return true;
			},
paragraph: function(main, icon) {;
				document.execCommand('insertParagraph',null,false);
				return true;
			},
listordered: function(main, icon) {;
				document.execCommand('insertOrderedList',null,false);
				return true;
			},
listunordered: function(main, icon) {;
				document.execCommand('insertUnorderedList',null,false);
				return true;
			},
hrule: function(main, icon) {;
				document.execCommand('insertHorizontalRule',null,false);
				return true;
			},
createlink: function(main, icon) {
				document.execCommand('CreateLink', null , 'changeit');
				$(main).find(".h5w-content a[href='changeit']").attr({
href: prompt("Please URL", "http://"),
target: "_blank"
				});
				
				return true;
			},
insertimage: function(main, icon) {

				document.execCommand('insertImage', null , 'changeit');

				$(main).find(".h5w-content img[src='changeit']").each(function(){
					$(this).attr({
src: prompt("Please image URL", "http://"),
alt: prompt("Please set alt", "")
					});
					this.execCommand("enableObjectResizing", false, false);
					this.attachEvent("onresizestart", function(e) { e.returnValue = false; }, false);
				});
				
				return true;
			},
unlink: function(main, icon) {
				document.execCommand('Unlink', false, null);
				return true;
			},
			
justifyright: function(main, icon) {
				document.execCommand('justifyRight', false, null);
				return true;
			},	
justifycenter: function(main, icon) {
				document.execCommand('justifyCenter', false, null);
				return true;
			},
justifyleft: function(main, icon) {
				document.execCommand('justifyLeft', false, null);
				return true;
			},
paste: function(main, icon) {
				document.execCommand('paste', false, null);
				return true;
			},
copy: function(main, icon) {
				document.execCommand('copy', false, null);
				return true;
			},
cut: function(main, icon) {
				document.execCommand('cut', false, null);
				return true;
			},

indent: function(main, icon) {;
				document.execCommand('indent',null,false);
				return true;
			},
outdent: function(main, icon) {;
				document.execCommand('outdent',null,false);
				return true;
			},
removeformat: function(main, icon) {
				document.execCommand('removeformat',null,false);
				return true;
			},
formatblock: function(main, icon) {
				document.execCommand('formatBlock',null, "<"+$(icon).attr("href").substr(1)+">");
				return true;
			},
		
fontcolor: function(main, icon) {	
			if(typeof(main)=='string'){
					document.execCommand("ForeColor",false, main);
				return false;
				}
				document.execCommand("ForeColor",false, $(icon).parent().find(".h5w-font-picker").css("background-color"));
				return true;
			},
hilitecolor: function(main, icon) {	
			if(typeof(main)=='string'){
					document.execCommand("hiliteColor",false, main);
				return false;
				}
				document.execCommand("hiliteColor",false, $(icon).parent().find(".h5w-hilitecolor-picker").css("background-color"));
				return true;
			},
table: function(main, icon, width, height) {
				document.execCommand('insertHTML', false, tablepicker.generate(16,16));
				return true;
			},	
onIconClick : function(icon){
				
				
			}
			

		}, options.functions);
		
		function replaceSelectedText(replacementText) {
			var sel, range;
			if (window.getSelection) {
				sel = window.getSelection();
				if (sel.rangeCount) {
					range = sel.getRangeAt(0);
					range.deleteContents();
					range.insertNode(document.createTextNode(replacementText));
				}
			} else if (document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				range.text = replacementText;
			}
		};
		
		function getSelectedText(){
			    var txt = '';
			     if (window.getSelection)
			        txt = window.getSelection();
			    else if (document.getSelection)
			        txt = document.getSelection();
			    else if (document.selection)
			        txt = document.selection.createRange().text;
			return txt;
		}
		function retrieveAnchorNode() {
			if (document.selection)
			return document.selection.createRange().parentElement();
			else if (document.getSelection)
			return window.getSelection().anchorNode;
		}
		var tablepicker = {
			generate : function (width, height, anchor){
				var TableCreator = "<table class='h5w-table-creator'>";
					  for (n = 0; n <= height; ++n){
						TableCreator += "<tr>";
							 for (zn = 0; zn <= width; ++zn){
							 if(typeof anchor == "undefined")
							 TableCreator += "<td>&nbsp;</td>"; else
								TableCreator += "<td><a href='#' ></a></td>";
							 }
						TableCreator += "</tr>";
					  }
					TableCreator += "<table>";
				return TableCreator;
			},
			onSelect : function(){
			
			},
			prepare : function(MainHandle){
				var onCloseTablePicker = function(event) {
						if (!($(event.target).is('.h5w-tablepicker-area') || $(event.target).parents('.h5w-tablepicker-area').length)) {
							$(".h5w-tablepicker-area").hide("slow");
							$(document.body).unbind("click", onCloseTablePicker);
						}
					return false;
					}
					IHandle = $(this);

				$(MainHandle).find( ".h5w-tablepicker" ).click(function(){

					tablepicker.onSelect = eval($(this).data("h5w-onselect-function"));
					var position = $(this).position();

					$(MainHandle).find( ".h5w-tablepicker-area" ).css({
						left:position.left+$(this).width()+5,
						top: position.top+$(this).height()+5
					}).html(tablepicker.generate(16,16, true)).show("slow").find("table").delegate('td','mouseover mouseleave', function(e) {
						if (e.type == 'mouseover') {
							THandle = $(this).parents("table");
							THeight = $(this).parent().index();
							TWidth = $(this).index()+1;
								for (n = 0; n <= THeight; ++n){
									THandle.find("tr:eq("+n+")").find("td:lt("+TWidth+")").addClass("hover");
								}
						}
						else {
						 $(this).parents("table").find("*").removeClass("hover");
						}
					}).find("td a").click(function(event){
						tablepicker.onSelect(MainHandle, IHandle, $(this).parent().index(), $(this).parent().parent().index());
						$(this).parents(".h5w-tablepicker-area").hide("slow");
						$(document.body).unbind("click", onCloseTablePicker);

						return false;
					});
					setTimeout(function(){
						$(document.body).click(onCloseTablePicker);
					},5)
					return false;
				});;
				
			}
			
		},
		picker = {
			changebg : ".something",
			color : '',
			onChange : function(color){
				return false;
			},
			refreshSwatch : function(main) {
				var red = $(this).parents(".h5w-picker-area").find( ".h5w-picker-red" ).slider( "value" ),
				green = $(this).parents(".h5w-picker-area").find( ".h5w-picker-green" ).slider( "value" ),
				blue = $(this).parents(".h5w-picker-area").find( ".h5w-picker-blue" ).slider( "value" ),
				opacity = ($(this).parents(".h5w-picker-area").find( ".h5w-picker-opacity" ).slider( "value" )/100)
				
				picker.color = 'rgba('+red+','+green+','+blue+','+opacity+')';
				$(this).parents(".h5w-picker-area").find( ".h5w-picker-swatch" ).css( "background-color", picker.color);
				$(picker.changebg).css( "background-color", picker.color);
				picker.onChange(picker.color);
			return true;
			},
			prepare : function(MainHandle){
				$(MainHandle).find( ".h5w-picker-red, .h5w-picker-green, .h5w-picker-blue, .h5w-picker-opacity" ).slider({
					orientation: "horizontal",
					range: "min",
					max: 255,
					value: 127,
					slide: picker.refreshSwatch,
					change: picker.refreshSwatch
				});
				$(MainHandle).find( ".h5w-picker-red" ).slider( "value", 255 );
				$(MainHandle).find( ".h5w-picker-green" ).slider( "value", 140 );
				$(MainHandle).find( ".h5w-picker-green" ).slider( "value", 140 );
				$(MainHandle).find( ".h5w-picker-opacity" ).slider({
						max: 100,
						value: 100,
					});
				
				$(MainHandle).find( ".h5w-picker" ).click(function(){
					var position = $(this).position();
					picker.changebg = $(this).data("h5w-destination");
					picker.onChange = eval($(this).data("h5w-onchange-function"));
					$(MainHandle).find( ".h5w-picker-area" ).css({
						left:position.left+$(this).width()+5,
						top: position.top+$(this).height()+5
					}).show("slow");
					var onClosePicker = function(event) {
						if (!($(event.target).is('.h5w-picker-area') || $(event.target).parents('.h5w-picker-area').length)) {
							$(".h5w-picker-area").hide("slow");
							$(document.body).unbind("click", onClosePicker);
						}
					return false;
					}
					setTimeout(function(){
						$(document.body).click(onClosePicker);
					},5)
					
				});;
				
			}

			
		}

		function destroy(){
			
			
		}

		return this.each(function() {

			var MainHandle = this;
			$(MainHandle).bind('h5w.destroy', destroy);

			$(MainHandle).find('.h5w-tabs').tabs({

			}).find( ".ui-tabs-nav" ).sortable({ axis: "x" });
			$(MainHandle).find(".h5w-icon").bind("click", function(){
				FunName = $(this).data("h5w-function");
				ToUseFunction = eval("functions."+FunName);
				if($.isFunction(ToUseFunction))
				ToUseFunction(MainHandle, this); else 
					alert("Not found function: "+FunName);
				$(MainHandle).find(".h5w-content").trigger("change");
				options.onUseButtons(this, FunName, ToUseFunction);
				return false;
			});
			$(document).keydown(function(event) {
				  if(event.keyCode == 9){
				  document.execCommand('insertHTML', false, "\t");
					event.preventDefault();
					event.returnValue = false;
				 }
				});
			$(MainHandle).find( ".h5w-tabs-bottom" ).tabs();
			$(MainHandle).find( ".h5w-tabs-bottom .ui-tabs-nav, .h5w-tabs-bottom .ui-tabs-nav > *" )
				.removeClass( "ui-corner-all ui-corner-top" )
					.addClass( "ui-corner-bottom" );
			$(MainHandle).find(".h5w-refresh-textarea").click(function(){
					$(MainHandle).find(".h5w-texarea").val(options.onTextarea($(MainHandle).find(".h5w-content").html()));
			});
			$(MainHandle).find(".h5w-refresh-editor").click(function(){
					$(MainHandle).find(".h5w-content").html(options.onVisual($(MainHandle).find(".h5w-texarea").val())).trigger("change");
					
			});
			$(MainHandle).find(".h5w-texarea").val(options.onVisual($(MainHandle).find(".h5w-content").html()));
			picker.prepare(MainHandle);
			tablepicker.prepare(MainHandle);
			$(MainHandle).find(".h5w-content").html(options.content);
			
			$(MainHandle).find(".h5w-content").bind("keyup change", options.onChange);
			$(MainHandle).find(".h5w-scroll").click(function(){
				StyleBox  = $(MainHandle).find($(this).data("h5w-toscroll"));

					StyleBox.animate({"scrollTop" : $(this).data("h5w-scroll")}, "slow");
			});
			
			
			$(MainHandle).find(".h5w-content").trigger("change");
			options.onLoad(this);
		});
	},
	getContent : function(){
		$(this).find(".h5w-refresh-textarea").trigger("click");
		return $(this).find(".h5w-texarea").val().replace("<!--?php", "<?php");
	},
	setContent : function(cont){
		$(this).find(".h5w-content").html(cont).trigger("change");
	},
	editor : function(){
		return $(this).find(".h5w-content");
	}
	
	})
})(jQuery);