var TT=document.querySelector("#TT");
var WH=document.querySelector("#WH");
var RF=document.querySelector("#RF");
var HC=document.querySelector("#HC");
var AT=document.querySelector("#AT");

var HealthInsurancePremium=3400;
var HealthInsurancePremiumRate=0.0699;
var NecessaryExpensesRate=0.6;
var BasicIncomeDeduction=150;
var BasicTaxCredit=7;
var OtherIncomeTaxRate=0.22;



function HIP(HCD=3400, HCR=0.0699, expenseRatio=0.6, DA=150){
  var Income=document.getElementById('Income').value;
  if(Income*(1-expenseRatio)<HCD){return 0;}
  else {return Math.round(((Income*(1-expenseRatio)-HCD)*HCR)*100)/100;}
}


function taxBaseFunc(DA=BasicIncomeDeduction, expenseRatio=NecessaryExpensesRate){
  var Income=document.getElementById('Income').value;
  return Income*(1-expenseRatio)-DA-HIP();
}


function WHTax(expenseRatio=NecessaryExpensesRate,OITrate=OtherIncomeTaxRate){
  var Income=document.getElementById('Income').value;
  var WHT=Income*(1-expenseRatio)*OITrate;
  return Math.round(WHT*100)/100;
}

function TotalTax(expenseRatio=NecessaryExpensesRate, DA=BasicIncomeDeduction, BaseTaxCredit=BasicTaxCredit){
  var TotTax;
  var taxBase=taxBaseFunc();
  if(taxBase<1200){TotTax=(taxBase*0.06)*1.1-BaseTaxCredit;}
  else if(taxBase<4600){TotTax=(taxBase*0.15-108)*1.1-BaseTaxCredit;}
  else if(taxBase<8800){TotTax=(taxBase*0.24-522)*1.1-BaseTaxCredit;}
  else if(taxBase<15000){TotTax=(taxBase*0.35-1490)*1.1-BaseTaxCredit;}
  else if(taxBase<30000){TotTax=(taxBase*0.38-1940)*1.1-BaseTaxCredit;}
  else if(taxBase<50000){TotTax=(taxBase*0.4-2540)*1.1-BaseTaxCredit;}
  else{TotTax=(taxBase*0.42-3540)*1.1-BaseTaxCredit;}
  return Math.round(Math.max(TotTax,0)*100)/100;
}


function Refund(){
  return Math.round((WHTax()-TotalTax())*100)/100;
}

function AfterTax(){
  var Income=document.getElementById('Income').value;
  return Math.round((Income-HIP()-TotalTax())*100)/100;
}


WH.textContent=WHTax()+"만원";
HC.textContent=HIP()+"만원";
RF.textContent=Refund()+"만원";
TT.textContent=TotalTax()+"만원";
AT.textContent=AfterTax()+"만원";

function doCalculate(){
  var Income=document.getElementById('Income').value;
  if(Income<0 || Income>20000){alert("연 소득은 0~20000 사이의 값을 입력받습니다.");}
  else{
    WH.textContent=WHTax()+"만원";
    HC.textContent=HIP()+"만원";
    RF.textContent=Refund()+"만원";
    TT.textContent=TotalTax()+"만원";
    AT.textContent=AfterTax()+"만원";
    myChart.data.datasets[0].data=[HIP(),TotalTax(),AfterTax()];
    myChart.update();
  }

}

var myChart=new Chart(document.getElementById("tax-chart"), {
    type: 'doughnut',
    data: {
      labels: ["건보료", "총 세액", "세후소득"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
        data: [HIP(),TotalTax(),AfterTax()]
      }]
    },
    options: {
      title: {
        display: true,
        text: '계산결과'
      }
    }
});
