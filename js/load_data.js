function setup(){
  $.getJSON( "resources/translation_text"+$('.ui.dropdown').dropdown('get value')+".json", function( data ) {
    var translations = [];
    $.each( data.translations, function( key, val ) {

      translated_str = this.translatedText;
      source_str = this.sourceText;
      corrected_str = this.correctedText;


      var quality_score = 100-parseInt(100*this.hter.toFixed(2));
      var correctionTerms = [" substitution", " insertion", " deletion", " shift"];
      var correctionColors = ["purple", " green", " orange", " blue"];
      translations.push('<div class="row"><div>'+this.lineNumber+'</div>');
      translations.push('<div class="four wide column"><div class="ui segment"><p class="sourceText'+key+'">'+source_str+'</p></div></div>');
      translations.push('<div class="four wide column"><div class="ui segment"><p class="translatedText'+key+'">'+translated_str+'</p></div></div>');
      translations.push('<div class="four wide column godMode"><div class="ui segment"><p class="correctedText'+key+'">'+corrected_str+'</p></div></div>');
      translations.push('<div class="ui three wide column"><div class="ui grid"><div class="eleven wide column"><div class="ui progress tiny teal">');
      translations.push('<div class="bar" style="width: '+quality_score+'%"></div></div></div><div class="five wide column"><div class="label">'+quality_score+'%</div></div></div>');

      var i;
      for (i = 0; i < 4; i++) { 
        if (this.numCorrections[i] > 0 ){
          translations.push('<div class="godMode hter" style="color:'+ correctionColors[i]+'">'+ this.numCorrections[i] + correctionTerms[i]);
          if (this.numCorrections[i] > 1){
            translations.push('s');
          };
          translations.push('</div>');
        };  
      };
      translations.push('</div></div>');
    });








    $("#show-data").empty()
   
    $( "<div/>", {
      "class": "ui equal width grid container",
      html: translations.join( "" )
    }).appendTo( "#show-data" );

    $("p[class^='sourceText']").lettering('words');
    $("p[class^='translatedText']").lettering('words');
    $("p[class^='correctedText']").lettering('words');

    $.each( data.translations, function( key, val ) {

      styleFromTags(this.sourceTags, key, 'p.sourceText', 'font-weight', 'bold');
      styleFromTags(this.transDelTags, key, 'p.translatedText', 'color', 'red');
      styleFromTags(this.transPerTags, key, 'p.translatedText', 'text-decoration', 'underline wavy');
      styleFromTags(this.transPolyTags, key, 'p.translatedText', 'text-decoration', 'underline dotted');
      styleFromTags(this.transShiftTags, key, 'p.translatedText', 'color', 'blue');
      styleFromTags(this.corrShiftTags, key, 'p.correctedText', 'color', 'blue');
      styleFromTags(this.tags, key, 'p.translatedText', 'color', 'red');
      styleFromTags(this.correctionTags, key, 'p.correctedText', 'font-weight', 'bold');
      styleFromTags(this.corrInsTags, key, 'p.correctedText', 'font-weight', 'bold');
      styleFromTags(this.transInsTags, key, 'p.translatedText', 'color', 'blue');

      if ($('input[id=godToggle]').prop('checked')){
        styleFromTags(this.transDelTags, key, 'p.translatedText', 'text-decoration', 'line-through');
      }else{
        styleFromTags(this.transDelTags, key, 'p.translatedText', 'text-decoration', 'none');
      }

      var translationInsertionTags = this.transInsTags;
      $.each(this.mappings, function( index, mapTriplet ) {
        sourceRefs = mapTriplet[0];
        translatedRefs = mapTriplet[1];
        correctedRefs = mapTriplet[2];

        var classStrings = ["source", "translated", "corrected"];

        $.each(classStrings, function( index, classStrA) {
          $.each(classStrings, function( index, classStrB) {
            $.each(window[classStrB +'Refs'], function( index, sourceNum) {
              $.each(window[classStrA +'Refs'], function( index, selfNum) {
                if( $('input[id=godToggle]').prop('checked') || 
                    ( !((classStrB == "translated") && translationInsertionTags.includes(sourceNum)) &&
                      !((classStrB == "source") && translationInsertionTags.includes(selfNum)))
                    ){
                  $('p.'+classStrB+'Text' + key + ' span.word' + sourceNum).hover(function() { 
                    $('p.'+classStrA+'Text' + key + ' span.word' + selfNum).css('background-color', 'yellow');
                      }, function() { 
                        $('p.'+classStrA+'Text' + key + ' span.word' + selfNum).css('background-color', 'white');
                      }); 
                };
              });
            });
          });
        });
      });

          var hidden_elements = document.getElementsByClassName("godMode");

    for (var i = 0; i < hidden_elements.length; i++){
      if ($('input[id=godToggle]').prop('checked')){
        hidden_elements[i].style.display = "block";
      }else{
        hidden_elements[i].style.display = "none";
      };
    };
      
      $('.ui.dropdown').dropdown({
                      onChange: function (val) {
                          setup();
                        }
      });


      $(document).click(function(){
        $('.ui.dropdown').blur();
      });

      /* Clicks within the dropdown won't make
         it past the dropdown itself */
      $('.ui.dropdown').click(function(e){
        e.stopPropagation();
      });


    });
  });
};



setup();


function styleFromTags(tags, rowNum, columnString, styleType, styleValue) {
    $.each(tags, function(index, num) {
        wordRef = columnString + rowNum + ' span.word' + num;
        $(wordRef).css(styleType, styleValue);
      });
};



function toggle(className, obj) {
  setup();
    //$(className).toggle( obj.checked )

};



