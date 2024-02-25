import { useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";
// import { getAnswer } from "../../langchain";
import { generateAnswer } from "../../langchain";

type eventFormProps = {
  // generateICS: (params: eventDetailsProps, arg: string) => void,
  generateICS: (arg: string) => void,
  // icsDetail: string,
};

// type eventDetailsProps = {
//   title: string,
//   startDate: Date,
//   endDate: Date,
//   location: string,
// }


// const EventForm = ({ generateICS: generateICS, icsDetail: icsDetail }: eventFormProps) => {
const EventForm = ({ generateICS: generateICS }: eventFormProps) => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  // const [eventDetails, setEventDetails] = useState<
  //   eventDetailsProps
  // >({
  //   title: "",
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   location: "",
  // });

  const [icsDetails, setIcsDetails] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    setResult(`Create an ICS file compatible with Google Calendar using the following structure: "BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:title
    DTSTART:startDate
    DTEND:endDate
    LOCATION:location
    DESCRIPTION:description
    END:VEVENT
    END:VCALENDAR" and Extract event details from the provided article: "` + question + `"`)
    // setQuestion(question);
    // const result = await getAnswer(question)
    // const res = await getAnswer(result)
    if (question !== "") {
      const res = await generateAnswer(question)
      setAnswer(res);
      setIcsDetails(res)
      setLoading(false);

    }
    // console.log(result)
  }


  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setEventDetails({ ...eventDetails, [name]: value });
  // };

  // const handleStartDateChange = (date: Date) => {
  //   setEventDetails({ ...eventDetails, startDate: date });
  // };

  // const handleEndDateChange = (date: Date) => {
  //   setEventDetails({ ...eventDetails, endDate: date });
  // };

  const handleGenerateICS = () => {
    // console.log('clicked')
    // console.log(eventDetails);
    // generateICS(eventDetails);
    generateICS(icsDetails);

  };

  return (
    <div>
      {/* <label htmlFor="title" >Title:</label>
      <input placeholder="Write Title" type="text" name="title" onChange={(e) => handleInputChange(e)} />

      <label>Start Date:</label>
      <DatePicker
        selected={eventDetails.startDate}
        onChange={handleStartDateChange}
      />

      <label>End Date:</label>
      <DatePicker
        selected={eventDetails.endDate}
        onChange={handleEndDateChange}
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        name="location"
        value={eventDetails.location}
        onChange={handleInputChange}
        placeholder="Write ur Location"
      /> */}

      {/* Add more input fields for date, time, location, etc. */}
      <div className="h-full ">
        <div className="h-full flex flex-col items-center text-sm dark:bg-gray-800">
          {/* <span>{answer}</span> */}
          <Message sender="ME" title='Question' message={result} />
          {!loading ? <Message sender="GPT" title='Answer' message={answer} /> : <Loader />}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
          <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
            <label htmlFor="question">Question</label>

            <textarea
              value={question}
              tabIndex={0}
              data-id="root"
              placeholder="Send a message..."
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
              onChange={(e) => setQuestion(e.target.value)}

            ></textarea>
            <button
              className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
            >
              &#11157;
            </button>
          </div>
        </div>
      </form>

      <button onClick={handleGenerateICS}>Generate ICS</button>
    </div>
  );
};

EventForm.propTypes = {
  generateICS: PropTypes.func.isRequired,
};

export default EventForm;
