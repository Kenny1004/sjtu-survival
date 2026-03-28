(function(){
  var c = document.getElementById('stars');
  for (var i = 0; i < 80; i++) {
    var s = document.createElement('div'); s.className = 'star';
    var sz = Math.random()*2+1;
    s.style.cssText = 'width:'+sz+'px;height:'+sz+'px;left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;--dur:'+( Math.random()*3+2)+'s;';
    c.appendChild(s);
  }
})();
