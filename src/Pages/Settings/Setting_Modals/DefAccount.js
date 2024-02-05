import { amber } from "@material-ui/core/colors";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../Settings.css"

function DefAccount({ handleChange }) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleeChange = (e) => {
    if (e.target.id === "1") {
      setSelected("Service Provider")
    }
    else {
      setSelected("Saloon Owner")
    }
  }

  const handleSubmit = () => {
    handleClose();
    
    handleChange("account", selected)
  }

  return (
    <>
      <h3 className="settingsEdit" variant="primary" onClick={handleShow}>
        Edit
      </h3>

      <Modal style={{ marginTop: "10%" }} className="ModalMobile" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="SetModalTitle">Default Account</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">

                <div>
                  <Form.Check
                    className="defAcc"
                    inline
                    label="Service Provider (Find jobs &amp; Salons)"
                    name="group1"
                    type={type}
                    id={1}
                    onChange={(e) => handleeChange(e)}
                  />
                </div>
                <div>
                  <Form.Check
                    className="defAcc"
                    inline
                    label="Salon Owner ( Find &amp; hire service providers, rating)"
                    name="group1"
                    type={type}
                    id={2}
                    onChange={(e) => handleeChange(e)}
                  />
                </div>
              </div>
            ))}
          </Form>

        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button className="btn btnSetModal" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DefAccount;