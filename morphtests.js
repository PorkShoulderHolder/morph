var testMorph1 = new Morph(5,6,[0,0,0,1,0,0,
                                 0,0,1,0,0,0,
                                 0,1,0,0,1,0,
                                 1,0,0,0,1,0,
                                 0,0,0,1,0,0]);

    var testMorph2 = new Morph(5,6,[0,0,0,0,0,0,
                               0,0,0,0,0,0,
                               0,0,0,1,0,0,
                               0,0,0,0,0,0,
                               0,0,0,0,0,0]);

var testMorphErode =  new Morph(5,6,[0,0,0,1,1,1,
                                     0,1,1,1,1,1,
                                     0,1,1,1,1,1,
                                     0,1,1,1,1,1,
                                     0,0,1,1,1,0]);



var constructEl = function(idx){
    if(idx == 8){

        var t = testMorph1.constructMatrixForIndex(idx).data

        var a = [0,0,1,0,1,0,1,0,0]
        console.assert(a.compare(t), "construct element8 test failed: output is: " + t + " but should be " + a);
    }
    if(idx == 13){
         var t =testMorph1.constructMatrixForIndex(idx).data
         var a = [0,0,1,0,1,0,1,0,0]
        console.assert(a.compare(t), "construct element13 test failed: output is: " + t + " but should be " + a);
    }
    if(idx == 16){
         var t =testMorph1.constructMatrixForIndex(idx).data
         var a = [0,0,0,0,1,0,0,1,0]
        console.assert(a.compare(t), "construct element16 test failed: output is: " + t + " but should be " + a);
    }
    if(idx == 22){
         var t =testMorph1.constructMatrixForIndex(idx).data
         var a = [0,1,0,0,1,0,1,0,0]
        console.assert(a.compare(t), "construct element22 test failed: output is: " + t + " but should be " + a);
    }
}

var fullTest = function(){
    var a = [0,0,0,0,0,0,
             0,0,1,1,1,0,
             0,0,1,1,1,0,
             0,0,1,1,1,0,
             0,0,0,0,0,0];

    var a2 = [0,0,0,0,0,0,
             0,0,0,0,1,0,
             0,0,1,1,1,0,
             0,0,0,1,0,0,
             0,0,0,0,0,0]

    var anseq = [0,0,0,0,0,0,
                 0,0,1,0,1,0,
                 0,0,0,0,0,0,
                 0,0,1,0,1,0,
                 0,0,0,0,0,0];

    var m = new Morph(5,6,a);

    var t = testMorph2.dilateWithElement(new StructuringElement());
    var terode = testMorphErode.erodeWithElement(new StructuringElement());
    var teq = m.hitMissTransform()

    console.assert(a.compare(testMorph2.data), "final test failed: output is: " + testMorph2.data + " but should be " + a);
    console.assert(a2.compare(testMorphErode.data), "final test failed: output is: " + testMorphErode.data + " but should be " + a);
    console.assert(anseq.compare(m.data), "final test failed: output is: " + testMorphErode.data + " but should be " + a);

}

var interSectionOpTest = function(){
        var kernel = new StructuringElement(3);
        var tester1 = new StructuringElement(3);
        var tester2 = new StructuringElement(3);
        var tester3 = new StructuringElement(3);
        var tester4 = new StructuringElement(3);

        var eqTesterBL1 = new StructuringElement(3);
        var eqTesterBL2 = new StructuringElement(3);
        var eqTesterBL3 = new StructuringElement(3);
        var eqTesterBL4 = new StructuringElement(3);

        tester1.data = [0,0,1,0,0,0,1,0,0];
        tester2.data = [0,0,0,0,0,0,0,0,0];
        tester3.data = [1,1,1,1,1,1,1,1,1];
        tester4.data = [1,1,1,1,1,1,1,0,1];

        eqTesterBL1.data = [0,0,0,  //true
                           1,1,0,
                           1,1,0];

        eqTesterBL2.data = [0,0,0,  //true
                           1,1,0,
                           0,1,1];

        eqTesterBL3.data = [1,0,0,  //false
                            1,1,1,
                            1,1,0]

        eqTesterBL4.data = [0,0,1,  //false
                            0,0,0,
                            0,0,0]

        var t1 = kernel.dilateOp(tester1);
        var t2 = kernel.dilateOp(tester2);
        var t1t = tester1.dilateOp(kernel);
        var t2t = tester2.dilateOp(kernel);
        var t1a = kernel.erodeOp(tester3);
        var t2a = kernel.erodeOp(tester4);
        var t1ta = tester3.erodeOp(kernel);
        var t2ta = tester4.erodeOp(kernel);
        var bl1 =  eqTesterBL1.equivalenceOp(MORPH_3x3_BOTTOM_LEFT_CORNER_ELEMENT)
        var bl2 =  eqTesterBL2.equivalenceOp(MORPH_3x3_BOTTOM_LEFT_CORNER_ELEMENT)
        var bl3 =  eqTesterBL3.equivalenceOp(MORPH_3x3_BOTTOM_LEFT_CORNER_ELEMENT)
        var bl4 =  eqTesterBL4.equivalenceOp(MORPH_3x3_BOTTOM_LEFT_CORNER_ELEMENT)



       console.assert(t1 == 1, "intersectionOP test failed: output is: " + t1 + " but should be " + 1);
       console.assert(t2 == 0, "intersectionOP test failed: output is: " + t2 + " but should be " + 0);
       console.assert(t1t == 1, "intersectionOP test failed: output is: " + t1t + " but should be " + 1);
       console.assert(t2t == 0, "intersectionOP test failed: output is: " + t2t + " but should be " + 0);
       console.assert(t1a == 1, "intersectionOP test failed: output is: " + t1a + " but should be " + 1);
       console.assert(t2a == 0, "intersectionOP test failed: output is: " + t2a + " but should be " + 0);
       console.assert(t1ta == 1, "intersectionOP test failed: output is: " + t1ta + " but should be " + 1);
       console.assert(t2ta == 0, "intersectionOP test failed: output is: " + t2ta + " but should be " + 0);
       console.assert(bl1 == 1, "intersectionOP test failed: output is: " + t2ta + " but should be " + 1);
       console.assert(bl2 == 1, "intersectionOP test failed: output is: " + t2ta + " but should be " + 1);
       console.assert(bl3 == 0, "intersectionOP test failed: output is: " + t2ta + " but should be " + 0);
       console.assert(bl4 == 0, "intersectionOP test failed: output is: " + t2ta + " but should be " + 0);

}



// attach the .compare method to Array's prototype to call it on any array
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return

    if(this.length == array.length){
        for (var i = 0; i < Math.max(this.length, array.length); i++) {
            if(this[i] != array[i])return false;
        }
    }
    else{
        return false;
    }
    return true;
}

constructEl(8)
constructEl(12)
constructEl(16)
constructEl(22)
interSectionOpTest()
fullTest()