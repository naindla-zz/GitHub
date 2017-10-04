//var ServiceURL = "https://mcr-proto-cont.dev.cognosante.cc/v1/UniverseDetail/GetUniverseDetailsForId/24";

var UrlDev = 'https://mcr-proto-cont.dev.cognosante.cc:443';
var UrlTest = 'https://mcr-cc.test.cognosante.cc:443';
// IMPL and PROD service url's need to be confirmed
var URLImpL = 'https://imp.cerrs-cc.cms.gov';
var UrlProd = 'https://cerrs-cc.cms.gov';

//var midasURL = "https://mcr-cc.test.cognosante.cc:443/v1/WorkbookData/GetMidasForCase/L0004000050";
//var ffmURL = "https://mcr-cc.test.cognosante.cc:443/v1/WorkbookData/GetFfmForCase/L0004000050";
//var rcNoURL = "https://mcr-cc.test.cognosante.cc:443/v1/WorkbookData/GetRcnoForCase/L0004000050";

function getMidasServiceUrl() {
  var midasServiceURL = '';
  //Append controller and method to related environment DNS
  var midasServicePath = '/v1/WorkbookData/GetMidasForCase/';
  
  var HostName = window.location.hostname;
  
  var caseId = window.parent.Xrm.Page.getAttribute('cog_hicscaseid').getValue();
  console.log("CASE ID = " + caseId);

 if (HostName === 'localhost') {
    midasServiceURL = UrlDev + midasServicePath + caseId;
  }

  if (HostName === 'cerrsng.dev.cognosante.cc') {
    midasServiceURL = UrlDev + midasServicePath + caseId;
  }

  if (HostName === 'cerrsng.test.cognosante.cc') {
    midasServiceURL = UrlTest + midasServicePath + caseId;
  }
  
  if (HostName === 'cerrsngimpl.cerrs.cms.gov') {
    midasServiceURL = URLImpL + midasServicePath + caseId;
  }

  if (HostName === 'cerrsngprod.cerrs.cms.gov') {
    midasServiceURL = UrlProd + midasServicePath + caseId;
  }
  console.log("Midas Service URL = " + midasServiceURL);
  return midasServiceURL;
}


function getFfmExtractServiceUrl() {
    var ffmServiceURL = '';
    //Append controller and method to related environment DNS
    var ffmExtractServicePath = '/v1/WorkbookData/GetFfmForCase/';    
    
	var caseId = window.parent.Xrm.Page.getAttribute('cog_hicscaseid').getValue();
	console.log("CASE ID = " + caseId);
	
    var HostName = window.location.hostname;
  
   if (HostName === 'localhost') {
        ffmServiceURL =  UrlDev + ffmExtractServicePath + caseId;
    }
  
    if (HostName === 'cerrsng.dev.cognosante.cc') {
        ffmServiceURL = UrlDev + ffmExtractServicePath + caseId;
    }
  
    if (HostName === 'cerrsng.test.cognosante.cc') {
        ffmServiceURL = UrlTest + ffmExtractServicePath + caseId;
    }
    
    if (HostName === 'cerrsngimpl.cerrs.cms.gov') {
        ffmServiceURL = URLImpL + ffmExtractServicePath + caseId;
    }
  
    if (HostName === 'cerrsngprod.cerrs.cms.gov') {
        ffmServiceURL = UrlProd + ffmExtractServicePath + caseId;
    }
    console.log("FFM Service URL = " + ffmServiceURL);	
    return ffmServiceURL;
  }


  function getRcnoServiceUrl() {
    var rcnoServiceURL = '';
    //Append controller and method to related environment DNS 
    var rcnoServicePath = '/v1/WorkbookData/GetRcnoForCase/';
	
	var caseId = window.parent.Xrm.Page.getAttribute('cog_hicscaseid').getValue();
	console.log("CASE ID = " + caseId);
    
    var HostName = window.location.hostname;
  
   if (HostName === 'localhost') {
        rcnoServiceURL = UrlDev + rcnoServicePath + caseId;
    }
  
    if (HostName === 'cerrsng.dev.cognosante.cc') {
        rcnoServiceURL = UrlDev + rcnoServicePath + caseId;
    }
  
    if (HostName === 'cerrsng.test.cognosante.cc') {
        rcnoServiceURL = UrlTest + rcnoServicePath + caseId;
    }
    
    if (HostName === 'cerrsngimpl.cerrs.cms.gov') {
        rcnoServiceURL = URLImpL + rcnoServicePath + caseId;
    }
  
    if (HostName === 'cerrsngprod.cerrs.cms.gov') {
      rcnoServiceURL = UrlProd + rcnoServicePath + caseId;
    }
    console.log("RCNO Service URL = " + rcnoServiceURL);	
    return rcnoServiceURL;
  }

