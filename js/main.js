$(document).ready(function() {
  $("#btnClick").click(function() {
    search();
  });

  $(document).on('keypress',function(e) {
    if(e.which == 13) {
        search();
    }
  });

  function search() {
    var temp = $("#ipCntr").val();
    var reqUrl = 'https://restcountries.eu/rest/v2/name/'+temp;
    var object;

    $.ajax({
      type: 'GET',
      url: reqUrl,
      success: function(data){
        var name, reg, subreg, timezones, curName, flagUrl, tempZones, tempCrnc, pop, indC, allC;

        allC = "";
        for (var i = 0; i < data.length; i++) {
          name = data[i].name;
          reg = data[i].region;
          subreg = data[i].subregion;
          pop = data[i].population;

          tempZones = data[i].timezones;
          timezones = "";
          for (var j = 0; j < tempZones.length; j++) {
            timezones = timezones + tempZones[j] + " &nbsp;&nbsp;";
          }

          tempCrnc = data[i].currencies;
          curName = "";
          for (var j = 0; j < tempCrnc.length; j++) {
            curName = curName + tempCrnc[j].name + ' (' + tempCrnc[j].symbol + ') &nbsp;&nbsp;&nbsp;';
          }

          flagUrl = data[i].flag;

          indC = '<div class="col-lg-4 col-md-6 col-12"><div class="card" style="width: 18rem;"><img src="';
          indC = indC + flagUrl + '" class="card-img-top" alt="';
          indC = indC + name + 'Flag">';
          indC = indC + '<div class="card-body"><h5 class="card-title">';
          indC = indC + name + '</h5>';
          indC = indC + '<h6 class="card-subtitle mb-2 text-muted">Region : ' + reg + '</h6>';
          indC = indC + '<h6 class="card-subtitle mb-2 text-muted">Sub Region : ' + subreg + '</h6></div>'
          indC = indC + '<ul class="list-group list-group-flush"><li class="list-group-item">Time Zones : ' + timezones + '</li>';
          indC = indC + '<li class="list-group-item">Currencies : ' + curName + '</li>';
          indC = indC + '<li class="list-group-item">Population : ' + pop + '</li></ul></div></div>';

          allC = allC + indC;
        }

        $("#cntrSect").html(allC);

      },
      error: function (err) {
        swal("", "Check the country name", "error");
      }
    });
  }

});
