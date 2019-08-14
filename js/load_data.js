$.getJSON( "resources/translation_text.json", function( data ) {
  var translations = [];
  $.each( data.translations, function( key, val ) {

    function formatErrors(text, tags) {
      var text_list = text.split(" ");
      var output_str = "";
      text_list.forEach(function(item, index){

        if(tags.includes(index)){
          output_str += "<mark>" + item + "</mark>" + " " ;
        } else {
          output_str += item + " ";
        }
      });

      return output_str;   
    }
    //translated_str = formatErrors(this.translatedText, this.tags);
    //source_str = formatErrors(this.sourceText, this.sourceTags);

    translated_str = this.translatedText;
    source_str = this.sourceText;
    corrected_str = this.correctedText;


    var quality_score = 100-100*this.hter.toFixed(2);
    translations.push('<div class="row"><div>'+this.lineNumber+'</div>');
    translations.push('<div class="four wide column"><div class="ui segment"><p class="sourceText'+key+'">'+source_str+'</p></div></div>');
    translations.push('<div class="four wide column"><div class="ui segment"><p class="translatedText'+key+'">'+translated_str+'</p></div></div>');
    translations.push('<div class="four wide column godMode"><div class="ui segment"><p class="correctedText'+key+'">'+corrected_str+'</p></div></div>');
    translations.push('<div class="two wide column"><div class="ui segment borderless" ><div class="ui progress tiny teal">');
    translations.push('<div class="bar" style="width: '+quality_score+'%"></div>' );
    translations.push('<div class="label">'+quality_score+'/100</div></div></div></div></div>');

  });
 
  $( "<div/>", {
    "class": "ui equal width grid container",
    html: translations.join( "" )
  }).appendTo( "#show-data" );
  $("p[class^='sourceText']").lettering('words');
  $("p[class^='translatedText']").lettering('words');
  $("p[class^='correctedText']").lettering('words');

  var translations = [];
  $.each( data.translations, function( key, val ) {

    $.each(this.tags, function( index, num ) {
      wordRef = 'p.translatedText'+key+' span.word'+(num+1)
      $(wordRef).css('color', 'red');
      $(wordRef).css('font-weight', 'bold');
    });

    $.each(this.sourceTags, function( index, num ) {
      wordRef = 'p.sourceText'+key+' span.word'+(num+1)
      $(wordRef).css('color', 'red');
      $(wordRef).css('font-weight', 'bold');

    });

  });



});




function toggle(className, obj) {
    $(className).toggle( obj.checked )
};



