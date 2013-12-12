

/* it is useful to note that we always use var i = y * this.width + x to traverse arrays, and iterate through y within x */


var Morph = function(height, width, bits){
    this.height = height;
    this.width = width;
    if(bits){
        this.data = bits;
        if(this.height * this.width != this.data.length)throw 'MORPH_DIMENSION_ERROR: incorrect dimensions';
    }
    else{
        this.data = Array.apply(null, new Array(this.height * this.width)).map(Number.prototype.valueOf,0);
    }


}

var StructuringElement = function(d,initiliser){

    if(d){
        this.dim = d;
    }
    else{
        this.dim = 3;
    }
    if(!initiliser){
        initiliser = 1;
    }

    this.data = [];
    this.integerRepresentation = 0;
    for(var ind = 0; ind < this.dim * this.dim; ind++){
        this.data.push(1);
    }


}

/* structuring element class code */


StructuringElement.prototype.dilateOp = function(el){

    SECheck(el);
    for(var j = 0; j < 9; j++){
        if(el.data[j] == 1 && this.data[j] == 1){
            return 1;
        }
    }
    return 0;
}

StructuringElement.prototype.erodeOp = function(el){

    SECheck(el);
    for(var i = 0; i < 9; i++){
        if(el.data[i] != this.data[i]){
            return 0;
        }
    }
    return 1;
}


/* Morph class code*/

Morph.prototype.erodeWithElement = function(el){
    if(el){
        SECheck(el);
    }
    else{
        el = new StructuringElement();
    }

    var result = Array.apply(null, new Array(this.height * this.width)).map(Number.prototype.valueOf,0);


    for(var x = 1; x < this.width - 1; x++){
        for(var y = 1; y < this.height - 1; y++){

            var i = y * this.width + x;
            var mat = this.constructMatrixForIndex(i, el.dim);
            result[i] = el.erodeOp(mat);

        }
    }
    this.data = result;
    return this;
}

Morph.prototype.dilateWithElement = function(el){
    if(el){
        SECheck(el);
    }
    else{
        el = new StructuringElement();
    }


    var result = Array.apply(null, new Array(this.height * this.width)).map(Number.prototype.valueOf,0);


    for(var x = 1; x < this.width - 1; x++){
        for(var y = 1; y < this.height - 1; y++){

            var i = y * this.width + x;
            var mat = this.constructMatrixForIndex(i, el.dim);
            result[i] = el.dilateOp(mat);

        }
    }
    this.data = result;
    return this;

}

Morph.prototype.erode



Morph.prototype.applyMorphology = function(op,el){

    SECheck(el);

    var result = Array.apply(null, new Array(this.height * this.width)).map(Number.prototype.valueOf,0);


    for(var x = 1; x < this.width - 1; x++){
        for(var y = 1; y < this.height - 1; y++){

            var i = y * this.width + x;
            var mat = this.constructMatrixForIndex(i, el.dim);
            result[i] = op(mat);

        }
    }
    this.data = result;
    return this;

}


Morph.prototype.constructMatrixForIndex = function(ind,d){
    if(!d)d = 3;
    var mat = new StructuringElement(d,0);
    var halfDim = Math.floor(d / 2);
    var upperLeft = (ind - (this.width * halfDim)) - 1;
    var count = 0;
    for(var x = 0; x < d * d; x++){

        var j = upperLeft + (x % d) + this.width * Math.floor(x / d);
        if(j < this.data.length && j >= 0){
            mat.data[count] = this.data[j];
            console.log(j, this.data[j]);

        }
        count++;
    }
    return mat;
}

morphFromContext = function(context){
    var data = this.createImageData(context.width,context.height);
    return new Morph(context.height, context.width, context.createImageData(this.width,this.h))
}

SECheck = function(el){
    if(!(el instanceof StructuringElement)){
        throw 'MORPH_TYPE_ERROR: input must be a StructuringElement';
        return;
    }
}

