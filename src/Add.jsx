import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../src/Add.css';


const Add = () => {

    const navigate = useNavigate();
   
    const[input,setInput] = useState({
        name:'',
        phone:'',
    })

    const[record,setRecord]=useState([]);
    const[editid,setEditId]=useState("");

    const handleChange = (e) => {
        const{name,value}=e.target
        setInput({
            ...input,[name]: value
        })
    }

    const handleSubmit = () => {
       if(editid){
         let ans = record.filter((item)=>{
            if(item.id == editid){
              item.name = input.name,
              item.phone = input.phone
            }
            return item;
         })
         setRecord(ans);
         setEditId("");
         alert("succesfully updated");
       }else{
            const{name,phone}=input;
            let obj = {
                id:Math.floor(Math.random() * 10000),
                name:name,
                phone:phone
            }
            let data=[...record,obj];
            setRecord(data);
            localStorage.setItem('crud',JSON.stringify(data));
            alert("succesfully insert");
            navigate('/view');      
       }
       setInput({
        name:'',
        phone:''
    })
    }

    useEffect(()=>{
        let all = JSON.parse(localStorage.getItem('crud'));
        if(all === null){
            setRecord ([]);
        }else{
            setRecord(all);
        }
    },[])

   

    // const EditData = (id) =>  {
    //     let ans = record.filter((item)=>{
    //         return item.id === id ;
    //     })
    //     setInput(ans[0]);
    //     setEditId(id);
    // }

    return(
      <body className="bg">
        <center>
            <div  style={{position:"absolute",top:"20%",left:"50%",transform:"translate(-50% ,-50%)"}}>
            <h2 style={{color:"#978FDD"}}>To Do Application</h2>
        <table border={2} width="400px" style={{borderColor:"#5D50CD"}}>
                    <tr>
                            <td><h6 style={{marginLeft:"15px",marginTop:"15px",color:"white"}}>Name</h6></td>
                            <td><input type="text" name="name" value={input.name} onChange={handleChange} style={{borderRadius:"10px",marginTop:"10px"}}/></td>
                    </tr>
                    <tr>
                            <td><h6 style={{marginLeft:"15px",marginTop:"15px",color:"white"}}>Description</h6></td>
                            <td><input type="text" name="phone" value={input.phone} onChange={handleChange}  style={{borderRadius:"10px",marginTop:"10px"}}/></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>
                            {
                                (editid)?( <input type="button" value="Edit" onClick={() => handleSubmit()}/>):
                                ( <input type="button" value="Submit" onClick={() => handleSubmit()} style={{backgroundColor:"#5D50CD",color:"white",marginTop:"10px",padding:"5px 15px",border:"none",borderRadius:"10px",marginBottom:"10px"}}/>)
                            }
                            </td>
                    </tr>
            </table>
            </div> 
            <br />
      </center>
      </body>
    )
}
export default Add;