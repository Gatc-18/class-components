import React, { Component } from 'react';
import axios from 'axios';
import { Button, Spinner, Table, Modal } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs'

const url = "http://localhost:3001/data/"

export default class Estudiante extends Component {

  constructor() {
    super()
    this.state = {
      data: [],
      modal: false,
      loading: true,
      id: ''
    }
  }

  componentDidMount() {
    this.peticionGet();
  }

  peticionGet = async () => {
    let { data } = await axios.get(url);

    this.setState({
      data,
      loading: false
    })

    console.log(this.state.data)
  }


  peticionDelete = async (id) => {

    try {
      await axios.delete(`${url}${id}`);
      this.peticionGet();
    } catch (error) {
      alert(error)
    }

    this.setState({
      modal: false
    })
  }



  render() {
    return (
      <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
        {
          this.state.loading
            ?
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Documento</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Telefono</th>
                  <th>Direccion</th>
                  <th>Imagen</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((estudiante) => {
                  const {
                    id,
                    nombres,
                    apellidos,
                    documento,
                    direccion,
                    celular,
                    imagen,
                  } = estudiante;
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{documento}</td>
                      <td>{nombres}</td>
                      <td>{apellidos}</td>
                      <td>{celular}</td>
                      <td>{direccion}</td>
                      <td>
                        <img src={imagen} alt="" style={{ width: "50px" }} />
                      </td>

                      <td>
                        <Button variant="danger" onClick={() => this.setState({
                          modal: true,
                          id
                        })}><BsFillTrashFill /></Button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

        }
        <Modal show={this.state.modal}>
          <Modal.Body>¿ Estas seguro que deseas eliminar a este usuario ?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => {
              this.peticionDelete(this.state.id)
            }}>
              Si
            </Button>
            <Button variant="danger" onClick={() => {
              this.setState({
                modal: false,
                id: ''
              })
            }}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
} 