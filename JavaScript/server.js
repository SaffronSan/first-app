let mbtn = document.getElementById('add'),//this one
  gcont = 0,
  divcount = 0,
  area = document.getElementById("barea"),
  createEle = e => document.createElement(e),
  findEle = (ele,itemID,xdiv) => {
    let lst = ele.childNodes;
    if(xdiv){
      for(var child of ele.getElementsByTagName("select")){
        if(child.id == itemID){return child;}
      };
    }
    for(child of lst){
      if(child.id == itemID){console.log(child);return child;}
    }
  };// returns a element from another element using id

let radiofill = (lst,ele) => {
  lst.forEach(function(item){
    var e = createEle("option"); 
    e.value = item;
    e.innerHTML = item; 
    ele.append(e);
  });
  return ele;
};
let autofill = (lst,name,id) => {
  let div = createEle("div");
  div.className = name;
  div.id = id;
  lst.forEach(function(item){div.append(item);});
  return div;
};
let xBtnMaker = () => {
  let btnL = createEle("label"), btnlst = createEle("select"), btndiv;
  btnlst.id = "msel";
  btnL.innerHTML = "Button:";
  radiofill(["radio","box","ABC","123"],btnlst);
  btndiv = autofill([btnL,btnlst],"extra-btn","");
  return btndiv;
};
let xquesMaker = () => {
  let quty = createEle("label"), qutylst = createEle("select"), qutdiv;
  quty.id = "questy";
  quty.innerHTML = "Question:";
  radiofill(["regular","poll","Input"],qutylst);
  qutdiv = autofill([quty,qutylst],"extra-ques","");
  return qutdiv;
};
let extraMaker = () => {
  return autofill([xBtnMaker(),xquesMaker()],"xtradiv","xdiv");
};
function createAns(ty,e){
  let holding = createEle("div"), ans = createEle("input"), del = createEle("button"), radio = createEle("input");
  radio.className = "rd";
  ans.id = "ty"
  ans.type = "text";
  del.id = "del";
  radio.type = ty == "box"? "checkbox": ty;
  if(ty == "123" || ty == "ABC"){
    var x = e.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("rd").length;
    radio.type = "button";
    radio.value = (ty == "123"? x + 1 : String.fromCharCode(65 + x)) + ")";
  }
  ans.value = "Click to change options";
  del.innerHTML = "X";
  holding.append(radio);
  holding.append(ans);
  holding.append(del);
  del.addEventListener("click",function(){holding.remove();});
  radio.addEventListener("dblclick",function(e){e.target.checked = false;});
  return holding;
}
function updateSel(e,g){
  let sel, lst = e.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("rd");
  for(var x of e.childNodes){
    sel = x.selected? x.value : null;
    if(sel != null){break;}
  }
  if(g){return sel;}
  if(sel == "radio" || sel == "box"){
    for(var item of lst){
      item.type = sel == "box"? "checkbox": sel;
    }
  }
  else{
    for(var x = 0; x != lst.length;x++){
      lst[x].type = "button";
      lst[x].value = sel == "123"? `${x+1})` : String.fromCharCode(65 + x) + ")";
    }
  }
}
function animateShowMoreDiv(e,back){
  //e.style.marginLeft = -110+"px";
  console.log("FUCK");
}
function Createcontainer() {
  let cont = createEle("form"),
    mn = createEle("section"),
    controlDiv = createEle("div"),
    qbody = createEle("div"),
    topDiv = createEle("div"),
    more = createEle("div");
    input = createEle("input"),
    exit = createEle("i"),
    img = createEle("img"),
    moreans = createEle("button"),
    dot = createEle("i"),
    dlab = createEle("label");
  let xm = extraMaker(),sxm = findEle(xm,"msel",true);
  console.log(xm);
  mn.id = "sec"+gcont;
  mn.className = "questionSec";
  dlab.innerHTML = "Type:";
  sxm.onchange = function(){updateSel(this,false)};
  more.hidden = true;
  more.id = "dia";
  more.append(xm);
  cont.setAttribute("onsubmit", "return false;");
  dot.innerHTML = "more_horiz";
  dot.id = "dt";
  dot.className = "material-icons dot";
  exit.innerHTML = "close";
  exit.className = "material-icons ext";
  controlDiv.style = "display: flex; align-content: stretch; justify-content: space-between;";
  exit.addEventListener("click",function(e){gcont--;e.target.parentNode.parentNode.parentNode.remove();});
  controlDiv.append(exit);
  controlDiv.append(dot);
  moreans.innerHTML = "+";
  moreans.id = "mbtn" + gcont;
  moreans.className = "mre";
  qbody.id = "qmain";
  qbody.append(createAns("radio"));
  qbody.append(moreans);
  input.value = "Question";
  input.id = "ques";
  topDiv.append(input);
  cont.id = "c" + gcont;
  cont.className = "cont";
  cont.append(controlDiv);
  cont.append(createEle("hr"));
  cont.append(topDiv);
  cont.append(createEle("hr"));
  cont.append(qbody);
  mn.append(cont);
  mn.append(more);
  dot.addEventListener("click",function(){
    if(more.hidden){
      more.hidden = false;
      animateShowMoreDiv(more,false);}
    else{
      more.hidden = true;
      //animateShowMoreDiv(more,true)
        }})
  moreans.addEventListener("click",(e) => {
    let d = createAns(updateSel(sxm,true),sxm);
    e.target.parentNode.append(d);
    e.target.parentNode.insertBefore(d,e.target);
  });
  
  gcont++;
  return mn;             
}

let orgdiv = () => {
  let zero = createEle("div");
  zero.id = "odiv"+divcount;
  zero.className = "organ";
  return zero;
};
mbtn.addEventListener('click', function() {
  if(gcont > 0 && gcont % 4 == 0){
    console.log("make a new div move the add button");
    divcount++;
    area.append(orgdiv());
    document.getElementById("odiv"+divcount).append(document.getElementsByClassName("organ")[divcount-1].getElementsByClassName("+")[0]);
  }
  mbtn.parentNode.parentNode.insertBefore(Createcontainer(),mbtn.parentNode);
});
function containerObj(){
  let totalSec = document.getElementsByClassName("questionSec"), arrayOfSecObj = [];
  for(sec of totalSec){
    var arrayOfAns = [], arrayOfCorrectAns = [];
    sec.childNodes[0].querySelectorAll("#ty").forEach((item)=>{
      arrayOfAns.push(item.value == "Click to change options"? "N/A" : item.value);
      var compactItem = item, i;
      item.parentNode.parentNode.childNodes.forEach((item,index) => {
        if(compactItem == item.querySelector("#ty")){i = index;}
      });
      if(item.parentNode.childNodes[0].checked){arrayOfCorrectAns.push({value : item.value == "Click to change options"? "N/A" : item.value, position : i})}
    })
    arrayOfSecObj.push({
      ques : sec.childNodes[0][0].value,
      answer : arrayOfAns,
      correctAnswers : arrayOfCorrectAns,
      buttonType : sec.childNodes[1].childNodes[0].childNodes[0].childNodes[1].selectedOptions[0].value,
      questype : sec.childNodes[1].childNodes[0].childNodes[1].childNodes[1].selectedOptions[0].value
    });
  }
  return arrayOfSecObj;
}

document.getElementById("save").addEventListener("click", () => {
    document.getElementById("login").hidden = false;
});
document.getElementById("save2").addEventListener("click",() =>{
    document.getElementById("json").innerHTML = JSON.stringify(containerObj());
})
