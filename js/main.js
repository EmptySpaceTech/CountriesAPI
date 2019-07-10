$(document).ready(function() {
  $("#btnClick").click(function() {
    var temp = $("#ipCntr").val();
    var reqUrl = 'https://restcountries.eu/rest/v2/name/'+temp;
    var object;

    $.ajax({
      type: 'GET',
      url: reqUrl,
      success: function(data){
        var name, reg, subreg, timezones, curName, flagUrl, tempZones, tempCrnc, indC, allC;

        allC = "";
        for (var i = 0; i < data.length; i++) {
          name = data[i].name;
          reg = data[i].region;
          subreg = data[i].subregion;
          tempZones = data[i].timezones;
          timezones = "";
          for (var j = 0; j < tempZones.length; j++) {
            timezones = timezones + tempZones[j] + ", ";
          }

          tempCrnc = data[i].currencies;
          curName = "";
          for (var j = 0; j < tempCrnc.length; j++) {
            curName = curName + tempCrnc[j].name + ", ";
          }

          flagUrl = data[i].flag;

          indC = '<h1>Name : ' + name + '</h1>';
          indC = indC + '<h4>Region :' + reg + '</h4>';
          indC = indC + '<h4>Sub Region : ' + subreg + '</h4>';
          indC = indC + '<h4>Time Zones : ' + timezones + '</h4>';
          indC = indC + '<h4>currencies : ' + curName + '</h4>';
          indC = indC + '<img width="135" height="90" src="' + flagUrl + '" alt="' + name + ' flag"><hr><br>';

          console.log("name : "+name);
          console.log("Region : "+reg);
          console.log("Sub Region : "+subreg);
          console.log("Time Zones : "+timezones);
          console.log("currencies : "+curName);
          console.log("Flag : "+flagUrl);
          console.log("\n\n\n");

          allC = allC + indC;
        }

        $("#cntrSect").html(allC);

      },
      error: function (err) {
        console.log(err);
      }
    });
  })
});