var app = angular.module("workbook", []);

app.factory("Excel", function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
});

app.service("Service", function ($http) {
    
    this.GetListMIDAS = function () {
        //var Url = getMidasServiceUrl();
        var response = $http({
            method: "get",
            //url: midasURL,
            //url : 'Midas_Sample.json',
			url : getMidasServiceUrl(),
            headers: {
                'x-cognosante-authentication': "secure"
            },
            data: "",
            dataType: "json"
        });
        return response;
    }
    
    this.GetListFFM = function(){
        var response = $http({
            method: "get",
            //url: "Ffm_Sample.json",
            url: getFfmExtractServiceUrl(),
			headers: {
                'x-cognosante-authentication': "secure"
            },
            data: "",
            dataType: "json"
        });
        return response;
    }
    
     this.GetListRCNO = function(){
        var response = $http({
            method: "get",
            //url: rcNoURL,
			url: getRcnoServiceUrl(),
            headers: {
                'x-cognosante-authentication': "secure"
            },
            data: "",
            dataType: "json"
        });
        return response;
    }
});

app.controller("workbookcontroller", function ($scope, Service, $timeout, Excel) {

    $scope.TableName = "MIDAS";

    $scope.sort = {
        column: '',
        descending: false
    };

    $scope.changeSorting = function (column) {

        var sort = $scope.sort;

        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };

    $scope.fn_GetListMIDAS = function () {
		console.log('Inside MIDAS');
        var ResponseRegistration = Service.GetListMIDAS();
        ResponseRegistration.then(function (msg) {
            $scope.MIDAS = msg.data.workbookResultSet;
            if(msg.data.workbookResultSet.length < 1){
                console.log('No data found');
                $scope.noMidasDataFlag = true;
            }
        }, function (msg) {
            
            console.log('Error: GetListMIDAS ' + msg);
        });
    }
    
    function fn_GetListFFm(){
		console.log('Inside FFM');
        var ResponseRegistration = Service.GetListFFM();
        ResponseRegistration.then(function (msg) {
            $scope.FFMS = msg.data.workbookResultSet;
            $scope.TableName = "FFMEXTRACT";
            if($scope.FFMS.length < 1){
                $scope.noFfmDataFlag = true;
            }
        }, function (msg) {
            console.log('Error: GetListFFM ' + msg);
        });
    }
    
    function fn_GetRCNO(){
        console.log('Inside RCNO');
        var ResponseRegistration = Service.GetListRCNO();
        ResponseRegistration.then(function (msg) {
            $scope.RCNO = msg.data.workbookResultSet;
			$scope.TableName = "RCNO";
            if($scope.RCNO.length < 1){
                $scope.noRcnoDataFlag = true;
            }
        }, function (msg) {
            console.log('Error: GetListRCNO ' + msg);
        });
    }

    $scope.fn_SetTablename = function (TableNo) {

        if (TableNo == 1) {
            $scope.TableName = "MIDAS";
        }
        if (TableNo == 2) {
            fn_GetListFFm();
        }
        if (TableNo == 3) {
            fn_GetRCNO();
        }
        // if (TableNo == 4) {
            // $scope.TableName = "ViewAlllist";
        // }
    };

    // $scope.exportToExcel = function (tableId) { // ex: '#my-table'

        // var exportHref = Excel.tableToExcel("#" + $scope.TableName, 'WireWorkbenchDataExport');
        // $timeout(function () { location.href = exportHref; }, 100); // trigger download
    // }
});


