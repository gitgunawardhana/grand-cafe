import {useEffect, useState} from "react"
import axios from 'axios'
import md5 from 'crypto-js/md5';



const Main = () => {

  let merchantSecret  = 'MTg1OTY5ODg4NTEyNjczMTczMjc1MTE1NDI4MjczMDQ2NTQ5NTY0';
  let merchantId      = '1223708';
  let orderId         = '12345';
  let amount          = '1000';
  let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
  let amountFormated = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replace(/,/g, '');
  let currency        = 'LKR';
  let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();
     
  return (
    <div>
        <form method="post" action="https://sandbox.payhere.lk/pay/checkout">   
            <input type="hidden" name="merchant_id" value={merchantId}/>
            <input type="hidden" name="return_url" value="http://sample.com/return"/>
            <input type="hidden" name="cancel_url" value="http://sample.com/cancel"/>
            <input type="hidden" name="notify_url" value="http://sample.com/notify"/>  
            <br/><br/>Item Details<br/>
    
            <input type="text" name="order_id" value={orderId}/>
            <input type="text" name="items" value="Door bell wireless"/>
            
            <input type="text" name="currency" value={currency}/>
            <input type="text" name="amount" value={amount}/>  
            <br/><br/>Customer Details<br/>
            <input type="text" name="first_name" value="Saman"/>
            <input type="text" name="last_name" value="Perera"/>
            <input type="text" name="email" value="chathuradinushka97@gmail.com"/>
            <input type="text" name="phone" value="0771234567"/>
            <input type="text" name="address" value="No.1, Galle Road"/>
            <input type="text" name="city" value="Colombo"/>
            <input type="hidden" name="country" value="Sri Lanka"/>
            <input type="hidden" name="hash" value={hash}/>
            <input type="submit" className="btn bg-white" value="Buy Now"/>   
        </form>
    </div>
  )};

  export default Main;