/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "Lps."
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
//playVideoOnScroll();

/*
Funciones de tipo Controlador para la interacción con el back-end
*/
function AjaxReq(urlReq, dataSubmit, controlView="bienes", load=true, callback){
    callback = callback || function(){};
    $.ajax({
      method: "POST"
      ,url: urlReq
      ,data: dataSubmit
    })
      .done(function( rsp) {
        let $control = $( "#" + controlView );
        if(load){
          $control.html( rsp );
        }
        callback(rsp, $control);
      })
      .fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}
//cuando el documento se cargue tambien ponemos los archivos correpondientes
$(document).ready(()=> {
//aqui incluimos los datos externos de datosindex por medio de ajax
    var insertOptions = function(rsp, control){ $(control).append(rsp).material_select(); };
    AjaxReq("datosindex.php", {}, "selectCiudad", false, insertOptions);
    AjaxReq("datosindex1.php", {}, "selectTipo", false, insertOptions);

    $("#submitButton").click((event)=>{
      event.preventDefault();
      let filtroAply = true;
      let filtroCiudad = $("#selectCiudad").val();
      let filtroTipo = $("#selectTipo").val();
      let filtroPrecioIni = $("#rangoPrecio").val().split(";")[0];
      let filtroPrecioFin = $("#rangoPrecio").val().split(";")[1];
      AjaxReq("datos1.php", {fAply: filtroAply
                                    ,fCiudad: filtroCiudad
                                    ,fTipo: filtroTipo
                                    ,fPrecioIni: filtroPrecioIni
                                    ,fPrecioFin: filtroPrecioFin
                                  });
    });
//cargamos las opciones de los precios que tenemos en datos1 siempre con ajax
    $("#mostrarTodos").click((event)=>{
      let filtroPrecioIni = $("#rangoPrecio").val().split(";")[0];
      let filtroPrecioFin = $("#rangoPrecio").val().split(";")[1];
      AjaxReq("datos2.php", {
        fPrecioIni: filtroPrecioIni
        ,fPrecioFin: filtroPrecioFin
      });
    });

  });
