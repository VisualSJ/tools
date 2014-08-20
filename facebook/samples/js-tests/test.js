var num = 1000000000;


(function(num){

    console.time("b");

    for(var i=0;i<num;i++){
        if(1.5 | 0){}
    }

    console.timeEnd("b")

})(num);
(function(num){

    console.time("a");

    for(var i=0;i<num;i++){
        if(~~1.5){}
    }

    console.timeEnd("a")

})(num);