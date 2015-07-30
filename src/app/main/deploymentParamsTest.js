/// <reference path="ParameterValuesTemplate.ts"/>
var paramValues = ParameterValuesTemplate;
function getTestParams() {
    var param1 = new paramValues.Parameter("testProp");
    var paramsColl = new paramValues.DeploymentParameters();
    paramsColl.$schema = "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#";
    paramsColl.contentVersion = "1.0.0.0";
    //paramsColl.parameters = {p: paramValues.Parameter};
    paramsColl.parameters["param1"] = param1;
    var str = JSON.stringify(paramsColl);
    console.log(str);
    return str;
}
