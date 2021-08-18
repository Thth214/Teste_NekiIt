import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Dialog } from "primereact/dialog";
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { useHistory } from 'react-router-dom';
import api from '../../service/api';
import { UserContext } from '../../service/UserContext'
import './styles.css';

export const MySkills = () => {

    const [skills, setSkills] = useState([])
    const [userSkill, setUserSkill] = useState({})
    const [skill, setSkill] = useState([])
    const [allSkills, setAllSkills] = useState([])
    const [knowledge, setKnowledge] = useState([])
    const { userContext,clearUserContext } = useContext(UserContext)
    const history = useHistory();
     const [deleteSkillDialog,setDeleteSkillDialog] = useState(false)
    const [selected, setSelected] = useState({});
    const [infoSkillDialog, setInfoSkillDialog] = useState(false);
    const [skillDialog, setSkillDialog] = useState(false);
    const [skillEditDialog, setSkillEditDialog] = useState(false);

    const getSkills = async () => {
        await api.post("userSkill/now", {
            id: userContext.id,
        }).then((res) => setSkills(res.data)).catch((err) => console.log(err))
    }

    const getAllSkills = async() =>{
        await api.get("skill").then((res)=>{setAllSkills(res.data)})
    }

    const deleteUserSkill = async() =>{
        await api.delete(`userSkill/${skill.id}`).then((res)=>{setDeleteSkillDialog(false)}).catch((err)=>{})
    }

    const registerUserSkill = async() =>{
        await api.post(`userSkill`,{
            knowledgeLevel:knowledge,
            createdAt:`${new Date().toISOString()}`,
            updateAt:`${new Date().toISOString()}`,
            user:{ id:userContext.id},
            skill:{id:selected}
        }).then((res)=>{setSkillDialog(false)}).catch((err)=>{})
    }

    const logout = async() =>{
      await api.put(`user/${userContext.id}`,{
            login:`${userContext.login}`,
            password:`${userContext.password}`,
            lastLoginDate:`${new Date().toISOString()}`
      }).then((res)=>{
        history.push("/")
        clearUserContext()

      }).catch((err)=>{
        alert("Va para o Login")
        history.push("/")
      })
    }
    const updateKnowledge = async() =>{
        await api.put(`userSkill/${userSkill.id}`,{
            knowledgeLevel:knowledge,
            createdAt:`${userSkill.createdAt}`,
            updateAt:`${new Date().toISOString()}`,
            user:{ id:userContext.id},
            skill:{id:skill.id}
        }).then((res)=>{
            setSkillEditDialog(false)
        })
    } 

    useEffect(() => {
        getSkills();
        getAllSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[skillDialog,skillEditDialog,deleteSkillDialog] )

   const hideInfo = ()=>{
       setInfoSkillDialog(false)
        setUserSkill({})
    } 
    const hideDialog = () => {
        setSkillDialog(false);
        setSelected({})
        setKnowledge(null)
      };
      const hideEditDialog = () => {
        setSkillEditDialog(false);
      };
      const hideDeleteSkillDialog = () => {
        setDeleteSkillDialog(false);
      };
      const openNew = () => {
        setSkillDialog(true);
      };
      const confirmDeleteSkill = (skill) => {
        setSkill(skill);
        setDeleteSkillDialog(true);
      };

    const skillImageTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Image</span>
                <img src={rowData.skill.image_url} alt={rowData.skill.name} className="product-image" />
            </React.Fragment>
        );
    }

    const skillNameTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Name</span>
                <h3>{rowData.skill.name}</h3>
            </React.Fragment>
        );
    }

    const knowledgeBodyTemplate = (rowData) => {
        return (<React.Fragment>
        <span className="p-column-title">Knowledge</span>   
        <Rating value={rowData.knowledgeLevel} readOnly cancel={false}  stars={10}/>
        </React.Fragment>
        )
    }

    const header = (
        <div className="table-header">
          <div>
            <h2 className="p-m-0">My Skills</h2>
          </div>
          <div className="table-header-buttons">
            <Button
              style={{ backgroundColor:"#30a1ae", borderWidth: "0" }}
              label="Add Skills"
              icon="pi pi-plus"
              className="p-button-success p-mr-2"
              onClick={openNew}
            />
            <Button
              style={{ backgroundColor:" #22354f", borderWidth: "0" }}
              label={"Logout"}
              icon="pi pi-sign-out"
              className="p-button-success p-mr-2"
              onClick={logout}
            />
          </div>
        </div>
      );
      const deleteConvenioDialogFooter = (
        <React.Fragment>
          <Button
            label="Não"
            icon="pi pi-times"
            className="p-button-text"
            onClick={hideDeleteSkillDialog}
          />
          <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={()=>deleteUserSkill()} />
        </React.Fragment>
      );

        const infoSkill = (data) => {
                setUserSkill({...data});
                setSkill({...data.skill});
                setInfoSkillDialog(true);
              };
        const editKnowledge = (data) => {
                setUserSkill({...data});
                setSkill({...data.skill});
                 setKnowledge(0)
                setSkillEditDialog(true);
              };

      const actionBodyTemplate = (rowData) => {
        return (
          <React.Fragment>
            <Button
              icon="pi pi-search"
              label="Details"
              className="p-button-rounded p-button-outlined p-button-text p-button-success"
              onClick={() => infoSkill(rowData)}
              
            />
            <Button
              icon="pi pi-user-edit"
              label="Update"
              className="p-button-rounded p-button-outlined p-button-text p-button p-mr-2"
              onClick={() => editKnowledge(rowData)}
            />
            <Button
              icon="pi pi-trash"
              label="Delete"
              className="p-button-rounded p-button-outlined p-button-text p-button-danger p-mr-2"
               onClick={() => confirmDeleteSkill(rowData)}
            />
          </React.Fragment>
        );
      };

      const skillDialogFooter = (
        <React.Fragment>
          <div className="formButtonContainer">
            <Button label="Cancelar" className="p-button p-button-danger" onClick={hideDialog} />
            <Button label="Confirmar" className="p-button p-button-success" onClick={()=>registerUserSkill()}/>
          </div>
        </React.Fragment>
      );
      const skillEditDialogFooter = (
        <React.Fragment>
          <div className="formButtonContainer">
            <Button label="Cancelar" className="p-button p-button-danger" onClick={hideDialog} />
            <Button label="Confirmar" className="p-button p-button-success" onClick={()=>updateKnowledge()} />
          </div>
        </React.Fragment>
      );

    return (
        <>
            <div className="datatable-responsive-demo">
                <div className="card">
                    <DataTable 
                        value={skills} 
                        className="p-datatable-responsive-demo"
                        paginator
                        rowsPerPageOptions={[10, 20]}
                        rows={10} 
                        header={header}>
                        <Column field="imageUrl" header="Image" body={skillImageTemplate} />
                        <Column field="name" header="Name" body={skillNameTemplate} />
                        <Column filed="knowledge" header="Knowledge" body={knowledgeBodyTemplate} />
                        <Column body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
            <Dialog
                visible={skillDialog}
                style={{ width: "450px" }}
                header="Add Skill and Knowledge Level"
                modal
                className="p-fluid formDialog"
                footer={skillDialogFooter}
                onHide={hideDialog}
      >
        <div className="p-field">
          <label className="label">
            Skill
            <span className="required">*</span>
            <Dropdown required={true} optionLabel="name" optionValue="id" value={selected} options={allSkills} onChange={(e) => setSelected(e.value)} placeholder="Select a Skill"/>
          </label>
        </div>
        <div className="p-field">
          <label>
          Knowledge Level
            <Rating value={knowledge} header="Knowledge" style={{paddingTop:"2vh"}} onChange={(e) => setKnowledge(e.value)} cancel={10} stars={10} />
          </label>
        </div>
      </Dialog>
      <Dialog
                visible={skillEditDialog}
                style={{ width: "450px" }}
                header="Edit Knowledge Level"
                modal
                className="p-fluid formDialog"
                footer={skillEditDialogFooter}
                onHide={hideEditDialog}
      >
        <div className="p-field">
            <Rating value={knowledge} header="Knowledge" style={{paddingTop:"2vh"}} onChange={(e) => setKnowledge(e.value)} cancel={10} stars={10} />
        </div>
      </Dialog>
      <Dialog
        visible={infoSkillDialog}
        style={{ width: "350px" }}
        header="Detalhes"
        modal
        onHide={hideInfo}
        className="showInfo"
      >
        <div className="p-field">
          <label>ID</label>
          <h4>{userSkill.id}</h4>
        </div>
        <div className="p-field">
          <label>Name</label>
          <h4>{skill.name}</h4>
        </div>
        <div className="p-field">
          <label>Description</label>
          <h4>{skill.description}</h4>
        </div>
        <div className="p-field">
          <label>Version</label>
          <h4>{skill.version}</h4>
        </div>
        <div className="p-field">
          <label>Knowledge Level</label>
          <Rating value={userSkill.knowledgeLevel} readOnly cancel={false}  stars={10}/>
        </div>
      </Dialog>
      <Dialog
        visible={deleteSkillDialog}
        style={{ width: "450px" }}
        header="Deletar"
        modal
        footer={deleteConvenioDialogFooter}
        onHide={hideDeleteSkillDialog}
      >
        <div className="confirmation-content">
          {skill && <span>Você tem certeza que deseja remover a habilidade?</span>}
        </div>
      </Dialog>
        </>
    )

}
