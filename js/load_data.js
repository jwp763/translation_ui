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
    translated_str = formatErrors(this.translatedText, this.tags);
    source_str = formatErrors(this.sourceText, this.sourceTags)

    var quality_score = 100-100*this.hter.toFixed(2);
    translations.push( '<div class="row"><div>'+this.lineNumber);
    translations.push('</div><div class="six wide column"><div class="ui segment">'+source_str);
    translations.push('</div></div><div class="six wide column"><div class="ui segment">');
    translations.push(translated_str+'</div></div><div class="three wide column">');
    translations.push('<div class="row"><div class="ui segment borderless" ><div class="ui progress tiny teal">');
    translations.push('<div class="bar" style="width: '+quality_score+'%"></div>' );
    translations.push('<div class="label">'+quality_score+'/100</div></div></div></div></div></div>');
  });
 
  $( "<div/>", {
    "class": "ui equal width grid container",
    html: translations.join( "" )
  }).appendTo( "#show-data" );
});



