const a = [" ", " ", " "];
const b = [" ", " ", " "];
const c = [" ", " ", " "];

var x = 0;
var aa = 0;
var k = "";

function clrscr() {
  a[0] = " ";
  a[1] = " ";
  a[2] = " ";
  b[0] = " ";
  b[1] = " ";
  b[2] = " ";
  c[0] = " ";
  c[1] = " ";
  c[2] = " ";
  prnt();
  x = 0;
  document.getElementById("t").innerHTML = "Turn of X.";
}

function prnt() {
  document.getElementById("a1").value = a[0];
  document.getElementById("a2").value = a[1];
  document.getElementById("a3").value = a[2];
  document.getElementById("a4").value = b[0];
  document.getElementById("a5").value = b[1];
  document.getElementById("a6").value = b[2];
  document.getElementById("a7").value = c[0];
  document.getElementById("a8").value = c[1];
  document.getElementById("a9").value = c[2];
}



function wnchck() {
  if(x==9){
    document.getElementById("t").innerHTML="It's a draw. Clear board to play again."
  }
  aa = 0;
  k = " ";
  if (a[0] == b[0] && b[0] == c[0] && a[0] != " ") {
    aa = 1;
    k = a[0];
  };
  if (a[1] == b[1] && b[1] == c[1] && a[1] != " ") {
    aa = 1;
    k = a[1];
  };
  if (a[2] == b[2] && b[2] == c[2] && a[2] != " ") {
    aa = 1;
    k = a[2];
  };
  if (a[0] == a[1] && a[1] == a[2] && a[0] != " ") {
    aa = 1;
    k = a[0];
  };
  if (b[0] == b[1] && b[1] == b[2] && b[0] != " ") {
    aa = 1;
    k = b[0];
  };
  if (c[0] == c[1] && c[1] == c[2] && c[0] != " ") {
    aa = 1;
    k = c[0];
  };
  if (a[0] == b[1] && b[1] == c[2] && a[0] != " ") {
    aa = 1;
    k = a[0];
  };
  if (c[0] == b[1] && b[1] == a[2] && c[0] != " ") {
    aa = 1;
    k = c[0];
  };
  if (aa == 1 && k == "X") {
    document.getElementById("t").innerHTML = "X won.";
  };
  if (aa == 1 && k == "O") {
    document.getElementById("t").innerHTML = "O won.";
  };
};


function b1() {
  if (a[0] == " ") {
    if (x % 2 == 0) {
      a[0] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      a[0] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}

function b2() {
  if (a[1] == " ") {
    if (x % 2 == 0) {
      a[1] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      a[1] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}

function b3() {
  if (a[2] == " ") {
    if (x % 2 == 0) {
      a[2] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      a[2] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}

function b4() {
  if (b[0] == " ") {
    if (x % 2 == 0) {
      b[0] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      b[0] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}

function b5() {
  if (b[1] == " ") {
    if (x % 2 == 0) {
      b[1] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      b[1] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}

function b6() {
  if (b[2] == " ") {
    if (x % 2 == 0) {
      b[2] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      b[2] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}

function b7() {
  if (c[0] == " ") {
    if (x % 2 == 0) {
      c[0] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      c[0] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}

function b8() {
  if (c[1] == " ") {
    if (x % 2 == 0) {
      c[1] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      c[1] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}

function b9() {
  if (c[2] == " ") {
    if (x % 2 == 0) {
      c[2] = "X";
      document.getElementById("t").innerHTML = "Turn of O."
    } else {
      c[2] = "O";
      document.getElementById("t").innerHTML = "Turn of X."
    }
    x++;
    prnt();
    wnchck();
  } else {
    var y = "Wrong move. "
    if (x % 2 == 0) {
      y = y + "Turn of X again."
    } else {
      y = y + "Turn of O again."
    }
    document.getElementById("t").innerHTML = y;
  }
  return;
}
