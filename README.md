#morph.js
========


###Morphological image processing for javascript.

The purpose of morph.js is to make the low level image processing and computer vision functions defined by mathematical morphology available for use with preproccessed input from the webcam via window.getUserMedia(). Morph.js deals with binary images, in other words, all operations are done on arrays of ones and zeroes. 


###Mathematical Morphology as described by wikipedia:

Mathematical morphology (MM) is a theory and technique for the analysis and processing of geometrical structures, based on set theory, lattice theory, topology, and random functions. MM is most commonly applied to digital images, but it can be employed as well on graphs, surface meshes, solids, and many other spatial structures.
Topological and geometrical continuous-space concepts such as size, shape, convexity, connectivity, and geodesic distance, were introduced by MM on both continuous and discrete spaces. MM is also the foundation of morphological image processing, which consists of a set of operators that transform images according to the above characterizations.
MM was originally developed for binary images, and was later extended to grayscale functions and images. The subsequent generalization to complete lattices is widely accepted today as MM's theoretical foundation.


##Usage

To initialize a morph object:
    
    var height = 200
    var width = 270
    var morph = new Morph(height, width, bits)

where bits is an array of 1s and 0s with length (height * width), usually derived from some image.

Basic functionality in Morphological image processing (MIP) is defined by the erode and dilate operations.

    
###Erosion

    morph.erodeWithElement()

when no structuring element argument is provided all operations default to using a default 3x3 rectangular structuring element that looks like this:

    [1,1,1,
     1,1,1,
     1,1,1]
     
And will provide results like this:     

![ScreenShot](https://www.cs.auckland.ac.nz/courses/compsci773s1c/lectures/ImageProcessing-html/mor-pri-erosion.gif)

Users can select from other predefined structuring elements like MORPH_3x3_CROSS_ELEMENT, or define their own structuring elements:

    var el = new StructuringElement(3,[1,1,1,
                                       0,1,0,
                                       0,0,0])
                                       
Where the 1st argument is the dimension of the element. 


###Dilation

    morph.dilateWithElement()

Will provide results like this:

![ScreenShot](http://angelinagokhale.files.wordpress.com/2013/04/diltbin.gif)

Example usage: http://somatostat.in/swarmSandbox.html


###Closing

In image processing, closing is, together with opening, the basic workhorse of morphological noise removal. Opening removes small objects, while closing removes small holes [wikipedia]. 

    morph.closingWithElement()

Closing is the dilation operation followed by the erosion operation and depending on the structuring elements used, gives an effect similar to below. 

![ScreenShot](http://homepages.inf.ed.ac.uk/rbf/HIPR2/figs/closebin.gif)


###Opening

    morph.openingWithElement()
    
effect:

![ScreenShot](http://patentimages.storage.googleapis.com/WO2005107581A2/imgf000071_0001.png)
    
removing a small object with opening:
    
![ScreenShot](http://patentimages.storage.googleapis.com/WO2005107581A2/imgf000071_0001.png)





