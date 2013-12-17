

/******* note that we always use var i = y * this.width + x to traverse arrays, and iterate through y within x ********/




/************************************ structuring element definitions / methods ***************************************/



var StructuringElement = function(d,data){

    if(d){
        this.dim = d;
    }
    else{
        this.dim = 3;
    }
    if(data){
        this.data = data;
    }
    else{
        this.data = [];
         // this.integerRepresentation = new UintArray(32);
        for(var ind = 0; ind < this.dim * this.dim; ind++){
            this.data.push(1);
        }
    }
}

var MORPH_3x3_CROSS_ELEMENT = new StructuringElement(3,[0, 1, 0,
                                                        1, 1, 1,
                                                        0, 1, 0])

var MORPH_3x3_RECT_ELEMENT = new StructuringElement()



var MORPH_3x3_TOP_RIGHT_CORNER_ELEMENT = new StructuringElement(3,[-1, 1,-1,
                                                                    0, 1, 1,
                                                                    0, 0,-1])

var MORPH_3x3_BOTTOM_LEFT_CORNER_ELEMENT = new StructuringElement(3,[-1, 0, 0,
                                                                      1, 1, 0,
                                                                     -1, 1,-1])

var MORPH_3x3_TOP_LEFT_CORNER_ELEMENT = new StructuringElement(3,[ -1, 1,-1,
                                                                    1, 1, 0,
                                                                   -1, 0, 0])

var MORPH_3x3_BOTTOM_RIGHT_CORNER_ELEMENT = new StructuringElement(3,[ 0, 0,-1,
                                                                       0, 1, 1,
                                                                      -1, 1,-1])

StructuringElement.prototype.dilateOp = function(el){

    SECheck(el);
    for(var j = 0; j < 9; j++){
        if(el.data[j] == -1)continue;
        if(el.data[j] == 1 && this.data[j] == 1){
            return 1;
        }
    }
    return 0;
}

StructuringElement.prototype.erodeOp = function(el){

    SECheck(el);
    for(var i = 0; i < 9; i++){
        if(el.data[i] == -1)continue;
        if(el.data[i] != this.data[i] && el.data[i] != 1){
            return 0;
        }
    }
    return 1;
}

StructuringElement.prototype.equivalenceOp = function(el){

    SECheck(el);
    for(var i = 0; i < 9; i++){
        if(el.data[i] == -1)continue;
        if(el.data[i] != this.data[i]){
            return 0;
        }
    }
    return 1;
}


/********************************* morphological operations constructor / methods *************************************/

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
            var ind = x * this.height + y;
            var mat = this.constructMatrixForIndex(ind, el.dim);
            result[ind] = mat.dilateOp(el);
        }
    }
    this.data = result;
    return this;
}


Morph.prototype.openingWithElement = function(el){
    this.dilateWithElement(el);
    this.erodeWithElement(el);
}

Morph.prototype.closingWithElement = function(el){
    this.erodeWithElement(el);
    this.dilateWithElement(el);
}

Morph.prototype.hitMissTransform = function(){

    var result = Array.apply(null, new Array(this.height * this.width)).map(Number.prototype.valueOf,0);


    for(var x = 1; x < this.width - 1; x++){
        for(var y = 1; y < this.height - 1; y++){

            var i = y * this.width + x;
            var mat = this.constructMatrixForIndex(i, 3);
            result[i] = mat.equivalenceOp(MORPH_3x3_BOTTOM_LEFT_CORNER_ELEMENT) || mat.equivalenceOp(MORPH_3x3_BOTTOM_RIGHT_CORNER_ELEMENT) || mat.equivalenceOp(MORPH_3x3_TOP_LEFT_CORNER_ELEMENT) || mat.equivalenceOp(MORPH_3x3_TOP_RIGHT_CORNER_ELEMENT);

        }
    }
    this.data = result;
    return this;
}

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

Morph.prototype.drawMatrixForIndexDebug = function(ind,d,context){
    if(!d)d = 3;
    var mat = new StructuringElement(d,0);
    var halfDim = Math.floor(d / 2);
    var upperLeft = ((ind - (this.width * halfDim))) - 1;

    var count = 0;
    for(var x = 0; x < d * d; x++){

        var j = upperLeft + (x % d) + this.width * Math.floor(x / d);
        //context.fillRect(j)
        if(j < this.data.length && j >= 0){
            mat.data[count] = this.data[j];
        }
        count++;
    }
    return mat;
}

Morph.prototype.constructMatrixForIndex = function(ind,d){
    if(!d)d = 3;
    var mat = new StructuringElement(d,0);
    var halfDim = Math.floor(d / 2);
    var upperLeft = ((ind - (this.height * halfDim))) - 1;

    var count = 0;
    for(var x = 0; x < d * d; x++){

        var j = upperLeft + (x % d) + this.height * Math.floor(x / d);
        if(j < this.data.length && j >= 0){
            mat.data[count] = this.data[j];
        }
        count++;
    }
    return mat;
}

morphFromContext = function(context){
    var data = this.createImageData(context.width,context.height);
    return new Morph(context.height, context.width, context.createImageData(this.width,this.height))
}

SECheck = function(el){
    if(!(el instanceof StructuringElement)){
        throw 'MORPH_TYPE_ERROR: input must be a StructuringElement';
        return;
    }
}

