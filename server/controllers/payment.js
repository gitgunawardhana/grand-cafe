import md5 from 'crypto-js/md5';

export const payment = async (req, res, next) => {

    let merchantSecret  = 'MTg1OTY5ODg4NTEyNjczMTczMjc1MTE1NDI4MjczMDQ2NTQ5NTY0';
    let merchantId      = '1223708';
    let orderId         = '12345';
    let amount          = 1000;
    let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
    let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
    let currency        = 'LKR';
    let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

    res.json(hash)
}