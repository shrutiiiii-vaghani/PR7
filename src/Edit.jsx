import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../src/Add.css';


const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const getdata = () => {
        let all = JSON.parse(localStorage.getItem('crud'));
        if(all === null){
            return [];
        }else{
            return all;
        }
    }

    const[record,setRecord]=useState(getdata);

    const[input,setInput] = useState({
        name:'',
        phone:'',
    })

    


    const handleChange = (e) => {
        const{name,value}=e.target
        setInput({
            ...input,[name]: value
        })
    }

    const handleSubmit = () => {
    const{name,phone}=input;
            let ans = record.map((item)=>{
                if(item.id == parseInt(id)){
                return{
                    ...item,
                    name:name,
                    phone:phone
                }
                }
                return item;
            })
            setRecord(ans);
            localStorage.setItem('crud',JSON.stringify(ans));
        alert("succesfully updated");
        navigate('/view')
    }

    useEffect(()=>{
        let ans = record.filter((item)=>{
            return item.id === parseInt(id) ;
        })
        setInput(ans[0]);
    },[id,record])


    return (
      <body className="bg">
        <center>
            <div style={{position:"absolute",top:"20%",left:"50%",transform:"translate(-50% ,-50%)"}}>
            <h2 style={{color:"#978FDD"}}>Edit Your Data</h2>
            <table border={2} width="400px" style={{borderColor:"#5D50CD"}}>
                <tr>
                        <td><h6 style={{marginLeft:"15px",marginTop:"15px",color:"white"}}>Name</h6></td>
                        <td><input type="text" name="name" value={input.name} onChange={handleChange} style={{borderRadius:"10px",marginTop:"10px"}}/></td>
                </tr>
                <tr>
                        <td><h6 style={{marginLeft:"15px",marginTop:"15px",color:"white"}}>Description</h6></td>
                        <td><input type="text" name="phone" value={input.phone} onChange={handleChange}
                        style={{borderRadius:"10px",marginTop:"10px"}}/></td>
                </tr>
                <tr>
                        <td></td>
                        <td><input type="button" value="Edit" onClick={()=>handleSubmit()} style={{backgroundColor:"#5D50CD",color:"white",marginTop:"10px",padding:"5px 15px",border:"none",borderRadius:"10px",marginBottom:"10px"}}/></td>
                </tr>
            </table>
            </div> 
        <br />
      </center>
      </body>
    )
}
export default Edit;