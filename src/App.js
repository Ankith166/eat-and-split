import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function App()
{
  const [listshow,update]=useState(false);
  const [newfr,add]=useState([...initialFriends]);
  const [whotopay,selected]=useState(null);
 const [ruppee,updateruppess]=useState("");
  function addfriend(e)
  { console.log(e);
    add(()=>[...newfr,e]);
    update(listshow=>!listshow);
  }
  function handleclick()
  {
    update(listshow=>!listshow);
  }
  function handleselect(selectedfriend)
  { console.log(selectedfriend);
    selected(cur=>cur?.id===selectedfriend.id?null:selectedfriend);
  }
  function paisa(str)
  {
    console.log(str)
    updateruppess(str);
    selected(null);
  }

  return <div className="app">
    <div className="sidebar">
    <Friendlist Friends={newfr} onSelect={handleselect} val={whotopay}/>
    
   {listshow && <FormAddFriend onAdd={addfriend}/>}
   <Button onClick={handleclick}>Add friend</Button>
    </div>
    {whotopay && <FormSplitBill friend={whotopay} paisa={paisa}/>}
  </div>
}

function Friendlist({Friends,onSelect,val})
{console.log(Friends)
 return <ul>

{Friends.map(friend=><Friend friend={friend} key={friend.id} onSelect={()=>onSelect(friend)} val={val}/>)}
</ul>
  
 
}
function Friend({friend,onSelect,val})
{ const selection=val?.id===friend.id;
  return <li className={selection?"selected":""}>
   
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>
    {friend.balance<0 && <p className="red">I owe {friend.name} {Math.abs(friend.balance)}</p>}
    {friend.balance>0 && <p className="green">I will get from {friend.name} {friend.balance}</p>}
    {friend.balance===0 && <p >I dont owe anything from {friend.name}</p>}
    <Button onClick={onSelect}>{selection?"cancel":"Select"}</Button>



  </li>
}
function FormAddFriend({onAdd})
{ const id=Math.floor(Math.random()*1000);
  //"https://i.pravatar.cc/48?u=118836"
  const image=`https://i.pravatar.cc/48?u=${id}`
  const [name,updatename]=useState("");
  function handlechange(e)
  { const value=e.target.value;
    updatename(name=>(value))
  }
  return ( <form className="form-add-friend">
<label>Friend name</label>
<input name="name"type="text" value={name.name} onChange={handlechange} />
<label>Image URL</label>
<input name="url"type="text" value={name.url} onChange={handlechange} disabled/>
<Button onClick={(e)=>{e.preventDefault();onAdd({name,id,image,balance:0})}} >Add</Button>
</form>)
 
}
function Button({onClick,children})
{
 return  <button className="button"  onClick={onClick}>{children}</button>
}


function FormSplitBill({friend,paisa})
{ const [input,updateinput]=useState({total:0,me:0})
function handlechange(e)
{const name=e.target.name;
  const value=e.target.value;
  updateinput(input=>({...input,[name]:Number(value)}));
}

const [select,change]=useState("");
function handleselect(e)
{ const x=e.target.value;
  if(x==="user")
  {
  change(`I owe ${input.total-input.me}`)
  friend.balance=input.total-input.me
}
  else
  {
  change(`${friend.name} owes ${input.me}`)
  friend.balance=-(input.me);
}


}
   return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label>Bill value</label>
      <input type="text" name="total" value={input.total} onChange={handlechange}/>
      <label>your expense</label>
      <input type="text" name="me" value={input.me} onChange={handlechange}/>
      <label>{friend.name} expense</label>
      <input type="text" disabled value={input.total-input.me}/>
      <label>who is paying the bill</label>
      <select  onChange={handleselect}>
        <option></option>
        <option value="user">you</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button onClick={(e)=>{e.preventDefault();paisa(select)}}>Split bill</Button>
    </form>
  )
}
export default App;
