
import React, { useEffect,useState } from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getListTicketAction } from '../../redux/actions/TicketActions';
import { connect } from "react-redux";
import { selectTickets } from '../../redux/selectors/TicketSelector';
import TicketApi from '../../api/TicketApi'
import axios from "axios";
import '../css/ticket.css';


const Cart = (props) => {

    //Hàm gọi modal thanh toán
const [isOpenModalPay, setOpenModalPay] = useState(false);
const handlePayConfirm  =  () => {

    props.history.push("/");
  }

const handlePayCancel =() =>{
  setOpenModalPay(false);
}
  const getListTicket = props.getListTicketAction;
  useEffect(() =>{
    const getAllTicket = async() =>{
      try {
        const tickets = await TicketApi.getAllTicketByUser();
        getListTicket(tickets);
      } catch (error) {
        //throw error;
        console.log(error);
      }
    }
    getAllTicket();
  },[getListTicket]);
  const refreshForm = () => {
    window.location.reload();
  }
  
  const tickets = props.tickets;
  //Hàm gọi các api
  async function mapItems(){
 const items = await Promise.all
          (tickets.map(async (ticket) => {
  const scheduleId = ticket.id.scheduleId;
  const schedule = await  axios.get(`http://localhost:8080/api/v1/film-schedules/${scheduleId}`).then(
    (response)=> response.data
  );
  const film = await axios.get(`http://localhost:8080/api/v1/films/${schedule.film.filmId}`).then(
    (response)=> response.data
  );
// console.log(schedule);
  return{
    name: film.name,
    bookingDate:ticket.bookingDate,
    time: schedule.timeSlot,
    quantity: ticket.quantity,
    total: ticket.total,
    filmScheduleId:schedule.scheduleId
  };
 })
 );
 return items;
}
const [allItems, setAllItems] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const items = await mapItems();
    setAllItems(items);
  };
  fetchData();
}, [tickets]);
const [isOpenModalDelete, setOpenModalDelete] = useState(false);
const handleDeleteTicket = async (filmScheduleId) => {
 
    try {
      await TicketApi.deleteByscheduleId(filmScheduleId);
      setOpenModalDelete(false);
      // showSuccessNotification(
      //   "Delete User",
      //   "Đã xóa thành công!");
      refreshForm();
    } catch (error) {
      console.log(error);
      // redirect page error server
      props.history.push("/500");
    }
  
};
const handleDeleteCancel =() =>{
  setOpenModalDelete(false);
};
//Hàm render nếu có item trong cart list
const renderCartItems = () => {
  if (allItems.length > 0) {
    const headers = [
      <th>Film name</th>,
      <th>Booking time</th>,
      <th>Time slot</th>,
      <th>Quantity</th>,
      <th>Total</th>,
      <th></th>
    ];
    const totalAmount = allItems.reduce((total, item) => total + item.total, 0);
    console.log(allItems);
    return (
        <Container className="cart-main-container">
            <div className="cart-item-list">
                
                <table>
                <thead>
                    {headers}
                </thead>
                <tbody>
                
                {allItems.map((item) => (
                 
                    <tr key={item.id}>
                    {Object.keys(item).filter(key => key !== 'filmScheduleId').map((key) => (
                        <td>{item[key]}</td>
                    ))}
                    <td>
                         <Button className="btnDelete" onClick={() =>setOpenModalDelete(true)}>Delete</Button>
                    </td>
                    <Modal isOpen={isOpenModalDelete}>
     
        
                    {/* header */}
                    <ModalHeader>Delete ticket</ModalHeader>
                
                    {/* body */}
                    <ModalBody className="m-3">
                
                      
                          <h2>Are you sure you want to delete?</h2>
                        
                
                    </ModalBody>
                
                    {/* footer */}
                    <ModalFooter>
                      <Button  color="primary" onClick={() => handleDeleteTicket(item.filmScheduleId)}>
                        Delete
                      </Button>{" "}
                
                      <Button color="primary" onClick={handleDeleteCancel}>
                        Cancel
                      </Button>
                    </ModalFooter>
                </Modal>
                    </tr>
                ))}
                </tbody>
                </table>
                <div className="container-thanh-toan">
                    <p className="" style={{fontSize: "18px"}}>Total: {totalAmount} VNĐ</p>
                    <Button color="primary" className="" onClick={() => setOpenModalPay(true)}>Pay</Button>
                </div>
            </div>
            
        </Container>
    );
  } else {
    return (
      <div className="cart-item-empty">
        <h1 style={{fontSize: "50px"}}>You have not booked any ticket <a href="/">click here</a> to return to home page!!!</h1>
      </div>
    );
  }
};
//Chỗ render
return (
  <div className="gio-hang">
    {renderCartItems()}
    {isOpenModalPay && (
      <Modal isOpen={isOpenModalPay}>
        
        
          {/* header */}
          <ModalHeader>Thanh toán</ModalHeader>

          {/* body */}
          <ModalBody className="m-3">

            
                <h2>Bạn đã thanh toán thành công xin cảm ơn!!!</h2>
              

          </ModalBody>

          {/* footer */}
          <ModalFooter>
            <Button  color="primary" onClick={handlePayConfirm}>
               Xác nhận
            </Button>{" "}

            <Button color="primary" onClick={handlePayCancel}>
              Hủy
            </Button>
          </ModalFooter>
      </Modal>
    )}
  </div>
);
};


const mapGlobalStateToProps = state => {
  return {
    tickets: selectTickets(state)
  };
};

export default connect(mapGlobalStateToProps, { getListTicketAction })(Cart);