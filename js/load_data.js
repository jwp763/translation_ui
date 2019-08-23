function setup(){
  $.getJSON( "resources/translation_text"+$('.ui.dropdown').dropdown('get value')+".json", function( data ) {
    var translations = [];
    $.each( data.translations, function( key, val ) {

      translated_str = this.translatedText;
      source_str = this.sourceText;
      corrected_str = this.correctedText;


      var quality_score = 100-100*this.hter.toFixed(2);
      var correctionTerms = [" substitution", " insertion", " deletion", " shift"];
      var correctionColors = ["purple", " green", " orange", " blue"];
      translations.push('<div class="row"><div>'+this.lineNumber+'</div>');
      translations.push('<div class="four wide column"><div class="ui segment"><p class="sourceText'+key+'">'+source_str+'</p></div></div>');
      translations.push('<div class="four wide column"><div class="ui segment"><p class="translatedText'+key+'">'+translated_str+'</p></div></div>');
      translations.push('<div class="four wide column godMode"><div class="ui segment"><p class="correctedText'+key+'">'+corrected_str+'</p></div></div>');
      //translations.push('<div class="three wide column"><div class="row"><div class="two wide column"><div class="ui segment borderless" ><div class="ui progress tiny teal">');
      //translations.push('<div class="bar" style="width: '+quality_score+'%"></div></div></div></div>' );
      //translations.push('<div class="one wide column"><div class="label">'+quality_score+'/100</div></div></div>');

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
   
    $( "<div/>", {
      "class": "ui equal width grid container",
      html: translations.join( "" )
    }).appendTo( "#show-data" );

    $("p[class^='sourceText']").lettering('words');
    $("p[class^='translatedText']").lettering('words');
    $("p[class^='correctedText']").lettering('words');

    $.each( data.translations, function( key, val ) {

      $.each(this.sourceTags, function( index, num ) {
        wordRef = 'p.sourceText' + key + ' span.word' + num
        $(wordRef).css('color', 'red');
        //$(wordRef).css('font-weight', 'bold');

      });

      $.each(this.transDelTags, function( index, num ) {
        wordRef = 'p.translatedText' + key + ' span.word' + num
        $(wordRef).css('color', 'orange');
        //$(wordRef).css('font-weight', 'bold');

      });

      $.each(this.transPerTags, function( index, num ) {
        wordRef = 'p.translatedText' + key + ' span.word' + num
        $(wordRef).css('text-decoration', 'underline wavy');
        //$(wordRef).css('font-weight', 'bold');

      });

      $.each(this.transPolyTags, function( index, num ) {
        wordRef = 'p.translatedText' + key + ' span.word' + num
        $(wordRef).css('font-style', 'italic');
        //$(wordRef).css('font-weight', 'bold');

      });

      $.each(this.transShiftTags, function( index, num ) {
        wordRef = 'p.translatedText' + key + ' span.word' + num
        $(wordRef).css('color', 'blue');
        //$(wordRef).css('font-weight', 'bold');

      });

      $.each(this.corrShiftTags, function( index, num ) {
        wordRef = 'p.correctedText' + key + ' span.word' + num
        $(wordRef).css('color', 'blue');
        //$(wordRef).css('font-weight', 'bold');

      });

      $.each(this.tags, function( index, num ) {
        wordRef = 'p.translatedText' + key + ' span.word' + num
        $(wordRef).css('color', 'purple');
        //$(wordRef).css('font-weight', 'bold');
      });

      $.each(this.correctionTags, function( index, num ) {
        wordRef = 'p.correctedText' + key + ' span.word' + num
        $(wordRef).css('color', 'purple');
        //$(wordRef).css('font-weight', 'bold');
      });

      $.each(this.corrInsTags, function( index, num ) {
        wordRef = 'p.correctedText' + key + ' span.word' + num
        $(wordRef).css('color', 'green');
        //$(wordRef).css('font-weight', 'bold');
      });


      $.each(this.mappings, function( index, mapTriplet ) {
        sourceRefs = mapTriplet[0];
        translatedRefs = mapTriplet[1];
        correctedRefs = mapTriplet[2];

        var classStrings = ["source", "translated", "corrected"];

        $.each(classStrings, function( index, classStrA) {
          $.each(classStrings, function( index, classStrB) {
            $.each(window[classStrB +'Refs'], function( index, sourceNum) {
              $.each(window[classStrA +'Refs'], function( index, selfNum) {
                $('p.'+classStrB+'Text' + key + ' span.word' + sourceNum).hover(function() { 
                  if ($('input[id=godToggle]').prop('checked')){
                    console.log($('input[id=godToggle]').prop('checked'));
                    $('p.'+classStrA+'Text' + key + ' span.word' + selfNum).css('font-weight', 'bold');
                  };
                }, function() { 
                  $('p.'+classStrA+'Text' + key + ' span.word' + selfNum).css('font-weight', 'normal');
                }); 
              });
            });
          });

        });



      });
      
      $('.ui.dropdown')
        .dropdown()
      ;
    });
  });
};



setup();

//$('.ui.dropdown').dropdown({ 'onChange': setup()});


function toggle(className, obj) {
    $(className).toggle( obj.checked )
};



