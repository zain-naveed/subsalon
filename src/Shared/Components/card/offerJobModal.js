import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  CircularProgress,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemButton,
  Avatar,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import { Comment, BuildTwoTone } from "@mui/icons-material";
import { JobOffer } from "../../../Assets";
import { useSelector } from "react-redux";
import { toastMessage, roleEnum } from "../../../Shared";
import { offerJobService, getSaloonJobs } from "../../Services";
function OfferJob({ offerModal, handleClose, canResp }) {
  const { user } = useSelector((state) => state.root);
  const [show, setShow] = useState(false);
  const [allJob, setallJob] = useState([]);
  const [offerJobLoader, setofferJobLoader] = React.useState(null);
  const [Applieds, setApplied] = useState([]);

  


  const getallSalonJob = () => {
    let salon = user?.user?.saloon;
    let appliedJobs = user?.user?.saloon?.job;
  

    
    getSaloonJobs(salon?._id)
      .then(({ data: { data } }) => {
        
        
        // let eextra = data;
        // let totaal= []
        // let clone=""
        // clone = [...eextra];
        // appliedJobs.map((iteem,index)=>{
        //   data.map((datas,indeex)=>{
        //     debugger
        //     
        //     if(datas._id == iteem ){
        //       totaal.push(datas)
              
        //     }  
        //   })
        // })
        // let finalsss= []
        // totaal.map((finals)=>{
        //   eextra.map((final2)=>{
        //     if(final2._id == finals._id){
        //       finalsss.push(finals)


        //     }
        //   })


        // })
        // setallJob(data);
        // 
       
        setallJob(data);
      })
      .catch((err) => {
        // toastMessage("success","You Successfully Offer a Job")
        // toastMessage("error",err?.response?.data?.message)
      });
  };
  useEffect(() => {
    getallSalonJob();
  }, []);
  const jobjobRequest = (jobId) => {
    let obj = {
      saloon: user?.user?.saloon?._id,
      offerJob: jobId,
      candidate: canResp?._id,
    };
    
    setofferJobLoader(jobId);
    offerJobService(obj)
      .then(({ data: data }) => {
        handleClose();
        
        toastMessage("success", "You Successfully Offered a Job");
      })
      .catch((err) => {
        toastMessage("error", err?.response?.data?.message);
      });
    setTimeout(() => {
      setofferJobLoader(null);
    }, 2000);
  };

  return (
    <>
      <Modal
        style={{ marginTop: "10%" }}
        className="ModalMobile"
        show={offerModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="SetModalTitle">Salon Jobs</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="offerJobHeight">
          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
            }}
          >
            {allJob && allJob?.length  > 0
              ? allJob.map((value) => {
                const labelId = `checkbox-list-label-${value._id }`;

                return (
                  <ListItem
                    onClick={() => jobjobRequest(value._id)}
                    key={value._id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="comments"
                      // style={{ background: "#2892d6" }}
                      >
                        {offerJobLoader == value._id ? (
                          <CircularProgress size={20} />
                        ) : (
                          <img src={JobOffer} width={25} />
                        )}
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} dense>
                      <ListItemAvatar>
                        <Avatar
                          alt={`${value.jobTitle.toUpperCase()}${value + 1}`}
                          src={`/static/images/avatar/${value._id + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={
                          value.jobTitle.charAt(0).toUpperCase() +
                          value.jobTitle.slice(1)
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })
              : "NO JOB FOUND"}
          </List>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OfferJob;
