let totalExpense=0;
let totalIncome=0;
let totalBalance=0;
const headerElement=document.querySelector("#headerItem");
const headerIncomeElement=document.querySelector("#headerIncome");
const headerExpenseElement=document.querySelector("#headerExpense");
//get  btn element
 const inputElement=document.querySelector("#inputAmount");
//get desc
const inputDesc=document.querySelector("#inputDescp");
const tableElem=document.querySelector("#tableItem")
//get btn element
const element=document.querySelector("#btnSelector");
document.mainForm.onsubmit = function(e){
   e.preventDefault();
   var selectedOption = document.querySelector('input[name = sourceType]:checked').value;
   //Listen to click event
   element.addEventListener("click",addExpense(selectedOption),false);
};
headerIncomeElement.textContent=`Total Income: ${totalIncome}₹`;
headerExpenseElement.textContent=`Total Expense: ${totalExpense}₹`;
headerElement.textContent=`Total: ${totalBalance}₹`;
//create arr
let arrTotal=[];
//create increment function
function addExpense(selectedOption){
   //e.preventDefault();
    const textAmount=inputElement.value;
    const textDesc=inputDesc.value;

    //if textAmount and textDesc isnot empty
    if(textAmount != "" && textDesc !=""){
        //remove labels
        inputElement.classList.remove("is-invalid");
        inputDesc.classList.remove("is-invalid");

        //convert to int
        const expense=parseInt(textAmount,10);
        //assign to 1 obj

        //check of amount is number
        if(!isNaN(expense)){
            const obj={};
            obj.desc=textDesc;
            obj.expense=textAmount;
            obj.moment=new Date();
            obj.type=selectedOption;

            //assign to array
            arrTotal.push(obj);
            if(selectedOption=='incomeType'){
                totalIncome=totalIncome+expense;
            }
            else{
                totalExpense=totalExpense+expense;
            }
            //add to total
            totalBalance=totalIncome-totalExpense;
            //set the heading element
            updateTotal();
            renderListView(arrTotal);
            inputElement.value = "";
            inputDesc
            .value = "";
            }else {
                inputElement.classList.add("is-invalid");
            }
    }else{
        inputElement.classList.add("is-invalid");
        inputDesc.classList.add("is-invalid");
    }
}
   function getDateString(momento){
       return momento.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
   }

   function deleteItem(dateString,expense,type){
        let newArrList=[];
        for(let i=0;i<arrTotal.length;i++){
            if(arrTotal[i].moment.valueOf()!==dateString){
                newArrList.push(arrTotal[i]);
            }
        }
        renderListView(newArrList);
        console.log(type.value)
        if(type.value=='incomeType'){
           totalIncome=totalIncome-expense;
       }
       else{
           totalExpense=totalExpense-expense;
       }
        totalBalance=totalIncome-totalExpense;
        updateTotal();
    }

    function updateTotal(){
        let someText = `Total: ${totalBalance}₹`;
        headerElement.textContent = someText;
        headerIncomeElement.textContent = `Total Income: ${totalIncome}₹`;
        headerExpenseElement.textContent= `Total Expense: ${totalExpense}₹`;
    }

    function renderListView(arrayOfList){
        const showItemHTML=arrayOfList.map(item=>viewTable(item));
        const joinedShowItemHTML=showItemHTML.join('');
        //print
        tableElem.innerHTML=joinedShowItemHTML;
        arrTotal=arrayOfList;
    }

    function viewTable({ desc, expense, moment,type }) {
        return `
            <li class="list-group-item d-flex justify-content-between">
                    <div class="d-flex flex-column">
                        ${desc}
                        <small class="text-muted">${getDateString(moment)}</small>
                    </div>
                    <div>
                        <span class="px-5">
                            ${expense}₹
                        </span>
                        <span class="px-5">
                            ${type}
                        </span>
                        <button
                            type="button"
                            class="btn btn-outline-danger btn-sm"
                            onclick="deleteItem(${moment.valueOf()},${expense},${type})"
                            >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </li>
            `;
    }
