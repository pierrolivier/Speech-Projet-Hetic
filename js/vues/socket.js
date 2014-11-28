var socketVue = {
    
    
    //Show the QRCode with the good token
    showQRCode : function(token){
        qr.canvas({foreground : '#FFF', background : '#000',level : 'L', canvas: document.getElementById('qr-code'), value: "http://projetpumir.cinemalebeaulieu.com/mobile/?token=" + token, size : 5}); 
    },
    
    //Hide the QRCode when the romte is connected
    hideQRCode : function(){
        document.getElementById('remote').className = "";
		document.getElementById('remote').classList.add("hide");
    }
    

}