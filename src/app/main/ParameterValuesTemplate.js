var ParameterValuesTemplate;
(function (ParameterValuesTemplate) {
    var DeploymentParameters = (function () {
        // todo: modify constructor with default values for properties
        function DeploymentParameters() {
            this.parameters = { p: Parameter };
        }
        return DeploymentParameters;
    })();
    ParameterValuesTemplate.DeploymentParameters = DeploymentParameters;
    var Parameter = (function () {
        function Parameter(val, md) {
            this.value = val;
            this.metadata = md;
        }
        return Parameter;
    })();
    ParameterValuesTemplate.Parameter = Parameter;
    var Metadata = (function () {
        function Metadata(type, desc) {
            this.type = type;
            this.description = desc;
        }
        return Metadata;
    })();
    ParameterValuesTemplate.Metadata = Metadata;
})(ParameterValuesTemplate || (ParameterValuesTemplate = {}));
