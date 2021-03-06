const token = {}

token.getToken=function() {
    let token = localStorage.getItem('t');
    let t = window.decodeURIComponent(window.atob(token));
    return t;
};

token.storeToken=function(token){
    let t=window.btoa(window.encodeURIComponent(token));
    localStorage.setItem("t",t);
};

token.hasToken=function(){
    let token=localStorage.getItem('t');
    if(token==null) return false;
    else return true;
};

token.removeToken=function(){
    localStorage.removeItem('t');
    localStorage.removeItem('webchat_k');
};

export default token