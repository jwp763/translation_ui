function setup(){
  $.getJSON( "resources/translation_text"+$('.ui.dropdown').dropdown('get value')+".json", function( data ) {
    var translations = [];
    var correctionTerms = ["substitution", "insertion", "deletion", "shift"];
    $.each( data.translations, function( key, val ) {

      translated_str = this.translatedText;
      source_str = this.sourceText;
      corrected_str = this.correctedText;


      var quality_score = 100-parseInt(100*this.hter.toFixed(2));
      var correctionColors = ['"color:red;"', '"color:teal;"', '"color:red; text-decoration: line-through"', '"font-weight:bold;"'];
      translations.push('<div class="row"><div>'+this.lineNumber+'</div>');
      translations.push('<div class="four wide column"><div class="ui segment"><p class="sourceText'+key+'">'+source_str+'</p></div></div>');
      translations.push('<div class="four wide column"><div class="ui segment"><p class="translatedText'+key+'" style="margin: 0px;">'+translated_str+'</p><div class="engine">'+this.engine_name+'</div></div></div>');
      translations.push('<div class="four wide column godMode"><div class="ui segment"><p class="correctedText'+key+'">'+corrected_str+'</p></div></div>');
      translations.push('<div class="ui three wide column"><div class="ui grid" ><div class="sixteen wide column" style="padding-bottom:0px;"><div class="ui progress teal" style="margin-bottom:0px; width=100%" data-percent="" id="example'+key+'" >');
      translations.push('<div class="bar" style="width:0px;"></div><div class="inside">'+quality_score+'%</div></div></div></div><div style="padding-top:20px;">');

      var i;
      for (i = 0; i < 4; i++) { 
        if (this.numCorrections[i] > 0 ){
          translations.push('<div class="godMode hter '+ correctionTerms[i] + key +'" >' + this.numCorrections[i]);
          if ((i == 1) || (i==3)){
            translations.push('<span style="color:red;"> ___</span>');
          }
          translations.push('<span style=' + correctionColors[i] + '> ' + correctionTerms[i]  );
          if (this.numCorrections[i] > 1){
            translations.push('s');
          };
          translations.push('</span></div>');
        };  
      };

      translations.push('</div></div></div>');
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
      styleFromTags(this.transPerTags, key, 'p.translatedText', 'text-decoration', 'underline dashed');
      styleFromTags(this.transPerTags, key, 'p.translatedText', '-webkit-text-decoration', 'underline dashed');
      styleFromTags(this.transPolyTags, key, 'p.translatedText', 'text-decoration', 'underline dotted');
      styleFromTags(this.transPolyTags, key, 'p.translatedText', '-webkit-text-decoration', 'underline dotted');
      styleFromTags(this.transHomoTags, key, 'p.translatedText', 'text-decoration', 'underline double');
      styleFromTags(this.transHomoTags, key, 'p.translatedText', '-webkit-text-decoration', 'underline double');
      styleFromTags(this.sourcePerTags, key, 'p.sourceText', 'text-decoration', 'underline dashed');
      styleFromTags(this.sourcePerTags, key, 'p.sourceText', '-webkit-text-decoration', 'underline dashed');
      styleFromTags(this.sourcePolyTags, key, 'p.sourceText', 'text-decoration', 'underline dotted');
      styleFromTags(this.sourcePolyTags, key, 'p.sourceText', '-webkit-text-decoration', 'underline dotted');
      styleFromTags(this.sourceHomoTags, key, 'p.sourceText', 'text-decoration', 'underline double');
      styleFromTags(this.sourceHomoTags, key, 'p.sourceText', '-webkit-text-decoration', 'underline double');
      styleFromTags(this.transShiftTags, key, 'p.translatedText', 'color', 'red');
      styleFromTags(this.corrShiftTags, key, 'p.correctedText', 'font-weight', 'bold');
      styleFromTags(this.tags, key, 'p.translatedText', 'color', 'red');
      styleFromTags(this.correctionTags, key, 'p.correctedText', 'font-weight', 'bold');
      styleFromTags(this.corrInsTags, key, 'p.correctedText', 'color', 'teal');
      styleFromTags(this.transInsTags, key, 'p.translatedText', 'color', 'red');

      if ($('input[id=godToggle]').prop('checked')){
        styleFromTags(this.transDelTags, key, 'p.translatedText', 'text-decoration', 'line-through');
      }else{
        styleFromTags(this.transDelTags, key, 'p.translatedText', 'text-decoration', 'none');
      } 


      var transTagArrays = [this.tags,this.transInsTags,this.transDelTags,this.transShiftTags];
      var corrTagArrays = [this.correctionTags,this.corrInsTags,[],this.corrShiftTags];


      numCorrs = this.numCorrections;

      $.each([0,1,2,3], function (index, i) { 

        if (numCorrs[i] > 0 ){

          var correctionTerm = correctionTerms[i];
          var refString = 'div.'+correctionTerm+key;
          var transTag = transTagArrays[i];
          var corrTag = corrTagArrays[i];
          $(refString).hover(function() { 
                            $(refString).css('font-weight', 'bold');
                              }, function() { 
                                $(refString).css('font-weight', 'normal');
                              }); 

          $.each(transTag, function (index, wordNum) {

            $(refString).hover(function() { 
                            $('p.translatedText' + key + ' span.word' + wordNum).css('background-color', 'yellow');
                              }, function() { 
                                $('p.translatedText' + key + ' span.word' + wordNum).css('background-color', 'white');
                              }); 
          })

          $.each(corrTag, function (index, wordNum) {

            $(refString).hover(function() { 
                            $('p.correctedText' + key + ' span.word' + wordNum).css('background-color', 'yellow');
                              }, function() { 
                                $('p.correctedText' + key + ' span.word' + wordNum).css('background-color', 'white');
                              }); 
          })
        };  
      });








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

      $(".trans_column").hover(function() {
        $(".engine").each(function(index){
          $(this).css("display", "block");
        });
      },function() {
        $(".engine").each(function(index){
          $(this).css("display", "none");
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
      var quality_score = 100-parseInt(100*this.hter.toFixed(2));
      $('#example'+key).progress({percent:quality_score});

      
      $('.ui.dropdown').dropdown({
                      onChange: function (val) {
                          setup();
                        }
      });

      $(document).click(function(){
        $('.ui.dropdown').blur();
      });
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






