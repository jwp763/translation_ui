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


    translations.push( '<div class="row"><div>'+this.lineNumber+'</div><div class="six wide column"><div class="ui segment">')
    translations.push(source_str+'</div></div><div class="six wide column"><div class="ui segment">'+translated_str)
    translations.push('</div></div><div class="three wide column"><div class="ui segment" style="-webkit-box-shadow: none;-moz-box-shadow: none;box-shadow: none; border: none"><div class="ui progress tiny teal"  data-percent="0" id="example">')
    translations.push('<div class="bar" style="width: '+(100-100*this.hter.toFixed(2))+'%"></div><div class="label">'+(100-100*this.hter.toFixed(2))+'/100</div></div></div></div></div>' );
  });
 
  $( "<div/>", {
    "class": "ui equal width grid container",
    html: translations.join( "" )
  }).appendTo( "#show-data" );
});

$('#example').progress();


