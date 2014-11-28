var bruitageModel = {

    init : function(){
        //Init the fonction bruitage.
        SC.initialize({
          client_id: 'a0c1c7c655f3206e6699187d6b39e044'
        });

    },
    
    playSoundEffect : function(id){
        // stream track id 293
        SC.stream("/tracks/"+id, function(sound){
          sound.play();
        });
    }
    
}