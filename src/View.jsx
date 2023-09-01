import { useState,useEffect } from "react";
import { Link } from "react-router-dom";


const View = () => {

    let all = localStorage.getItem('crud') ? JSON.parse(localStorage.getItem('crud')) : [];
    const[record,setRecord]=useState(all);
    const[search,setSearch]=useState("");
    const[sortdata,setSortData]=useState("");


    const DeleteData = (id) => {
        let ans = record.filter((item)=>{
            return item.id !== id ;
        })
        setRecord(ans);
        localStorage.setItem('crud',JSON.stringify(ans));
        alert("succesfully deleted");
    }

    useEffect(()=>{
        let all = JSON.parse(localStorage.getItem('crud'));
        if(all === null){
            setRecord ([]);
        }else{
            setRecord(all);
        }
    },[])

    useEffect(()=>{
        let namesearch = all.filter((item)=>{
            return item.name.toLowerCase().includes(search.toLowerCase());
        })
        setRecord(namesearch);
     },[search]);

     useEffect(()=>{
        let option = [...record];
        if(sortdata === 'asc'){
            setRecord(option.sort((a,b)=>a.name.localeCompare(b.name)));
        }else if(sortdata === 'des'){
            setRecord(option.sort((a,b)=>b.name.localeCompare(a.name)));
        }else if(sortdata === 'all'){
           setRecord(all);
        }  
     },[sortdata]);


    return(
      <body style={{backgroundColor:"#CDC9EA",height:"100vh"}}>
        
        <center>
           <div className="container">
            <br />
                <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#"><h2 style={{color:"#5D50CD",marginRight:"100px"}}>To Do Application</h2></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <h6 style={{marginRight:"100px",marginTop:"9px"}}>If You are Insert a Record clicked...<br/><Link to="/" style={{textDecoration:"none",color:"#5D50CD"}}>Home</Link></h6>
                <form className="d-flex" style={{marginLeft:"81px"}}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} value={search}/>
                    <button className="btn" type="submit" style={{color:"white",backgroundColor:"#5D50CD"}}><i class="bi bi-search"></i></button>
                </form>
                    </div>
            </nav>
           </div>
           <br />
            <table border={2} cellPadding={10} width="1140px">
             <thead>
                <tr style={{backgroundColor:'#5D50CD',color:"white",border:"3px solid #5D50CD",textAlign:"center"}}>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>
                        Action
                        <select value={sortdata} onChange={(e) => setSortData(e.target.value)} style={{backgroundColor:"white",marginLeft:"10px",borderRadius:"10px",padding:"0 5px"}}>
                                    <option value="">select</option>
                                    <option value="asc">Asc</option>
                                    <option value="des">Des</option>
                                    <option value="all">All</option>
                        </select>
                    </th>
                </tr>
             </thead>
             <tbody>
                {
                    record.map((item)=>{
                        const{id,name,phone}=item;
                        return(
                            <tr key={id} style={{borderLeft:"3px solid #5D50CD",borderRight:"3px solid #5D50CD",borderBottom:"3px solid #5D50CD",textAlign:"center"}}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{phone}</td>
                                <td>
                                    <button onClick={() => DeleteData(id)} style={{backgroundColor:"#5D50CD",marginRight:"10px"}}><i class="bi bi-trash" style={{color:"white"}}></i></button>
                                    <button style={{backgroundColor:"#5D50CD"}}><Link to={`/edit/${id}`}><i class="bi bi-pencil-square" style={{color:"white"}}></i></Link></button>
                                </td>
                            </tr>
                        )
                    })
                }
             </tbody>
        </table>
        </center>
      </body>
    )
}
export default View;