

/* it is useful to note that we always use var i = y * this.width + x to traverse arrays, and iterate through y within x */


var Morph = function(height, width, b){
    this.height = height;
    this.width = width;
    if(b){
        this.bits = b;

    }
    else{
        this.bits = Array.apply(null, new Array(this.height * this.width)).map(Number.prototype.valueOf,0);
    }
}

var StructuringElement = function(dimension){

    this.dimension = dimension;
    this.data = [];
    this.integerRepresentation = 0;
    this.data = Array.apply(null, new Array(this.dimension * this.dimension)).map(Number.prototype.valueOf,1);

//    for(var i = 0; i < dimension * dimension; i++){
//        this.data.push(1);
//    }

 //   sel = this;

//    this.setData = function(data){
//        sel.data = data;
//        sel.integerRepresentation = parseInt(data, 2);
//    }

}

/* structuring element class code */

StructuringElement.prototype.unionOp = function(el){


    for(var i = 0; i < 9; i++){
        if(el.data[i] || this.data[i]){
            return 1;
        }
    }
}

StructuringElement.prototype.intersectionOp = function(el){
  //        console.log(el.data,this.data);
    for(var i = 0; i < 9; i++){
        if(el.data[i] == 1 && this.data[i] == 1){
            return 1;
        }
    }
}


/* Morph class code*/

Morph.prototype.erode = function(){

}

Morph.prototype.dilateWithElement = function(el){

    SECheck(el);
    //el.operation = el.intersectionOp;
    return this.applyMorphology(el);

}



Morph.prototype.applyMorphology = function(el){

    SECheck(el);

    var result = Array.apply(null, new Array(this.height * this.width)).map(Number.prototype.valueOf,0);


    for(var y = 1; y < this.height - 1; y++){
        for(var x = 1; x < this.width - 1; x++){

            var i = y * this.width + x;
            var mat = this.constructMatrixForIndex(i, el.dimension);
            result[i] = el.intersectionOp(mat);

        }
    }

    return result;

}


Morph.prototype.constructMatrixForIndex = function(ind,dimension){
    var mat = new StructuringElement(dimension);
    var halfDim = Math.floor(dimension / 2);
    var upperLeft = (ind - (this.width * halfDim)) - halfDim;
    var count = 0;
    for(var x = 0; x < dimension; x++){
        for(var y = 0; y < dimension; y++){
            var i = y * dimension;
            var j = upperLeft + ((i / dimension) * this.width) + (x % dimension);
            if(this.bits[j]){
                Math.random();
            }
            mat[count] = this.bits[j];
            count ++;
        }
    }

    return mat;
}

morphFromContext = function(context){
    var data = this.createImageData(context.width,context.height);
    return Morph(context.height, context.width, context.createImageData(this.width,this.h))
}

SECheck = function(el){
    if(!(el instanceof StructuringElement)){
        throw 'MORPH_TYPE_ERROR: input must be a StructuringElement';
        return;
    }
}
