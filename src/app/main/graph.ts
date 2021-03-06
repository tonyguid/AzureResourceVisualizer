/// <reference path="ArmTemplate.ts" />
/// <reference path="Resource.ts" />
/// <reference path="ResourceShape.ts" />
/// <reference path="ToolboxResource.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

class Graph {
    private graph: joint.dia.Graph;
    private paper: joint.dia.Paper;
    
    private template: ArmTemplate;
    private toolboxItems: ToolboxResource[];
    private resourceShapes: ResourceShape[] = new Array<ResourceShape>();
    private resourceShapeLinks: ResourceShapeLink[] = new Array<ResourceShapeLink>();
    
    constructor(template:ArmTemplate, toolboxItems:ToolboxResource[]) {
        this.template = template;
        this.toolboxItems = toolboxItems;
        
        this.initJointJs();
        this.createNodes();
        this.createLinks();
        this.autoSetShapePositions();
        this.displayNodesAndLinks();
        this.initializeClickPopup();
    }
    
    private initJointJs() {
        this.graph = new joint.dia.Graph();
        this.paper = new joint.dia.Paper({ el: $('#paper'), gridSize: 1, model: this.graph, height: '100%', width: '100%' });
    }
    
    private createNodes() {
        this.template.resources.forEach(resource => {
            var toolboxItem: ToolboxResource = this.getToolboxItemForResource(resource);
           
            var shape = new ResourceShape(resource, toolboxItem);
            shape.position(80, 80);
            shape.resize(170, 100);
            
            this.resourceShapes.push(shape);
        });
    }
    
    private displayNodesAndLinks() {
        this.resourceShapes.forEach(shape => {
            this.addShape(shape); 
        });
        
        this.resourceShapeLinks.forEach(shapeLink => {
           this.addShapeLink(shapeLink); 
        });
    }
    
    private createLinks() {
        var self = this;
        
        this.template.resources.forEach(resource => {
            var dependencies = self.template.getDependencies(resource);
            
            dependencies.forEach(dep => {
                var sourceNode = self.getShapeForResource(resource);
                var destNode = self.getShapeForResource(dep);
    
                var l = new joint.dia.Link({
                    source: { id: sourceNode.id },
                    target: { id: destNode.id },
                    attrs: {
                        '.connection': { 'stroke-width': 5, stroke: '#34495E' },
                        '.marker-target': { fill: 'yellow', d: 'M 10 0 L 0 5 L 10 10 z' }
                    }
                });
    
                this.resourceShapeLinks.push(l);
            });
        });
    }
    
    private addShape(shape:ResourceShape) {
        this.graph.addCell(shape);
    }
    
    private addShapeLink(link:ResourceShapeLink) {
        this.graph.addCell(link);
    }
    
    private getToolboxItemForResource(resource:Resource): ToolboxResource {
        var foundItem:ToolboxResource = null;
        
        this.toolboxItems.forEach(toolboxItem => {
           if(toolboxItem.resourceType === resource.type) {
               foundItem = toolboxItem;
           }
        });
        
        return foundItem;
    }
    
    private getShapeForResource(resource:Resource) {
        var retShape:ResourceShape;
        
        this.resourceShapes.forEach(shape => {
           if(shape.sourceResource === resource) {
               retShape = shape;
           } 
        });
        
        return retShape;
    }
    
    private initializeClickPopup() {
        var self = this;
        this.paper.on('cell:pointerdown', function (evt, x, y) {
            var shape:ResourceShape = evt.model;
            self.displayResource(shape.sourceResource);
        });
    }
    
    private displayResource(resource) {
        $('#nodeProperties').val(JSON.stringify(resource, null, 2));
    }
    
    private autoSetShapePositions() {
        var self = this;
    //https://github.com/cpettitt/dagre/wiki#configuring-the-layout
   
        var g = new dagre.graphlib.Graph();

        // Set an object for the graph label
        g.setGraph({});

        // Default to assigning a new object as a label for each new edge.
        g.setDefaultEdgeLabel(function () { return {}; });

        this.resourceShapes.forEach(shape => {
           g.setNode(shape.id, { width: shape.attributes.size.width, height: shape.attributes.size.height });
        });

        this.resourceShapeLinks.forEach(shapeLink => {
            g.setEdge(shapeLink.attributes.source.id, shapeLink.attributes.target.id);
        });

        dagre.layout(g);

        g.nodes().forEach(function (node) {
            var shape = _.findWhere(self.resourceShapes, { id: node });

            shape.attributes.position.x = g.node(node).x;
            shape.attributes.position.y = g.node(node).y;
        });
    }
}