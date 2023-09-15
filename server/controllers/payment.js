// import {MD5} from 'crypto-js';

// export const payment = async (req, res, next) => {
//     try {
//         let merchantSecret  = 'MTg1OTY5ODg4NTEyNjczMTczMjc1MTE1NDI4MjczMDQ2NTQ5NTY0=';
//         let merchantId      = '1223708';
//         let orderId         = '12345';
//         let amount          = 1000;
//         let hashedSecret    = MD5(merchantSecret).toString().toUpperCase();
//         let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
//         let currency        = 'LKR';
//         let hash            = MD5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();
//         res.status(200).json({
//             merchantId, orderId, amount, currency, hash
//         })

//     } catch (error) {
//         console.log("Error");
//         res.status(500).json({ message: 'Error ', error: error.message });
//     }
    
    
// }