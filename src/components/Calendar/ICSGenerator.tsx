// import ICAL from "ical.js";
// import PropTypes from "prop-types";
type IcsProps = {
  icsData: string,
};
// type eventDetailsProps = {
//   title: string,
//   startDate: Date,
//   endDate: Date,
//   location: string,
// }
// const ICSGenerator = ({ eventDetails }) => {
const ICSGenerator = ({ icsData }: IcsProps) => {
  const generateICSFile = () => {
    // const jcalData = {
    //   "@context": "http://www.w3.org/ns/icalendar",
    //   "@type": "Event",
    //   // Use eventDetails to structure the event data
    //   // Refer to ical.js documentation for details
    //   "summary": eventDetails.title,
    //   "dtstart": eventDetails.startDate,
    //   "dtend": eventDetails.endDate,
    //   "location": eventDetails.location,
    //   // Add more properties as needed
    // };

    // const jcalString = JSON.stringify(jcalData);
    // const icalString = JSON.stringify(eventDetails);
    // const blob = new Blob([jcalString], {
    // const blob = new Blob([eventDetails], {
    const blob = new Blob([icsData], {
      type: "text/calendar;charset=utf-8",
    });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "event.ics";
    link.click();
    // console.log(icalString);
    // console.log(blob);
  };

  return (
    <div>
      <h2>Generated ICS File</h2>
      {/* <pre>{eventDetails}</pre> */}
      <button onClick={generateICSFile}>Download ICS File</button>
    </div>
  );
};

// ICSGenerator.propTypes = {
//   eventDetails: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     startDate: PropTypes.instanceOf(Date).isRequired,
//     endDate: PropTypes.instanceOf(Date).isRequired,
//     location: PropTypes.string,
//   }).isRequired,
//   // icsData: PropTypes.string.isRequired,
// };
export default ICSGenerator;
