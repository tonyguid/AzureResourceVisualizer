module ParameterValuesTemplate {

   export class DeploymentParameters implements TemplateInterface{
    	$schema: string;
    	contentVersion: string;
    	parameters: {p: typeof Parameter};
        // todo: modify constructor with default values for properties
        constructor(){
            this.parameters = {p: Parameter};
        }
    }
    
    export class Parameter implements ParameterInterface{
    	value: any;
    	metadata: MetadataInterface;
    	constructor(val: string, md?: Metadata)
    	{
    		this.value = val;
    		this.metadata  = md;
    	}
    }
    
    export class Metadata implements MetadataInterface{
    	type: string;
    	description: string;
    	constructor(type: string, desc?: string){
    		this.type = type;
    		this.description = desc;
    	}
    }

    export interface TemplateInterface{
		$schema: string;
    	contentVersion: string;
    	parameters: {p: typeof Parameter};
	}
    

    export interface ParameterInterface {
        value: any; // need to change this later for $ref in schema
        metadata?: MetadataInterface;
    }

    export interface MetadataInterface {
        type: string;
        description?: string;
    }
    
}


