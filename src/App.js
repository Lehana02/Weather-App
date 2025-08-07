import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let [city, setCity] = useState('');
  let [wDetails, setWdetails] = useState();
  let [isLoading, setIsLoading] = useState(false);

  let getData = (event) => {

    event.preventDefault();

    if (city === "") {
      toast.error('Enter name of the city...')
      return;
    }

    setIsLoading(true)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (parseInt(finalRes.cod) === 404) {
          setWdetails(undefined)
        } else {
          console.log(finalRes)
          setWdetails(finalRes)
        }
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        setIsLoading(false);
      });
    setCity('')
  }

  return (
    <div className="w-[100%] h-[100vh] bg-[#4eacb1]" >

      <div className='max-w-[1320px] mx-auto'>

        <h1 className='text-[40px] font-bold py-[50px] text-white'>Weather App</h1>

        <form onSubmit={getData}>
          <input type="text" value={city} onChange={(event) => setCity(event.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='City Name' />
          <button className='bg-blue-950 px-3 py-2 ml-1 font-bold text-white h-[40px]'>Submit</button>
        </form>

        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[15px] relative'>
          <img src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif" className={`absolute w-[100px] left-[40%] ${(isLoading) ? "" : "hidden"}`} />

          {(wDetails !== undefined) ?
            <>
              <h3 className='font-bold text-[30px]'>{wDetails.name} <span className='bg-[yellow]'>{wDetails.sys.country}</span></h3>
              <h2 className='font-bold text-[40px]'>{wDetails.main.temp}°C</h2>
              <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} />
              <p>{wDetails.weather[0].description}</p>
            </>
            :
            "No Data"
          }
        </div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
