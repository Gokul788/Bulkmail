import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx"

function App() {

const [msg,setmsg] = useState("")
const [status,setStatus] = useState(false)
const [emails,setemails] = useState([])

function HandleText(evt){
    setmsg(evt.target.value)
}

function HandleFile (e){
   
  const file = e.target.files[0]
  console.log(file)

const reader = new FileReader();

reader.onload = function(e){
const data = e.target.result;
const workbook = XLSX.read(data,{type:'binary'})
const sheetName = workbook.SheetNames[0]
const workSheet = workbook.Sheets[sheetName] 
const emailList = XLSX.utils.sheet_to_json(workSheet,{header:'A'})
const emaillists = emailList.map(function(items){return items.A})

setemails(emaillists)

}

reader.readAsBinaryString(file)

}

const sendMessage = () => {
  setStatus(true)
  axios.post("http://localhost:5000/sendemail",{message:msg,emailList:emails})
  .then(function(data){
    if(data.data === true){
      alert("Send Sucessfull")
      setStatus(false)
    }
    else{
      alert("Failed")
      setStatus(false)
    }
  })

}

  return (
    <>
    <div>

    <div className="bg-blue-950 text-white text-center">
      <h1 className="text-2xl font-medium px-5 py-3 ">BulkMail</h1>
      </div>


    <div className="bg-blue-800 text-white text-center">
      <h1 className="font-medium px-5 py-3 ">We can help your business with sending multiple emails at once</h1>
      </div>

    <div className="bg-blue-600 text-white text-center">
      <h1 className="font-medium px-5 py-3 ">Drag and Drop</h1>
      </div>

      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3 ">
        <textarea  onChange={HandleText} name="" id="" className="w-[80%] h-32 border border-black rounded-md" placeholder="Enter key email text....."></textarea>

        <div>
        <input  onChange={HandleFile} type="file" className="border-4 border-dashed py-4 px-4 mt-5 mb-5" />
        
      </div>
      <p>Total Email in the file : {emails.length}</p>

      <button onClick={sendMessage} className="bg-blue-950 py-2 px-2 text-white font-medium rounded-md  w-fit mt-3">{status?"Sending...":"Send"}</button>

      </div>

      <div className="bg-blue-300 text-white text-center p-8"></div>
      <div className="bg-blue-300 text-white text-center p-8"></div>
     
    </div>
    </>
  );
}

export default App;
