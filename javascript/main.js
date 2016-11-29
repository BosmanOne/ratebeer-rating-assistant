'use strict';

var descriptionsArr = [];
function Description(category, type, text, writtenByUser) { //Type: hops, other, malt, yeast. Text: string. writtenByUser: if it is written by user as addition
  this.category = category;
  this.type = type;
  this.text = text;
  this.writtenByUser = writtenByUser;
}

$(document).ready(function() {

	$('li').click(function(){
		var name = $(this).find('span').text();
		name = name.toLowerCase(); //text, ie: milk chocolate

		var temp = $(this).find('div').attr('class');
		temp = temp.split(' ');
		var type = temp[1]; //type, ie: malt

		var category = $('.btn-selected').attr('id'); //category, ie: aroma, appearance

		//Checking if was already picked
		for (var i=0; i<descriptionsArr.length; i++){
			if (name == descriptionsArr[i].text){
				descriptionsArr.splice(i, 1);
				$(this).css( {"-webkit-filter": "grayscale(80%)", "-moz-filter": "grayscale(80%)", "-o-filter": "grayscale(80%)"});
				generateComment();
				return;
			}
		}

		//Checking if it is inner button (would popup text window if yes)
		if ($(this).hasClass('inner')){
			for (var i=0; i<descriptionsArr.length; i++){
				if (type == descriptionsArr[i].type && descriptionsArr[i].writtenByUser === true){
					var otherText = descriptionsArr[i].text;
				}
			}

			var text = prompt('Enter your own text:', otherText);

			if (text != "" && text != null) {
				for (var i=0; i<descriptionsArr.length; i++){
					if (type == descriptionsArr[i].type && descriptionsArr[i].writtenByUser === true){
						descriptionsArr.splice(i, 1);
					}
				}
				var description = new Description(category, type, text, true)
				descriptionsArr.push(description);
			}else{ //deleting entry if it's empty
				$(this).css( {"-webkit-filter": "grayscale(80%)", "-moz-filter": "grayscale(80%)", "-o-filter": "grayscale(80%)"});
				for (var i=0; i<descriptionsArr.length; i++){
					if (type == descriptionsArr[i].type && descriptionsArr[i].writtenByUser === true){
						descriptionsArr.splice(i, 1); 
					}
				}
				generateComment();
				return;
			}

		}else{
			var description = new Description(category, type, name, false)
			descriptionsArr.push(description);
		}
		$(this).css( {"-webkit-filter": "grayscale(0%)", "-moz-filter": "grayscale(0%)", "-o-filter": "grayscale(0%)"});

		generateComment();
	});
	
	$(".categories-btn").click(function(){
		var button = $(this).find('button');
		var categoryId = button.attr('id');

		if (button.hasClass('btn-selected')){
			return;
		}else{
			$('.categories-btn').children().removeClass('btn-selected');
			button.addClass('btn-selected');
			$('.whole-circle').hide();
			$('#'+categoryId+'-circle').fadeIn(200);
		}
	});

	$('#btn-rating-menu').click(function(){
		$('#ratings-container').fadeToggle(200);
	});
	
});

function generateComment() {
  var arrCommentAroma = [];
  var arrCommentAppearance = [];
  var arrCommentPalateAndBody = [];
  var strComment = "";
  var textarea = $('#textarea-comment');
  
  descriptionsArr.sort(function(a, b) {
    return ((a.type < b.type) ? -1 : ((a.type == b.type) ? 0 : 1));
  });
  if (descriptionsArr.length === 0){
    textarea.val("");
    return
  }
  
  for (var i=0; i<descriptionsArr.length; i++){
    if (descriptionsArr[i].category == "aroma"){
      arrCommentAroma.push(descriptionsArr[i].text);
    } else if (descriptionsArr[i].category == "appearance"){
      arrCommentAppearance.push(descriptionsArr[i].text);
    }else if (descriptionsArr[i].category == "palate-and-body"){
      arrCommentPalateAndBody.push(descriptionsArr[i].text);
    }
  }
  
  if (arrCommentAroma.length != 0){
    var strCommentAroma = arrCommentAroma.join(", ");
    strComment = strComment +"Aroma: " +strCommentAroma +". ";
  }
  if (arrCommentAppearance.length != 0){
    var strCommentAppearance = arrCommentAppearance.join(", ");
    strComment = strComment +"Appearance: " +strCommentAppearance +". ";
  }
  if (arrCommentPalateAndBody.length != 0){
    var strCommentPalateAndBody = arrCommentPalateAndBody.join(", ");
    strComment = strComment +"Palate & body: " +strCommentPalateAndBody +". ";
  }
  textarea.val(strComment);
  
}
 

function btnCopy(){
  var copyTextareaBtn = document.querySelector('#copy-btn');
  var copyTextarea = document.querySelector('#textarea-comment');
  
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
  } catch (err) {
    console.log('Oops, unable to copy');
  }
}

function btnReset(){
  descriptionsArr = [];
  generateComment();
  resetCircle()
  
  function resetCircle(){
    $('li').css( {"-webkit-filter": "grayscale(80%)", "-moz-filter": "grayscale(80%)", "-o-filter": "grayscale(80%)"});
  }
}
