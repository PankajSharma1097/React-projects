import { useEffect, useState } from "react";

const Form = () => {
  const [text, setText] = useState("");
  const [detail, setDetail] = useState('')
  const [data, setData] = useState([])
  const [EditIndex, setEditIndex] = useState(null)


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("notedata"));

      setData(savedData);

    
  }, []);

  useEffect(() => {
    localStorage.setItem("notedata", JSON.stringify(data));
  }, [data]);



  const submitHandler = (e) => {
    e.preventDefault();
    const copyData = [...data];

    if (EditIndex !== null) {
      // LOGIC FOR UPDATING: Replace the item at the specific index
      copyData[EditIndex] = { text, detail };
      setEditIndex(null); // Reset edit mode back to null
    } else {
      // LOGIC FOR ADDING: Push a new item
      copyData.push({ text, detail });
    }

    setData(copyData);
    setText('');
    setDetail('');
  }

  if (EditIndex ==null){
    data
  }

const startEdit = (idx) => {
    // 1. Fill the inputs with the data of the note we want to edit
    setText(data[idx].text);
    setDetail(data[idx].detail);
    
    // 2. Save the index so the submitHandler knows which one to update
    setEditIndex(idx);
  };  




  const deleteNote = (idx) => {
    // console.log("Delete note at index:", idx);
    const copyData = [...data]
    copyData.splice(idx, 1)
    setData(copyData)
  }





  return (
    <div className="min-h-screen  lg:flex  border-4 text-white">

      {/* LEFT SIDE */}
      <form
        onSubmit={submitHandler}
        className="lg:w-2/5 w-full  flex flex-col justify-start items-center gap-10 p-5 lg:border-r-4 "
      >
        <h1 className="text-5xl font-bold text-left w-full  ">Makes notes</h1>

        <div >
          <input
            className="w-full p-5 text-2xl font-semibold outline-none rounded-3xl border-4 mb-6 placeholder:text-red-900"
            type="text"
            placeholder="enter your heading"
            value={text}
            onChange={(e) => {
              // console.log(e.target.value)
              setText(e.target.value)
            }}
          />

          <textarea
            className="p-5 text-2xl w-full h-90 border-4 outline-none rounded-3xl placeholder:text-red-900"
            placeholder="type your notes"
            value={detail}
            onChange={(e) => {
              // console.log(e.target.value)
              setDetail(e.target.value)
            }}
          />
        </div>

        <button className="w-1/2   rounded-3xl text-lg font-medium border-4 hover:bg-gray-300 transition delay-75 ease-in bg-white p-5 text-black active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed  " disabled={!text.trim() || !detail.trim()} >
          {EditIndex != null  ? 'Update': 'Add Notes' }
        </button>
      </form>

      {/* RIGHT SIDE */}
      {data.length>0 &&(<div className="lg:w-2/3 w-full border-t-4 lg:border-t-0  p-5">
        <h1 className="text-5xl font-bold">Recent notes</h1>

        <div id="card" className="flex flex-wrap gap-5 items-start mt-10 overflow-auto max-h-[85vh] justify-evenly">
          {data.map(function (elem, idx) {

            return (<div key={idx} className=" h-90 w-90 flex flex-col justify-between  rounded-2xl text-black p-2 mb-10 bg-[url('https://www.onlygfx.com/wp-content/uploads/2022/03/realistic-notebook-notepage-paper-background-2-cover.jpg')] bg-auto bg-center">
              <div>
                <h1 className="font-bold underline text-center text-xl mb-4 ">{elem.text}</h1>
                <p className="text-base leading-9 font-semibold  overflow-hidden  text-wrap" >{elem.detail}</p>
              </div>

              <div className="flex  justify-around w-full gap-3">
                <button  className="bg-red-500 w-full text-2xl font-semibold p-2 rounded active:scale-95  hover:bg-red-600 transition delay-75 ease-in" onClick={function (e) {
                deleteNote(idx)
                }} >Delete</button>
                <button className="bg-red-500 w-full text-2xl font-semibold p-2 rounded active:scale-95  hover:bg-red-600 transition delay-75 ease-in" onClick={(e)=>{
                  startEdit(idx)
                }}>edit</button>
              </div>
              


            </div>)
          })}

        </div>
      </div>)}

    </div>
  );
};

export default Form;
