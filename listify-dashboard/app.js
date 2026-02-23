const todoForm=document.querySelector('form');
const todoInput=document.querySelector('input[type="text"]');
const todoList=document.querySelector('#todoList');
const clockElement=document.querySelector('#clock');
const dateElement=document.querySelector('h1');

let taskManager={
 data:[],
 init:function(){
    const saved = localStorage.getItem('listify-tasks');
    if(saved){
        this.data = JSON.parse(saved);
        this.data.forEach((task)=>{
            this.renderFromStorage(task.val);
        })
    }
    this.checkEmpty();
    todoForm.addEventListener('submit',this.submitHandler.bind(this));
 },
 saveToStorage:function(){
        localStorage.setItem('listify-tasks', JSON.stringify(this.data));
 },
 submitHandler:function(e){
  e.preventDefault();
  if(!todoInput.value.trim()){
   const warning=document.createElement('p');
   warning.className="fixed top-10 left-5 bg-red-600 text-white px-6 py-2 rounded-full shadow-lg z-[60] transition-all duration-500 opacity-0 -translate-y-4";
   warning.textContent="Enter some task";
   document.body.appendChild(warning);
   setTimeout(()=>{warning.classList.remove('opacity-0','-translate-y-4');},10);
   setTimeout(()=>{warning.classList.add('opacity-0','-translate-y-4');setTimeout(()=>warning.remove(),500);},2000);
   return;
  }
  this.data.push({
    val:todoInput.value
  });
  this.saveToStorage();
  this.add();
 },
 dateAndtime:function(){
  const now=new Date();
  const dateString=now.toLocaleDateString('en-IN',{month:'short',day:'numeric'});
  const timeString=now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  clockElement.textContent=timeString;
  dateElement.textContent=dateString;
 },
 checkEmpty:function(){
  let emptyshow = todoList.querySelector('.empty-msg');

  if(this.data.length===0){
    if(!emptyshow){
        let emptyshow=document.createElement('li');
        emptyshow.innerText="No Tasks Added";
        emptyshow.className="empty-msg text-slate-400 text-center py-10 text-xl font-semibold tracking-wide";
        todoList.appendChild(emptyshow);
        }
    }else{
        if(emptyshow) emptyshow.remove();
    }
  },
 add:function(){

  const newItem=document.createElement("li");
  newItem.className="task-list-item flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-300 mb-2";
  
  let tickContainer=document.createElement('div');
  tickContainer.className="flex items-center gap-4 text-slate-700";
  
  let tickbtn=document.createElement('button');
  tickbtn.className="w-6 h-6 rounded-lg border-2 border-slate-400 bg-white flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-400 hover:bg-orange-50 transition-all";
  tickbtn.innerHTML=`<i data-lucide="check" class="w-4 h-4"></i>`;
  
  let tickspan=document.createElement('span');
  tickspan.className="font-medium";
  tickspan.textContent=this.data[this.data.length-1].val;
  
  tickbtn.addEventListener('click',()=>{
    tickspan.classList.toggle('line-through');
    tickspan.classList.toggle('opacity-60');
  });
  
  let delbtn=document.createElement('button');
  delbtn.className="text-slate-400 hover:text-red-400 transition-colors";
  delbtn.innerHTML=`<i data-lucide="trash-2" class="w-5 h-5"></i>`;
  delbtn.addEventListener('click',()=>{
    newItem.remove();
    this.data.pop();
    this.saveToStorage();
    this.checkEmpty();
  });

  tickContainer.appendChild(tickbtn);
  tickContainer.appendChild(tickspan);
  
  newItem.appendChild(tickContainer);
  newItem.appendChild(delbtn);
  
  todoList.appendChild(newItem);
  lucide.createIcons();
  
  todoInput.value="";
  
  const warning=document.createElement('p');
  warning.className="fixed top-10 left-5 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg z-[60] transition-all duration-500 opacity-0 -translate-y-4";
  warning.textContent="Task saved";
  document.body.appendChild(warning);
  setTimeout(()=>{warning.classList.remove('opacity-0','-translate-y-4');},10);
  setTimeout(()=>{warning.classList.add('opacity-0','-translate-y-4');setTimeout(()=>warning.remove(),500);},2000);
  this.checkEmpty();
 },
 renderFromStorage:function(text){
    const newItem=document.createElement("li");
    newItem.className="task-list-item flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-300 mb-2";

    let tickContainer=document.createElement('div');
    tickContainer.className="flex items-center gap-4 text-slate-900";

    let tickbtn=document.createElement('button');
    tickbtn.className="w-6 h-6 rounded-lg border-2 border-slate-400 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-all";
    tickbtn.innerHTML=`<i data-lucide="check" class="w-4 h-4"></i>`;

    let tickspan=document.createElement('span');
    tickspan.className="font-medium";
    tickspan.textContent=text;

    tickbtn.addEventListener('click',()=>{
        tickspan.classList.toggle('line-through');
        tickspan.classList.toggle('opacity-60');
    });

    let delbtn=document.createElement('button');
    delbtn.className="text-slate-400 hover:text-red-400 transition-colors";
    delbtn.innerHTML=`<i data-lucide="trash-2" class="w-5 h-5"></i>`;

    delbtn.addEventListener('click',()=>{
        newItem.remove();
        this.data.pop();
        this.saveToStorage();
        this.checkEmpty();
    });

    tickContainer.appendChild(tickbtn);
    tickContainer.appendChild(tickspan);
    newItem.appendChild(tickContainer);
    newItem.appendChild(delbtn);
    todoList.appendChild(newItem);
    lucide.createIcons();
}
};

taskManager.init();
taskManager.checkEmpty();
taskManager.dateAndtime();
setInterval(()=>{taskManager.dateAndtime();},1000);

