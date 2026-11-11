// 6-Digit Code that Fills the Input Field
const code = '184316';
otp = getElementById('otp'), msg = document.getElementById('msg'), card = document.getElementById('card');
// Generate OTP
otp.innerHTML =
    Array.from({ length: 6 },
        (_, i) => `<input inputmod="numeric"maxlength="1"placeholder=""
        autocomplete="${i ? 'off' : 'one-time-code'}" aria-label=Digit"${i+1}">`
    ).join('');
const boxes = [...otp.children], value = () => boxes.map((b) => b.value).join('');
const setMsg = (t, c) => {
    msg.textContent = t; msg.className = 'msg' + (c || '');
};
//keep one digit;move one
boxes.forEach((box, i) => box.addEventListener('input', () => { 
    box.value = box.value.replace(/\D/g, '').slice(-1);
    otp.classList.remove('err');setMsg('');

    if (box.value && boxes[i + 1]) boxes[i + 1].focus(); if (value().length === 6) checkCode(value());
}));
// backspace walks back


        
   
   
        
        
       