$.getJSON( "translation_text.json", function( data ) {
  var translations = [];
  $.each( data.translations, function( key, val ) {
    var source_list = this.sourceText.split(" ");
    var source_str = "";
    var source_tags = this.sourceTags
    source_list.forEach(function(item, index){

      if(source_tags.includes(index)){
        source_str += "<mark>" + item + "</mark>" + " " ;
      } else {
        source_str += item + " ";
      }
    });

    var translated_list = this.translatedText.split(" ");
    var translated_str = "";
    var translated_tags = this.tags
    translated_list.forEach(function(item, index){

      if(translated_tags.includes(index)){
        translated_str += "<mark>" + item + "</mark>" + " " ;
      } else {
        translated_str += item + " ";
      }
    });


    translations.push( '<div class="row">'+this.lineNumber+'<div class="six wide column"><div class="ui segment">'+source_str+'</div></div><div class="six wide column"><div class="ui segment">'+translated_str+'</div></div></div>' );
  });
 
  $( "<div/>", {
    "class": "ui equal width grid",
    html: translations.join( "" )
  }).appendTo( "body" );
});





