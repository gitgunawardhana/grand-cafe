import {useEffect, useState} from "react"
import axios from 'axios'

const Main = () => {
    const [hash, setHash] = useState()

    useEffect(() => {
      axios.get("http://localhost:8000/api/payment")
        .then((res)=>{
            setHash(res.data)
        })
    }, [])
    console.log(hash);
    
  return (
    <div>
        <form method="post" action="https://sandbox.payhere.lk/pay/checkout">   
            <input type="hidden" name="merchant_id" value="1223708"/>
            <input type="hidden" name="return_url" value="http://sample.com/return"/>
            <input type="hidden" name="cancel_url" value="http://sample.com/cancel"/>
            <input type="hidden" name="notify_url" value="http://sample.com/notify"/>  
            <br/><br/>Item Details<br/>
            <input type="text" name="order_id" value="ItemNo12345"/>
            <input type="text" name="items" value="Door bell wireless"/>
            <input type="text" name="currency" value="LKR"/>
            <input type="text" name="amount" value="1000"/>  
            <br/><br/>Customer Details<br/>
            <input type="text" name="first_name" value="Saman"/>
            <input type="text" name="last_name" value="Perera"/>
            <input type="text" name="email" value="samanp@gmail.com"/>
            <input type="text" name="phone" value="0771234567"/>
            <input type="text" name="address" value="No.1, Galle Road"/>
            <input type="text" name="city" value="Colombo"/>
            <input type="hidden" name="country" value="Sri Lanka"/>
            <input type="hidden" name="hash" value={hash}/>
            <input type="submit" value="Buy Now"/>   
        </form>
    </div>
  )
}

export default Main